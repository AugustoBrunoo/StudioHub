import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { StudioHubLogo } from '@/components/landing/LandingIcons';

export function PricingNavbar() {
  return (
    <nav
      id="nav"
      className="fixed top-0 inset-x-0 z-[100] px-4 sm:px-8 lg:px-10 py-3.5 sm:py-4 flex justify-between items-center transition-all duration-500"
      style={{ paddingTop: 'calc(0.85rem + env(safe-area-inset-top,0px))' }}
    >
      {/* Left: StudioHub Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <span className="logo-box !w-8 !h-8 sm:!w-[34px] sm:!h-[34px]">
          <StudioHubLogo id="pricing-nav-logo" />
        </span>
        <span className="text-lg sm:text-xl font-extrabold tracking-tighter">
          STUDIO<span className="gt">HUB</span>
        </span>
      </Link>

      {/* Right: Home Button with soft rounded-square border */}
      <Link
        to="/"
        aria-label="Voltar para a página inicial"
        title="Voltar para a página inicial"
        className="w-10 h-10 rounded-xl glass border border-white/12 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 flex items-center justify-center text-gray-300 hover:text-[#f1c40f] transition-all duration-300 shadow-sm group active:scale-95 shrink-0"
      >
        <Home className="w-5 h-5 text-gray-300 group-hover:text-[#f1c40f] transition-colors" />
      </Link>
    </nav>
  );
}
