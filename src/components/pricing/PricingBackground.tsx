export function PricingBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0a0a0a]"
      aria-hidden="true"
    >
      {/* Golden Glow 1 (Top / Hero area) */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '820px',
          height: '820px',
          left: '50%',
          top: '-260px',
          marginLeft: '-410px',
          background:
            'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.07) 55%, transparent 75%)',
          filter: 'blur(100px)',
          animation: 'drift 22s ease-in-out infinite alternate',
        }}
      />

      {/* Golden Glow 2 (Bottom right) */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          right: '-140px',
          bottom: '-100px',
          background:
            'radial-gradient(circle, rgba(241,196,15,0.16) 0%, rgba(212,175,55,0.04) 55%, transparent 75%)',
          filter: 'blur(90px)',
          animation: 'drift 22s ease-in-out infinite alternate',
          animationDelay: '-9s',
        }}
      />

      {/* Ambient Mid Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '700px',
          height: '450px',
          left: '50%',
          top: '35%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 70%)',
          filter: 'blur(110px)',
        }}
      />

      {/* Fine golden grid with radial fade */}
      <div className="grid-bg absolute inset-0" />
    </div>
  );
}
