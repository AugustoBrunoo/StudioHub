import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardIcon } from '@/components/dashboard/DashboardIcons';

export interface SettingsNavigationCardProps {
  to: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  ctaLabel: string;
}

export function SettingsNavigationCard({
  to,
  title,
  subtitle,
  description,
  icon: IconComponent,
  ctaLabel,
}: SettingsNavigationCardProps) {
  return (
    <Link
      to={to}
      className="group rise relative rounded-[1.65rem] bg-[#111111] hover:bg-[#151515] border border-white/[0.08] hover:border-[#d4af37]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_28px_60px_-30px_rgba(0,0,0,0.95)] p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        <div className="mb-5">
          <div className="ibox !w-12 !h-12 !rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-105">
            <IconComponent className="w-5 h-5 text-[#d4af37]" />
          </div>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4af37] mb-1">
          {subtitle}
        </p>
        <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-2 group-hover:text-[#f1c40f] transition-colors">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-white/[0.04]">
        <span className="pill !py-1.5 !pl-3.5 !pr-1.5 text-xs">
          <span>{ctaLabel}</span>
          <span className="pill-ic !w-6 !h-6 !text-xs">
            <DashboardIcon name="arr" />
          </span>
        </span>
      </div>
    </Link>
  );
}
