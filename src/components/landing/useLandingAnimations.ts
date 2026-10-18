import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to manage all GSAP timelines, ScrollTrigger instances,
 * card spotlights, and magnetic buttons for the landing page.
 */
export function useLandingAnimations(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const nav = document.getElementById('nav');
      const prog = document.getElementById('prog');

      // Scroll progress bar & Navbar glass background transformation
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (s) => {
          if (prog) {
            prog.style.transform = `scaleX(${s.progress})`;
          }
          if (nav) {
            const on = window.scrollY > 40;
            nav.style.background = on ? 'rgba(10,10,10,.65)' : 'transparent';
            nav.style.backdropFilter = on ? 'blur(16px)' : 'none';
            nav.style.borderBottom = on
              ? '1px solid rgba(255,255,255,.06)'
              : '1px solid transparent';
          }
        },
      });

      // Hero entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if (nav) {
        tl.from(nav, { y: -60, opacity: 0, duration: 1.1 });
      }

      tl.from(
        '#hero h1 .line > span',
        { yPercent: 110, duration: 1.4, stagger: 0.15 },
        0.2
      )
        .from('.hp', { y: 24, opacity: 0, duration: 1.1, stagger: 0.15 }, 0.7)
        .from('#cue', { scaleY: 0, transformOrigin: 'top', duration: 1 }, 1.2);

      // Hero scroll scrub parallax
      gsap.to('#hero', {
        yPercent: -12,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: 'header',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // General reveal on scroll (.rv)
      gsap.utils.toArray<HTMLElement>('.rv').forEach((e) => {
        gsap.from(e, {
          scrollTrigger: { trigger: e, start: 'top 88%' },
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
        });
      });

      // Lateral reveals (.rl and .rr)
      gsap.from('.rl', {
        scrollTrigger: { trigger: '.rl', start: 'top 80%' },
        x: -70,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.out',
      });

      gsap.from('.rr', {
        scrollTrigger: { trigger: '.rr', start: 'top 80%' },
        x: 70,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.out',
      });

      // Step cards and connection rail
      gsap.from('.st', {
        scrollTrigger: { trigger: '#steps', start: 'top 85%' },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.22,
        ease: 'power3.out',
      });

      gsap.from('#rail', {
        scrollTrigger: { trigger: '#steps', start: 'top 85%' },
        scaleX: 0,
        duration: 1.8,
        ease: 'power3.inOut',
      });

      // Interactive chat messages reveal
      gsap.from('.msg', {
        scrollTrigger: { trigger: '#chat', start: 'top 80%' },
        y: 24,
        scale: 0.94,
        opacity: 0,
        duration: 0.7,
        stagger: 0.9,
        delay: 0.6,
        ease: 'back.out(1.4)',
      });

      // Pointermove spotlight on cards
      const cards = document.querySelectorAll<HTMLElement>('.card');
      const handlePointerMove = (e: PointerEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        target.style.setProperty('--my', `${e.clientY - rect.top}px`);
      };

      cards.forEach((c) => {
        c.addEventListener('pointermove', handlePointerMove);
      });

      // Magnetic button physics (.mag)
      if (window.matchMedia('(hover:hover)').matches) {
        const magnets = document.querySelectorAll<HTMLElement>('.mag');
        magnets.forEach((el) => {
          const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
          const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

          const onMove = (e: PointerEvent) => {
            const b = el.getBoundingClientRect();
            xTo((e.clientX - b.left - b.width / 2) * 0.25);
            yTo((e.clientY - b.top - b.height / 2) * 0.35);
          };

          const onLeave = () => {
            xTo(0);
            yTo(0);
          };

          el.addEventListener('pointermove', onMove);
          el.addEventListener('pointerleave', onLeave);
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
