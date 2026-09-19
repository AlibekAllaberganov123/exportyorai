import { NextResponse } from "next/server";
import { cacheGet, cacheSet, normalizeQuestion, rateLimitOk } from "@/lib/ai/cache";
import { findCandidates, getTariff, tariffInfoBlock } from "@/lib/ai/tariffs";

export const runtime = "nodejs";

const API_BASE = process.env.UNOROUTER_BASE_URL ?? "https://api.unorouter.com/v1";
const API_KEY = process.env.UNOROUTER_API_KEY ?? "";
const MODEL = process.env.UNOROUTER_MODEL ?? "glm-5.3:free";
const FALLBACK_MODELS = ["deepseek-v4-flash-0731", "gemma-4-26b:free"];

// Token tejash: max javob uzunligi + past harorat
const MAX_OUTPUT_TOKENS = 900;
const TEMPERATURE = 0.4;

function systemPrompt(candidatesBlock: string, message: string): string {
  return `Sen — ExportYor.AI tizimining eksport maslahatchisisi. O'zbekistondan eksport qilishni bilmaydigan tadbirkor bilan o'zbek tilida gaplashasan.

FAOLIYAT QOIDALARI:
1. Tadbirkorning mahsuloti va hajmini xabardan aniqla. Yetishmasa, qisqa javob berib, yetishmagan ma'lumotni so'ra (mahsulot, hajm kg/tonna, boradigan davlat).
2. Quyida HS-Code kandidatlari va ularning tariflari keltirilgan (lokal bazadan olingan, ishonchli). Eng mosini tanlab, HS kodi, EI standart boji va O'zbekiston GSP+ imtiyozini ayt.
3. Yo'l xaritasi (roadmap) ber: 6-8 qadam, har birida qisqa izoh va muddat. Odatiy qadamlar: e-Karantin/fitosanitar (agar agro bo'lsa), kelib chiqish sertifikati (Form A/REX — GSP+ uchun), eksport shartnomasi, invoys va packing list (bizda avtomatik generatsiya bor — hujjatlar bo'limida), logistika tanlash, bojxona deklaratsiyasi (SAD/BYuD), yetkazib berish.
4. Eksport uchun odatda 8 ta hujjat kerak; ulardan 2 tasi (eksport shartnomasi va invoys) platformada avtomatik tayyorlanadi — buni eslat.
5. Baza faqat Yevropa Ittifoqi tariflarini o'z ichiga oladi. Boshqa davlat so'ralsa, umumiy ma'lumot ber va tariflarni taxminan deb tushuntir.
6. Javob ixcham bo'lsin: qisqa paragraflar, **qalin** muhim so'zlar, ro'yxatlar. 250 so'zdan oshirmaslikga harakat qil.
7. AGAR savol oddiy salomlashish, rahmat aytish yoki umumiy tanishuv bo'lsa — qisqa, do'stona javob ber. Kanvasni, hisobotni, yo'l xaritasini ESLATMA va analiz va'da QILMA — faqat mahsulot va hajmni so'ra. Kanvasda hisob-kitob chizishni faqat haqiqiy eksport tahlili qilganda ayting, oxirida bir qator: "📊 Kanvasda to'liq tahlil tayyorlandi."

MAHSULOT KANDIDATLARI (lokal tariflar bazasi, Yevropa Ittifoqi 2024):
${candidatesBlock || "(mos kandidat topilmadi — savoldan mahsulotni aniqlab, HS kodini o'z bilimingizcha taxmin qiling va bu taxmin ekanligini ayting)"}

FOYDALANUVCHI XABARI: ${message}`;
}

async function callAI(
  message: string,
  candidatesBlock: string,
): Promise<{ content: string; model: string }> {
  if (!API_KEY) throw new Error("AI kalit sozlanmagan (.env: UNOROUTER_API_KEY)");

  const body = JSON.stringify({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt(candidatesBlock, message) },
      { role: "user", content: message },
    ],
    max_tokens: MAX_OUTPUT_TOKENS,
    temperature: TEMPERATURE,
  });

  for (const model of [MODEL, ...FALLBACK_MODELS]) {
    try {
      const res = await fetch(`${API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: body.replace(`"model":"${MODEL}"`, `"model":"${model}"`),
        signal: AbortSignal.timeout(60_000),
      });
      if (!res.ok) {
        console.error(`AI ${model}: HTTP ${res.status}`);
        continue;
      }
      const json = await res.json();
      const content: string | undefined = json?.choices?.[0]?.message?.content;
      if (content) return { content, model };
    } catch (err) {
      console.error(`AI ${model} xato:`, err);
    }
  }
  throw new Error("Barcha AI modellar javob bermadi");
}

export async function POST(request: Request) {
  try {
    const { message } = (await request.json()) as { message?: string };
    if (!message?.trim()) {
      return NextResponse.json({ error: "Xabar bo'sh" }, { status: 400 });
    }

    // Token tejash: keshda bo'lsa API'ga borilmaydi
    const cached = cacheGet(message);
    if (cached) {
      const cachedTariff = cached.hs6 ? (getTariff(cached.hs6) ?? null) : null;
      return NextResponse.json({
        answer: cached.answer,
        hs6: cached.hs6,
        tariff: cachedTariff,
        hasAnalysis: Boolean(cachedTariff || cached.hs6),
        cached: true,
      });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
    if (!rateLimitOk(ip)) {
      return NextResponse.json(
        { error: "Kunlik so'rov limiti tugadi (50). Ertaga davom eting." },
        { status: 429 },
      );
    }

    // Lokal kandidatlar (0 token)
    const candidates = findCandidates(message);
    const block = tariffInfoBlock(candidates);

    const { content, model } = await callAI(message, block);

    // Tahlil bor-yo'qligi: lokal kandidat topilgan bo'lsa yoki javobda HS kod chiqsa
    const hs6Match = content.match(/HS[:\s]*([0-9]{4}[.,][0-9]{2}|[0-9]{6})/i);
    const hs6 = hs6Match?.[1]?.replace(/[.,]/g, "");
    const tariff =
      (candidates.length > 0 ? candidates[0] : hs6 ? getTariff(hs6) : undefined) ?? null;
    const hasAnalysis = Boolean(tariff || hs6);

    cacheSet(message, content, hs6);

    return NextResponse.json({
      answer: content,
      hs6,
      tariff,
      hasAnalysis,
      model,
      cached: false,
      debugCandidates: candidates.map((c) => c.hs6),
    });
  } catch (err) {
    console.error("Chat API xato:", err);
    return NextResponse.json(
      { error: "AI tizimida xatolik. Keyinroq urinib ko'ring." },
      { status: 500 },
    );
  }
}
