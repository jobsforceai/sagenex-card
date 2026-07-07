"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { SiteHeader } from "./site-header";
import { HeroSection } from "./hero-section";
import { HighlightsSection } from "./highlights-section";
import { BackupStorySection } from "./backup-story";
import { ChipSection } from "./chip-section";
import { WarrantySection } from "./warranty-section";
import { AiSection } from "./ai-section";
import { ReviewsSection } from "./reviews-section";
import { FaqSection } from "./faq-section";
import { SiteFooter } from "./site-footer";
import { CookieBanner } from "./cookie-banner";
import { EmailPopup } from "./email-popup";

export function LandingPage() {
  useSmoothScroll();

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <HighlightsSection />
        <BackupStorySection />
        <ChipSection />
        <WarrantySection />
        <AiSection />
        <ReviewsSection />
        <FaqSection />
      </main>
      <SiteFooter />
      <CookieBanner />
      <EmailPopup />
    </>
  );
}
