"use client";

import { useState } from "react";

import { LoginModal } from "@/components/auth/LoginModal";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { CtaBanner, SiteFooter } from "@/components/landing/cta-banner";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { FaqSection } from "@/components/landing/faq-section";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { HeroPrompt } from "@/components/landing/hero-prompt";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SiteHeader } from "@/components/landing/site-header";
import { SocialProof } from "@/components/landing/social-proof";

export function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-primary/15 selection:text-primary">
      {/* Top mesh ambient glow */}
      <div
        aria-hidden="true"
        className="mesh-glow pointer-events-none absolute inset-x-0 top-0 h-[820px] opacity-90"
      />

      {/* Header with auth trigger */}
      <SiteHeader onOpenLogin={() => setIsAuthOpen(true)} />

      {/* Main Page Content */}
      <main className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <HeroPrompt />
        <SocialProof />
        <DashboardPreview />
        <FeatureGrid />
        <HowItWorks />
        <ComparisonSection />
        <FaqSection />
        <CtaBanner onOpenLogin={() => setIsAuthOpen(true)} />
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* B2B SaaS Login / Register Modal */}
      <LoginModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
