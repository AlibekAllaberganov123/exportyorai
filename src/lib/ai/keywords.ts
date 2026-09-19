/**
 * O'zbekcha/ruscha mahsulot nomlarini HS bazasidagi (inglizcha) tavsif
 * kalit so'zlariga bog'laydi. Bu qatlam AI tokenlarini tejashning asosi:
 * mahsulot aniqlashning 90% qismi lokal qidiruvda hal bo'ladi, AI esa
 * faqat tayyor kandidatlar orasidan tanlaydi va javob yozadi.
 */

export interface ProductHint {
  /** Foydalanuvchi yozishi mumkin bo'lgan nomlar (ozbekcha, ruscha) */
  terms: string[];
  /** Inglizcha tavsifdagi qidiruv so'zlari (HS bazasi desc bo'yicha) */
  en: string[];
  /** Taxminiy HS boblari — qidiruvni toraytirish uchun */
  chapters: string[];
}

export const PRODUCT_HINTS: ProductHint[] = [
  { terms: ["xurmo", "hurma", "хурма"], en: ["persimmon"], chapters: ["08"] },
  { terms: ["mayiz", "quruq uzum", "изюм"], en: ["raisin", "dried grapes"], chapters: ["08"] },
  { terms: ["gilos", "черешня", "вишня"], en: ["cherries"], chapters: ["08"] },
  { terms: ["olcha", "черешня"], en: ["cherries"], chapters: ["08"] },
  { terms: ["uzum", "виноград"], en: ["grapes", "grape"], chapters: ["08"] },
  { terms: ["olma", "яблоки", "yabloko"], en: ["apples"], chapters: ["08"] },
  { terms: ["nok", "груша"], en: ["pears", "pear"], chapters: ["08"] },
  { terms: ["shaftoli", "персик"], en: ["peaches"], chapters: ["08"] },
  { terms: ["olcha", "quritilgan olcha"], en: ["cherries dried"], chapters: ["08"] },
  { terms: ["qovun", "дыня"], en: ["melons"], chapters: ["08"] },
  { terms: ["tarvuz", "qarpiz", "арбуз"], en: ["watermelons"], chapters: ["08"] },
  { terms: ["pomidor", "томат", "помидор"], en: ["tomatoes"], chapters: ["07"] },
  { terms: ["bodring", "огурец", "xiyar"], en: ["cucumbers"], chapters: ["07"] },
  { terms: ["piyoz", "лук", "lux"], en: ["onions"], chapters: ["07"] },
  { terms: ["karam", "капуста"], en: ["cabbages", "cauliflowers"], chapters: ["07"] },
  { terms: ["sabzi", "морковь"], en: ["carrots"], chapters: ["07"] },
  { terms: ["kartoshka", "картофель"], en: ["potatoes"], chapters: ["07"] },
  { terms: ["yong'oq", "yongok", "орех", "gretskiy"], en: ["walnuts"], chapters: ["08"] },
  { terms: ["bodom", "миндаль"], en: ["almonds"], chapters: ["08"] },
  { terms: ["fishtoq", "fistik", "арахис"], en: ["ground nuts", "peanuts"], chapters: ["08"] },
  { terms: ["paxta", "хлопок", "cotton"], en: ["cotton"], chapters: ["52"] },
  { terms: ["ip-kalava", "ip kalava", "пряжа"], en: ["yarn"], chapters: ["52", "54", "55"] },
  {
    terms: ["mato", "ткань", "трикотаж"],
    en: ["woven fabrics", "knitted"],
    chapters: ["52", "60", "61", "62"],
  },
  { terms: ["kiprik", "resnica"], en: ["artificial lashes"], chapters: ["67"] },
  { terms: ["asal", "мёд", "med"], en: ["honey"], chapters: ["04"] },
  { terms: ["qurut", "kurut"], en: ["cheese", "curd"], chapters: ["04"] },
  { terms: ["tuxum", "яйцо"], en: ["eggs"], chapters: ["04"] },
  { terms: ["guruch", "рис", "ris"], en: ["rice"], chapters: ["10"] },
  { terms: ["bug'doy", "пшеница"], en: ["wheat"], chapters: ["10"] },
  { terms: ["loviya", "фасоль", "bob"], en: ["beans", "leguminous"], chapters: ["07"] },
  {
    terms: ["kungaboqar yog'i", "quyosh yog", "подсолнечное масло"],
    en: ["sunflower oil"],
    chapters: ["15"],
  },
  { terms: ["paxta yog'i", "cotton oil"], en: ["cotton seed oil"], chapters: ["15"] },
  { terms: ["shirinlik", "konfet", "конфеты"], en: ["sugar confectionery"], chapters: ["17"] },
  { terms: ["shokolad", "шоколад"], en: ["chocolate"], chapters: ["18"] },
  { terms: ["limonad", "ichimlik", "напиток"], en: ["beverages", "waters"], chapters: ["22"] },
  { terms: ["ipak", "шёлк"], en: ["silk"], chapters: ["50"] },
  { terms: ["jun", "шерсть"], en: ["wool"], chapters: ["51"] },
  { terms: ["paypoq", "носки"], en: ["socks", "hosiery"], chapters: ["61"] },
  {
    terms: ["kostum", "palto", "куртка"],
    en: ["coats", "suits", "jackets"],
    chapters: ["61", "62"],
  },
  { terms: ["poyabzal", "обувь", "krossovka"], en: ["footwear"], chapters: ["64"] },
  { terms: ["sumka", "сумка"], en: ["handbags"], chapters: ["42"] },
  { terms: ["mebel", "мебель"], en: ["furniture"], chapters: ["94"] },
  { terms: ["keramik plitka", "плитка"], en: ["ceramic"], chapters: ["69"] },
  { terms: ["shisha idish", "стекло"], en: ["glass"], chapters: ["70"] },
  { terms: ["sim", "kabel", "провод"], en: ["insulated wire", "cable"], chapters: ["85"] },
  {
    terms: ["quvvat batareyasi", "аккумулятор"],
    en: ["accumulators", "batteries"],
    chapters: ["85"],
  },
  { terms: ["traktor", "mashina", "станок"], en: ["machines", "machinery"], chapters: ["84"] },
  { terms: ["quritilgan meva", "сухофрукты"], en: ["dried", "dried fruit"], chapters: ["08"] },
  {
    terms: ["ziravor", "za'faron", "специи"],
    en: ["spices", "saffron", "cumin"],
    chapters: ["09"],
  },
  {
    terms: ["o't o't", "dori o'simlik", "лекарственное"],
    en: ["plants used in pharmacy"],
    chapters: ["12"],
  },
];

/**
 * Matnni solishtirish uchun soddalashtiradi: apostrof/tire/katta-kichik
 * farqlarini yo'q qiladi ("yong-oq" ≈ "yong'oq" ≈ "Yong’oq" → "yongoq").
 */
function fold(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’ʻ‘`'-_]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Foydalanuvchi xabaridan mahsulotga tegishli inglizcha qidiruv so'zlarini
 * ajratib oladi (masalan "5 tonna xurmo bor" → ["persimmon"]).
 */
export function extractSearchTerms(message: string): string[] {
  const folded = ` ${fold(message)} `;
  const found: string[] = [];
  for (const hint of PRODUCT_HINTS) {
    if (hint.terms.some((t) => folded.includes(fold(t)))) {
      found.push(...hint.en);
    }
  }
  return [...new Set(found)];
}
