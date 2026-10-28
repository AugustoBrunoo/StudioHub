import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DashboardIcon } from './DashboardIcons';

interface DailyKpiCardProps {
  agendados: number;
  atendidos: number;
  faltas: number;
  onViewSchedule: () => void;
}

export function DailyKpiCard({
  agendados,
  atendidos,
  faltas,
  onViewSchedule,
}: DailyKpiCardProps) {
  const kARef = useRef<HTMLParagraphElement | null>(null);
  const kTRef = useRef<HTMLParagraphElement | null>(null);
  const kFRef = useRef<HTMLParagraphElement | null>(null);
  const pbRef = useRef<HTMLDivElement | null>(null);

  // Animated countup helper using GSAP
  useEffect(() => {
    const animateCount = (el: HTMLParagraphElement | null, targetVal: number) => {
      if (!el) return;
      const currentVal = parseFloat(el.getAttribute('data-v') || '0');
      const obj = { v: currentVal };

      gsap.to(obj, {
        v: targetVal,
        duration: 1.4,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
          el.setAttribute('data-v', String(obj.v));
        },
      });
    };

    animateCount(kARef.current, agendados);
    animateCount(kTRef.current, atendidos);
    animateCount(kFRef.current, faltas);

    // Progress bar animation
    if (pbRef.current) {
      const percentage = agendados > 0 ? Math.min(100, (atendidos / agendados) * 100) : 0;
      gsap.to(pbRef.current, {
        width: `${percentage}%`,
        duration: 1.2,
        ease: 'power3.out',
      });
    }
  }, [agendados, atendidos, faltas]);

  return (
    <article className="card w-full rise p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
        <span className="tag text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.2em] font-bold uppercase">
          Raio-X do dia
        </span>
        <button
          type="button"
          onClick={onViewSchedule}
          className="pill cursor-pointer !py-1 !px-2.5 text-[10.5px] sm:text-xs"
        >
          <span>Ver agenda</span>
          <span className="pill-ic !w-5 !h-5 !text-xs">
            <DashboardIcon name="arr" />
          </span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 lg:gap-3">
        {/* Agendados */}
        <div
          onClick={onViewSchedule}
          className="kpi cursor-pointer group !p-1.5 sm:!p-2.5 lg:!p-3 text-center sm:text-left flex flex-col items-center sm:items-start rounded-xl"
          role="button"
          tabIndex={0}
        >
          <DashboardIcon name="cal" className="text-base text-[#d4af37] mb-1 sm:mb-1.5" />
          <p
            ref={kARef}
            id="kA"
            data-v="0"
            className="text-2xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight tabular-nums text-white"
          >
            0
          </p>
          <p className="text-[8.5px] sm:text-[9px] lg:text-[10.5px] text-gray-400 font-bold uppercase tracking-tight sm:tracking-normal mt-0.5 sm:mt-1 truncate max-w-full">
            Agendados
          </p>
        </div>

        {/* Atendidos */}
        <div
          onClick={onViewSchedule}
          className="kpi cursor-pointer group !p-1.5 sm:!p-2.5 lg:!p-3 text-center sm:text-left flex flex-col items-center sm:items-start rounded-xl"
          role="button"
          tabIndex={0}
        >
          <DashboardIcon name="done" className="text-base text-green-400 mb-1 sm:mb-1.5" />
          <p
            ref={kTRef}
            id="kT"
            data-v="0"
            className="text-2xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight tabular-nums text-white"
          >
            0
          </p>
          <p className="text-[8.5px] sm:text-[9px] lg:text-[10.5px] text-gray-400 font-bold uppercase tracking-tight sm:tracking-normal mt-0.5 sm:mt-1 truncate max-w-full">
            Atendidos
          </p>
        </div>

        {/* Faltas */}
        <div
          onClick={onViewSchedule}
          className="kpi cursor-pointer group !p-1.5 sm:!p-2.5 lg:!p-3 text-center sm:text-left flex flex-col items-center sm:items-start rounded-xl"
          role="button"
          tabIndex={0}
        >
          <DashboardIcon name="userx" className="text-base text-red-400 mb-1 sm:mb-1.5" />
          <p
            ref={kFRef}
            id="kF"
            data-v="0"
            className="text-2xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight tabular-nums text-white"
          >
            0
          </p>
          <p className="text-[8.5px] sm:text-[9px] lg:text-[10.5px] text-gray-400 font-bold uppercase tracking-tight sm:tracking-normal mt-0.5 sm:mt-1 truncate max-w-full">
            Faltas
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-3 sm:mt-3.5">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span className="text-[10.5px] sm:text-xs">Progresso do dia</span>
          <span id="pt" className="tabular-nums text-white/90 font-medium text-[10.5px] sm:text-xs">
            {atendidos} de {agendados}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            ref={pbRef}
            id="pb"
            className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f1c40f] shadow-[0_0_12px_rgba(212,175,55,0.7)]"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </article>
  );
}
