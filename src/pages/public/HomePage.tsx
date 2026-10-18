import { useState, useRef } from 'react';
import {
  GrainientBackground,
  LandingNavbar,
  LandingMobileMenu,
  LandingHero,
  LandingFeatures,
  LandingHowItWorks,
  LandingDifferential,
  LandingFaq,
  LandingCta,
  LandingFooter,
  useLandingAnimations,
} from '@/components/landing';

export function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hook managing all ScrollTrigger, GSAP timelines, spotlights, and magnetic buttons
  useLandingAnimations(containerRef);

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#f5f5f5]">
      {/* Dynamic Background with WebGL2 Grainient Shader */}
      <GrainientBackground />

      {/* Navigation Header (Logo + Entrar & Ver Planos on desktop, Hamburger on mobile) */}
      <LandingNavbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
      />

      {/* Mobile Drawer Menu */}
      <LandingMobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Hero Section */}
      <LandingHero />

      {/* Features Grid */}
      <LandingFeatures />

      {/* How it Works / Steps */}
      <LandingHowItWorks />

      {/* Unique Differential & Automated Conflict Mediation Chat */}
      <LandingDifferential />

      {/* FAQ Accordion */}
      <LandingFaq />

      {/* Final Call To Action */}
      <LandingCta />

      {/* Footer com Powered By Noda */}
      <LandingFooter />
    </div>
  );
}
