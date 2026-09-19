import { useState, useEffect, useCallback } from "react";
import {
  ActiveView,
  ChatMessage,
  ExportProject,
  AnalysisResult,
  LogisticsInput,
  LogisticsResult,
  TransportType,
  CompanySettings,
} from "../types";

const STORAGE_KEY_PROJECTS = "exportyor:projects";
const STORAGE_KEY_SETTINGS = "exportyor:company-settings";

// Boshlang'ich chat xabari
const WELCOME_MESSAGE: ChatMessage = {
  id: "0",
  sender: "ai",
  time: "",
  text: 'Assalomu alaykum! Men — ExportYor.AI eksport konsultantiman.\n\nMahsulotingiz va hajmini erkin yozing — masalan: "Menda 5 tonna xurmo bor, Polshaga chiqarmoqchiman". Men HS-Code, boj stavkasi, GSP+ imtiyozini aniqlab, eksportgacha yo\'l xaritasini tuzib beraman.',
};

// Prompt chips
export const PROMPT_CHIPS = [
  "Menda 5 tonna mayiz bor, Germaniyaga eksport qilmoqchiman",
  "GSP+ sertifikat shartlari qanday?",
  "Incoterms DAP va FOB farqi nima?",
  "2 tonna quritilgan malinani Dubayga qanday jo'nataman?",
];

// Default roadmap (AI kelgunga qadar)
const DEFAULT_ROADMAP = [
  { id: 1, title: "e-Karantin fitosanitar ruxsatnomasi olish", done: false, time: "1 kun" },
  {
    id: 2,
    title: "ST-1 / Form A kelib chiqish sertifikati (GSP+ 0%)",
    done: false,
    time: "2-3 kun",
  },
  { id: 3, title: "Eksport shartnomasi tuzish", done: false, time: "1 kun" },
  { id: 4, title: "Logistika kompaniyasini tanlash", done: false, time: "1-2 kun" },
  { id: 5, title: "Bojxona yuk deklaratsiyasi (BYuD / SAD)", done: false, time: "1 kun" },
  { id: 6, title: "Yukni jo'natish va kuzatish", done: false, time: "Kutilmoqda" },
];

// Logistika hisoblash (taxminiy narxlar — AI dan aniqroq keladi)
const LOGISTICS_RATES: Record<
  string,
  Record<TransportType, { costPerKg: number; days: string }>
> = {
  polsha: {
    auto: { costPerKg: 0.42, days: "9-11" },
    air: { costPerKg: 2.1, days: "2" },
    rail: { costPerKg: 0.35, days: "12-15" },
    sea: { costPerKg: 0.25, days: "20-25" },
  },
  germaniya: {
    auto: { costPerKg: 0.48, days: "10-12" },
    air: { costPerKg: 2.3, days: "2-3" },
    rail: { costPerKg: 0.38, days: "14-18" },
    sea: { costPerKg: 0.28, days: "22-28" },
  },
  baa: {
    auto: { costPerKg: 0.55, days: "12-15" },
    air: { costPerKg: 1.8, days: "1-2" },
    rail: { costPerKg: 0, days: "N/A" },
    sea: { costPerKg: 0.32, days: "18-22" },
  },
  turkiya: {
    auto: { costPerKg: 0.35, days: "5-7" },
    air: { costPerKg: 1.5, days: "1-2" },
    rail: { costPerKg: 0.28, days: "7-10" },
    sea: { costPerKg: 0.2, days: "10-14" },
  },
  rossiya: {
    auto: { costPerKg: 0.3, days: "4-6" },
    air: { costPerKg: 1.2, days: "1" },
    rail: { costPerKg: 0.22, days: "5-8" },
    sea: { costPerKg: 0.18, days: "8-12" },
  },
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadProjects(): ExportProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProjects(projects: ExportProject[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
}

function loadSettings(): CompanySettings {
  if (typeof window === "undefined") {
    return { name: "", inn: "", phone: "", address: "" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { name: "", inn: "", phone: "", address: "" };
}

function getCountryKey(country: string): string {
  const lower = country.toLowerCase();
  if (lower.includes("polsha") || lower.includes("pl")) return "polsha";
  if (lower.includes("german") || lower.includes("de")) return "germaniya";
  if (lower.includes("baa") || lower.includes("dubay") || lower.includes("ae")) return "baa";
  if (lower.includes("turk") || lower.includes("tr")) return "turkiya";
  if (lower.includes("rossi") || lower.includes("ru")) return "rossiya";
  return "polsha"; // default
}

export function useExportData() {
  // Navigation
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Projects
  const [projects, setProjects] = useState<ExportProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Chat
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Canvas
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [canvasTab, setCanvasTab] = useState<"customs" | "market" | "documents">("customs");

  // Logistics
  const [logisticsInput, setLogisticsInput] = useState<LogisticsInput>({
    originCity: "Toshkent",
    destinationCity: "Varshava",
    destinationCountry: "Polsha",
    weightKg: 5000,
    transportType: "auto",
    productType: "",
    temperatureRequired: true,
  });

  // Settings
  const [companySettings, setCompanySettings] = useState<CompanySettings>(loadSettings);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load projects from localStorage
  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  // Save projects to localStorage
  useEffect(() => {
    if (projects.length > 0) {
      saveProjects(projects);
    }
  }, [projects]);

  // Save settings to localStorage
  useEffect(() => {
    if (companySettings.name || companySettings.inn) {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(companySettings));
    }
  }, [companySettings]);

  // Selected project
  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  // Create new project
  const createProject = useCallback(
    (data: { productName: string; weightKg: number; destination: string; origin?: string }) => {
      const newProject: ExportProject = {
        id: generateId(),
        name: `${data.destination} — ${data.weightKg}kg ${data.productName}`,
        productName: data.productName,
        productWeightKg: data.weightKg,
        destinationCountry: data.destination,
        destinationCity: "",
        originCity: data.origin || "Toshkent",
        transportType: "auto",
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProjects((prev) => [newProject, ...prev]);
      setSelectedProjectId(newProject.id);
      return newProject;
    },
    [],
  );

  // Update project with analysis result
  const updateProjectAnalysis = useCallback((projectId: string, analysis: AnalysisResult) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              status: "ready" as const,
              analysisResult: analysis,
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    );
  }, []);

  // Delete project
  const deleteProject = useCallback((projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setSelectedProjectId((prev) => (prev === projectId ? null : prev));
  }, []);

  // Toggle roadmap item
  const toggleRoadmap = useCallback(
    (id: number) => {
      // This will be applied to the selected project's roadmap
      if (selectedProject?.analysisResult) {
        const updatedRoadmap = selectedProject.analysisResult.roadmap.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item,
        );
        updateProjectAnalysis(selectedProject.id, {
          ...selectedProject.analysisResult,
          roadmap: updatedRoadmap,
        });
      }
    },
    [selectedProject, updateProjectAnalysis],
  );

  // Calculate logistics
  const calculateLogistics = useCallback((input: LogisticsInput): LogisticsResult => {
    const countryKey = getCountryKey(input.destinationCountry);
    const rates = LOGISTICS_RATES[countryKey] || LOGISTICS_RATES.polsha;
    const rate = rates[input.transportType];

    const totalCost = input.weightKg * rate.costPerKg;
    const insurance = totalCost * 0.002;

    const routeMap: Record<string, string> = {
      polsha: "Toshkent → Aktau → Baku → Varshava",
      germaniya: "Toshkent → Aktau → Baku → Berlin",
      baa: "Toshkent →Dubay (to'g'ridan-to'g'ri)",
      turkiya: "Toshkent → Ankara → Istanbul",
      rossiya: "Toshkent → Moskva",
    };

    return {
      transportType: input.transportType,
      costPerKg: rate.costPerKg,
      totalCost,
      transitDays: rate.days,
      route: routeMap[countryKey] || "Toshkent → Maqsad mamlakat",
      insurance,
      temperature: input.temperatureRequired ? "+2°C ... +4°C" : undefined,
      notes: [
        "Narxlar taxminiy — aniq narx uchun logistika kompaniyasiga murojaat qiling",
        "Sug&apos;urta narxiga CMR sug&apos;urtasi kiritilgan",
        input.temperatureRequired ? "Refrijerator talab qilinadi" : "",
      ].filter(Boolean),
    };
  }, []);

  // Send message to AI
  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const query = textToSend || chatInput;
      if (!query.trim()) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: query,
      };

      setMessages((prev) => [...prev, userMsg]);
      if (!textToSend) setChatInput("");
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `HTTP ${res.status}`);
        }

        const data = await res.json();

        const aiMsg: ChatMessage = {
          id: generateId(),
          sender: "ai",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: data.answer,
          hasArtifact: Boolean(data.hasAnalysis),
          artifactTitle: data.hasAnalysis
            ? `Eksport Tahlili${data.hs6 ? ` — HS ${data.hs6}` : ""}`
            : undefined,
        };

        setMessages((prev) => [...prev, aiMsg]);

        // Agar tahlil bo'lsa — loyihaga saqlash
        if (data.hasAnalysis && data.tariff) {
          const analysis: AnalysisResult = {
            hsCode: data.hs6 || "",
            productDescription: data.tariff.desc || "",
            euMfnDuty: data.tariff.euMfnPct || 0,
            uzbGspDuty: data.tariff.uzGspPct || 0,
            gspPlusApplicable: data.tariff.uzGspPct === 0,
            roadmap: DEFAULT_ROADMAP,
            logistics: calculateLogistics(logisticsInput),
            documents: [
              {
                id: "1",
                name: "Eksport shartnomasi",
                nameEn: "Export Contract",
                status: "required",
                description: "Ikki tilda tuzilgan oldi-sotdi shartnomasi",
                estimatedDays: "1 kun",
              },
              {
                id: "2",
                name: "Commercial Invoice",
                nameEn: "Commercial Invoice",
                status: "required",
                description: "Xalqaro andoza invoysi",
                estimatedDays: "1 kun",
              },
              {
                id: "3",
                name: "Packing List",
                nameEn: "Packing List",
                status: "required",
                description: "Mahsulot tarkibi va qadoqlash ro'yxati",
                estimatedDays: "1 kun",
              },
              {
                id: "4",
                name: "Fitosanitar sertifikat",
                nameEn: "Phytosanitary Certificate",
                status: "required",
                description: "e-Karantin tizimidan olinadi",
                estimatedDays: "1-2 kun",
              },
              {
                id: "5",
                name: "Kelib chiqish sertifikati",
                nameEn: "Certificate of Origin (Form A)",
                status: "required",
                description: "GSP+ imtiyozidan foydalanish uchun",
                estimatedDays: "2-3 kun",
              },
            ],
            subsidies: [
              {
                id: "1",
                name: "Transport subsidiyasi",
                description:
                  "Eksportni Rag'batlantirish Agentligi transport xarajatlarining 50% ni qoplab beradi",
                coveragePercent: 50,
                estimatedSaving: calculateLogistics(logisticsInput).totalCost * 0.5,
                eligibility: "eligible",
                requirements: [
                  "Eksportchi ro'yxatdan o'tgan bo'lishi",
                  "Mahsulot GSP+ reestrida bo'lishi",
                  "Transport xarajatlari cheklari doirasida",
                ],
              },
            ],
            risks: [
              {
                id: "1",
                category: "logistics",
                title: "Tranzit muddati oshishi",
                description: "Ob-havo yoki chekarda kechikishlar mumkin",
                severity: "low",
                mitigation: "Buffer vaqt qo'shing, ertaroq jo'nating",
              },
              {
                id: "2",
                category: "customs",
                title: "Hujjatlar to'liq emas",
                description: "Bojxona tekshiruvida hujjatlar yetishmasligi",
                severity: "medium",
                mitigation: "Barcha hujjatlarni oldindan tayyorlang",
              },
            ],
            rawAiResponse: data.answer,
            model: data.model || "unknown",
            analyzedAt: new Date().toISOString(),
          };

          // Agar loyiha tanlangan bo'lsa — yangilash, yangi yaratish
          if (selectedProject) {
            updateProjectAnalysis(selectedProject.id, analysis);
          } else {
            const newProject = createProject({
              productName: analysis.productDescription.split(" ").slice(0, 3).join(" "),
              weightKg: logisticsInput.weightKg,
              destination: logisticsInput.destinationCountry,
              origin: logisticsInput.originCity,
            });
            updateProjectAnalysis(newProject.id, analysis);
          }

          setIsPanelOpen(true);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Noma'lum xatolik";
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            sender: "ai",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            text: `Kechirasiz, AI javob bermadi: ${errorMsg}. Qayta urinib ko'ring.`,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [
      chatInput,
      selectedProject,
      logisticsInput,
      calculateLogistics,
      createProject,
      updateProjectAnalysis,
    ],
  );

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next);
      }
      return next;
    });
  }, []);

  return {
    // Navigation
    activeView,
    setActiveView,
    isSidebarOpen,
    setIsSidebarOpen,

    // Projects
    projects,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId,
    createProject,
    deleteProject,

    // Chat
    messages,
    chatInput,
    setChatInput,
    isTyping,
    handleSendMessage,

    // Canvas
    isPanelOpen,
    setIsPanelOpen,
    canvasTab,
    setCanvasTab,

    // Logistics
    logisticsInput,
    setLogisticsInput,
    calculateLogistics,

    // Roadmap
    toggleRoadmap,

    // Settings
    companySettings,
    setCompanySettings,

    // Dark mode
    isDarkMode,
    toggleDarkMode,
  };
}
