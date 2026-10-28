import { useCallback, useRef } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { DashboardBackground } from '@/components/dashboard/DashboardBackground';
import {
  DashboardToast,
  type DashboardToastHandle,
} from '@/components/dashboard/DashboardToast';

export interface DashboardOutletContext {
  showToast: (msg: string) => void;
}

export function useDashboardToast() {
  const context = useOutletContext<DashboardOutletContext>();
  return context?.showToast || (() => {});
}

export function DashboardLayout() {
  const location = useLocation();
  const toastRef = useRef<DashboardToastHandle | null>(null);

  const handleShowToast = useCallback((msg: string) => {
    toastRef.current?.show(msg);
  }, []);

  const isFullLayoutPage =
    location.pathname === '/dashboard' ||
    location.pathname === '/dashboard/' ||
    location.pathname.startsWith('/dashboard/agenda') ||
    location.pathname.startsWith('/dashboard/agendamentos');

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#d4af37]/30 selection:text-white relative overflow-x-hidden">
      <DashboardBackground />
      <DashboardNav onShowToast={handleShowToast} />
      {isFullLayoutPage ? (
        <Outlet context={{ showToast: handleShowToast } satisfies DashboardOutletContext} />
      ) : (
        <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-16 relative z-10">
          <Outlet context={{ showToast: handleShowToast } satisfies DashboardOutletContext} />
        </main>
      )}
      <DashboardToast ref={toastRef} />
    </div>
  );
}

