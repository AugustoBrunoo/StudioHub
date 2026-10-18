import { Link } from 'react-router-dom';
import { StudioHubLogo } from './LandingIcons';

interface LandingNavbarProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export function LandingNavbar({ menuOpen, onToggleMenu }: LandingNavbarProps) {
  return (
    <nav
      id="nav"
      className="fixed top-0 inset-x-0 z-[100] px-6 lg:px-10 py-4 flex justify-between items-center transition-all duration-500"
      style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top,0px))' }}
    >
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3">
        <span className="logo-box">
          <StudioHubLogo id="nav-logo" />
        </span>
        <span className="text-xl font-extrabold tracking-tighter">
          STUDIO<span className="gt">HUB</span>
        </span>
      </Link>

      {/* Desktop Menu Links */}
      <div className="hidden lg:flex gap-10 text-[11px] font-semibold uppercase tracking-[.22em] text-gray-400">
        <a href="#como-funciona" className="hover:text-white transition">
          Como funciona?
        </a>
        <a href="#diferencial" className="hover:text-white transition">
          Suporte
        </a>
        <Link to="/sobre" className="hover:text-white transition">
          Equipe
        </Link>
      </div>

      {/* CTA / Action Buttons & Mobile Hamburger */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-6">
          <Link
            to="/login"
            className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition"
          >
            Entrar
          </Link>
          <Link
            to="/planos"
            className="btn mag bg-white text-black px-6 py-2.5 rounded-full text-xs hover:bg-[#f1c40f]"
          >
            VER PLANOS
          </Link>
        </div>

        {/* Mobile Hamburger Button with Animated Bars */}
        <button
          id="mt"
          onClick={onToggleMenu}
          className="lg:hidden flex flex-col gap-1.5 z-[110]"
          aria-label="Menu"
        >
          <span
            className="w-6 h-0.5 bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="w-6 h-0.5 bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="w-6 h-0.5 bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>
    </nav>
  );
}
