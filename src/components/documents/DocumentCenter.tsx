"use client";

import {
  ArrowLeft,
  Building2,
  Check,
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
  Globe,
  Package,
  Printer,
  Save,
  Truck,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  // Seller
  sellerName: string;
  sellerAddress: string;
  sellerInn: string;
  sellerBank: string;
  sellerIban: string;
  sellerSwift: string;
  // Buyer
  buyerName: string;
  buyerAddress: string;
  buyerVat: string;
  buyerBank: string;
  buyerIban: string;
  // Product
  productName: string;
  productDescription: string;
  hsCode: string;
  quantityKg: number;
  unitPriceUsd: number;
  packageType: string;
  originCountry: string;
  destinationCountry: string;
  // Terms
  incoterms: string;
  paymentTerms: string;
  transportType: string;
}

const INITIAL_DATA: InvoiceData = {
  invoiceNumber: "EXP-2026-089",
  invoiceDate: "2026-09-19",
  dueDate: "2026-10-19",
  // Seller
  sellerName: "Samarkand Agro Export MCHJ",
  sellerAddress: "Samarqand viloyati, Pastdarg'om tumani, Bog'bonlar k-si 14",
  sellerInn: "305987654",
  sellerBank: "O'zbekiston Milliy Banki (NBU Samarqand b-mi)",
  sellerIban: "UZ24NBUZ0000012345678901",
  sellerSwift: "NBFAUZ2TXXX",
  // Buyer
  buyerName: "PolFruit Sp. z o.o.",
  buyerAddress: "ul. Marszalkowska 126, 00-008 Warszawa, Poland",
  buyerVat: "PL5252345678",
  buyerBank: "PKO Bank Polski SA, Warsaw Branch",
  buyerIban: "PL12102000001234567800009999",
  // Product
  productName: "Yangi xurmo (Fresh Persimmons)",
  productDescription: "Nav: 'Korolyok', birinchi toifa, qutilarda 10 kg dan qadoqlangan",
  hsCode: "0804.10.00",
  quantityKg: 5000,
  unitPriceUsd: 1.85,
  packageType: "500 quti (10 kg dan yog'och qutilarda)",
  originCountry: "O'zbekiston Respublikasi (Republic of Uzbekistan)",
  destinationCountry: "Polsha Respublikasi (Republic of Poland)",
  // Terms
  incoterms: "DAP Varshava (Incoterms 2020)",
  paymentTerms: "30% oldindan avans, 70% yuk xati (CMR) va Form A taqdim etilganda",
  transportType: "TIR Avtotransport (Sovutgichli refrijerator +2°C ... +4°C)",
};

export function DocumentCenter() {
  const [docType, setDocType] = useState<"invoice" | "contract">("invoice");
  const [data, setData] = useState<InvoiceData>(INITIAL_DATA);
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Accordion open states
  const [openSections, setOpenSections] = useState({
    seller: true,
    buyer: true,
    product: true,
    terms: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (field: keyof InvoiceData, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const totalAmount = (data.quantityKg * data.unitPriceUsd).toFixed(2);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      window.print();
    }, 800);
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground font-sans">
      {/* 1. Header Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/80 bg-card px-4 sm:px-6 shadow-2xs z-30">
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/workspace"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3 py-1.5 text-xs font-bold text-foreground transition-all hover:bg-secondary active:scale-95"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Workspace&apos;ga qaytish</span>
            <span className="sm:hidden">Orqaga</span>
          </Link>

          <div className="h-4 w-px bg-border hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
                Hujjatlar Markazi
              </h1>
              <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-extrabold text-blue-600">
                #EXP-2026-089
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Xalqaro standartdagi Invoys va Eksport shartnomalarini jonli tahrirlash va PDF olish
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-bold text-foreground transition-all hover:bg-secondary active:scale-95"
          >
            {isSaved ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span className="text-emerald-600">Saqlandi</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Saqlash</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow active:scale-95 disabled:opacity-75"
          >
            <Download size={14} />
            <span>{isDownloading ? "Tayyorlanmoqda..." : "PDF yuklab olish"}</span>
          </button>
        </div>
      </header>

      {/* 2. Main 2-Column Split Screen */}
      <div className="grid flex-1 overflow-hidden lg:grid-cols-[440px_1fr] xl:grid-cols-[480px_1fr]">
        {/* ======================================================== */}
        {/* LEFT COLUMN: Document Form Editor (40%) */}
        {/* ======================================================== */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-border/80 bg-card/60 overflow-hidden h-full">
          {/* Document Type Switcher */}
          <div className="border-b border-border/80 p-3 bg-secondary/30">
            <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-secondary/80 p-1">
              <button
                type="button"
                onClick={() => setDocType("invoice")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                  docType === "invoice"
                    ? "bg-card text-blue-600 shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileSpreadsheet size={14} />
                <span>Tijorat Invoysi (Invoice)</span>
              </button>

              <button
                type="button"
                onClick={() => setDocType("contract")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                  docType === "contract"
                    ? "bg-card text-blue-600 shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText size={14} />
                <span>Shartnoma (Contract)</span>
              </button>
            </div>
          </div>

          {/* Form Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Quick General Settings */}
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border/70 bg-background/60 p-3.5">
              <div>
                <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                  Invoys raqami
                </label>
                <input
                  type="text"
                  value={data.invoiceNumber}
                  onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                  Sana
                </label>
                <input
                  type="date"
                  value={data.invoiceDate}
                  onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Section 1: Eksportyor (Sotuvchi) */}
            <div className="rounded-2xl border border-border/80 bg-card overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleSection("seller")}
                className="flex w-full items-center justify-between p-3.5 text-left text-xs font-bold text-foreground bg-secondary/20 hover:bg-secondary/40"
              >
                <span className="flex items-center gap-2">
                  <Building2 size={14} className="text-blue-600" />
                  <span>1. Eksportyor (Sotuvchi rekvizitlari)</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${
                    openSections.seller ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSections.seller && (
                <div className="p-3.5 space-y-3 border-t border-border/60">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Kompaniya nomi
                    </label>
                    <input
                      type="text"
                      value={data.sellerName}
                      onChange={(e) => handleInputChange("sellerName", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Yuridik manzil
                    </label>
                    <input
                      type="text"
                      value={data.sellerAddress}
                      onChange={(e) => handleInputChange("sellerAddress", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                        STIR / INN
                      </label>
                      <input
                        type="text"
                        value={data.sellerInn}
                        onChange={(e) => handleInputChange("sellerInn", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                        SWIFT kodi
                      </label>
                      <input
                        type="text"
                        value={data.sellerSwift}
                        onChange={(e) => handleInputChange("sellerSwift", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Bank hisob raqami (IBAN)
                    </label>
                    <input
                      type="text"
                      value={data.sellerIban}
                      onChange={(e) => handleInputChange("sellerIban", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-mono text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Importyor (Xaridor) */}
            <div className="rounded-2xl border border-border/80 bg-card overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleSection("buyer")}
                className="flex w-full items-center justify-between p-3.5 text-left text-xs font-bold text-foreground bg-secondary/20 hover:bg-secondary/40"
              >
                <span className="flex items-center gap-2">
                  <Globe size={14} className="text-blue-600" />
                  <span>2. Importyor (Xaridor rekvizitlari)</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${
                    openSections.buyer ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSections.buyer && (
                <div className="p-3.5 space-y-3 border-t border-border/60">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Xaridor kompaniyasi nomi
                    </label>
                    <input
                      type="text"
                      value={data.buyerName}
                      onChange={(e) => handleInputChange("buyerName", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Xaridor manzili (Mamlakat, shahar)
                    </label>
                    <input
                      type="text"
                      value={data.buyerAddress}
                      onChange={(e) => handleInputChange("buyerAddress", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                        VAT / Tax ID
                      </label>
                      <input
                        type="text"
                        value={data.buyerVat}
                        onChange={(e) => handleInputChange("buyerVat", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                        Xaridor Banki
                      </label>
                      <input
                        type="text"
                        value={data.buyerBank}
                        onChange={(e) => handleInputChange("buyerBank", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Mahsulot ma'lumotlari */}
            <div className="rounded-2xl border border-border/80 bg-card overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleSection("product")}
                className="flex w-full items-center justify-between p-3.5 text-left text-xs font-bold text-foreground bg-secondary/20 hover:bg-secondary/40"
              >
                <span className="flex items-center gap-2">
                  <Package size={14} className="text-blue-600" />
                  <span>3. Mahsulot va Narxlar</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${
                    openSections.product ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSections.product && (
                <div className="p-3.5 space-y-3 border-t border-border/60">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Mahsulot nomi
                    </label>
                    <input
                      type="text"
                      value={data.productName}
                      onChange={(e) => handleInputChange("productName", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Batafsil tavsif / Nav / Qadoq
                    </label>
                    <input
                      type="text"
                      value={data.productDescription}
                      onChange={(e) => handleInputChange("productDescription", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                        HS-Code (TIF TN)
                      </label>
                      <input
                        type="text"
                        value={data.hsCode}
                        onChange={(e) => handleInputChange("hsCode", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-mono text-foreground outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                        Hajmi (kg)
                      </label>
                      <input
                        type="number"
                        value={data.quantityKg}
                        onChange={(e) =>
                          handleInputChange("quantityKg", parseFloat(e.target.value) || 0)
                        }
                        className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-bold text-foreground outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                        Narxi ($/kg)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={data.unitPriceUsd}
                        onChange={(e) =>
                          handleInputChange("unitPriceUsd", parseFloat(e.target.value) || 0)
                        }
                        className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-bold text-foreground outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-blue-500/10 p-3 border border-blue-500/20 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      Jami summa (USD):
                    </span>
                    <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                      ${totalAmount}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Yetkazib berish shartlari */}
            <div className="rounded-2xl border border-border/80 bg-card overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleSection("terms")}
                className="flex w-full items-center justify-between p-3.5 text-left text-xs font-bold text-foreground bg-secondary/20 hover:bg-secondary/40"
              >
                <span className="flex items-center gap-2">
                  <Truck size={14} className="text-blue-600" />
                  <span>4. Yetkazib berish va To&apos;lov shartlari</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${
                    openSections.terms ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSections.terms && (
                <div className="p-3.5 space-y-3 border-t border-border/60">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Yetkazib berish qoidasi (Incoterms 2020)
                    </label>
                    <input
                      type="text"
                      value={data.incoterms}
                      onChange={(e) => handleInputChange("incoterms", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      To&apos;lov shartlari
                    </label>
                    <input
                      type="text"
                      value={data.paymentTerms}
                      onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Transport va saqlash rejimi
                    </label>
                    <input
                      type="text"
                      value={data.transportType}
                      onChange={(e) => handleInputChange("transportType", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Live A4 PDF Preview (60%) */}
        {/* ======================================================== */}
        <div className="flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden h-full">
          {/* Zoom & View Toolbar */}
          <div className="flex shrink-0 items-center justify-between border-b border-border/60 bg-card/40 px-4 py-2 text-xs backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">
                Jonli A4 Qog&apos;oz Ko&apos;rinishi:
              </span>
              <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                {docType === "invoice" ? "Commercial Invoice" : "Sales Contract"} (1 sahifa)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="rounded-lg p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground"
                title="Kichiklashtirish"
              >
                <ZoomOut size={15} />
              </button>
              <span className="font-mono text-xs font-semibold">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                className="rounded-lg p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground"
                title="Kattalashtirish"
              >
                <ZoomIn size={15} />
              </button>

              <div className="h-4 w-px bg-border mx-1" />

              <button
                type="button"
                onClick={handleDownloadPdf}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-500/10"
              >
                <Printer size={13} />
                <span>Chop etish</span>
              </button>
            </div>
          </div>

          {/* Scrollable Container with centered A4 Sheet */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
            {/* A4 Paper Sheet (White background with black text always) */}
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
              className="w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl p-8 sm:p-12 font-sans border border-slate-200 transition-all rounded-sm flex flex-col justify-between"
            >
              {/* Top Header */}
              <div>
                <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
                  <div>
                    <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase">
                      {docType === "invoice"
                        ? "COMMERCIAL INVOICE"
                        : "INTERNATIONAL SALES CONTRACT"}
                    </h2>
                    <p className="text-xs font-semibold text-slate-600 mt-1">
                      {docType === "invoice"
                        ? "TIJORAT INVOYSI"
                        : "XALQARO OLDDI-SOTDI SHARTNOMASI"}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Standard ICC / UN ECE Formatted Document
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-extrabold text-blue-600 font-mono">
                      {data.invoiceNumber}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      <span className="font-semibold">Sana / Date:</span> {data.invoiceDate}
                    </div>
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold">Muddati / Due:</span> {data.dueDate}
                    </div>
                  </div>
                </div>

                {/* 2-Column Parties (Exporter vs Consignee) */}
                <div className="grid grid-cols-2 gap-6 my-6 border-b border-slate-200 pb-6 text-xs">
                  {/* Seller / Shipper */}
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <div className="font-extrabold text-slate-800 uppercase text-[11px] mb-2 text-blue-700">
                      1. EXPORTER / SELLER (SOTUVCHI):
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{data.sellerName}</div>
                    <div className="text-slate-600 mt-1">{data.sellerAddress}</div>
                    <div className="text-slate-700 mt-2 font-mono text-[11px]">
                      <span className="font-semibold">STIR / INN:</span> {data.sellerInn}
                    </div>
                    <div className="text-slate-600 mt-1 text-[11px]">
                      <span className="font-semibold">Bank:</span> {data.sellerBank}
                    </div>
                    <div className="text-slate-700 font-mono text-[10px] mt-0.5">
                      <span className="font-semibold">IBAN:</span> {data.sellerIban}
                    </div>
                    <div className="text-slate-700 font-mono text-[10px]">
                      <span className="font-semibold">SWIFT:</span> {data.sellerSwift}
                    </div>
                  </div>

                  {/* Buyer / Consignee */}
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <div className="font-extrabold text-slate-800 uppercase text-[11px] mb-2 text-blue-700">
                      2. CONSIGNEE / BUYER (XARIDOR):
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{data.buyerName}</div>
                    <div className="text-slate-600 mt-1">{data.buyerAddress}</div>
                    <div className="text-slate-700 mt-2 font-mono text-[11px]">
                      <span className="font-semibold">VAT / Tax ID:</span> {data.buyerVat}
                    </div>
                    <div className="text-slate-600 mt-1 text-[11px]">
                      <span className="font-semibold">Bank:</span> {data.buyerBank}
                    </div>
                    <div className="text-slate-700 font-mono text-[10px] mt-0.5">
                      <span className="font-semibold">IBAN:</span> {data.buyerIban}
                    </div>
                  </div>
                </div>

                {/* Delivery & Transport terms strip */}
                <div className="grid grid-cols-3 gap-3 bg-slate-100 p-3 rounded text-[11px] border border-slate-200 mb-6">
                  <div>
                    <span className="font-bold text-slate-700 block">Terms of Delivery:</span>
                    <span className="font-extrabold text-blue-700">{data.incoterms}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">Transport:</span>
                    <span className="text-slate-900">{data.transportType}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">Origin / Destination:</span>
                    <span className="text-slate-900">UZ (GSP+ 0%) → PL</span>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border border-slate-300 rounded overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-800 text-white font-bold uppercase text-[10px]">
                        <th className="p-2.5 border-r border-slate-700 text-center w-10">№</th>
                        <th className="p-2.5 border-r border-slate-700">
                          Description of Goods (Tovar nomi)
                        </th>
                        <th className="p-2.5 border-r border-slate-700 text-center w-24">
                          HS Code
                        </th>
                        <th className="p-2.5 border-r border-slate-700 text-right w-24">
                          Qty (kg)
                        </th>
                        <th className="p-2.5 border-r border-slate-700 text-right w-24">
                          Price ($)
                        </th>
                        <th className="p-2.5 text-right w-28">Total ($)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3 text-center font-bold text-slate-600">1</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900 text-sm">{data.productName}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">
                            {data.productDescription}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            Packing: {data.packageType}
                          </div>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-800">
                          {data.hsCode}
                        </td>
                        <td className="p-3 text-right font-bold text-slate-900">
                          {data.quantityKg.toLocaleString()} kg
                        </td>
                        <td className="p-3 text-right font-bold text-slate-900">
                          ${data.unitPriceUsd.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-extrabold text-slate-900 text-sm">
                          ${totalAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Totals & Amount in words */}
                <div className="my-6 grid grid-cols-2 gap-6 items-start">
                  <div className="border border-slate-200 rounded p-3 text-[11px] bg-slate-50">
                    <span className="font-bold text-slate-700 block">Payment Conditions:</span>
                    <p className="text-slate-800 mt-1 font-medium leading-relaxed">
                      {data.paymentTerms}
                    </p>
                    <div className="mt-2 text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Yevropa Ittifoqi GSP+ boji: 0% (Form A talab qilinadi)
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-right">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="font-bold text-slate-900">${totalAmount}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-600">Customs Duty (GSP+):</span>
                      <span className="font-bold text-emerald-600">$0.00 (0%)</span>
                    </div>
                    <div className="flex justify-between py-1.5 text-sm font-black text-slate-900">
                      <span>TOTAL AMOUNT (USD):</span>
                      <span className="text-base text-blue-700">${totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Signatures & Seal Box */}
              <div className="mt-12 pt-6 border-t-2 border-slate-300">
                <div className="grid grid-cols-2 gap-10">
                  {/* Seller Sign */}
                  <div className="relative border border-slate-200 rounded p-4 text-center">
                    <p className="text-xs font-bold text-slate-800 uppercase">
                      For and on behalf of Exporter:
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{data.sellerName}</p>

                    {/* Realistic Stamp & Signature graphic */}
                    <div className="my-4 flex items-center justify-center relative">
                      <div className="size-20 rounded-full border-2 border-dashed border-blue-700/60 flex flex-col items-center justify-center text-blue-800 text-[8px] font-extrabold uppercase rotate-6 shadow-2xs">
                        <span>★ SAMARKAND ★</span>
                        <span className="text-[9px] my-0.5">AGRO EXPORT</span>
                        <span>MCHJ · 2026</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-400 pt-1 text-[10px] text-slate-500">
                      Director Signature &amp; Official Stamp
                    </div>
                  </div>

                  {/* Buyer Sign */}
                  <div className="border border-slate-200 rounded p-4 text-center">
                    <p className="text-xs font-bold text-slate-800 uppercase">
                      Accepted and Confirmed by Buyer:
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{data.buyerName}</p>

                    <div className="my-8 h-8 border-b border-dashed border-slate-300 flex items-end justify-center text-[10px] text-slate-400">
                      (Authorized Signature)
                    </div>

                    <div className="border-t border-slate-400 pt-1 text-[10px] text-slate-500">
                      Buyer Seal &amp; Signature
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center text-[9px] text-slate-400">
                  Generated automatically by ExportYor.AI Document Engine · Verified with EU TARIC
                  &amp; Customs Specifications
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
