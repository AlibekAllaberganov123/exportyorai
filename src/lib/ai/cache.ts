/**
 * Token tejash qatlami:
 * 1. Javob keshi — bir xil so'rov API'ga umuman bormaydi (0 token)
 * 2. Rate limit — IP bo'yicha kunlik so'rov cheklovi
 * 3. Eski yozuvlarni avtomatik tozalash
 */

interface CacheEntry {
  answer: string;
  hs6?: string;
  createdAt: number;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 soat
const MAX_CACHE = 500;
const DAILY_LIMIT = 50; // bir IP / kun

const cache = new Map<string, CacheEntry>();
const hits = new Map<string, number[]>();

function hashKey(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
  }
  return String(h);
}

export function normalizeQuestion(q: string): string {
  return q.toLowerCase().replace(/\s+/g, " ").trim();
}

export function cacheGet(question: string): CacheEntry | undefined {
  const key = hashKey(normalizeQuestion(question));
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() - entry.createdAt > CACHE_TTL_MS) {
    cache.delete(key);
    return undefined;
  }
  return entry;
}

export function cacheSet(question: string, answer: string, hs6?: string): void {
  if (cache.size >= MAX_CACHE) {
    const oldest = [...cache.entries()].sort((a, b) => a[1].createdAt - b[1].createdAt)[0];
    if (oldest) cache.delete(oldest[0]);
  }
  cache.set(hashKey(normalizeQuestion(question)), {
    answer,
    hs6,
    createdAt: Date.now(),
  });
}

export function rateLimitOk(ip: string): boolean {
  const today = new Date().toDateString();
  const list = (hits.get(ip) ?? []).filter((t) => {
    const d = new Date(t).toDateString();
    return d === today;
  });
  if (list.length >= DAILY_LIMIT) return false;
  list.push(Date.now());
  hits.set(ip, list);
  return true;
}
