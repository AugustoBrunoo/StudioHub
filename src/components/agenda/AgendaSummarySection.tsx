import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import type { AgendaStats, AgendaInsights, FilterMode } from './types';

interface AgendaSummarySectionProps {
  stats: AgendaStats;
  insights: AgendaInsights;
  filter: FilterMode;
  onSelectFilter: (f: FilterMode) => void;
}

export function AgendaSummarySection({
  stats,
  insights,
  filter,
  onSelectFilter,
}: AgendaSummarySectionProps) {
  const kARef = useRef<HTMLParagraphElement | null>(null);
  const kTRef = useRef<HTMLParagraphElement | null>(null);
  const kFRef = useRef<HTMLParagraphElement | null>(null);

  // Animated KPI numbers with GSAP
  useEffect(() => {
    const animNumber = (el: HTMLParagraphElement | null, targetVal: number) => {
      if (!el) return;
      const cur = parseFloat(el.getAttribute('data-v') || '0');
      const obj = { v: cur };
      gsap.to(obj, {
        v: targetVal,
        duration: 0.8,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
          el.setAttribute('data-v', String(obj.v));
        },
        onComplete: () => {
          el.setAttribute('data-v', String(targetVal));
        },
      });
    };

    animNumber(kARef.current, stats.tot);
    animNumber(kTRef.current, stats.at);
    animNumber(kFRef.current, stats.fa);
  }, [stats]);

  return (
    <section className="pnl rise mb-5">
      <p className="tag mb-4">Resumo do dia</p>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* KPI Agendados */}
        <button
          type="button"
          onClick={() => onSelectFilter(filter === 'todos' ? 'todos' : 'todos')}
          className={`card kpi cursor-pointer ${filter === 'todos' ? 'sel' : ''}`}
          data-f="todos"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="ibox text-[#d4af37] !border-[#d4af37]/25 !bg-[#d4af37]/10">
              <DashboardIcon name="cal" />
            </span>
            <span className="hidden sm:block text-[10px] text-gray-600 font-semibold uppercase tracking-[.14em]">
              no dia
            </span>
          </div>
          <p
            ref={kARef}
            className="text-3xl font-extrabold tracking-tighter tabular-nums text-white"
            id="kA"
          >
            0
          </p>
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-[.14em] mt-1.5">
            Agendados
          </p>
        </button>

        {/* KPI Atendidos */}
        <button
          type="button"
          onClick={() => onSelectFilter(filter === 'atendidos' ? 'todos' : 'atendidos')}
          className={`card kpi cursor-pointer ${filter === 'atendidos' ? 'sel' : ''}`}
          data-f="atendidos"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="ibox text-green-400 !border-green-400/25 !bg-green-400/10">
              <DashboardIcon name="done" />
            </span>
            <span className="hidden sm:block text-[10px] text-gray-600 font-semibold uppercase tracking-[.14em]">
              {stats.tot ? Math.round((stats.at / stats.tot) * 100) + '%' : ''}
            </span>
          </div>
          <p
            ref={kTRef}
            className="text-3xl font-extrabold tracking-tighter tabular-nums text-white"
            id="kT"
          >
            0
          </p>
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-[.14em] mt-1.5">
            Atendidos
          </p>
        </button>

        {/* KPI Faltas */}
        <button
          type="button"
          onClick={() => onSelectFilter(filter === 'faltas' ? 'todos' : 'faltas')}
          className={`card kpi cursor-pointer ${filter === 'faltas' ? 'sel' : ''}`}
          data-f="faltas"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="ibox text-red-400 !border-red-400/25 !bg-red-400/10">
              <DashboardIcon name="userx" />
            </span>
            <span className="hidden sm:block text-[10px] text-gray-600 font-semibold uppercase tracking-[.14em]">
              {stats.tot ? Math.round((stats.fa / stats.tot) * 100) + '%' : ''}
            </span>
          </div>
          <p
            ref={kFRef}
            className="text-3xl font-extrabold tracking-tighter tabular-nums text-white"
            id="kF"
          >
            0
          </p>
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-[.14em] mt-1.5">
            Faltas
          </p>
        </button>
      </div>

      {/* Insights Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:divide-x divide-white/10 pt-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <DashboardIcon name="pulse" className="text-xl text-[#d4af37]" />
          <div>
            <p className="text-lg font-extrabold tabular-nums text-white">
              {insights.ocupacao}
            </p>
            <p className="text-[11px] text-gray-500 uppercase tracking-[.12em] font-semibold">
              Ocupação
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:pl-5">
          <DashboardIcon name="coin" className="text-xl text-[#d4af37]" />
          <div>
            <p className="text-lg font-extrabold tabular-nums text-white">
              {insights.receita}
            </p>
            <p className="text-[11px] text-gray-500 uppercase tracking-[.12em] font-semibold">
              Receita prevista
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:pl-5">
          <DashboardIcon name="clock" className="text-xl text-[#d4af37]" />
          <div>
            <p className="text-lg font-extrabold tabular-nums text-white">
              {insights.tempoLivre}
            </p>
            <p className="text-[11px] text-gray-500 uppercase tracking-[.12em] font-semibold">
              Tempo livre
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:pl-5">
          <DashboardIcon name="spark" className="text-xl text-[#d4af37]" />
          <div>
            <p className="text-lg font-extrabold tabular-nums text-white">
              {insights.proximoLivre}
            </p>
            <p className="text-[11px] text-gray-500 uppercase tracking-[.12em] font-semibold">
              Próximo horário livre
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
