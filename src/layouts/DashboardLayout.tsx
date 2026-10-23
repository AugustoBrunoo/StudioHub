import { Outlet, useLocation } from 'react-router-dom';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { DashboardBackground } from '@/components/dashboard/DashboardBackground';

export function DashboardLayout() {
  const location = useLocation();
  const isFullLayoutPage =
    location.pathname === '/dashboard' ||
    location.pathname === '/dashboard/' ||
    location.pathname.startsWith('/dashboard/agenda') ||
    location.pathname.startsWith('/dashboard/agendamentos');

  if (isFullLayoutPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#d4af37]/30 selection:text-white relative overflow-x-hidden">
      <DashboardBackground />
      <DashboardNav onShowToast={() => {}} />
      <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-16 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
