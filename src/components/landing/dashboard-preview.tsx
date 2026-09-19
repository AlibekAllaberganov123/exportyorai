"use client";

import {
  Check,
  CheckCircle2,
  Circle,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Lock,
  Plane,
  RefreshCw,
  Search,
  Ship,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { ROUTE_CHECKLIST, SIDEBAR_ITEMS, SITE } from "@/lib/landing";

type TransportMode = "avto" | "havo" | "dengiz";

interface TransportDetail {
  id: TransportMode;
  icon: typeof Truck;
  label: string;
  value: string;
  duration: string;
  totalCost: string;
  routeDesc: string;
}

const TRANSPORTS: TransportDetail[] = [
  {
    id: "avto",
    icon: Truck,
    label: "Avto (TIR)",
    value: "$0.42",
    duration: "9 kun",
    totalCost: "$1.87/kg",
    routeDesc: "Toshkent → Aktau → Varshava (TIR)",
  },
  {
    id: "havo",
    icon: Plane,
    label: "Havo (Avia)",
    value: "$2.10",
    duration: "2 kun",
    totalCost: "$3.55/kg",
    routeDesc: "TAS → WAW to'g'ridan-to'g'ri reys",
  },
  {
    id: "dengiz",
    icon: Ship,
    label: "Multimodal",
    value: "$0.31",
    duration: "24 kun",
    totalCost: "$1.76/kg",
    routeDesc: "Temiryo'l + Kaspiy + Boltiq dengizi",
  },
];

export function DashboardPreview() {
  const [selectedTransport, setSelectedTransport] = useState<TransportMode>("avto");
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [checklist, setChecklist] = useState<boolean[]>([true, true, true, false]);
  const [activeSidebarIndex, setActiveSidebarIndex] = useState(1);

  const activeTransport = TRANSPORTS.find((t) => t.id === selectedTransport) || TRANSPORTS[0];

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 900);
  };

  const toggleChecklist = (index: number) => {
    setChecklist((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <section id="preview" className="relative mx-auto mt-16 max-w-5xl scroll-mt-24">
      {/* Hand drawn note */}
      <span className="font-hand absolute -right-4 top-14 hidden rotate-6 text-2xl text-primary xl:-right-36 xl:block">
        Natijani ko&apos;ring →
        <svg
          width="80"
          height="50"
          viewBox="0 0 80 50"
          fill="none"
          className="absolute -left-14 top-8 text-primary"
          aria-hidden="true"
        >
          <path
            d="M76 6 C 60 30, 35 42, 6 34"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 28 L 6 34 L 14 42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Browser Window Mockup */}
      <div className="shadow-float overflow-hidden rounded-2xl border border-border/80 bg-card transition-all">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between border-b border-border/70 bg-secondary/70 px-4 py-2.5 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-destructive/70 transition-transform hover:scale-110" />
            <span className="size-3 rounded-full bg-chart-4 transition-transform hover:scale-110" />
            <span className="size-3 rounded-full bg-emerald-500/80 transition-transform hover:scale-110" />
          </div>

          <div className="flex w-full max-w-md items-center justify-center gap-1.5 rounded-md border border-border/60 bg-card/90 px-3 py-1 text-center text-xs text-muted-foreground shadow-2xs">
            <Lock size={11} className="text-emerald-500" />
            <span className="font-mono text-[11px]">
              https://app.exportyor.ai/analysis/xurmo-polsha
            </span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <RefreshCw size={13} className="cursor-pointer hover:text-foreground" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid md:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="hidden border-r border-border/80 bg-secondary/30 p-4 md:block">
            <div className="mb-5 flex items-center gap-2 text-sm font-extrabold tracking-tight text-foreground">
              <span className="grid size-6 place-items-center rounded-full bg-ai text-ai-foreground shadow-2xs">
                <Sparkles size={12} />
              </span>
              <span>{SITE.name}</span>
            </div>

            <nav className="space-y-1">
              {SIDEBAR_ITEMS.map((item, index) => {
                const isActive = activeSidebarIndex === index;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveSidebarIndex(index)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-card text-primary shadow-xs ring-1 ring-border/80"
                        : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                          isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-3 text-[11px]">
              <p className="font-bold text-primary">GSP+ Qo&apos;llanmasi</p>
              <p className="mt-1 text-muted-foreground">
                EI mamlakatlariga 0% stavkada eksport qilish bo&apos;yicha video darslik.
              </p>
            </div>
          </aside>

          {/* Main Workspace */}
          <div className="p-5 text-left md:p-6">
            {/* Header of analysis */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Tahlil natijasi #EX-8902
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                    Tasdiqlangan
                  </span>
                </div>
                <h3 className="mt-0.5 text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                  5 tonna xurmo → Polsha 🇵🇱
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ai/10 px-3 py-1 text-xs font-bold text-ai">
                  <Sparkles size={13} />
                  AI tayyorladi · 84s
                </span>
              </div>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Card 1: HS-Code */}
              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs transition-all hover:border-primary/40">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Search size={14} className="text-primary" />
                    <span>HS-Code tahlili</span>
                  </div>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    99.4% ishonchli
                  </span>
                </div>
                <p className="text-2xl font-extrabold tracking-tight text-foreground">0804.10.00</p>
                <p className="text-xs text-muted-foreground">
                  Xurmo, yangi yoki quritilgan (Persimmons)
                </p>
                <div className="mt-3.5 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-border/40 pb-1">
                    <span className="text-muted-foreground">EU standart import boji</span>
                    <span className="font-semibold line-through text-muted-foreground">7.7%</span>
                  </div>
                  <div className="flex justify-between border-b border-border/40 pb-1">
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      GSP+ imtiyozi (O&apos;zbekiston)
                    </span>
                    <span className="rounded-sm bg-emerald-500/15 px-1.5 py-0.2 font-extrabold text-emerald-600">
                      0% (Boj yo&apos;q)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">QQS (Polsha bo&apos;yicha)</span>
                    <span className="font-semibold text-foreground">5%</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Checklist */}
              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs transition-all hover:border-primary/40">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <FileCheck2 size={14} className="text-primary" />
                    <span>Marshrut &amp; Hujjat cheklisti</span>
                  </div>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {checklist.filter(Boolean).length}/{checklist.length} tayyor
                  </span>
                </div>
                <ul className="mt-2 space-y-2 text-xs">
                  {ROUTE_CHECKLIST.map((item, index) => {
                    const isChecked = checklist[index];
                    return (
                      <li
                        key={item.title}
                        onClick={() => toggleChecklist(index)}
                        className="group flex cursor-pointer items-center justify-between rounded-md p-1 transition-colors hover:bg-secondary/60"
                      >
                        <div className="flex items-center gap-2">
                          {isChecked ? (
                            <CheckCircle2 size={15} className="text-primary shrink-0" />
                          ) : (
                            <Circle size={15} className="text-border shrink-0" />
                          )}
                          <span
                            className={`transition-all ${
                              isChecked ? "text-foreground font-medium" : "text-muted-foreground"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground group-hover:text-foreground">
                          {item.time}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Card 3: Interactive Unit Economics */}
              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs transition-all hover:border-primary/40">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Zap size={14} className="text-primary" />
                    <span>Unit Economics ($/kg)</span>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    variantni tanlang:
                  </span>
                </div>

                {/* Transport Options Buttons */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  {TRANSPORTS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedTransport === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedTransport(option.id)}
                        className={`group relative rounded-lg p-2 transition-all ${
                          isSelected
                            ? "bg-primary/10 ring-2 ring-primary text-foreground font-bold shadow-xs"
                            : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <Icon
                          size={14}
                          className={`mx-auto mb-1 transition-colors ${
                            isSelected ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <p className="font-extrabold text-foreground">{option.value}</p>
                        <p className="text-[10px]">{option.label}</p>
                        <p className="text-[9px] text-muted-foreground font-normal">
                          {option.duration}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-end justify-between border-t border-border/50 pt-2.5">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Jami yetkazib berish tannarxi:
                    </span>
                    <p className="text-[11px] text-muted-foreground font-medium">
                      {activeTransport.routeDesc}
                    </p>
                  </div>
                  <span className="text-gradient-ai text-xl font-extrabold tracking-tight">
                    {activeTransport.totalCost}
                  </span>
                </div>
              </div>

              {/* Card 4: Ready Documents */}
              <div className="flex flex-col justify-between rounded-xl border border-navy/20 bg-navy p-4 text-navy-foreground shadow-md">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-accent">
                      <FileText size={14} />
                      <span>Tayyor hujjatlar to&apos;plami</span>
                    </div>
                    <span className="rounded-full bg-sky-accent/20 px-2 py-0.5 text-[10px] font-semibold text-sky-accent">
                      3 ta fayl
                    </span>
                  </div>

                  <ul className="mt-2 space-y-1.5 text-xs text-navy-foreground/90">
                    <li className="flex items-center gap-1.5">
                      <FileSpreadsheet size={13} className="text-sky-accent shrink-0" />
                      <span>Eksport shartnomasi (UZ / EN andoza)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <FileText size={13} className="text-sky-accent shrink-0" />
                      <span>Commercial Invoice (Xalqaro standart)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <FileCheck2 size={13} className="text-sky-accent shrink-0" />
                      <span>Packing List &amp; Yuk xati</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-75"
                >
                  {downloading ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>PDF shakllanmoqda...</span>
                    </>
                  ) : downloaded ? (
                    <>
                      <Check size={14} />
                      <span>Yuklab olindi! (2.4 MB)</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>PDF paketni yuklab olish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
