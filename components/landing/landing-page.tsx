"use client";

import type { ReactNode } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { SiteHeader } from "./site-header";
import { HeroSection } from "./hero-section";
import { HighlightsSection } from "./highlights-section";
import { CardTypesSection } from "./card-types-section";
import { BackupStorySection } from "./backup-story";
import { ChipSection } from "./chip-section";
import { WarrantySection } from "./warranty-section";
import { AiSection } from "./ai-section";
import { ReviewsSection } from "./reviews-section";
import { FaqSection } from "./faq-section";
import { SiteFooter } from "./site-footer";
import { CookieBanner } from "./cookie-banner";
import { EmailPopup } from "./email-popup";

export function LandingPage({ blogsSection }: { blogsSection?: ReactNode }) {
  useSmoothScroll();

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <HighlightsSection />
        <CardTypesSection />
        <BackupStorySection />
        <ChipSection />
        <WarrantySection />
        <AiSection />
        <ReviewsSection />
        {blogsSection}
        <FaqSection />
      </main>
      <SiteFooter />
      <CookieBanner />
      <EmailPopup />
    </>
  );
}
