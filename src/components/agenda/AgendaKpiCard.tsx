import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DashboardIcon, type DashboardIconName } from '@/components/dashboard/DashboardIcons';

export interface AgendaKpiCardProps {
  id?: string;
  label: string;
  value: number;
  badge: string;
  icon: DashboardIconName;
  isSelected?: boolean;
  onClick?: () => void;
  dataFilter?: string;
  htmlId?: string;
}

export function AgendaKpiCard({
  label,
  value,
  badge,
  icon,
  isSelected = false,
  onClick,
  dataFilter,
  htmlId,
}: AgendaKpiCardProps) {
  const numberRef = useRef<HTMLParagraphElement | null>(null);

  // Animated KPI numbers with GSAP
  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const cur = parseFloat(el.getAttribute('data-v') || '0');
    const obj = { v: cur };

    const tween = gsap.to(obj, {
      v: value,
      duration: 0.8,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v));
        el.setAttribute('data-v', String(obj.v));
      },
      onComplete: () => {
        el.setAttribute('data-v', String(value));
      },
    });

    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <button
      type="button"
      onClick={onClick}
      data-f={dataFilter}
      className={`card kpi group relative text-left p-3 sm:p-4 lg:p-5 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden border ${
        isSelected
          ? 'sel bg-gradient-to-b from-[#181611] to-[#11100c] !border-[#d4af37]/55 shadow-[0_0_24px_-4px_rgba(212,175,55,0.22),inset_0_1px_0_rgba(255,255,255,0.1)]'
          : 'bg-[#121212]/90 hover:bg-[#161616] border-white/[0.08] hover:border-[#d4af37]/40 shadow-lg shadow-black/40 hover:-translate-y-0.5'
      }`}
    >
      {/* Top golden accent line when selected */}
      {isSelected && (
        <span
          className="absolute inset-x-3 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full"
          aria-hidden="true"
        />
      )}

      {/* Top row: Standardized yellow/gold icon on left, white bold badge on right */}
      <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
        <span className="ibox text-[#d4af37] !border-[#d4af37]/25 !bg-[#d4af37]/10 shadow-[0_0_12px_rgba(212,175,55,0.12)] transition-transform duration-300 group-hover:scale-105 shrink-0">
          <DashboardIcon name={icon} />
        </span>
        <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/10 shadow-xs shrink-0">
          {badge}
        </span>
      </div>

      {/* KPI Counter Number with GSAP animation */}
      <p
        ref={numberRef}
        id={htmlId}
        data-v="0"
        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight tabular-nums text-white leading-none mb-1 sm:mb-1.5"
      >
        0
      </p>

      {/* Label and Active Indicator */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] sm:text-[11px] lg:text-xs text-neutral-400 font-semibold uppercase tracking-[0.08em] sm:tracking-[0.12em] truncate">
          {label}
        </p>
        {isSelected && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37] shrink-0 hidden sm:inline-block" />
        )}
      </div>
    </button>
  );
}

