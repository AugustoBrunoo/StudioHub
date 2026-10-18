import { useRef, useState } from 'react';
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

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : 'auto';
      return next;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#f5f5f5]">
      {/* Dynamic Background with WebGL2 Grainient Shader */}
      <GrainientBackground />

      {/* Navigation Header */}
      <LandingNavbar menuOpen={menuOpen} onToggleMenu={toggleMenu} />

      {/* Responsive Mobile Drawer Menu */}
      <LandingMobileMenu isOpen={menuOpen} onClose={closeMenu} />

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

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
