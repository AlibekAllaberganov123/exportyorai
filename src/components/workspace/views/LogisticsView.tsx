"use client";

import { LogisticsInput, LogisticsResult } from "../types";

interface LogisticsViewProps {
  logisticsInput: LogisticsInput;
  setLogisticsInput: (input: LogisticsInput) => void;
  calculateLogistics: (input: LogisticsInput) => LogisticsResult;
}

const COUNTRIES = [
  { value: "Polsha", label: "Polsha (Polsha) — 🇵🇱" },
  { value: "Germaniya", label: "Germaniya (Berlin) — 🇩🇪" },
  { value: "BAA", label: "BAA (Dubay) — 🇦🇪" },
  { value: "Turkiya", label: "Turkiya (Stanbul) — 🇹🇷" },
  { value: "Rossiya", label: "Rossiya (Moskva) — 🇷🇺" },
];

const TRANSPORT_BUTTONS: { type: LogisticsInput["transportType"]; label: string }[] = [
  { type: "auto", label: "Avto" },
  { type: "air", label: "Avia" },
  { type: "rail", label: "Temiryo'l" },
  { type: "sea", label: "Dengiz" },
];

export function LogisticsView({
  logisticsInput,
  setLogisticsInput,
  calculateLogistics,
}: LogisticsViewProps) {
  const result = calculateLogistics(logisticsInput);

  const update = <K extends keyof LogisticsInput>(key: K, value: LogisticsInput[K]) => {
    setLogisticsInput({ ...logisticsInput, [key]: value });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
          Multimodal Logistika Kalkulyatori
        </h2>
        <p className="text-xs text-muted-foreground">
          Toshkentdan Yevropa va Osiyo bozorlariga 1 kg mahsulot yetkazib berish narxini aniq
          hisoblang
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {/* Input Form — Left Panel */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Parametrlarni Kiritish
          </h3>

          <div>
            <label className="text-xs font-bold block mb-1">Manba shahri</label>
            <input
              type="text"
              value={logisticsInput.originCity}
              onChange={(e) => update("originCity", e.target.value)}
              placeholder="Toshkent"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-bold outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Boradgan davlat</label>
            <select
              value={logisticsInput.destinationCountry}
              onChange={(e) => update("destinationCountry", e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-bold outline-none focus:border-blue-600"
            >
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Boradgan shahri</label>
            <input
              type="text"
              value={logisticsInput.destinationCity}
              onChange={(e) => update("destinationCity", e.target.value)}
              placeholder="Shahar kiriting"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-bold outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Yuk hajmi (kg)</label>
            <input
              type="number"
              value={logisticsInput.weightKg}
              onChange={(e) => update("weightKg", parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-bold outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Transport turi</label>
            <div className="grid grid-cols-2 gap-2">
              {TRANSPORT_BUTTONS.map(({ type, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("transportType", type)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    logisticsInput.transportType === type
                      ? "border-blue-600 bg-blue-500/10 text-blue-600"
                      : "border-slate-200 dark:border-slate-800 text-muted-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="temperature-toggle"
              checked={logisticsInput.temperatureRequired}
              onChange={(e) => update("temperatureRequired", e.target.checked)}
              className="h-4 w-4 rounded border-slate-200 dark:border-slate-800 text-blue-600 focus:ring-blue-600"
            />
            <label htmlFor="temperature-toggle" className="text-xs font-bold">
              Harorat talab qilinadi
            </label>
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Mahsulot turi</label>
            <input
              type="text"
              value={logisticsInput.productType}
              onChange={(e) => update("productType", e.target.value)}
              placeholder="Masalan: Quruq mevalar"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-bold outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Result Card — Right Panel */}
        <div className="sm:col-span-2 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 flex flex-col justify-between">
          <div>
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-extrabold text-white">
              Hisoblangan Natija
            </span>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-blue-600">
                ${result.costPerKg.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-muted-foreground">
                / 1 kg transport xarajati
              </span>
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              Jami yuk partiyasi ({logisticsInput.weightKg.toLocaleString()} kg) uchun:{" "}
              <strong className="text-foreground text-sm">
                ${result.totalCost.toLocaleString()} USD
              </strong>
            </p>
          </div>

          <div className="mt-6 border-t border-blue-500/20 pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground block">Tranzit muddati:</span>
              <span className="font-bold text-foreground">{result.transitDays}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Marshrut:</span>
              <span className="font-bold text-foreground">{result.route}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Sug&apos;urta:</span>
              <span className="font-bold text-foreground">
                ${result.insurance.toLocaleString()}
              </span>
            </div>
            {result.temperature && (
              <div>
                <span className="text-muted-foreground block">Harorat rejimi:</span>
                <span className="font-bold text-foreground">{result.temperature}</span>
              </div>
            )}
          </div>

          {result.notes.length > 0 && (
            <div className="mt-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Eslatmalar
              </span>
              <ul className="space-y-1">
                {result.notes.map((note, i) => (
                  <li key={i} className="text-xs text-muted-foreground">
                    • {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
