import {
  Check,
  CheckCircle2,
  Clock,
  DollarSign,
  FileCheck,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";

import { COMPARISON_DATA, TESTIMONIALS } from "@/lib/landing";

export function ComparisonSection() {
  const rows = [
    {
      label: "Tahlil tezligi",
      trad: COMPARISON_DATA.traditional.time,
      exportyor: COMPARISON_DATA.exportyor.time,
      icon: Clock,
    },
    {
      label: "Narxi / Xarajati",
      trad: COMPARISON_DATA.traditional.cost,
      exportyor: COMPARISON_DATA.exportyor.cost,
      icon: DollarSign,
    },
    {
      label: "Ma'lumotlar aniqligi",
      trad: COMPARISON_DATA.traditional.accuracy,
      exportyor: COMPARISON_DATA.exportyor.accuracy,
      icon: FileCheck,
    },
    {
      label: "Eksport hujjatlari",
      trad: COMPARISON_DATA.traditional.documents,
      exportyor: COMPARISON_DATA.exportyor.documents,
      icon: Sparkles,
    },
    {
      label: "Ish tartibi",
      trad: COMPARISON_DATA.traditional.availability,
      exportyor: COMPARISON_DATA.exportyor.availability,
      icon: Clock,
    },
  ];

  return (
    <section id="comparison" className="mt-28 scroll-mt-20">
      <div className="text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <span>Natijadorlik taqqoslovi</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Nega aynan ExportYor.AI?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Eski usulda haftalab kutish va katta xarajatlar o&apos;rniga zamonaviy avtomatlashtirishni
          tanlang.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Traditional Card */}
        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Eski usul
              </span>
              <h3 className="mt-1 text-lg font-bold text-foreground">
                An&apos;anaviy broker &amp; konsalting
              </h3>
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-destructive/10 text-destructive">
              <XCircle size={20} />
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-start gap-3 rounded-xl bg-secondary/30 p-3"
              >
                <X size={16} className="mt-0.5 text-destructive shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-muted-foreground">{row.label}</div>
                  <div className="text-xs font-medium text-foreground sm:text-sm">{row.trad}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ExportYor.AI Card */}
        <div className="relative rounded-2xl border-2 border-primary/60 bg-card p-6 shadow-xl ring-4 ring-primary/5 sm:p-8">
          <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-[11px] font-extrabold text-primary-foreground shadow-sm">
            Tavsiya etiladi · 10x Tejamkor
          </div>

          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Zamonaviy yechim
              </span>
              <h3 className="mt-1 text-lg font-extrabold text-foreground">
                ExportYor.AI platformasi
              </h3>
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 size={20} />
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-start gap-3 rounded-xl bg-primary/5 p-3 ring-1 ring-primary/15"
              >
                <Check size={16} className="mt-0.5 text-primary shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-primary">{row.label}</div>
                  <div className="text-xs font-bold text-foreground sm:text-sm">
                    {row.exportyor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials snippet */}
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.author}
            className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400">
                  ★
                </span>
              ))}
              <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                {item.badge}
              </span>
            </div>
            <p className="mt-3 text-xs italic leading-relaxed text-foreground sm:text-sm">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="mt-4 pt-3 border-t border-border/50">
              <div className="text-xs font-bold text-foreground">{item.author}</div>
              <div className="text-[11px] text-muted-foreground">{item.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
