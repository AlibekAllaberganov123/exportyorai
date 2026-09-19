import { ArrowRight, CheckCircle2, Mail, MapPin, Send, Sparkles } from "lucide-react";

import { SITE } from "@/lib/landing";

interface CtaBannerProps {
  onOpenLogin?: () => void;
}

export function CtaBanner({ onOpenLogin }: CtaBannerProps) {
  return (
    <section id="cta" className="mt-28 scroll-mt-20">
      <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-center text-navy-foreground shadow-2xl md:p-14">
        {/* Ambient background glow inside card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-ai/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-primary/20 blur-3xl"
        />

        <div className="relative z-10">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
            <Sparkles size={14} className="text-sky-accent" />
            <span>Kafolatlangan tezlik va aniqlik</span>
          </div>

          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Birinchi eksportingizni bugun rejalashtiring
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-navy-foreground/80 sm:text-base">
            Hech qanday to&apos;lov talab qilinmaydi. Dastlabki 3 ta to&apos;liq eksport tahlili va
            barcha xalqaro PDF hujjatlarni bepul oling.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onOpenLogin}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98] sm:w-auto cursor-pointer"
            >
              <span>Hoziroq bepul boshlang</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Reassurance points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-navy-foreground/75">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>Kredit karta shart emas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>3 ta bepul to&apos;liq tahlil</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>90 sekundda rasmiy PDF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/80 bg-card/50 pt-16 pb-12 text-sm text-muted-foreground backdrop-blur-xs">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-extrabold tracking-tight text-foreground">
              <span className="grid size-6 place-items-center rounded-full bg-ai text-ai-foreground">
                <Sparkles size={13} />
              </span>
              <span>{SITE.name}</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              O&apos;zbekiston eksportchilari uchun rasmiy bojxona stavkalari, GSP+ imtiyozlari va
              logistikani avtomatlashtiruvchi sun&apos;iy intellekt platformasi.
            </p>
            <div className="pt-2 text-xs font-medium text-foreground flex items-center gap-1.5">
              <MapPin size={13} className="text-primary" />
              <span>Toshkent shahri, O&apos;zbekiston</span>
            </div>
          </div>

          {/* Col 2: Imkoniyatlar */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Imkoniyatlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="transition-colors hover:text-foreground">
                  HS-Code intellektual qidiruvi
                </a>
              </li>
              <li>
                <a href="#features" className="transition-colors hover:text-foreground">
                  EI GSP+ 0% boj hisoblash
                </a>
              </li>
              <li>
                <a href="#preview" className="transition-colors hover:text-foreground">
                  Multimodal logistika kalkulyatori
                </a>
              </li>
              <li>
                <a href="#features" className="transition-colors hover:text-foreground">
                  Xalqaro shartnoma &amp; Invoys generatsiyasi
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Rasmiy Manbalar */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Rasmiy Manbalar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-foreground">
                  O&apos;zbekiston Bojxona Qo&apos;mitasi
                </span>
              </li>
              <li>
                <span className="hover:text-foreground">EU TARIC Database</span>
              </li>
              <li>
                <span className="hover:text-foreground">ITC MacMap / UN Comtrade</span>
              </li>
              <li>
                <span className="hover:text-foreground">
                  O&apos;zbekiston Savdo-sanoat palatasi
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Bog'lanish */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Bog&apos;lanish
            </h4>
            <p className="text-xs text-muted-foreground">
              Savol yoki takliflaringiz bo&apos;lsa, biz bilan bog&apos;laning:
            </p>
            <div className="space-y-1.5 text-xs font-medium text-foreground">
              <div className="flex items-center gap-1.5">
                <Mail size={13} className="text-primary" />
                <span>info@exportyor.ai</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Send size={13} className="text-primary" />
                <span>@exportyor_ai (Telegram)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-border/60 pt-6 text-xs sm:flex-row">
          <p>© 2026 ExportYor.AI. Barcha huquqlar himoyalangan.</p>
          <div className="mt-2 flex gap-4 sm:mt-0">
            <a href="#faq" className="hover:text-foreground">
              Xavfsizlik
            </a>
            <a href="#faq" className="hover:text-foreground">
              Maxfiylik siyosati
            </a>
            <a href="#faq" className="hover:text-foreground">
              Foydalanish shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
