import React from 'react';
import { cn } from '@/utils/cn';
import type { UserRole } from '@/types/user';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'slate';
  roleType?: UserRole;
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'slate',
  roleType,
  size = 'sm',
  children,
  ...props
}: BadgeProps) {
  let effectiveVariant: NonNullable<BadgeProps['variant']> = variant;

  if (roleType) {
    const roleMap: Record<UserRole, NonNullable<BadgeProps['variant']>> = {
      admin: 'rose',
      studio_manager: 'purple',
      creator: 'emerald',
      client: 'blue',
    };
    effectiveVariant = roleMap[roleType] || 'slate';
  }

  const variants = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border tracking-wide select-none',
        variants[effectiveVariant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
