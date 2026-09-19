"use client";

import { Truck, FileCheck2, Bot, Package } from "lucide-react";
import { ExportProject, LogisticsInput, LogisticsResult, ActiveView } from "../types";

interface OverviewViewProps {
  selectedProject: ExportProject | null;
  logisticsInput: LogisticsInput;
  setLogisticsInput: (input: LogisticsInput) => void;
  calculateLogistics: (input: LogisticsInput) => LogisticsResult;
  toggleRoadmap: (id: number) => void;
  setActiveView: (view: ActiveView) => void;
}

export function OverviewView({
  selectedProject,
  logisticsInput,
  setLogisticsInput,
  calculateLogistics,
  toggleRoadmap,
  setActiveView,
}: OverviewViewProps) {
  const analysis = selectedProject?.analysisResult;
  const logistics = calculateLogistics(logisticsInput);

  if (!selectedProject) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-blue-500/10 mb-4">
            <Package size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-extrabold">Loyiha tanlanmagan</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            Yangi eksport loyihasi yarating yoki mavjudini tanlang. AI sizga HS-Code, boj stavkasi
            va logistika hisobini tuzib beradi.
          </p>
          <button
            type="button"
            onClick={() => setActiveView("chat")}
            className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-all hover:scale-105"
          >
            <Bot size={16} />
            <span>AI Konsultant bilan boshlash</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
            {selectedProject.name}
          </h2>
          <p className="text-xs text-muted-foreground">
            {analysis
              ? `AI tahlili tayyor · ${analysis.model} · ${new Date(analysis.analyzedAt).toLocaleString("uz-UZ")}`
              : "AI tahlili hali o'tkazilmagan — Chat bo'limiga o'ting"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActiveView("chat")}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-all active:scale-95"
        >
          <Bot size={14} />
          <span>{analysis ? "Qayta tahlil qilish" : "AI Konsultant"}</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>HS-Code (TIF TN)</span>
            {analysis && (
              <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
                MacMap
              </span>
            )}
          </div>
          <div className="mt-2 text-2xl font-extrabold text-foreground">
            {analysis ? analysis.hsCode : "—"}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {analysis ? analysis.productDescription : "AI tahlili kutilmoqda"}
          </p>
        </div>

        <div
          className={`rounded-2xl border p-4 shadow-xs ${
            analysis?.gspPlusApplicable
              ? "border-emerald-500/30 bg-emerald-500/5 ring-1 ring-emerald-500/20"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold">
            <span
              className={analysis?.gspPlusApplicable ? "text-emerald-600" : "text-muted-foreground"}
            >
              EI Boj Stavkasi
            </span>
            {analysis?.gspPlusApplicable && (
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.2 text-[10px] font-bold text-emerald-600">
                GSP+ Faol
              </span>
            )}
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-600">
            {analysis ? `${analysis.uzbGspDuty}%` : "—"}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {analysis ? `Standart: ${analysis.euMfnDuty}% MFN` : "Kutilmoqda"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>Yetkazish Tannarxi</span>
            <span className="text-[10px] font-bold text-foreground">
              {logistics.route.split("→")[1]?.trim() || "Maqsad"}
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-blue-600">
            ${logistics.costPerKg.toFixed(2)} / kg
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Jami: ${logistics.totalCost.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>Tranzit muddati</span>
            <span className="text-[10px] font-bold text-foreground">
              {logistics.transportType === "auto" ? "Avto" : "Avia"}
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-foreground">
            {logistics.transitDays} kun
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{logistics.route}</p>
        </div>
      </div>

      {/* Logistics & Roadmap */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Logistics Calculator */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Truck size={16} className="text-blue-600" />
              <span>Logistika Hisobi</span>
            </h3>
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
              {(["auto", "air"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLogisticsInput({ ...logisticsInput, transportType: t })}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    logisticsInput.transportType === t
                      ? "bg-white dark:bg-slate-700 text-blue-600 shadow-xs"
                      : "text-muted-foreground"
                  }`}
                >
                  {t === "auto" ? "Avto" : "Avia"}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div>
                <span className="font-bold text-foreground">{logistics.route}</span>
                <p className="text-muted-foreground mt-0.5">
                  {logistics.transitDays} kun · {logisticsInput.weightKg.toLocaleString()} kg
                </p>
              </div>
              <span className="font-extrabold text-blue-600 text-sm">
                ${logistics.totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <FileCheck2 size={16} className="text-blue-600" />
              <span>Eksport Yo&apos;l Xaritasi</span>
            </h3>
            {analysis && (
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${(analysis.roadmap.filter((r) => r.done).length / analysis.roadmap.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-blue-600">
                  {analysis.roadmap.filter((r) => r.done).length}/{analysis.roadmap.length}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2 text-xs">
            {analysis ? (
              analysis.roadmap.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleRoadmap(item.id)}
                  className={`flex cursor-pointer items-center justify-between p-3 rounded-xl border transition-all ${
                    item.done
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.done ? (
                      <div className="grid size-4 place-items-center rounded-full bg-emerald-500 text-white">
                        <svg
                          className="size-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-300" />
                    )}
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[11px] font-bold text-muted-foreground">{item.time}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                AI tahlili o&apos;tkazilgandan keyin yo&apos;l xaritasi ko&apos;rsatiladi
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
