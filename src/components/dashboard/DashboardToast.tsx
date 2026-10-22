import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export interface DashboardToastHandle {
  show: (text: string) => void;
}

export const DashboardToast = forwardRef<DashboardToastHandle>((_, ref) => {
  const [message, setMessage] = useState('');
  const toastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (toastRef.current) {
      gsap.set(toastRef.current, {
        xPercent: -50,
        y: 30,
        opacity: 0,
      });
    }
  }, []);

  useImperativeHandle(ref, () => ({
    show: (text: string) => {
      setMessage(text);
      if (!toastRef.current) return;

      gsap.killTweensOf(toastRef.current);
      gsap
        .timeline()
        .to(toastRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        })
        .to(toastRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          delay: 2.2,
          ease: 'power2.in',
        });
    },
  }));

  return (
    <div
      ref={toastRef}
      id="toast"
      className="fixed left-1/2 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] opacity-0 z-[300] pointer-events-none px-5 py-3 rounded-full text-sm font-medium border border-[#d4af37]/30 bg-[#111]/90 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-white"
    >
      <span className="w-2 h-2 rounded-full bg-[#f1c40f] shrink-0" />
      <span id="toastT">{message}</span>
    </div>
  );
});

DashboardToast.displayName = 'DashboardToast';
