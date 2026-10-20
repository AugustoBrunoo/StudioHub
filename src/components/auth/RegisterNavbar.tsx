import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StudioHubLogo } from '@/components/landing/LandingIcons';

export function RegisterNavbar() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/planos');
    }
  };

  return (
    <nav
      id="nav"
      className="fixed top-0 inset-x-0 z-[100] px-4 sm:px-8 lg:px-10 py-3.5 sm:py-4 flex justify-between items-center opacity-100 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500"
      style={{ paddingTop: 'calc(0.85rem + env(safe-area-inset-top,0px))' }}
    >
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0" title="Ir para a página inicial">
        <span className="logo-box !w-8 !h-8 sm:!w-[34px] sm:!h-[34px]">
          <StudioHubLogo id="reg-logo" />
        </span>
        <span className="text-lg sm:text-xl font-extrabold tracking-tighter">
          STUDIO<span className="gt">HUB</span>
        </span>
      </Link>

      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        aria-label="Voltar"
        title="Voltar"
        className="w-10 h-10 rounded-xl glass border border-white/12 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 flex items-center justify-center text-gray-300 hover:text-[#f1c40f] transition-all duration-300 shadow-sm group active:scale-95 shrink-0"
      >
        <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-[#f1c40f] transition-colors" />
      </button>
    </nav>
  );
}
