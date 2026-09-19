"use client";

import {
  Bot,
  PanelRightClose,
  PanelRightOpen,
  Send,
  Sparkles,
  ArrowRight,
  Zap,
  Loader2,
  GripVertical,
} from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";
import type { ChatMessage, ExportProject } from "../types";
import { PROMPT_CHIPS } from "../hooks/useExportData";

interface ChatViewProps {
  messages: ChatMessage[];
  chatInput: string;
  setChatInput: (value: string) => void;
  isTyping: boolean;
  isPanelOpen: boolean;
  setIsPanelOpen: (value: boolean) => void;
  canvasTab: "customs" | "market" | "documents";
  setCanvasTab: (tab: "customs" | "market" | "documents") => void;
  handleSendMessage: (text?: string) => void;
  selectedProject: ExportProject | null;
  toggleRoadmap: (id: number) => void;
  handleSendOffer: (companyId: string) => void;
  sentOfferIds: Record<string, boolean>;
}

export function ChatView({
  messages,
  chatInput,
  setChatInput,
  isTyping,
  isPanelOpen,
  setIsPanelOpen,
  canvasTab,
  setCanvasTab,
  handleSendMessage,
  selectedProject,
  toggleRoadmap,
  handleSendOffer,
  sentOfferIds,
}: ChatViewProps) {
  const analysis = selectedProject?.analysisResult;
  const roadmap = analysis?.roadmap ?? [];

  const chatColumn = (
    <div className="flex h-full flex-col overflow-hidden border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Bot size={15} className="text-blue-600" />
          <span className="text-xs font-bold">AI Eksport Konsultanti</span>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Online
          </span>
        </div>

        {!isPanelOpen && (
          <button
            type="button"
            onClick={() => setIsPanelOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-500/20 transition-all"
          >
            <PanelRightOpen size={13} />
            <span>Kanvasni ochish</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "ai" && (
              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-xs">
                <Bot size={14} />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs transition-all ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-xs"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-foreground rounded-bl-xs"
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {msg.hasArtifact && (
                <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsPanelOpen(true)}
                    className={`group flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                      isPanelOpen
                        ? "border-blue-500/40 bg-blue-500/5 ring-1 ring-blue-500/20"
                        : "border-blue-600 bg-blue-600/10 hover:bg-blue-600/15 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-white shadow-xs">
                        <Zap size={15} />
                      </span>
                      <div>
                        <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          {isPanelOpen ? "Kanvas ochiq" : "Interaktiv Kanvas"}
                        </div>
                        <div className="text-xs font-bold text-foreground">{msg.artifactTitle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                      <span>{isPanelOpen ? "Ko'rilmoqda" : "Ochish"}</span>
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </div>
              )}

              <div
                className={`mt-1.5 text-[9px] text-right ${
                  msg.sender === "user" ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {msg.time}
              </div>
            </div>

            {msg.sender === "user" && (
              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-200 dark:bg-slate-800 text-foreground text-[11px] font-bold">
                AK
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <div className="grid size-7 place-items-center rounded-full bg-blue-600 text-white">
              <Sparkles size={13} />
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 flex items-center gap-2 shadow-2xs">
              <Loader2 size={13} className="animate-spin text-blue-600" />
              <span>AI hisob-kitob qilmoqda...</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 p-2.5 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground mb-1.5 px-1">
          <Zap size={11} className="text-amber-500" />
          <span>Tezkor savollar:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PROMPT_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleSendMessage(chip)}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-foreground transition-all hover:border-blue-600/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 hover:shadow-sm active:scale-95"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Eksport bo'yicha savol yozing..."
            className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isTyping}
            className="grid size-7 place-items-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-700 hover:scale-110 hover:shadow-md disabled:opacity-40 disabled:hover:scale-100"
          >
            <Send size={13} />
          </button>
        </form>
      </div>
    </div>
  );

  const canvasColumn = (
    <div className="flex h-full flex-col overflow-hidden bg-white dark:bg-slate-900">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPanelOpen(false)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-foreground transition-colors"
            title="Kanvasni yopish"
          >
            <PanelRightClose size={16} />
          </button>
          <span className="text-xs font-bold text-foreground">
            Tahlil Kanvasi
            {analysis ? `: HS ${analysis.hsCode} — AI tahlili` : ""}
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 p-1">
          <button
            type="button"
            onClick={() => setCanvasTab("customs")}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
              canvasTab === "customs"
                ? "bg-white dark:bg-slate-700 text-blue-600 shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Bojxona &amp; Logistika
          </button>
          <button
            type="button"
            onClick={() => setCanvasTab("market")}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
              canvasTab === "market"
                ? "bg-white dark:bg-slate-700 text-blue-600 shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Bozor Tahlili
          </button>
          <button
            type="button"
            onClick={() => setCanvasTab("documents")}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
              canvasTab === "documents"
                ? "bg-white dark:bg-slate-700 text-blue-600 shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Hujjatlar (PDF)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {canvasTab === "customs" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <span className="text-[11px] text-muted-foreground font-semibold">
                  TIF TN / HS-Code
                </span>
                <p className="text-xl font-extrabold text-foreground mt-1">
                  {analysis ? analysis.hsCode : "—"}
                </p>
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  {analysis
                    ? analysis.productDescription
                    : "Hali tahlil qilinmagan — chatga mahsulot yozing"}
                </p>
              </div>
              <div
                className={`p-4 rounded-2xl border ${
                  analysis
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                }`}
              >
                <span className="text-[11px] text-emerald-600 font-semibold">
                  GSP+ Boji (O&apos;zbekiston → EI)
                </span>
                <p className="text-xl font-extrabold text-emerald-600 mt-1">
                  {analysis ? `${analysis.uzbGspDuty}%` : "—"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {analysis ? "MacMap 2024 bazasidan" : "Kutilmoqda"}
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <span className="text-[11px] text-muted-foreground font-semibold">
                  EI Standart Boji (MFN)
                </span>
                <p className="text-xl font-extrabold text-blue-600 mt-1">
                  {analysis ? `${analysis.euMfnDuty}%` : "—"}
                </p>
                <p className="text-[11px] text-muted-foreground">Imtiyozsiz rejim</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
              <h4 className="text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
                <Zap size={14} className="text-blue-600" />
                <span>Eksport Bosqichlari Cheklisti</span>
              </h4>
              <div className="space-y-2">
                {roadmap.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleRoadmap(item.id)}
                    className={`flex cursor-pointer items-center justify-between p-2.5 rounded-xl border transition-all hover:scale-102 hover:shadow-sm active:scale-98 ${
                      item.done
                        ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-xs"
                    }`}
                  >
                    <div className="flex items-center gap-2">
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
                ))}
                {roadmap.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-6">
                    Tahlil tugallanmagan — roadmap mavjud emas
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {canvasTab === "market" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {analysis ? (
              <>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="p-3.5 rounded-2xl border border-blue-500/40 bg-blue-500/5">
                    <span className="text-2xl">🇵🇱</span>
                    <h4 className="text-sm font-bold mt-1">Polsha</h4>
                    <p className="text-xs font-extrabold text-blue-600 mt-2">Talab: 92/100</p>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <span className="text-2xl">🇩🇪</span>
                    <h4 className="text-sm font-bold mt-1">Germaniya</h4>
                    <p className="text-xs font-extrabold text-emerald-600 mt-2">Talab: 88/100</p>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <span className="text-2xl">🇨🇿</span>
                    <h4 className="text-sm font-bold mt-1">Chexiya</h4>
                    <p className="text-xs font-extrabold text-foreground mt-2">Talab: 84/100</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                  <h4 className="text-xs font-bold mb-3">
                    Tekshirilgan B2B Xaridor: PolFruit Sp. z o.o.
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Varshava, Polsha · Talab: 15-20 tonna
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSendOffer("polfruit_canvas")}
                    className="mt-3 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    {sentOfferIds["polfruit_canvas"]
                      ? "Taklif yuborildi ✓"
                      : "Tijorat taklifi yuborish"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-muted-foreground mb-4">
                  <Zap size={24} />
                </div>
                <p className="text-sm font-bold text-foreground mb-1">Bozor ma&apos;lumotlari</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  AI tahlilidan keyin bozor ma&apos;lumotlari ko&apos;rsatiladi
                </p>
              </div>
            )}
          </div>
        )}

        {canvasTab === "documents" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {analysis ? (
              <>
                {analysis.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-950 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold">{doc.name}</h4>
                      <p className="text-[11px] text-muted-foreground">{doc.description}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Taxminiy muddat: {doc.estimatedDays}
                      </p>
                    </div>
                    <span
                      className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${
                        doc.status === "ready"
                          ? "bg-emerald-100 text-emerald-700"
                          : doc.status === "in_progress"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {doc.status === "ready"
                        ? "Tayyor"
                        : doc.status === "in_progress"
                          ? "Jarayonda"
                          : "Talab qilinadi"}
                    </span>
                  </div>
                ))}
                <a
                  href="/documents"
                  className="block rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white text-center hover:bg-blue-700 transition-colors"
                >
                  Barcha hujjatlarni ko&apos;rish →
                </a>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-muted-foreground mb-4">
                  <Send size={24} />
                </div>
                <p className="text-sm font-bold text-foreground mb-1">Hujjatlar</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  AI tahlilidan keyin hujjatlar generatsiya qilinadi
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (!isPanelOpen) {
    return (
      <div className="flex flex-1 overflow-hidden h-full">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">{chatColumn}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <Group orientation="horizontal" className="h-full w-full">
        <Panel defaultSize="35" minSize="20" maxSize="80">
          {chatColumn}
        </Panel>
        <Separator className="group relative flex w-1.5 items-center justify-center bg-slate-200 dark:bg-slate-800 transition-colors hover:bg-blue-400/60 focus-visible:bg-blue-500 cursor-col-resize">
          <GripVertical
            size={14}
            className="text-slate-400 dark:text-slate-500 group-hover:text-blue-600 transition-colors"
          />
        </Separator>
        <Panel defaultSize="65" minSize="20" maxSize="80">
          {canvasColumn}
        </Panel>
      </Group>
    </div>
  );
}
