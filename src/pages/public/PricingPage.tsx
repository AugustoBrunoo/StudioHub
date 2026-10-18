import { useRef } from 'react';
import {
  PricingBackground,
  PricingNavbar,
  PricingHero,
  PricingPlans,
  PricingEasyWallet,
  PricingFaq,
  usePricingAnimations,
} from '@/components/pricing';
import { LandingFooter } from '@/components/landing/LandingFooter';

export function PricingPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Hook managing all ScrollTrigger, GSAP timelines, counters, spotlights, and magnetic buttons
  usePricingAnimations(containerRef);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen text-[#f5f5f5] overflow-x-hidden w-full selection:bg-[#d4af37]/30 selection:text-white"
    >
      {/* Dynamic Golden Ambient Background (visible at z-0) */}
      <PricingBackground />

      <div className="relative z-10 w-full overflow-x-hidden flex flex-col">
        {/* Top scroll progress indicator bar */}
        <div id="prog" />

        {/* Navigation Header with Brand on left and Home button on right */}
        <PricingNavbar />

        {/* Hero Section */}
        <PricingHero />

        {/* 2-Tier Pricing Plans Grid (Solo & Empresarial) */}
        <PricingPlans />

        {/* EasyWallet Feature Section */}
        <PricingEasyWallet />

        {/* FAQ Grid */}
        <PricingFaq />

        {/* Footer */}
        <LandingFooter />
      </div>
    </div>
  );
}
