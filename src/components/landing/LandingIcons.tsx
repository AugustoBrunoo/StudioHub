import React from 'react';

export function StudioHubLogo({ id = 'logo-mask' }: { id?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="black">
      <defs>
        <mask id={id}>
          <rect width="24" height="24" fill="white" />
          <path d="M1 12h22" stroke="black" strokeWidth="2.5" fill="none" />
          <path
            d="M1 12 C 1 6, 23 6, 23 12"
            stroke="black"
            strokeWidth="2.5"
            fill="none"
            transform="translate(0,-5)"
          />
          <path
            d="M1 12 C 1 18, 23 18, 23 12"
            stroke="black"
            strokeWidth="2.5"
            fill="none"
            transform="translate(0,5)"
          />
          <path d="M12 1v22" stroke="black" strokeWidth="2.5" fill="none" />
          <ellipse cx="12" cy="12" rx="6" ry="11" stroke="black" strokeWidth="2.5" fill="none" />
        </mask>
      </defs>
      <circle cx="12" cy="12" r="10.5" mask={`url(#${id})`} />
    </svg>
  );
}

const IC: Record<string, React.ReactNode> = {
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
      <path d="M12 8V4M2 14h2M20 14h2" />
    </>
  ),
  cal: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4M7 15h5" />
    </>
  ),
  calc: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="18" rx="2" />
      <rect x="14" y="3" width="7" height="8" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  qr: (
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10" />
  ),
  chat: (
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
  ),
  ok: (
    <path d="M5 12l4 4 10-10" />
  ),
  plus: (
    <path d="M12 5v14M5 12h14" />
  ),
  gh: (
    <path d="M9 19c-4 1-4-2-6-2m12 4v-3a3 3 0 0 0-1-2c3 0 6-1 6-6a5 5 0 0 0-1-3 5 5 0 0 0 0-3s-1 0-3 1a10 10 0 0 0-6 0C7 4 6 4 6 4a5 5 0 0 0 0 3 5 5 0 0 0-1 3c0 5 3 6 6 6a3 3 0 0 0-1 2v3" />
  ),
  ig: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".5" />
    </>
  ),
};

export type IconName = keyof typeof IC;

export function LandingIcon({
  name,
  className = '',
  style,
}: {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg className={`i ${className}`} viewBox="0 0 24 24" style={style}>
      {IC[name]}
    </svg>
  );
}
