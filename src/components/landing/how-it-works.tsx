import { Clock, Cpu, FileDown } from "lucide-react";

import { STEPS } from "@/lib/landing";

const STEP_ICONS = [Clock, Cpu, FileDown];

export function HowItWorks() {
  return (
    <section id="steps" className="mt-28 scroll-mt-20">
      <div className="text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <span>Oddiy va tushunarli</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Eksport qilish bor-yo&apos;g&apos;i 3 ta qadam
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Oylik konsalting va haftalab kutish shart emas. Tizim butun jarayonni 3 qadamda amalga
          oshiradi.
        </p>
      </div>

      <div className="relative mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => {
          const StepIcon = STEP_ICONS[index] || Clock;
          return (
            <div
              key={step.title}
              className="relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-ai text-base font-extrabold text-ai-foreground shadow-sm ring-4 ring-ai/10">
                    {step.number}
                  </span>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-1 text-[11px] font-bold text-primary">
                    {step.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-border/60 bg-secondary/40 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                  <StepIcon size={13} className="text-primary" />
                  <span>Amaliy namuna:</span>
                </div>
                <p className="mt-1 text-xs font-medium text-foreground">{step.sample}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
