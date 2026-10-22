import { useRef } from 'react';
import gsap from 'gsap';
import { DashboardIcon } from './DashboardIcons';

export interface Appointment {
  id: string;
  n: string;
  s: string;
  t: string;
  e: string;
}

interface FocusAppointmentCardProps {
  currentAppointment: Appointment | null;
  nextAppointment: Appointment | null;
  chipTime: string;
  onCancel: () => void;
  onDetails: () => void;
}

export function FocusAppointmentCard({
  currentAppointment,
  nextAppointment,
  chipTime,
  onCancel,
  onDetails,
}: FocusAppointmentCardProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleCancelClick = () => {
    if (!currentAppointment || !contentRef.current) return;

    const el = contentRef.current;
    gsap
      .timeline()
      .to(el, {
        y: -24,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          onCancel();
        },
      })
      .fromTo(
        el,
        { y: 30, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power4.out' }
      );
  };

  return (
    <article className="card focus-card w-full rise p-7 sm:p-9 flex-1 flex flex-col">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 mb-7">
        <div>
          <span className="tag text-[#d4af37]">
            <span className="w-6 h-px bg-[#d4af37]" />
            Em foco · Próximo atendimento
          </span>
        </div>

        {currentAppointment && (
          <span
            id="chip"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-200 tabular-nums shrink-0"
          >
            <DashboardIcon name="clock" className="text-sm text-[#d4af37]" />
            <span id="chipT">Começa em {chipTime}</span>
          </span>
        )}
      </div>

      {/* Main Focus Content Area */}
      <div ref={contentRef} id="fc" className="flex-1 flex flex-col">
        {currentAppointment ? (
          <>
            <div className="flex items-center gap-5 mb-7">
              <div
                id="ini"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#d4af37]/25 to-[#f1c40f]/5 border border-[#d4af37]/30 flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-[#f1c40f] shrink-0"
              >
                {getInitials(currentAppointment.n)}
              </div>

              <div className="min-w-0">
                <h2
                  id="cn"
                  className="text-2xl sm:text-4xl font-extrabold tracking-tight truncate text-white"
                >
                  {currentAppointment.n}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span
                    id="cs"
                    className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25"
                  >
                    <DashboardIcon name="cut" />
                    <span id="csT">{currentAppointment.s}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <span
                id="ct"
                className="text-5xl sm:text-6xl font-extrabold tracking-tighter tabular-nums text-white"
              >
                {currentAppointment.t}
              </span>
              <span
                id="ce"
                className="text-xl sm:text-2xl text-gray-500 font-semibold tabular-nums"
              >
                {currentAppointment.e}
              </span>
            </div>

            <p className="text-sm text-gray-500" id="nxt">
              {nextAppointment
                ? `Depois: ${nextAppointment.t} · ${nextAppointment.n} · ${nextAppointment.s}`
                : 'Este é o último atendimento do dia.'}
            </p>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
            <div className="ibox mb-5 !w-16 !h-16 text-3xl">
              <DashboardIcon
                name="done"
                className="text-[#d4af37]"
                style={{ width: '1.6em', height: '1.6em' }}
              />
            </div>
            <h2 className="text-2xl font-extrabold mb-2 text-white">
              Agenda do dia concluída
            </h2>
            <p className="text-gray-500 text-sm">
              Bom trabalho! Não há mais atendimentos hoje.
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      {currentAppointment && (
        <div className="flex flex-col sm:flex-row gap-3 mt-9">
          <button
            type="button"
            id="details"
            onClick={onDetails}
            className="btn btn-gold flex-1 sm:flex-[1.6] py-5 rounded-2xl text-lg cursor-pointer"
          >
            <DashboardIcon name="eye" className="text-xl" />
            Ver detalhes
          </button>
          <button
            type="button"
            id="cancel"
            onClick={handleCancelClick}
            className="btn btn-ghost btn-danger flex-1 py-5 rounded-2xl text-base cursor-pointer"
          >
            <DashboardIcon name="x" className="text-xl" />
            Cancelar
          </button>
        </div>
      )}
    </article>
  );
}
