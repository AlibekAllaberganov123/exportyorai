"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

import { FAQ_ITEMS } from "@/lib/landing";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="mt-28 scroll-mt-20">
      <div className="text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <HelpCircle size={13} />
          <span>Ko&apos;p beriladigan savollar</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Savollaringiz bormi?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Eksport jarayoni, bojxona to&apos;lovlari va AI hisob-kitoblari bo&apos;yicha eng
          ko&apos;p so&apos;ralgan savollarga javoblar.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-border/80 bg-card transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-foreground transition-colors hover:bg-secondary/40 sm:text-base"
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-border/60 bg-secondary/20 p-5 pt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
