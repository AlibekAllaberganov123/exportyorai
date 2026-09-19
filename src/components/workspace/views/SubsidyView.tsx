"use client";

import { ShieldCheck, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { ExportProject } from "../types";

interface SubsidyViewProps {
  selectedProject: ExportProject | null;
}

export function SubsidyView({ selectedProject }: SubsidyViewProps) {
  const analysis = selectedProject?.analysisResult;

  if (!analysis) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-blue-500/10 mb-4">
            <ShieldCheck size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-extrabold">Subsidiyalar & Risklar</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            AI tahlilidan keyin subsidiya va risk ma&apos;lumotlari ko&apos;rsatiladi
          </p>
        </div>
      </div>
    );
  }

  const eligibilityConfig = {
    eligible: {
      label: "Mos keladi",
      icon: CheckCircle2,
      className: "bg-emerald-500/10 text-emerald-600",
    },
    maybe: {
      label: "Tekshirish kerak",
      icon: AlertCircle,
      className: "bg-yellow-500/10 text-yellow-600",
    },
    not_eligible: { label: "Mos kelmaydi", icon: XCircle, className: "bg-red-500/10 text-red-600" },
  };

  const severityConfig = {
    low: { label: "Past", className: "bg-emerald-500/10 text-emerald-600" },
    medium: { label: "O&apos;rta", className: "bg-yellow-500/10 text-yellow-600" },
    high: { label: "Yuqori", className: "bg-red-500/10 text-red-600" },
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">Subsidiyalar & Risklar</h2>
        <p className="text-xs text-muted-foreground">
          Davlat subsidiyalari va eksport risklari tahlili
        </p>
      </div>

      {/* Subsidies Section */}
      <div>
        <h3 className="text-sm font-bold mb-3">Davlat Subsidiyalari</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {analysis.subsidies.map((subsidy) => {
            const eligibility = eligibilityConfig[subsidy.eligibility];
            const EligibilityIcon = eligibility.icon;
            return (
              <div
                key={subsidy.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold">{subsidy.name}</h4>
                  <span
                    className={`flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold ${eligibility.className}`}
                  >
                    <EligibilityIcon size={12} />
                    {eligibility.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{subsidy.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-2">
                    <span className="text-muted-foreground">Qoplash:</span>
                    <span className="ml-1 font-bold">{subsidy.coveragePercent}%</span>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-2">
                    <span className="text-muted-foreground">Tejash:</span>
                    <span className="ml-1 font-bold">
                      ${subsidy.estimatedSaving.toLocaleString()}
                    </span>
                  </div>
                </div>
                {subsidy.requirements.length > 0 && (
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] font-bold text-muted-foreground mb-1">Talablar:</p>
                    <ul className="text-[11px] text-muted-foreground space-y-0.5">
                      {subsidy.requirements.map((req, i) => (
                        <li key={i}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Risks Section */}
      <div>
        <h3 className="text-sm font-bold mb-3">Risklar Tahlili</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {analysis.risks.map((risk) => {
            const severity = severityConfig[risk.severity];
            return (
              <div
                key={risk.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">
                    {risk.category}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${severity.className}`}
                  >
                    {severity.label}
                  </span>
                </div>
                <h4 className="text-sm font-bold mb-1">{risk.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{risk.description}</p>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">Oldini olish:</p>
                  <p className="text-[11px] text-muted-foreground">{risk.mitigation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
