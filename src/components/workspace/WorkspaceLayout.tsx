"use client";

import {
  ChevronDown,
  Download,
  LogOut,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  Sun,
  LayoutDashboard,
  MessageSquare,
  Search,
  Truck,
  Globe,
  FileSpreadsheet,
  ShieldCheck,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Toaster } from "sonner";
import { useExportData } from "./hooks/useExportData";

// View Components
import { OverviewView } from "./views/OverviewView";
import { ChatView } from "./views/ChatView";
import { HSCodeView } from "./views/HSCodeView";
import { LogisticsView } from "./views/LogisticsView";
import { MarketView } from "./views/MarketView";
import { DocumentsView } from "./views/DocumentsView";
import { SubsidyView } from "./views/SubsidyView";
import { SettingsView } from "./views/SettingsView";

// Navigation Items Configuration
const NAV_ITEMS = [
  { id: "overview" as const, label: "Umumiy Dashboard", icon: LayoutDashboard, badge: "Asosiy" },
  { id: "chat" as const, label: "AI Konsultant (Chat)", icon: MessageSquare, badge: "Kanvas" },
  { id: "hscode" as const, label: "HS-Code Katalogi", icon: Search, badge: "5600+" },
  { id: "logistics" as const, label: "Logistika Hisobi", icon: Truck, badge: "Hisoblash" },
  { id: "market" as const, label: "Bozor Tahlili", icon: Globe, badge: "AI" },
  { id: "documents" as const, label: "Hujjatlar Markazi", icon: FileSpreadsheet, badge: "PDF" },
  {
    id: "subsidy" as const,
    label: "Subsidiyalar & Risklar",
    icon: ShieldCheck,
    badge: "50% gacha",
  },
  { id: "settings" as const, label: "Sozlamalar", icon: Settings, badge: null },
];

export function WorkspaceLayout() {
  const data = useExportData();
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const {
    activeView,
    setActiveView,
    isSidebarOpen,
    setIsSidebarOpen,
    projects,
    selectedProject,
    setSelectedProjectId,
    createProject,
    deleteProject,
    messages,
    chatInput,
    setChatInput,
    isTyping,
    handleSendMessage,
    isPanelOpen,
    setIsPanelOpen,
    canvasTab,
    setCanvasTab,
    logisticsInput,
    setLogisticsInput,
    calculateLogistics,
    toggleRoadmap,
    companySettings,
    setCompanySettings,
    isDarkMode,
    toggleDarkMode,
  } = data;

  const handleSendOffer = (companyId: string) => {
    // Hozircha placeholder — kelajakda real API ga ulanadi
    console.log("Offer sent to:", companyId);
  };

  // Yangi loyiha yaratish dialogi
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    productName: "",
    weightKg: 5000,
    destination: "Polsha",
  });

  const handleCreateProject = () => {
    if (!newProjectForm.productName.trim()) return;
    createProject({
      productName: newProjectForm.productName,
      weightKg: newProjectForm.weightKg,
      destination: newProjectForm.destination,
    });
    setShowNewProject(false);
    setNewProjectForm({ productName: "", weightKg: 5000, destination: "Polsha" });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-foreground selection:bg-blue-600/15 selection:text-blue-600">
      <Toaster position="top-right" richColors closeButton />

      {/* LEFT SIDEBAR */}
      <aside
        className={`flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 ease-in-out shrink-0 z-40 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-3.5 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-xs">
              <Sparkles size={16} />
            </span>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight">
                  ExportYor<span className="text-blue-600">.AI</span>
                </span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Workspace Pro
                </span>
              </div>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground transition-all hover:scale-110 active:scale-95"
          >
            {isSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </button>
        </div>

        {/* Active Project */}
        {isSidebarOpen && (
          <div className="p-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40">
            <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 px-1">
              <span>Faol Loyiha</span>
              <button
                type="button"
                onClick={() => setShowNewProject(true)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                <Plus size={10} />
                <span>Yangi</span>
              </button>
            </div>
            {selectedProject ? (
              <div className="flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-500/5 p-2 text-xs font-semibold text-foreground">
                <div className="flex items-center gap-2 truncate">
                  <span className="truncate text-xs font-bold">{selectedProject.name}</span>
                </div>
                <span className="rounded bg-blue-600 px-1.5 py-0.2 text-[9px] font-bold text-white shrink-0">
                  Faol
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowNewProject(true)}
                className="w-full rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-2 text-xs text-muted-foreground hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Loyiha yaratish
              </button>
            )}
          </div>
        )}

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs hover:scale-105"
                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground hover:scale-105 active:scale-95"
                }`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className={isActive ? "text-white" : "text-muted-foreground"} />
                  {isSidebarOpen && <span>{item.label}</span>}
                </div>
                {isSidebarOpen && item.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-extrabold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-muted-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground transition-colors"
          >
            <LogOut size={16} />
            {isSidebarOpen && <span>Bosh sahifaga qaytish</span>}
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden h-full">
        {/* Top Navbar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6 shadow-2xs z-30">
          <div className="flex items-center gap-3">
            {/* Project Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className="max-w-[200px] truncate sm:max-w-[280px]">
                  {selectedProject ? selectedProject.name : "Loyiha tanlanmagan"}
                </span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>

              {isProjectDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-72 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-xl ring-1 ring-black/5 z-50">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Eksport Loyihalari ({projects.length})
                  </div>
                  {projects.length === 0 ? (
                    <div className="px-2.5 py-4 text-center text-xs text-muted-foreground">
                      Hali loyiha yo&apos;q. Yangi yarating!
                    </div>
                  ) : (
                    projects.map((proj) => (
                      <div
                        key={proj.id}
                        className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                          selectedProject?.id === proj.id
                            ? "bg-blue-600 text-white font-bold"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProjectId(proj.id);
                            setIsProjectDropdownOpen(false);
                          }}
                          className="flex-1 flex items-center gap-2 truncate"
                        >
                          <span className="truncate">{proj.name}</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(proj.id);
                          }}
                          className="ml-2 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-muted-foreground hover:text-red-500"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                  )}
                  <div className="mt-1 border-t border-slate-200 dark:border-slate-800 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewProject(true);
                        setIsProjectDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Plus size={14} />
                      <span>Yangi loyiha yaratish</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            {selectedProject?.analysisResult && (
              <div className="hidden md:flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tahlil tayyor — HS {selectedProject.analysisResult.hsCode}</span>
              </div>
            )}
          </div>

          {/* Header Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/documents"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Hujjatlar (PDF)</span>
              <span className="sm:hidden">PDF</span>
            </Link>

            <button
              type="button"
              onClick={toggleDarkMode}
              className="grid size-8 place-items-center rounded-xl border border-slate-200 dark:border-slate-800 text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-110 active:scale-95"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <div className="flex items-center gap-2 pl-1">
              <div className="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-xs font-bold text-white shadow-xs">
                {companySettings.name ? companySettings.name[0] : "U"}
              </div>
            </div>
          </div>
        </header>

        {/* VIEW CONTAINER */}
        <div className="flex-1 overflow-hidden">
          {activeView === "overview" && (
            <OverviewView
              selectedProject={selectedProject}
              logisticsInput={logisticsInput}
              setLogisticsInput={setLogisticsInput}
              calculateLogistics={calculateLogistics}
              toggleRoadmap={toggleRoadmap}
              setActiveView={setActiveView}
            />
          )}

          {activeView === "chat" && (
            <ChatView
              messages={messages}
              chatInput={chatInput}
              setChatInput={setChatInput}
              isTyping={isTyping}
              isPanelOpen={isPanelOpen}
              setIsPanelOpen={setIsPanelOpen}
              canvasTab={canvasTab}
              setCanvasTab={setCanvasTab}
              handleSendMessage={handleSendMessage}
              selectedProject={selectedProject}
              toggleRoadmap={toggleRoadmap}
              handleSendOffer={handleSendOffer}
              sentOfferIds={{}}
            />
          )}

          {activeView === "hscode" && (
            <HSCodeView setActiveView={setActiveView} handleSendMessage={handleSendMessage} />
          )}

          {activeView === "logistics" && (
            <LogisticsView
              logisticsInput={logisticsInput}
              setLogisticsInput={setLogisticsInput}
              calculateLogistics={calculateLogistics}
            />
          )}

          {activeView === "market" && (
            <MarketView selectedProject={selectedProject} handleSendMessage={handleSendMessage} />
          )}

          {activeView === "documents" && (
            <DocumentsView selectedProject={selectedProject} companySettings={companySettings} />
          )}

          {activeView === "subsidy" && <SubsidyView selectedProject={selectedProject} />}

          {activeView === "settings" && (
            <SettingsView
              companySettings={companySettings}
              setCompanySettings={setCompanySettings}
            />
          )}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-extrabold mb-4">Yangi Eksport Loyihasi</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Mahsulot nomi</label>
                <input
                  type="text"
                  value={newProjectForm.productName}
                  onChange={(e) =>
                    setNewProjectForm((p) => ({ ...p, productName: e.target.value }))
                  }
                  placeholder="masalan: Xurmo, Mayiz, Pomidor..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Og&apos;irlik (kg)</label>
                  <input
                    type="number"
                    value={newProjectForm.weightKg}
                    onChange={(e) =>
                      setNewProjectForm((p) => ({ ...p, weightKg: Number(e.target.value) || 0 }))
                    }
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Boradigan mamlakat</label>
                  <select
                    value={newProjectForm.destination}
                    onChange={(e) =>
                      setNewProjectForm((p) => ({ ...p, destination: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                  >
                    <option>Polsha</option>
                    <option>Germaniya</option>
                    <option>BAA</option>
                    <option>Turkiya</option>
                    <option>Rossiya</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowNewProject(false)}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={handleCreateProject}
                disabled={!newProjectForm.productName.trim()}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-40"
              >
                Yaratish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
