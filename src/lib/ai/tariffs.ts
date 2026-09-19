import tariffsJson from "@/data/tariffs-eu.json";
import { extractSearchTerms } from "./keywords";

export interface TariffProduct {
  hs6: string;
  desc: string;
  chapter: string;
  euMfnPct: number;
  uzGspPct: number;
}

export interface TariffDatabase {
  source: string;
  reporter: string;
  mfnpPartners: string[];
  gspNote: string;
  excludedChapters: string[];
  products: TariffProduct[];
}

const db = tariffsJson as TariffDatabase;

/** Eksport yo'nalishlari (demo: bazada EI/MFN bor; qolganlari prognoz) */
export const DESTINATIONS = [
  { id: "eu", label: "Yevropa Ittifoqi (Germaniya, Polsha...)", hasData: true },
  { id: "pl", label: "Polsha (EI)", hasData: true },
  { id: "de", label: "Germaniya (EI)", hasData: true },
  { id: "tr", label: "Turkiya", hasData: false },
  { id: "ru", label: "Rossiya", hasData: false },
  { id: "kz", label: "Qozog'iston", hasData: false },
  { id: "ae", label: "BAA (Dubay)", hasData: false },
] as const;

/** Mahsulot tavsiflari bo'yicha lokal qidiruv (0 token) */
export function searchProducts(terms: string[], limit = 8): TariffProduct[] {
  if (terms.length === 0) return [];
  const lower = terms.map((t) => t.toLowerCase());
  const scored: { p: TariffProduct; score: number }[] = [];

  for (const p of db.products) {
    const d = p.desc.toLowerCase();
    let score = 0;
    for (const t of lower) {
      if (d.includes(t)) score += t.length; // uzunroq so'z — aniqroq moslik
    }
    if (score > 0) scored.push({ p, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

/** Foydalanuvchi xabari → top kandidatlar (lokal, bepul) */
export function findCandidates(message: string): TariffProduct[] {
  const terms = extractSearchTerms(message);
  if (terms.length > 0) {
    const hits = searchProducts(terms);
    if (hits.length > 0) return hits;
  }
  // Term topilmasa — xabardagi inglizcha so'zlarni to'g'ridan-to'g'ri sinab ko'rish
  const words = message
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3);
  return searchProducts(words, 8);
}

/** HS6 bo'yicha aniq tarif */
export function getTariff(hs6: string): TariffProduct | undefined {
  return db.products.find((p) => p.hs6 === hs6);
}

export function tariffInfoBlock(products: TariffProduct[]): string {
  if (products.length === 0) return "";
  const lines = products.map(
    (p) =>
      `- HS ${p.hs6} | ${p.desc} | EI standart boj: ${p.euMfnPct}% | O'zbekiston GSP+ boj: ${p.uzGspPct}%`,
  );
  return lines.join("\n");
}

export { db as tariffDb };
