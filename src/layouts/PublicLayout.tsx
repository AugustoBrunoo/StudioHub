import { Link, Outlet, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, LogIn, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const CURRENT_YEAR = new Date().getFullYear();

export function PublicLayout() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { label: 'Início', path: '/' },
    { label: 'Planos', path: '/planos' },
    { label: 'Sobre', path: '/sobre' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white text-lg leading-tight">
                StudioHub
              </span>
              <span className="text-[10px] text-emerald-400 font-mono tracking-wider">
                PLATFORM
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${isActive
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm" variant="primary" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                  Acessar Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm" variant="ghost" leftIcon={<LogIn className="w-4 h-4" />}>
                    Entrar
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Começar Grátis
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-12 relative z-10 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-bold text-white text-base">StudioHub</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A plataforma definitiva para gerenciamento, agendamento e colaboração em estúdios de produção musical e audiovisual.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Plataforma
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/planos" className="hover:text-emerald-400 transition-colors">Planos & Preços</Link></li>
              <li><Link to="/sobre" className="hover:text-emerald-400 transition-colors">Sobre Nós</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Área do Usuário</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Acessos
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Login / Autenticação</Link></li>
              <li><Link to="/cadastro" className="hover:text-emerald-400 transition-colors">Criar Nova Conta</Link></li>
              <li><Link to="/dashboard/studios" className="hover:text-emerald-400 transition-colors">Explorar Estúdios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Status do Sistema
            </h4>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Todos os sistemas operacionais
              </div>
              <p className="text-[11px] text-slate-500">React 19 + TypeScript + Tailwind v3</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-slate-900 text-center text-xs text-slate-500">
          © {CURRENT_YEAR} StudioHub. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
