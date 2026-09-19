"use client";

import { ArrowRight, Globe, Sparkles, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { NAV_LINKS, SITE } from "@/lib/landing";
import { useAuth } from "@/contexts/AuthContext";

interface SiteHeaderProps {
  onOpenLogin?: () => void;
}

export function SiteHeader({ onOpenLogin }: SiteHeaderProps) {
  const [lang, setLang] = useState<"UZ" | "RU" | "EN">("UZ");
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-full border border-border/80 bg-card/85 px-4 py-2 shadow-sm backdrop-blur-md transition-all sm:px-6 sm:py-2.5">
      <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
        <span className="relative grid size-7 place-items-center rounded-full bg-ai text-ai-foreground shadow-sm ring-2 ring-ai/20">
          <Sparkles size={15} strokeWidth={2.5} />
        </span>
        <span className="text-base sm:text-lg">
          {SITE.name.split(".")[0]}
          <span className="text-ai">.{SITE.name.split(".")[1]}</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Language selector */}
        <div className="hidden items-center gap-1 rounded-full border border-border/80 bg-secondary/50 p-1 text-xs font-semibold sm:flex">
          <Globe size={13} className="ml-1.5 text-muted-foreground" />
          {(["UZ", "RU", "EN"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLang(item)}
              className={`rounded-full px-2 py-0.5 transition-all ${
                lang === item
                  ? "bg-card font-bold text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {user ? (
          <>
            <Link
              href="/workspace"
              className="hidden text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            >
              Workspace
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="hidden text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:inline-block flex items-center gap-1.5"
            >
              <LogOut size={14} />
              Chiqish
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onOpenLogin}
              className="hidden text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:inline-block cursor-pointer"
            >
              Kirish
            </button>

            <button
              type="button"
              onClick={onOpenLogin}
              className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow cursor-pointer sm:px-5 sm:text-sm"
            >
              <span>Bepul boshlash</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
