// Workspace Navigation Views
export type ActiveView =
  | "chat" // AI Chat & Split Canvas
  | "overview" // Asosiy Tahlil Dashboardi
  | "hscode" // HS-Code Katalogi
  | "logistics" // Logistika Kalkulyatori
  | "market" // Bozor Tahlili & B2B
  | "documents" // Hujjatlar
  | "subsidy" // Subsidiyalar & Risklar
  | "settings"; // Sozlamalar

// Chat message interface
export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  time: string;
  text: string;
  hasArtifact?: boolean;
  artifactTitle?: string;
}

// Project interface (real — user tomonidan yaratiladi)
export interface ExportProject {
  id: string;
  name: string;
  productName: string;
  productWeightKg: number;
  destinationCountry: string;
  destinationCity: string;
  originCity: string;
  transportType: TransportType;
  status: "draft" | "analyzing" | "ready" | "exporting";
  createdAt: string;
  updatedAt: string;
  analysisResult?: AnalysisResult;
}

// AI Analysis Result (API dan keladigan real ma'lumot)
export interface AnalysisResult {
  hsCode: string;
  productDescription: string;
  euMfnDuty: number;
  uzbGspDuty: number;
  gspPlusApplicable: boolean;
  roadmap: RoadmapItem[];
  logistics: LogisticsResult;
  documents: DocumentInfo[];
  subsidies: SubsidyInfo[];
  risks: RiskInfo[];
  rawAiResponse: string;
  model: string;
  analyzedAt: string;
}

// Logistics information
export interface LogisticsInfo {
  transportType: TransportType;
  route: string;
  transitDays: string;
  costPerKg: number;
  totalCost: number;
  insuranceIncluded: boolean;
  temperatureMode?: string;
  borderCrossing?: string;
}

// Document information
export interface DocumentInfo {
  id: string;
  name: string;
  nameEn: string;
  status: "required" | "in_progress" | "ready";
  description: string;
  estimatedDays: string;
}

// Subsidy information
export interface SubsidyInfo {
  id: string;
  name: string;
  description: string;
  coveragePercent: number;
  estimatedSaving: number;
  eligibility: "eligible" | "maybe" | "not_eligible";
  requirements: string[];
}

// Risk information
export interface RiskInfo {
  id: string;
  category: "logistics" | "customs" | "payment" | "quality" | "weather";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  mitigation: string;
}

// HS Code from tariff database (real MacMap data)
export interface HSCode {
  code: string;
  name: string;
  category: string;
  euDuty: string;
  gspDuty: string;
  certs: string[];
}

// Roadmap item interface
export interface RoadmapItem {
  id: number;
  title: string;
  done: boolean;
  time: string;
}

// Transport type
export type TransportType = "auto" | "air" | "rail" | "sea";

// Logistics calculator input
export interface LogisticsInput {
  originCity: string;
  destinationCity: string;
  destinationCountry: string;
  weightKg: number;
  transportType: TransportType;
  productType: string;
  temperatureRequired: boolean;
}

// Logistics calculator result
export interface LogisticsResult {
  transportType: TransportType;
  costPerKg: number;
  totalCost: number;
  transitDays: string;
  route: string;
  transportCompany?: string;
  insurance: number;
  temperature?: string;
  notes: string[];
}

// Company settings (from localStorage)
export interface CompanySettings {
  name: string;
  inn: string;
  phone: string;
  address: string;
  email?: string;
  website?: string;
}

// Market analysis result (AI asosida)
export interface MarketAnalysis {
  targetCountries: TargetCountry[];
  demandScore: number;
  competitors: string[];
  priceRange: { min: number; max: number; currency: string };
  recommendations: string[];
}

// Target country for market analysis
export interface TargetCountry {
  code: string;
  name: string;
  flag: string;
  demandScore: number;
  topCities: string[];
  importRegulations: string[];
}

// API Response from /api/chat
export interface ChatApiResponse {
  answer: string;
  hs6?: string;
  tariff?: {
    hs6: string;
    desc: string;
    chapter: string;
    euMfnPct: number;
    uzGspPct: number;
  };
  hasAnalysis: boolean;
  model?: string;
  cached?: boolean;
  debugCandidates?: string[];
}
