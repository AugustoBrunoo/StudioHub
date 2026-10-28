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
    <article className="card focus-card w-full rise p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2.5 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          <span className="tag text-[#d4af37] text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.2em] font-bold uppercase truncate">
            Próximo atendimento
          </span>
        </div>

        {currentAppointment && (
          <span
            id="chip"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10.5px] sm:text-xs font-semibold bg-white/5 border border-white/10 text-gray-200 tabular-nums shrink-0 shadow-sm"
          >
            <DashboardIcon name="clock" className="text-xs sm:text-sm text-[#d4af37]" />
            <span id="chipT">Começa em {chipTime}</span>
          </span>
        )}
      </div>

      {/* Main Focus Content Area */}
      <div ref={contentRef} id="fc" className="flex-1 flex flex-col justify-center">
        {currentAppointment ? (
          <>
            {/* Client Info Row */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div
                id="ini"
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#d4af37]/25 to-[#f1c40f]/5 border border-[#d4af37]/35 flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-extrabold text-[#f1c40f] shrink-0 shadow-[0_0_16px_rgba(212,175,55,0.2)]"
              >
                {getInitials(currentAppointment.n)}
              </div>

              <div className="min-w-0 flex-1">
                <h2
                  id="cn"
                  className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight truncate text-white"
                >
                  {currentAppointment.n}
                </h2>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                  <span
                    id="cs"
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 rounded-full text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 max-w-full"
                  >
                    <DashboardIcon name="cut" className="text-xs shrink-0" />
                    <span id="csT" className="truncate">{currentAppointment.s}</span>
                  </span>
                  <span className="inline-flex items-center text-[9.5px] sm:text-[10.5px] font-semibold px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    Confirmado
                  </span>
                </div>
              </div>
            </div>

            {/* Schedule & Timing KPI Box */}
            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.07] mb-3 sm:mb-4">
              <div className="flex items-baseline justify-between flex-wrap gap-1.5 mb-1.5">
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span
                    id="ct"
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight tabular-nums text-white"
                  >
                    {currentAppointment.t}
                  </span>
                  <span
                    id="ce"
                    className="text-sm sm:text-base lg:text-lg text-gray-400 font-medium tabular-nums"
                  >
                    {currentAppointment.e}
                  </span>
                </div>
                <span className="text-[9.5px] sm:text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">
                  Horário marcado
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-1.5 border-t border-white/[0.06]" id="nxt">
                <span className="text-gray-500 font-medium shrink-0">A seguir:</span>
                <span className="truncate text-gray-300">
                  {nextAppointment
                    ? `${nextAppointment.t} · ${nextAppointment.n} (${nextAppointment.s})`
                    : 'Este é o último atendimento do dia.'}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6 sm:py-8">
            <div className="ibox mb-3 sm:mb-4 !w-12 !h-12 sm:!w-14 sm:!h-14 text-xl sm:text-2xl">
              <DashboardIcon
                name="done"
                className="text-[#d4af37]"
                style={{ width: '1.3em', height: '1.3em' }}
              />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold mb-1 text-white">
              Agenda do dia concluída
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Bom trabalho! Não há mais atendimentos hoje.
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      {currentAppointment && (
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          <button
            type="button"
            id="details"
            onClick={onDetails}
            className="btn btn-gold w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold cursor-pointer"
          >
            <DashboardIcon name="eye" className="text-sm sm:text-base shrink-0" />
            <span>Ver detalhes</span>
          </button>
          <button
            type="button"
            id="cancel"
            onClick={handleCancelClick}
            className="btn btn-ghost btn-danger w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold cursor-pointer"
          >
            <DashboardIcon name="x" className="text-sm sm:text-base shrink-0" />
            <span>Cancelar</span>
          </button>
        </div>
      )}
    </article>
  );
}
