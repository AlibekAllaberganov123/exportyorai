"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CompanySettings } from "../types";

interface SettingsViewProps {
  companySettings: CompanySettings;
  setCompanySettings: (settings: CompanySettings) => void;
}

export function SettingsView({ companySettings, setCompanySettings }: SettingsViewProps) {
  const [form, setForm] = useState<CompanySettings>(companySettings);

  const update = (key: keyof CompanySettings) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    setCompanySettings(form);
    toast.success("Rekvizitlar saqlandi ✓");
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
          Tizim Sozlamalari &amp; Korxona Rekvizitlari
        </h2>
        <p className="text-xs text-muted-foreground">Korxona rekvizitlarini boshqaring</p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 text-xs">
        <div>
          <label className="font-bold block mb-1">Eksportchi korxona nomi</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name")(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 font-semibold outline-none focus:border-blue-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold block mb-1">STIR / INN</label>
            <input
              type="text"
              value={form.inn}
              onChange={(e) => update("inn")(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 font-semibold outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="font-bold block mb-1">Aloqa telefoni</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => update("phone")(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 font-semibold outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="font-bold block mb-1">Manzil</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => update("address")(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 font-semibold outline-none focus:border-blue-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold block mb-1">Email</label>
            <input
              type="email"
              value={form.email ?? ""}
              onChange={(e) => update("email")(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 font-semibold outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="font-bold block mb-1">Website</label>
            <input
              type="text"
              value={form.website ?? ""}
              onChange={(e) => update("website")(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 font-semibold outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-xs active:scale-95"
          >
            O&apos;zgarishlarni saqlash
          </button>
        </div>
      </div>
    </div>
  );
}
