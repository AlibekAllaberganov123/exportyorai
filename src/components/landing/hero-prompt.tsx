"use client";

import { ArrowRight, Check, Loader2, Package, Search, Sparkles, Truck } from "lucide-react";
import { useState } from "react";

import { PROMPT_PLACEHOLDERS, PROMPT_PRESETS, type PromptTabId } from "@/lib/landing";

const TABS = [
  { id: "ai" as const, label: "AI So'rov", icon: Package },
  { id: "hs" as const, label: "HS-Code", icon: Search },
  { id: "log" as const, label: "Logistika", icon: Truck },
];

export function HeroPrompt() {
  const [active, setActive] = useState<PromptTabId>("ai");
  const [promptText, setPromptText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handlePresetClick = (query: string) => {
    setPromptText(query);
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAnalyzed(true);
      const previewEl = document.getElementById("preview");
      if (previewEl) {
        previewEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 800);
  };

  return (
    <section className="pt-16 text-center sm:pt-20">
      {/* Announcement badge */}
      <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs backdrop-blur-sm transition-all hover:border-primary/40">
        <span className="flex size-2 rounded-full bg-ai animate-pulse" />
        <span className="text-muted-foreground">Yangi:</span>
        <span className="font-semibold text-primary">
          O&apos;zbekiston Bojxona &amp; GSP+ 2026 bazasi
        </span>
        <span className="text-muted-foreground">· 99.4% aniqlik</span>
      </div>

      <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        Mahsulotingizni <span className="text-gradient-ai">dunyoga</span> eksport qiling
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
        AI yordamida bojxona stavkalari, logistika narxi va tayyor PDF hujjatlarni 90 sekundda
        oling.
      </p>

      <div className="relative mx-auto mt-8 max-w-3xl">
        {/* Hand drawn note */}
        <span className="font-hand absolute -left-36 top-1 hidden -rotate-12 text-2xl text-primary lg:block">
          So&apos;rov yozing
          <svg
            width="70"
            height="40"
            viewBox="0 0 70 40"
            fill="none"
            className="absolute left-8 top-7 text-primary"
            aria-hidden="true"
          >
            <path
              d="M2 4 C 20 30, 45 36, 66 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M56 18 L 66 22 L 60 30"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* Prompt Card */}
        <div className="relative z-10 rounded-2xl border border-border/80 bg-card p-4 text-left shadow-xl ring-1 ring-black/5 transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 sm:p-5">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1.5 rounded-full bg-secondary/70 p-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const on = active === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActive(tab.id)}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
                      on
                        ? "bg-card text-primary shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <span className="hidden items-center gap-1 text-[11px] font-medium text-muted-foreground sm:flex">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Bojxona &amp; Logistika API ulangan
            </span>
          </div>

          {/* Textarea */}
          <textarea
            rows={3}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder={PROMPT_PLACEHOLDERS[active]}
            className="mt-3 w-full resize-none bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 sm:text-base"
          />

          {/* Preset Chips */}
          <div className="mt-2 border-t border-border/60 pt-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-muted-foreground">
                Tezkor namunalar:
              </span>
              {PROMPT_PRESETS.map((preset) => (
                <button
                  key={preset.title}
                  type="button"
                  onClick={() => handlePresetClick(preset.query)}
                  className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
                >
                  <span>{preset.icon}</span>
                  <span>{preset.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer of the Card */}
          <div className="mt-3 flex items-center justify-between border-t border-border/80 pt-3">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles size={13} className="text-ai" />
              <span>AI tahlil · 90 sekund</span>
            </span>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-80"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Tahlil qilinmoqda...</span>
                </>
              ) : analyzed ? (
                <>
                  <Check size={16} />
                  <span>Natijani ko&apos;rish</span>
                  <ArrowRight size={16} />
                </>
              ) : (
                <>
                  <span>Tahlil qilish</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
