"use client";

import Link from "next/link";
import { Download, ExternalLink, FileText } from "lucide-react";
import { ExportProject, CompanySettings } from "../types";

interface DocumentsViewProps {
  selectedProject: ExportProject | null;
  companySettings: CompanySettings;
}

export function DocumentsView({ selectedProject, companySettings }: DocumentsViewProps) {
  const analysis = selectedProject?.analysisResult;

  if (!analysis) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-blue-500/10 mb-4">
            <FileText size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-extrabold">Hujjatlar Markazi</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            AI tahlilidan keyin hujjatlar generatsiya qilinadi
          </p>
        </div>
      </div>
    );
  }

  const statusConfig = {
    required: { label: "Kerak", className: "bg-red-500/10 text-red-600" },
    in_progress: { label: "Tayyorlanmoqda", className: "bg-yellow-500/10 text-yellow-600" },
    ready: { label: "Tayyor", className: "bg-emerald-500/10 text-emerald-600" },
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">Hujjatlar Markazi</h2>
          <p className="text-xs text-muted-foreground">
            AI tomonidan generatsiya qilingan eksport hujjatlari
          </p>
        </div>
        <Link
          href="/documents"
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-xs"
        >
          <span>To&apos;liq Hujjatlarga O&apos;tish</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      <div className="max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
        <h3 className="text-sm font-bold mb-2">Korxona Rekvizitlari</h3>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <span className="font-bold text-foreground">Nomi:</span> {companySettings.name}
          </p>
          <p>
            <span className="font-bold text-foreground">Manzil:</span> {companySettings.address}
          </p>
          <p>
            <span className="font-bold text-foreground">STIR:</span> {companySettings.inn}
          </p>
          <p>
            <span className="font-bold text-foreground">Telefon:</span> {companySettings.phone}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {analysis.documents.map((doc) => {
          const status = statusConfig[doc.status];
          return (
            <div
              key={doc.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">{doc.nameEn}</span>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${status.className}`}>
                    {status.label}
                  </span>
                </div>
                <h3 className="text-base font-extrabold mt-2">{doc.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Taxminiy muddat: {doc.estimatedDays}
                </span>
                <Link
                  href="/documents"
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                >
                  <Download size={13} />
                  <span>Ko&apos;rish</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
