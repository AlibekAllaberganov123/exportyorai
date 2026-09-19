"use client";

import { useState, useMemo } from "react";
import { Search, ArrowRight } from "lucide-react";
import tariffsData from "@/data/tariffs-eu.json";
import { ActiveView } from "../types";

interface HSCodeViewProps {
  setActiveView: (view: ActiveView) => void;
  handleSendMessage: (text: string) => void;
}

const CATEGORIES = [
  "Barchasi",
  "Mevalar (08)",
  "Sabzavotlar (07)",
  "To'qimachilik (52)",
  "Don va boshoqli (10)",
  "Yog'lar (15)",
  "Sanoat (84-85)",
];

function chapterToCategory(chapter: string): string {
  const ch = parseInt(chapter, 10);
  if (ch === 8) return "Mevalar (08)";
  if (ch === 7) return "Sabzavotlar (07)";
  if (ch >= 50 && ch <= 63) return "To'qimachilik (52)";
  if (ch === 10) return "Don va boshoqli (10)";
  if (ch === 15) return "Yog'lar (15)";
  if (ch === 84 || ch === 85) return "Sanoat (84-85)";
  return "Boshqa";
}

export function HSCodeView({ setActiveView, handleSendMessage }: HSCodeViewProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [isLoading] = useState(false);

  const products = tariffsData.products;

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((item) => {
      const matchesSearch = item.hs6.includes(q) || item.desc.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "Barchasi" || chapterToCategory(item.chapter) === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, products]);

  const displayedProducts = filteredProducts.slice(0, 50);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
            HS-Code (TIF TN) Katalogi
          </h2>
          <p className="text-xs text-muted-foreground">
            Haqiqiy bojxona ma&apos;lumotlari asosida {products.length} ta mahsulotni qidirish
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="HS kodi yoki tavsifni kiriting (masalan: 0804, pomidor)..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-4 text-xs font-semibold text-foreground outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-xs"
                  : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {filteredProducts.length} ta natija
        {filteredProducts.length > 50 ? ` (50 tasi ko'rsatilmoqda)` : ""}
      </p>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-3 w-64" />
                  <div className="skeleton h-3 w-48" />
                </div>
                <div className="skeleton h-10 w-32" />
              </div>
            ))
          : displayedProducts.map((item) => (
              <div
                key={item.hs6}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-blue-500/40 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-extrabold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-md">
                      {item.hs6}
                    </span>
                    <span className="text-xs font-bold text-foreground truncate">{item.desc}</span>
                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground whitespace-nowrap">
                      Bob {item.chapter}
                    </span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>
                      EI MFN boji: <strong className="text-foreground">{item.euMfnPct}%</strong>
                    </span>
                    <span>·</span>
                    <span>
                      O&apos;zbekiston GSP+:{" "}
                      <strong className="text-emerald-600">{item.uzGspPct}%</strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveView("chat");
                    handleSendMessage(
                      `${item.hs6} - ${item.desc} bo'yicha eksport tahlilini hisoblab ber`,
                    );
                  }}
                  className="flex items-center justify-center gap-1 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-all hover:scale-105 hover:shadow-md active:scale-95 shrink-0"
                >
                  <span>Tahlil qilish</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
