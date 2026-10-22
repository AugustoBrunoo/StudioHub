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
    <article className="dash-card w-full rise p-6 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <span className="tag">Raio-X do dia</span>
        <button
          type="button"
          onClick={onViewSchedule}
          className="pill cursor-pointer"
        >
          Ver agenda
          <span className="pill-ic">
            <DashboardIcon name="arr" />
          </span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Agendados */}
        <div
          onClick={onViewSchedule}
          className="kpi cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <DashboardIcon name="cal" className="i text-xl text-[#d4af37] mb-4" />
          <p
            ref={kARef}
            data-v="0"
            className="text-4xl sm:text-5xl font-extrabold tracking-tighter tabular-nums text-white"
          >
            0
          </p>
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-[.14em] mt-1.5">
            Agendados
          </p>
        </div>

        {/* Atendidos */}
        <div
          onClick={onViewSchedule}
          className="kpi cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <DashboardIcon name="done" className="i text-xl text-green-400 mb-4" />
          <p
            ref={kTRef}
            data-v="0"
            className="text-4xl sm:text-5xl font-extrabold tracking-tighter tabular-nums text-white"
          >
            0
          </p>
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-[.14em] mt-1.5">
            Atendidos
          </p>
        </div>

        {/* Faltas */}
        <div
          onClick={onViewSchedule}
          className="kpi cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <DashboardIcon name="userx" className="i text-xl text-red-400 mb-4" />
          <p
            ref={kFRef}
            data-v="0"
            className="text-4xl sm:text-5xl font-extrabold tracking-tighter tabular-nums text-white"
          >
            0
          </p>
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-[.14em] mt-1.5">
            Faltas
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Progresso do dia</span>
          <span className="tabular-nums text-white/90 font-medium">
            {atendidos} de {agendados}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            ref={pbRef}
            className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f1c40f] shadow-[0_0_12px_rgba(212,175,55,0.7)]"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </article>
  );
}
