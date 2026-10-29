import { AgendaKpiCard } from './AgendaKpiCard';
import { AgendaInsightItem } from './AgendaInsightItem';
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
  const atPercent = stats.tot > 0 ? `${Math.round((stats.at / stats.tot) * 100)}%` : '0%';
  const faPercent = stats.tot > 0 ? `${Math.round((stats.fa / stats.tot) * 100)}%` : '0%';

  const kpiCards = [
    {
      id: 'todos' as FilterMode,
      label: 'Agendados',
      value: stats.tot,
      badge: 'no dia',
      icon: 'cal' as const,
      isSelected: filter === 'todos',
      onClick: () => onSelectFilter('todos'),
      htmlId: 'kA',
    },
    {
      id: 'atendidos' as FilterMode,
      label: 'Atendidos',
      value: stats.at,
      badge: atPercent,
      icon: 'done' as const,
      isSelected: filter === 'atendidos',
      onClick: () => onSelectFilter(filter === 'atendidos' ? 'todos' : 'atendidos'),
      htmlId: 'kT',
    },
    {
      id: 'faltas' as FilterMode,
      label: 'Faltas',
      value: stats.fa,
      badge: faPercent,
      icon: 'userx' as const,
      isSelected: filter === 'faltas',
      onClick: () => onSelectFilter(filter === 'faltas' ? 'todos' : 'faltas'),
      htmlId: 'kF',
    },
  ];

  const insightItems = [
    {
      icon: 'pulse' as const,
      label: 'Ocupação',
      value: insights.ocupacao,
      className: '',
    },
    {
      icon: 'coin' as const,
      label: 'Receita prevista',
      value: insights.receita,
      className: 'lg:pl-5',
    },
    {
      icon: 'clock' as const,
      label: 'Tempo livre',
      value: insights.tempoLivre,
      className: 'lg:pl-5',
    },
    {
      icon: 'spark' as const,
      label: 'Próximo horário livre',
      value: insights.proximoLivre,
      className: 'lg:pl-5',
    },
  ];

  return (
    <section className="pnl rise mb-5 relative overflow-hidden">
      {/* Subtle ambient lighting accent */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 bg-[#d4af37]/[0.035] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <p className="tag !mb-0 flex-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block shrink-0" />
          <span>Resumo do dia</span>
        </p>
        {filter !== 'todos' && (
          <button
            type="button"
            onClick={() => onSelectFilter('todos')}
            className="shrink-0 ml-3 text-[10px] sm:text-[11px] font-semibold text-[#d4af37] hover:text-[#f1c40f] transition-colors uppercase tracking-wider cursor-pointer"
          >
            Ver todos
          </button>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3.5 mb-4 sm:mb-5">
        {kpiCards.map((card) => (
          <AgendaKpiCard
            key={card.id}
            id={card.id}
            label={card.label}
            value={card.value}
            badge={card.badge}
            icon={card.icon}
            isSelected={card.isSelected}
            onClick={card.onClick}
            dataFilter={card.id}
            htmlId={card.htmlId}
          />
        ))}
      </div>

      {/* Insights Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:divide-x lg:divide-white/[0.08] pt-4 sm:pt-5 border-t border-white/[0.08]">
        {insightItems.map((item, index) => (
          <AgendaInsightItem
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
            className={item.className}
          />
        ))}
      </div>
    </section>
  );
}
