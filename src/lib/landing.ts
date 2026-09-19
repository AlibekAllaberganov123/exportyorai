export const SITE = {
  name: "ExportYor.AI",
  title: "ExportYor.AI — Mahsulotingizni dunyoga eksport qiling",
  description:
    "AI yordamida bojxona stavkalari, logistika narxi va tayyor PDF hujjatlarni 90 sekundda oling.",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Xususiyatlar" },
  { href: "#preview", label: "Tahlil Demo" },
  { href: "#steps", label: "Qo'llanma" },
  { href: "#comparison", label: "Taqqoslash" },
  { href: "#faq", label: "Savollar" },
] as const;

export type PromptTabId = "ai" | "hs" | "log";

export const PROMPT_PLACEHOLDERS: Record<PromptTabId, string> = {
  ai: "Masalan: 5 tonna xurmoni Polshaga eksport qilmoqchiman...",
  hs: "Masalan: Quritilgan qora mayiz, 10 kg qadoqda, TIF TN kodi...",
  log: "Masalan: Toshkent → Varshava, 5 tonna, ref-avto narxi...",
};

export const PROMPT_PRESETS = [
  {
    icon: "🍒",
    title: "Gilos → Dubay (BAA)",
    query:
      "20 tonna yangi gilosni Dubayga (BAA) avia orqali eksport qilmoqchiman. Bojxona bojlari va fitosanitariya talablari qanday?",
  },
  {
    icon: "🍇",
    title: "Mayiz → Germaniya (GSP+)",
    query:
      "15 tonna o'zbek qora mayizini Germaniyaga eksport qilish. EI GSP+ 0% boj imtiyozini qo'llash va sertifikatlar ro'yxati.",
  },
  {
    icon: "🧵",
    title: "Ip-kalava → Turkiya",
    query:
      "40 tonna paxta ip-kalavasini Turkiyaga (Istanbul) TIR-avto orqali jo'natish. Bojxona stavkalari va tranzit muddati.",
  },
  {
    icon: "🍅",
    title: "Pomidor → Rossiya",
    query:
      "12 tonna issiqxona pomidorini Rossiyaga (Moskva) sovutgichli fura orqali eksport qilish tartibi va to'lovlari.",
  },
] as const;

export const STATS = [
  { value: "1,200+", label: "Eksportchi korxona", sub: "Faol foydalanuvchilar" },
  { value: "$48M+", label: "Eksport hajmi", sub: "Hisoblangan tahlillar" },
  { value: "45+", label: "Hamkor davlatlar", sub: "EI, Yaqin Sharq, MDH" },
  { value: "< 90 sek", label: "O'rtacha tahlil", sub: "99.4% aniqlik darajasi" },
] as const;

export const AVATARS = [
  { name: "Aziz", role: "Agro Eksport", hue: "bg-primary" },
  { name: "Malika", role: "Tekstil Klaster", hue: "bg-ai" },
  { name: "Jasur", role: "Logistika Menejeri", hue: "bg-sky-accent" },
  { name: "Nilufar", role: "Quruq Meva Eksporti", hue: "bg-navy" },
  { name: "Bobur", role: "Bojxona Brokeri", hue: "bg-primary" },
] as const;

export const SOURCES = [
  { name: "ITC MacMap API", status: "Real-time faol", desc: "Xalqaro savdo tariflari" },
  { name: "EU TARIC Database", status: "2026 yangilangan", desc: "Yevropa Ittifoqi stavkalari" },
  { name: "O'zbekiston Bojxona Qo'mitasi", status: "TIF TN 2026", desc: "Milliy tarif bazasi" },
  { name: "UN Comtrade", status: "Global statistika", desc: "Jahon savdo oqimlari" },
] as const;

export const SIDEBAR_ITEMS = [
  { label: "Yangi so'rov", badge: "AI" },
  { label: "Tahlillar", badge: "3 yangi", active: true },
  { label: "HS-Code katalogi", badge: null },
  { label: "Logistika narxlari", badge: "Live" },
  { label: "Tayyor hujjatlar", badge: "PDF" },
  { label: "Sozlamalar", badge: null },
] as const;

export const ROUTE_CHECKLIST = [
  { title: "Fitosanitar sertifikat (UzStandart)", status: "done", time: "1 ish kuni" },
  { title: "Kelib chiqish sertifikati (Form A - GSP+)", status: "done", time: "Tayyor" },
  { title: "Toshkent → Aktau → Varshava marshruti", status: "done", time: "9 kun (Avto)" },
  { title: "Bojxona deklaratsiyasi (SAD)", status: "pending", time: "Tekshiruvda" },
] as const;

export const FEATURES = [
  {
    iconName: "Search",
    title: "HS-Code (TIF TN) intellektual qidiruvi",
    description:
      "Mahsulot tavsifi, tarkibi va qadog'iga ko'ra to'g'ri 10 xonali kodni 99.4% aniqlikda topadi va tavsiya beradi.",
    tag: "99.4% Aniqlik",
  },
  {
    iconName: "Percent",
    title: "GSP+ va Bojxona imtiyozlari",
    description:
      "Yevropa Ittifoqining GSP+ 0% bojlari, MDH erkin savdo shartnomalari va soliq imtiyozlarini avtomatik tatbiq etadi.",
    tag: "0% Boj stavkasi",
  },
  {
    iconName: "Truck",
    title: "Multimodal logistika & 1 kg tannarxi",
    description:
      "Avto (TIR), Havo, Temiryo'l va Dengiz yo'llari narxlarini solishtirib, har 1 kg uchun optimal marshrutni chizadi.",
    tag: "Real vaqtda",
  },
  {
    iconName: "FileText",
    title: "1 bosishda xalqaro eksport hujjatlari",
    description:
      "Ikki tilda xalqaro Eksport shartnomasi (UZ/EN), Invoys (Commercial Invoice) va Packing List hujjatlarini generatsiya qiladi.",
    tag: "PDF / Word",
  },
  {
    iconName: "TrendingUp",
    title: "Bozor talabi & Narx prognozi",
    description:
      "Mahsulotingizga qaysi davlatda yuqoriroq talab va yaxshi narx borligini jahon savdo ma'lumotlari asosida ko'rsatadi.",
    tag: "Global tahlil",
  },
  {
    iconName: "Bot",
    title: "24/7 Virtual Bojxona Maslahatchisi",
    description:
      "Bojxona to'lovlari, sanitar talablar va qadoqlash standartlari bo'yicha mutaxassis darajasida savollarga javob beradi.",
    tag: "AI Yordamchi",
  },
] as const;

export const STEPS = [
  {
    number: "01",
    title: "So'rov kiritasiz",
    description:
      "Eksport qilinadigan mahsulot nomi, hajmi va boradigan manzilni erkin matn shaklida yozasiz.",
    badge: "10 sekund",
    sample: "Masalan: 10 tonna gilos → Germaniya",
  },
  {
    number: "02",
    title: "AI qonunchilik va narxni hisoblaydi",
    description:
      "Bojxona tariflari, GSP+ imtiyozlari, TIR/Avia logistika stavkalari va talab etiladigan sertifikatlar tekshiriladi.",
    badge: "Real-time AI",
    sample: "ITC MacMap + Bojxona bazasi solishtirilmoqda",
  },
  {
    number: "03",
    title: "Tayyor yechim va PDF hujjatlar",
    description:
      "1 kg uchun to'liq unit-economics tahlili, yo'l xaritasi va rasmiy eksport hujjatlarini yuklab olasiz.",
    badge: "Tayyor natija",
    sample: "Shartnoma, Invoys va PDF hisobot",
  },
] as const;

export const COMPARISON_DATA = {
  traditional: {
    title: "An'anaviy usul (Bojxona brokeri & Konsalting)",
    time: "3 — 7 ish kuni",
    cost: "$300 — $800 har bir so'rovga",
    accuracy: "Inson omili va qonunchilikdagi xatolar",
    documents: "Qo'lda to'ldirish, imlo xatolari xavfi",
    availability: "Faqat ish vaqtida (09:00 - 18:00)",
  },
  exportyor: {
    title: "ExportYor.AI — Avtomatlashtirilgan tizim",
    time: "Atigi 90 sekund",
    cost: "Bepul sinov / Hamyonbop obuna",
    accuracy: "99.4% aniqlik (ITC MacMap & Bojxona integratsiyasi)",
    documents: "Avtomatik generatsiya, 2 tilda xalqaro andoza",
    availability: "24/7 doimiy foydalanish imkoniyati",
  },
};

export const FAQ_ITEMS = [
  {
    question: "Bojxona stavkalari va ma'lumotlar qanchalik ishonchli?",
    answer:
      "ExportYor.AI ma'lumotlarni to'g'ridan-to'g'ri O'zbekiston Bojxona Qo'mitasi bazasi, Yevropa Ittifoqining rasmiy EU TARIC reyestri va BMT ITC MacMap API orqali oladi. Barcha tariflar 2026-yilgi amaldagi qonunchilikka mos holda yangilanadi.",
  },
  {
    question: "GSP+ tizimi bo'yicha 0% boj qanday qo'llaniladi?",
    answer:
      "O'zbekiston Yevropa Ittifoqining GSP+ preferensiyalar tizimi benefisiari hisoblanadi. Tizimimiz mahsulotingiz ushbu ro'yxatga kirish-kirmasligini avtomatik tekshirib, Yevropa bojxonasida 0% boj bilan o'tish uchun kerakli 'Form A' yoki 'REX' sertifikati talablarini taqdim etadi.",
  },
  {
    question: "Tizim qaysi davlatlarga eksport qilishni qo'llab-quvvatlaydi?",
    answer:
      "Platforma Yevropa Ittifoqining 27 ta davlati, BAA, Saudiya Arabistoni, Turkiya, Xitoy, Janubiy Koreya, Rossiya, Qozog'iston va boshqa 45 dan ortiq mamlakatlarga eksport marshrutlari, bojxona va sertifikatlash talablarini qo'llab-quvvatlaydi.",
  },
  {
    question: "Generatsiya qilingan hujjatlarni rasmiy organlar qabul qiladimi?",
    answer:
      "Ha. Bizning shartnoma, Commercial Invoice va Packing List andozalari Xalqaro Savdo Palatasi (ICC) hamda O'zbekiston tashqi savdo standartlariga to'liq mos keladi. Ularni yuklab olib, o'z rekvizitlaringiz bilan darhol bankka va bojxonaga taqdim etishingiz mumkin.",
  },
  {
    question: "Birinchi marta foydalanish bepulmi?",
    answer:
      "Ha! Har bir yangi foydalanuvchi uchun dastlabki 3 ta to'liq eksport tahlili va hujjatlar generatsiyasi mutlaqo bepul taqdim etiladi. Kredit karta kiritish talab etilmaydi.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Polshaga 20 tonna quritilgan meva eksportida GSP+ boji bo'yicha ikkilanayotgan edik. ExportYor.AI 1 daqiqada 0% boj imtiyozini va to'liq marshrut xarajatini hisoblab berdi. $4,000 dan ortiq tejab qoldik!",
    author: "Shavkat Qodirov",
    role: "Bosh direktor, 'Samarkand Agro Export' MCHJ",
    badge: "Agro eksport",
  },
  {
    quote:
      "Ilgari Turkiyaga trikotaj mato jo'natishda brokerlarga kunlab kutishga to'g'ri kelardi. Hozir barcha invoys va shartnomalarni 90 sekundda PDF qilib olamiz. Juda qulay!",
    author: "Dilnoza Ahmedova",
    role: "Eksport bo'limi boshlig'i, 'Tashkent Textile'",
    badge: "To'qimachilik",
  },
] as const;
