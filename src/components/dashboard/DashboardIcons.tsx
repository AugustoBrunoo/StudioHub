import React from 'react';

export type DashboardIconName =
  | 'chev'
  | 'gear'
  | 'help'
  | 'out'
  | 'clock'
  | 'cut'
  | 'x'
  | 'eye'
  | 'ok'
  | 'done'
  | 'bot'
  | 'arr'
  | 'cal'
  | 'userx'
  | 'plus'
  | 'lock'
  | 'coffee';

const ICON_PATHS: Record<DashboardIconName, React.ReactNode> = {
  chev: <path d="M6 9l6 6 6-6" />,
  gear: (
    <>
      <path d="M4 6h8M16 6h4M4 12h2M10 12h10M4 18h12M20 18h0" />
      <circle cx="14" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
    </>
  ),
  out: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  cut: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6L6 18" />,
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  ok: <path d="M5 12l4 4 10-10" />,
  done: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
      <path d="M12 8V4M2 14h2M20 14h2" />
    </>
  ),
  arr: <path d="M7 17L17 7M8 7h9v9" />,
  cal: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  userx: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21a7 7 0 0 1 14 0M17 8l5 5M22 8l-5 5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10h2a2 2 0 0 1 0 4h-2M7 3v2M11 3v2" />
    </>
  ),
};

interface DashboardIconProps extends React.SVGProps<SVGSVGElement> {
  name: DashboardIconName;
  className?: string;
  style?: React.CSSProperties;
}

export function DashboardIcon({
  name,
  className = '',
  style,
  ...rest
}: DashboardIconProps) {
  const content = ICON_PATHS[name];
  if (!content) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={`i ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
      {...rest}
    >
      {content}
    </svg>
  );
}
