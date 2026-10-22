export function RegisterBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0a0a0a]"
      aria-hidden="true"
    >
      {/* Home-style Silk Gradient Base (55deg flow matching Grainient colors) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 85% 60% at 50% -10%, rgba(212, 175, 55, 0.25) 0%, rgba(77, 58, 14, 0.15) 45%, transparent 75%),
            radial-gradient(ellipse 70% 50% at 90% 60%, rgba(212, 175, 55, 0.16) 0%, rgba(23, 18, 10, 0.3) 50%, transparent 80%),
            radial-gradient(ellipse 75% 55% at 10% 45%, rgba(246, 231, 173, 0.1) 0%, rgba(77, 58, 14, 0.2) 45%, transparent 75%),
            linear-gradient(55deg, #0a0a0a 0%, #17120a 20%, #3a2b0b 38%, #4d3a0e 48%, rgba(212, 175, 55, 0.35) 58%, #2a1e07 72%, #140f06 88%, #0a0a0a 100%)
          `,
        }}
      />

      {/* Subtle Ambient Golden Glow (soft back-illumination around the card) */}
      <div
        className="absolute w-[800px] h-[550px] left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(212, 175, 55, 0.08) 0%, rgba(77, 58, 14, 0.02) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Static Film Grain Overlay (matching Home's Grainient texture without WebGL/GPU load) */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Vignette Veil (matching Home's .veil) */}
      <div className="veil absolute inset-0 pointer-events-none" />
    </div>
  );
}
