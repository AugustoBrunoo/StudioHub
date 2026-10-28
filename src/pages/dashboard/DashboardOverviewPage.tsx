import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Seo } from '@/components/common/Seo';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardToast } from '@/layouts/DashboardLayout';
import {
  FocusAppointmentCard,
  type Appointment,
} from '@/components/dashboard/FocusAppointmentCard';
import { AutomationCard } from '@/components/dashboard/AutomationCard';
import { DailyKpiCard } from '@/components/dashboard/DailyKpiCard';
import { QuickActionsCard } from '@/components/dashboard/QuickActionsCard';

const INITIAL_QUEUE: Appointment[] = [
  { id: '1', n: 'Marcelo Andrade', s: 'Corte + Barba', t: '14:00', e: '– 14:45' },
  { id: '2', n: 'Rafael Lima', s: 'Corte', t: '15:00', e: '– 15:30' },
  { id: '3', n: 'Bruno Teixeira', s: 'Barba', t: '15:30', e: '– 15:45' },
];

export function DashboardOverviewPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleShowToast = useDashboardToast();
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  // Queue and Stats State
  const [queue, setQueue] = useState<Appointment[]>(INITIAL_QUEUE);
  const [stats, setStats] = useState({
    ag: 8, // Agendados
    at: 3, // Atendidos
    fa: 1, // Faltas
  });

  const [isPaused, setIsPaused] = useState(false);
  const [eta, setEta] = useState<number>(() => Date.now() + 32 * 60000);
  const [chipTime, setChipTime] = useState('32:00');

  // Greeting & Date
  const now = new Date();
  const hours = now.getHours();
  const greeting = hours < 12 ? 'Bom dia' : hours < 18 ? 'Boa tarde' : 'Boa noite';
  const dateString = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const firstName = user?.name?.split(' ')[0] || 'João';

  // Countdown clock every second
  useEffect(() => {
    const updateCountdown = () => {
      if (queue.length === 0) return;
      const diffSeconds = Math.max(0, Math.floor((eta - Date.now()) / 1000));
      const mm = String(Math.floor(diffSeconds / 60)).padStart(2, '0');
      const ss = String(diffSeconds % 60).padStart(2, '0');
      setChipTime(`${mm}:${ss}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eta, queue.length]);

  // Entrance animations via GSAP (Navbar animation is handled at DashboardLayout on initial enter)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('#hello > *', { y: 20, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.05)
        .from(
          '.rise',
          {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            clearProps: 'opacity,transform',
          },
          0.2
        );
    }, pageContainerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Cancel action on next in queue
  const handleCancelAppointment = () => {
    if (queue.length === 0) return;

    setQueue((prev) => prev.slice(1));
    setStats((prev) => ({
      ...prev,
      ag: Math.max(prev.at, prev.ag - 1),
    }));
    setEta(Date.now() + 30 * 60000);
    handleShowToast('Atendimento cancelado');
  };

  // Quick Action: Pause toggle
  const handleTogglePause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      handleShowToast(next ? 'Pausa iniciada' : 'Pausa encerrada');
      return next;
    });
  };

  return (
    <div ref={pageContainerRef} className="w-full">
      <Seo
        title="StudioHub | Painel"
        description="Painel operacional do StudioHub. Acompanhe seus atendimentos, métricas em tempo real e automações com elegância e eficiência."
        canonicalUrl="https://studiohub.nodasolucoes.dev/dashboard"
      />

      {/* Main Dashboard Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-24 pb-6 sm:pb-8 lg:pb-10 relative z-10 w-full overflow-hidden">
        {/* Hello Greeting Header */}
        <div
          id="hello"
          className="mb-3.5 sm:mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1.5 sm:gap-2"
        >
          <div>
            <p
              className="tag !text-[#d4af37] text-[10px] sm:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.2em] mb-1 uppercase"
              id="date"
            >
              {dateString}
            </p>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              <span id="greet">{greeting}</span>,{' '}
              <span className="gt">{firstName}.</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-tight text-gray-400 sm:self-end pb-0.5">
            Seu dia, <span className="text-white">num relance.</span>
          </p>
        </div>

        {/* Widgets Grid */}
        <div className="grid md:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-6 w-full items-start">
          {/* Left Column (col-span-7) */}
          <div className="md:col-span-7 flex flex-col gap-4 lg:gap-6 w-full min-w-0">
            {/* Widget 1: Focus Card */}
            <FocusAppointmentCard
              currentAppointment={queue[0] || null}
              nextAppointment={queue[1] || null}
              chipTime={chipTime}
              onCancel={handleCancelAppointment}
              onDetails={() => handleShowToast('Detalhes do atendimento abertos')}
            />

            {/* Widget 4: Automation Card */}
            <AutomationCard
              onClickConversations={() =>
                handleShowToast('Visualização de conversas do robô')
              }
            />
          </div>

          {/* Right Column (col-span-5) */}
          <div className="md:col-span-5 flex flex-col gap-4 lg:gap-6 w-full min-w-0">
            {/* Widget 2: Raio-X do dia */}
            <DailyKpiCard
              agendados={stats.ag}
              atendidos={stats.at}
              faltas={stats.fa}
              onViewSchedule={() => navigate('/dashboard/agenda')}
            />

            {/* Widget 3: Ações Rápidas */}
            <QuickActionsCard
              isPaused={isPaused}
              onTogglePause={handleTogglePause}
              onActionToast={handleShowToast}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Export both names for maximum compatibility
export { DashboardOverviewPage as DashboardPage };
