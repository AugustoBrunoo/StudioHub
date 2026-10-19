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
      className="fixed top-0 inset-x-0 z-[100] px-5 sm:px-8 lg:px-10 py-3.5 sm:py-4 flex justify-between items-center opacity-100 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500"
      style={{ paddingTop: 'calc(0.85rem + env(safe-area-inset-top,0px))' }}
    >
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <span className="logo-box !w-8 !h-8 sm:!w-[34px] sm:!h-[34px]">
          <StudioHubLogo id="nav-logo" />
        </span>
        <span className="text-lg sm:text-xl font-extrabold tracking-tighter">
          STUDIO<span className="gt">HUB</span>
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-8 xl:gap-10 text-[11px] font-semibold uppercase tracking-[.22em] text-gray-400">
        <a href="#como-funciona" className="hover:text-white transition-colors duration-200">
          Como funciona?
        </a>
        <a href="#diferencial" className="hover:text-white transition-colors duration-200">
          Diferenciais
        </a>
        <a href="#faq" className="hover:text-white transition-colors duration-200">
          Dúvidas
        </a>
      </div>

      {/* Desktop Actions: Entrar & Ver Planos */}
      <div className="hidden lg:flex items-center gap-6">
        <Link
          to="/login"
          id="nav-login"
          className="text-xs font-semibold uppercase tracking-widest cursor-pointer px-1 py-1"
        >
          Entrar
        </Link>
        <Link
          to="/planos"
          className="btn bg-white hover:bg-[#f1c40f] text-black px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          VER PLANOS
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        id="mt"
        onClick={onToggleMenu}
        className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-xl z-[110] relative focus:outline-none"
        aria-label="Menu"
      >
        <span
          className="w-6 h-0.5 bg-white transition-all duration-300 origin-center"
          style={{
            transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
          }}
        />
        <span
          className="w-6 h-0.5 bg-white transition-all duration-300"
          style={{ opacity: menuOpen ? 0 : 1 }}
        />
        <span
          className="w-6 h-0.5 bg-white transition-all duration-300 origin-center"
          style={{
            transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
          }}
        />
      </button>
    </nav>
  );
}
