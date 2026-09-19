import { BadgeCheck, Star } from "lucide-react";

import { AVATARS, SOURCES, STATS } from "@/lib/landing";

export function SocialProof() {
  return (
    <div id="sources" className="mt-12 space-y-8">
      {/* Exporter rating & social proof */}
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <div className="flex -space-x-2">
          {AVATARS.map((avatar) => (
            <span
              key={avatar.name}
              title={`${avatar.name} (${avatar.role})`}
              className={`grid size-9 place-items-center rounded-full ${avatar.hue} text-xs font-bold text-primary-foreground ring-2 ring-background shadow-xs transition-transform hover:-translate-y-0.5 hover:z-10`}
            >
              {avatar.name[0]}
            </span>
          ))}
        </div>
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center gap-1 sm:justify-start">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-1 text-xs font-bold text-foreground">4.9 / 5.0</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
            <span className="font-bold text-foreground">1,200+</span> eksportchi va logistika
            mutaxassislari ishonchi
          </p>
        </div>
      </div>

      {/* Official Integrations with Live Status */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {SOURCES.map((source) => (
          <div
            key={source.name}
            className="group flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <BadgeCheck size={15} className="text-sky-accent" />
            <span>{source.name}</span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {source.status}
            </span>
          </div>
        ))}
      </div>

      {/* Key Metrics Strip */}
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/70 bg-card/60 p-3.5 text-center shadow-xs backdrop-blur-xs transition-all hover:border-primary/30"
          >
            <div className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {stat.value}
            </div>
            <div className="mt-0.5 text-xs font-bold text-foreground">{stat.label}</div>
            <div className="text-[11px] text-muted-foreground">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
