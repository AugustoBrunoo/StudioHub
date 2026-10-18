import { useEffect, useState, useRef, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface LandingMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Início', href: '#hero' },
  { id: 'funcionalidades', label: 'Recursos', href: '#funcionalidades' },
  { id: 'como-funciona', label: 'Como Funciona', href: '#como-funciona' },
  { id: 'diferencial', label: 'Diferenciais', href: '#diferencial' },
  { id: 'faq', label: 'Dúvidas Frequentes', href: '#faq' },
];

export function LandingMobileMenu({ isOpen, onClose }: LandingMobileMenuProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Detect which section is currently active based on viewport position
  const updateActiveSection = () => {
    if (isManualScrollRef.current) return;

    const scrollY = window.scrollY;
    const viewportThreshold = scrollY + window.innerHeight * 0.35;

    // At top of page -> Hero
    if (scrollY < 200) {
      setActiveSection('hero');
      return;
    }

    // Near page bottom -> FAQ
    if (
      window.innerHeight + scrollY >=
      document.documentElement.scrollHeight - 80
    ) {
      setActiveSection('faq');
      return;
    }

    // Iterate sections from bottom to top
    for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
      const section = document.getElementById(NAV_ITEMS[i].id);
      if (section) {
        const top = section.offsetTop;
        if (viewportThreshold >= top) {
          setActiveSection(NAV_ITEMS[i].id);
          return;
        }
      }
    }

    setActiveSection('hero');
  };

  useEffect(() => {
    if (isOpen) {
      updateActiveSection();
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen && !isManualScrollRef.current) {
        updateActiveSection();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    isManualScrollRef.current = true;
    onClose();

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    // Smooth scroll to target element after drawer starts closing
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }

      // Re-enable automatic scroll detection once smooth scroll finishes
      scrollTimeoutRef.current = window.setTimeout(() => {
        isManualScrollRef.current = false;
      }, 1000);
    }, 120);
  };

  return (
    <div
      id="menu"
      className={`fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl z-[95] lg:hidden flex flex-col items-center justify-center text-center p-6 sm:p-8 transition-all duration-500 ${
        isOpen ? 'on pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div className="flex flex-col gap-2 max-w-xs w-full">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`group flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#d4af37]/15 border border-[#d4af37]/40 text-white shadow-[0_0_20px_rgba(212,175,55,0.12)]'
                  : 'border border-transparent hover:border-white/10 hover:bg-white/5 active:scale-[0.98]'
              }`}
            >
              {/* Static Indicator Dot (without ping animation) */}
              <div className="flex items-center justify-center w-4 h-4 shrink-0">
                <span
                  className={`rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-2 h-2 bg-gradient-to-tr from-[#d4af37] to-[#f1c40f] shadow-[0_0_8px_rgba(212,175,55,0.7)]'
                      : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-[#d4af37]/50'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-sm tracking-widest uppercase font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-gray-400 group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-3" />

        <Link
          to="/login"
          onClick={onClose}
          className="text-xs uppercase tracking-widest font-semibold text-[#d4af37] hover:text-[#f1c40f] transition-colors py-2"
        >
          Entrar
        </Link>

        <Link
          to="/planos"
          onClick={onClose}
          className="btn btn-gold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-lg hover:brightness-105 transition-all mt-1"
        >
          VER PLANOS
        </Link>
      </div>
    </div>
  );
}
