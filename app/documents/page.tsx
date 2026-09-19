import type { Metadata } from "next";

import { DocumentCenter } from "@/components/documents/DocumentCenter";

export const metadata: Metadata = {
  title: "Hujjatlar Markazi (PDF & Invoys) — ExportYor.AI",
  description:
    "Xalqaro savdo shartnomalari, Commercial Invoice va Packing List hujjatlarini real vaqtda tahrirlash va PDF ko'rinishida yuklab olish.",
};

export default function DocumentsPage() {
  return <DocumentCenter />;
}
