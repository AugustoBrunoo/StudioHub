import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fmt = (v: number, d?: string | null) =>
  v.toLocaleString('pt-BR', d ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 0 });

export function usePricingAnimations(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const red = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const nav = document.getElementById('nav');
      const prog = document.getElementById('prog');

      // 1. Scroll progress bar & navbar glass background
      const updateNavbar = () => {
        if (!nav) return;
        const on = window.scrollY > 40;
        nav.style.background = on ? 'rgba(10,10,10,.75)' : 'transparent';
        nav.style.backdropFilter = on ? 'blur(16px)' : 'none';
        nav.style.borderBottom = on ? '1px solid rgba(255,255,255,.06)' : '1px solid transparent';
      };

      updateNavbar();

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (s) => {
          if (prog) {
            prog.style.transform = `scaleX(${s.progress})`;
          }
          updateNavbar();
        },
      });

      // Ensure nav is fully visible immediately
      if (nav) {
        gsap.set(nav, { opacity: 1, y: 0 });
      }

      // 2. Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if (nav) {
        tl.fromTo(
          nav,
          { y: -20, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      }

      tl.fromTo(
        '.hl',
        { y: 36, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.16, clearProps: 'transform,opacity,filter' },
        0.15
      ).fromTo(
        '.hp',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, clearProps: 'transform,opacity' },
        0.6
      );

      // 3. Plan cards staggered entrance (.rc)
      gsap.from('.rc', {
        scrollTrigger: { trigger: '#plans', start: 'top 88%' },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        clearProps: 'opacity,y,transform',
      });

      // 4. Counter animations [data-count]
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const end = +(el.dataset.count || 0);
        const dec = el.dataset.dec;
        const o = { v: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () =>
            gsap.to(o, {
              v: end,
              duration: red ? 0 : 1.6,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent = fmt(o.v, dec);
              },
              onComplete: () => {
                el.textContent = fmt(end, dec);
              },
            }),
        });
      });

      // 5. General scroll reveal (.rv)
      gsap.utils.toArray<HTMLElement>('.rv').forEach((e) => {
        gsap.from(e, {
          scrollTrigger: { trigger: e, start: 'top 90%' },
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'opacity,y,transform',
        });
      });

      // 6. EasyWallet lateral reveals (.rl, .rr, .rowi)
      const isMobile = window.innerWidth < 768;
      const lateralDist = isMobile ? 24 : 60;

      gsap.from('.rl', {
        scrollTrigger: { trigger: '.rl', start: 'top 85%' },
        x: -lateralDist,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        clearProps: 'opacity,x,transform',
      });

      gsap.from('.rr', {
        scrollTrigger: { trigger: '.rr', start: 'top 85%' },
        x: lateralDist,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        clearProps: 'opacity,x,transform',
      });

      gsap.from('.rowi', {
        scrollTrigger: { trigger: '.rowi', start: 'top 92%' },
        x: isMobile ? 12 : 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power3.out',
        clearProps: 'opacity,x,transform',
      });

      // 7. FAQ cards reveal (.fq)
      gsap.from('.fq', {
        scrollTrigger: { trigger: '#faq .grid', start: 'top 88%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'opacity,y,transform',
      });

      // 8. Card spotlight effect on pointermove
      const planCards = document.querySelectorAll<HTMLElement>('.plan');
      const handlePlanPointerMove = (e: PointerEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        target.style.setProperty('--my', `${e.clientY - rect.top}px`);
      };

      planCards.forEach((c) => {
        c.addEventListener('pointermove', handlePlanPointerMove);
      });

      // 9. Magnetic buttons (.mag) on desktop hover
      if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll<HTMLElement>('.mag').forEach((el) => {
          const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
          const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

          const handleMagMove = (e: MouseEvent) => {
            const b = el.getBoundingClientRect();
            x((e.clientX - b.left - b.width / 2) * 0.2);
            y((e.clientY - b.top - b.height / 2) * 0.3);
          };

          const handleMagLeave = () => {
            x(0);
            y(0);
          };

          el.addEventListener('mousemove', handleMagMove);
          el.addEventListener('mouseleave', handleMagLeave);
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
