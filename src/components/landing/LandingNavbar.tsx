import { Link } from 'react-router-dom';
import { StudioHubLogo } from './LandingIcons';

export function LandingNavbar() {
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

      {/* Action Buttons: Entrar & Ver Planos (Apenas estes permanecem no header) */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          to="/login"
          className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition"
        >
          Entrar
        </Link>
        <Link
          to="/planos"
          className="btn mag bg-white text-black px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs hover:bg-[#f1c40f] transition-colors"
        >
          VER PLANOS
        </Link>
      </div>
    </nav>
  );
}
