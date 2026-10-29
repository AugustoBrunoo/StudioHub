import { DashboardIcon, type DashboardIconName } from '@/components/dashboard/DashboardIcons';

export interface AgendaInsightItemProps {
  icon: DashboardIconName;
  label: string;
  value: string;
  className?: string;
}

export function AgendaInsightItem({
  icon,
  label,
  value,
  className = '',
}: AgendaInsightItemProps) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 p-1 sm:p-0 min-w-0 ${className}`}>
      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center shrink-0 text-[#d4af37] shadow-xs">
        <DashboardIcon name={icon} className="text-base sm:text-lg" />
      </span>
      <div className="min-w-0">
        <p className="text-sm sm:text-base lg:text-lg font-extrabold tabular-nums text-white leading-tight truncate">
          {value}
        </p>
        <p className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-[0.08em] sm:tracking-[0.12em] font-medium leading-snug truncate">
          {label}
        </p>
      </div>
    </div>
  );
}

