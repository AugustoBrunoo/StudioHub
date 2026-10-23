import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StudioHubLogo } from '@/components/landing/LandingIcons';
import { DashboardIcon } from './DashboardIcons';
import { useAuth } from '@/hooks/useAuth';

interface DashboardNavProps {
  onShowToast: (msg: string) => void;
}

export function DashboardNav({ onShowToast }: DashboardNavProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isPainel = location.pathname === '/dashboard' || location.pathname === '/dashboard/';
  const isAgenda = location.pathname.startsWith('/dashboard/agenda') || location.pathname.startsWith('/dashboard/agendamentos');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarBtnRef = useRef<HTMLButtonElement | null>(null);

  // Dynamic Portuguese Display Info
  const displayName = user?.name || 'João';
  const displayStudio = user?.studioName || 'Studio Navalha de Ouro';
  const initial = (user?.name?.[0] || 'J').toUpperCase();

  // Scroll detection for translucent header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Click outside and escape detection
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        avatarBtnRef.current &&
        !avatarBtnRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSupport = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    onShowToast('Canal de suporte acionado (WhatsApp/Email)');
  };

  return (
    <header
      id="nav"
      className="fixed top-0 inset-x-0 z-[100] px-5 sm:px-8 lg:px-10 py-3.5 flex justify-between items-center transition-all duration-500"
      style={{
        paddingTop: 'calc(0.875rem + env(safe-area-inset-top, 0px))',
        background: isScrolled ? 'rgba(10, 10, 10, 0.6)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(255, 255, 255, 0.06)'
          : '1px solid transparent',
      }}
    >
      {/* Brand */}
      <Link to="/dashboard" className="flex items-center gap-3 group">
        <span className="logo-box">
          <StudioHubLogo id="dash-logo" />
        </span>
        <span className="text-xl font-extrabold tracking-tighter text-white">
          STUDIO<span className="gt">HUB</span>
        </span>
      </Link>

      {/* Center Nav: Painel / Agenda */}
      <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
        <Link
          to="/dashboard"
          className={`px-4 py-2 rounded-full transition ${
            isPainel
              ? 'text-[#f1c40f] bg-[#d4af37]/10 border border-[#d4af37]/25'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Painel
        </Link>
        <Link
          to="/dashboard/agenda"
          className={`px-4 py-2 rounded-full transition ${
            isAgenda
              ? 'text-[#f1c40f] bg-[#d4af37]/10 border border-[#d4af37]/25'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Agenda
        </Link>
      </nav>

      {/* User Avatar & Menu */}
      <div className="relative">
        <button
          ref={avatarBtnRef}
          id="av"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-[#d4af37]/50 transition cursor-pointer"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f1c40f] text-black font-extrabold text-sm flex items-center justify-center shadow-[0_0_18px_rgba(212,175,55,0.35)]">
            {initial}
          </span>
          <DashboardIcon
            name="chev"
            className="text-gray-400 text-base transition-transform duration-300"
            style={{
              transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
            }}
          />
        </button>

        {/* Dropdown Menu */}
        <div
          ref={dropdownRef}
          id="dd"
          className={`absolute right-0 mt-3 w-64 p-2 rounded-2xl border border-white/10 bg-[#111]/90 backdrop-blur-xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] z-50 ${
            isDropdownOpen ? 'on' : ''
          }`}
          role="menu"
        >
          <div className="px-3 pt-2.5 pb-3 mb-1.5 border-b border-white/10">
            <p className="font-semibold text-sm text-white">{displayName}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{displayStudio}</p>
            <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-[.16em] px-2 py-1 rounded-md text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25">
              Plano Solo
            </span>
          </div>

          <div className="md:hidden">
            <Link
              to="/dashboard"
              onClick={() => setIsDropdownOpen(false)}
              className="mi"
              role="menuitem"
            >
              <DashboardIcon name="grid" className="text-lg text-gray-400" />
              Painel
            </Link>
            <Link
              to="/dashboard/agenda"
              onClick={() => setIsDropdownOpen(false)}
              className="mi"
              role="menuitem"
            >
              <DashboardIcon name="cal" className="text-lg text-gray-400" />
              Agenda
            </Link>
            <div className="h-px bg-white/10 my-1.5" />
          </div>

          <Link
            to="/dashboard/configuracoes"
            onClick={() => setIsDropdownOpen(false)}
            className="mi"
            role="menuitem"
          >
            <DashboardIcon name="gear" className="text-lg text-gray-400" />
            Configurações
          </Link>

          <a
            href="#suporte"
            onClick={handleSupport}
            className="mi"
            role="menuitem"
          >
            <DashboardIcon name="help" className="text-lg text-gray-400" />
            Suporte
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="mi out text-left"
            role="menuitem"
          >
            <DashboardIcon name="out" className="text-lg text-red-400" />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
