"use client";

import { Building2, Globe } from "lucide-react";
import { ExportProject } from "../types";

interface MarketViewProps {
  selectedProject: ExportProject | null;
  handleSendMessage: (text: string) => void;
}

export function MarketView({ selectedProject, handleSendMessage }: MarketViewProps) {
  const analysis = selectedProject?.analysisResult;

  if (!selectedProject || !analysis) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-blue-500/10 mb-4">
            <Globe size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-extrabold">Bozor Tahlili</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            AI tahlilidan keyin bozor ma&apos;lumotlari ko&apos;rsatiladi
          </p>
          <button
            type="button"
            onClick={() => handleSendMessage("Mening mahsulotim uchun bozor tahlilini qiling")}
            className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-all hover:scale-105"
          >
            <span>AI dan bozor tahlili so&apos;rash</span>
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
            Bozor Tahlili &amp; Ma&apos;lumotlari
          </h2>
          <p className="text-xs text-muted-foreground">
            {selectedProject.destinationCountry} bozori uchun AI tahlili
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleSendMessage("Mening mahsulotim uchun bozor tahlilini qiling")}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-all active:scale-95"
        >
          <span>AI dan bozor tahlili so&apos;rash</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="grid size-10 place-items-center rounded-xl bg-blue-500/10">
            <Building2 size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Maqsadli Bozor</h3>
            <p className="text-xs text-muted-foreground">
              {selectedProject.destinationCountry}
              {selectedProject.destinationCity ? `, ${selectedProject.destinationCity}` : ""}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            <span className="font-bold text-foreground">HS-Code:</span> {analysis.hsCode} —{" "}
            {analysis.productDescription}
          </p>
          <p>
            <span className="font-bold text-foreground">Boj stavkasi:</span> {analysis.uzbGspDuty}%
            (GSP+ ariza: {analysis.gspPlusApplicable ? "Ha" : "Yo&apos;q"})
          </p>
          <p>
            <span className="font-bold text-foreground">Standart MFN stavka:</span>{" "}
            {analysis.euMfnDuty}%
          </p>
          <p>
            <span className="font-bold text-foreground">Logistika:</span> {analysis.logistics.route}{" "}
            — {analysis.logistics.transitDays} kun
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => handleSendMessage("Mening mahsulotim uchun bozor tahlilini qiling")}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-all hover:scale-105"
        >
          <span>AI dan bozor tahlili so&apos;rash</span>
        </button>
      </div>
    </div>
  );
}
