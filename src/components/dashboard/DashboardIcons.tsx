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
  | 'coffee'
  | 'cl'
  | 'cr'
  | 'pulse'
  | 'coin'
  | 'spark'
  | 'search'
  | 'chat'
  | 'edit'
  | 'phone'
  | 'undo'
  | 'trash'
  | 'grid';

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
  cl: <path d="M15 6l-6 6 6 6" />,
  cr: <path d="M9 6l6 6-6 6" />,
  pulse: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9a2.5 2 0 0 0-2.5-1.5c-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2a2.7 2 0 0 1-2.7-1.5M12 6v1.5M12 16.5V18" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  edit: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4" />
    </>
  ),
  phone: (
    <>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </>
  ),
  undo: (
    <>
      <path d="M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
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
