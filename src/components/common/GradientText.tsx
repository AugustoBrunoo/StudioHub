import React, { useEffect, useRef } from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  glow?: number;
  style?: React.CSSProperties;
}

export function GradientText({
  children,
  className = '',
  colors = ['#d4af37', '#f1c40f', '#fff1b8'],
  speed = 6,
  glow = 0.45,
  style,
}: GradientTextProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const red = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const loop = [...colors, colors[0]];
    const period = 300;

    root.style.setProperty('--glow', `${glow}`);

    let time = 0;
    let pull = 0;
    let inside = false;
    let px = 0.5;
    let tx = 0.5;
    let last = performance.now();
    let vis = true;
    let rafId: number | null = null;

    const paint = () => {
      const cyc = time / speed;
      const sw = cyc % 2;
      const t = sw < 1 ? sw : 2 - sw;
      let off = (0.5 - Math.cos(Math.PI * t) / 2) * (period - 100);
      off += (px - 0.5) * period * 0.5 * pull;

      const stops = loop
        .map((c, i) => `${c} ${( (i / (loop.length - 1)) * period - off ).toFixed(2)}%`)
        .join(',');

      root.style.setProperty('--g', `repeating-linear-gradient(90deg,${stops})`);
    };

    const tick = (n: number) => {
      const dt = Math.min(0.05, Math.max(0, (n - last) / 1000));
      last = n;
      if (!red) time += dt;

      pull += ((inside ? 1 : 0) - pull) * (1 - Math.exp(-dt * 6));
      px += (tx - px) * (1 - Math.exp(-dt * 12));
      paint();

      if (vis && !red) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handlePointerEnter = () => {
      inside = true;
    };

    const handlePointerLeave = () => {
      inside = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const b = root.getBoundingClientRect();
      if (b.width > 0) {
        tx = Math.min(1, Math.max(0, (e.clientX - b.left) / b.width));
      }
    };

    root.addEventListener('pointerenter', handlePointerEnter);
    root.addEventListener('pointerleave', handlePointerLeave);
    root.addEventListener('pointermove', handlePointerMove);

    const observer = new IntersectionObserver((entries) => {
      const was = vis;
      vis = entries.some((e) => e.isIntersecting);
      if (vis && !was) {
        last = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    });

    observer.observe(root);
    paint();
    last = performance.now();
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      root.removeEventListener('pointerenter', handlePointerEnter);
      root.removeEventListener('pointerleave', handlePointerLeave);
      root.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
    };
  }, [colors, speed, glow]);

  return (
    <span
      ref={rootRef}
      className={`gtx ${className}`}
      style={{ ...style, ['--glow' as string]: glow }}
    >
      <span className="gtx-c">{children}</span>
      <span className="gtx-g" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
