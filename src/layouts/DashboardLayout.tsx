import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut, 
  Sparkles, 
  Menu, 
  X, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/Badge';
import type { UserRole } from '@/types/user';
import { getInitials } from '@/utils/formatters';

interface DashboardRoute {
  title: string;
  path: string;
  icon: typeof LayoutDashboard;
  allowedRoles?: UserRole[];
  badge?: string;
}

const dashboardRoutes: DashboardRoute[] = [
  {
    title: 'Visão Geral',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Estúdios',
    path: '/dashboard/studios',
    icon: Building2,
    badge: '4',
  },
  {
    title: 'Agendamentos',
    path: '/dashboard/agendamentos',
    icon: CalendarCheck,
    badge: 'Novo',
  },
  {
    title: 'Gestão de Usuários',
    path: '/dashboard/usuarios',
    icon: Users,
    allowedRoles: ['admin', 'studio_manager'],
  },
  {
    title: 'Configurações',
    path: '/dashboard/configuracoes',
    icon: Settings,
  },
];

const roleLabels: Record<UserRole, { label: string; desc: string }> = {
  admin: { label: 'Administrador', desc: 'Acesso total' },
  studio_manager: { label: 'Gestor de Estúdio', desc: 'Gerencia estúdios e agenda' },
  creator: { label: 'Criador / Produtor', desc: 'Reserva e produz' },
  client: { label: 'Cliente', desc: 'Visualiza agendamentos' },
};

export function DashboardLayout() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentRole = user?.role || 'creator';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row selection:bg-emerald-500 selection:text-slate-950">
      {/* Mobile Top Bar */}
      <header className="md:hidden border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-bold text-white tracking-tight">StudioHub</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900/95 border-r border-slate-800/80 flex flex-col justify-between backdrop-blur-xl transition-transform duration-300 md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-white text-base">StudioHub</span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider">
                  DASHBOARD
                </span>
              </div>
            </Link>
          </div>

          {/* Persona / Role Selector Badge for Development Testing */}
          <div className="p-4 border-b border-slate-800/60 bg-slate-950/40">
            <div className="relative">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Perfil Ativo</span>
                <span className="text-[10px] text-emerald-400 font-normal">Clique p/ alternar</span>
              </div>
              <button
                type="button"
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 transition-all text-left"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Badge roleType={currentRole} size="sm">
                    {roleLabels[currentRole]?.label}
                  </Badge>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </button>

              {/* Role Dropdown */}
              {roleSwitcherOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-1.5 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl z-50 space-y-1">
                  {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        switchRole(r);
                        setRoleSwitcherOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        currentRole === r
                          ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                          : 'hover:bg-slate-700/60 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{roleLabels[r].label}</div>
                        <div className="text-[10px] text-slate-400">{roleLabels[r].desc}</div>
                      </div>
                      {currentRole === r && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
              Menu Principal
            </div>

            {dashboardRoutes.map((route) => {
              const Icon = route.icon;
              const hasPermission =
                !route.allowedRoles || route.allowedRoles.includes(currentRole);
              const isActive =
                route.path === '/dashboard'
                  ? location.pathname === '/dashboard'
                  : location.pathname.startsWith(route.path);

              if (!hasPermission) {
                return (
                  <div
                    key={route.path}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-600 cursor-not-allowed opacity-60"
                    title="Acesso restrito ao perfil de Administrador/Gestor"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{route.title}</span>
                    </div>
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                );
              }

              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  end={route.path === '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{route.title}</span>
                  </div>
                  {route.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {route.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout Bottom */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 mb-3 border border-slate-850">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
              {getInitials(user?.name || 'User')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 border border-slate-700/60 text-xs text-slate-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
