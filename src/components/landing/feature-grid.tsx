import { Bot, FileText, Percent, Search, TrendingUp, Truck } from "lucide-react";

import { FEATURES } from "@/lib/landing";

const ICON_MAP = {
  Search,
  Percent,
  Truck,
  FileText,
  TrendingUp,
  Bot,
};

export function FeatureGrid() {
  return (
    <section id="features" className="mt-24 scroll-mt-20">
      <div className="text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <span>Platforma imkoniyatlari</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Barcha eksport jarayonlari bitta oynada
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          O&apos;zbekiston mahsulotlarini jahon bozorlariga olib chiqish uchun kerak bo&apos;ladigan
          har bir bosqichni AI vositalari bilan avtomatlashtirdik.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const IconComponent = ICON_MAP[feature.iconName as keyof typeof ICON_MAP] || Search;
          return (
            <div
              key={feature.title}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground shadow-2xs">
                    <IconComponent size={22} strokeWidth={2.2} />
                  </span>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-1 text-[11px] font-bold text-muted-foreground group-hover:text-foreground">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-foreground sm:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {feature.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border/40 text-[11px] font-semibold text-primary/80 group-hover:text-primary flex items-center gap-1">
                <span>Avtomatlashtirilgan jarayon</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
