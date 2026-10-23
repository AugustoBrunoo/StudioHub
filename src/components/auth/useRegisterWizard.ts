import { useState, useRef, useEffect, useCallback, type MouseEvent } from 'react';
import gsap from 'gsap';
import {
  type ServiceItem,
  type DaySchedule,
  DAYS_NAMES,
  DAYS_ORDER,
  DAYS_LABELS,
  formatMinutes,
  drawQRCode,
} from './register.types';

const DEFAULT_OPEN_TIME = '09:00';
const DEFAULT_CLOSE_TIME = '18:00';

export function useRegisterWizard() {
  // Wizard Step (0 to 4)
  const [curStep, setCurStep] = useState(0);

  // Form State
  const [shop, setShop] = useState('');
  const [owner, setOwner] = useState('');
  const [wpp, setWpp] = useState('');
  const [selectedDays, setSelectedDays] = useState<Set<number>>(new Set([1, 2, 3, 4, 5]));
  const [openTime, setOpenTime] = useState(DEFAULT_OPEN_TIME);
  const [closeTime, setCloseTime] = useState(DEFAULT_CLOSE_TIME);
  const [hasCustomSchedule, setHasCustomSchedule] = useState(false);
  const [dayHours, setDayHours] = useState<Record<number, DaySchedule>>({
    1: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
    2: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
    3: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
    4: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
    5: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
    6: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
    0: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
  });
  const [hasLunch, setHasLunch] = useState(false);
  const [lunchStart, setLunchStart] = useState('12:00');
  const [lunchEnd, setLunchEnd] = useState('13:00');
  const [leadTime, setLeadTime] = useState(60);
  const [reminderTime, setReminderTime] = useState(2);
  const [cancelTime, setCancelTime] = useState(2);
  const [services, setServices] = useState<ServiceItem[]>([
    { id: '1', name: 'Corte', price: '45,00', duration: 30 },
    { id: '2', name: 'Corte + Barba', price: '70,00', duration: 60 },
  ]);

  // Validation Error States
  const [shopBad, setShopBad] = useState(false);
  const [ownerBad, setOwnerBad] = useState(false);
  const [wppBad, setWppBad] = useState(false);
  const [daysBad, setDaysBad] = useState(false);
  const [servicesBad, setServicesBad] = useState<Record<string, boolean>>({});

  // Step 5 Connection State
  const [isConnected, setIsConnected] = useState(false);

  // Animation & DOM Refs
  const cardRef = useRef<HTMLDivElement | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const qrBoxRef = useRef<HTMLDivElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);
  const okRef = useRef<HTMLDivElement | null>(null);
  const checkRingRef = useRef<SVGCircleElement | null>(null);
  const checkTickRef = useRef<SVGPathElement | null>(null);
  const goBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Phone mask formatting
  const handleWppChange = (val: string) => {
    const d = val.replace(/\D/g, '').slice(0, 11);
    let o = d;
    if (d.length > 2) o = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) o = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    setWpp(o);
    if (wppBad) setWppBad(false);
  };

  // Day toggle
  const toggleDay = (d: number, e?: MouseEvent<HTMLButtonElement>) => {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
    setDaysBad(false);
    if (e?.currentTarget) {
      gsap.fromTo(
        e.currentTarget,
        { scale: 0.88 },
        { scale: 1, duration: 0.5, ease: 'back.out(3)' }
      );
    }
  };

  // Helper to update specific day opening/closing hours
  const updateDayHours = (day: number, field: 'open' | 'close', val: string) => {
    setDayHours((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || { open: openTime, close: closeTime }),
        [field]: val,
      },
    }));
  };

  // Helper to reset all days to 09:00 - 18:00
  const applyDefaultHoursToAll = () => {
    setDayHours({
      1: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
      2: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
      3: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
      4: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
      5: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
      6: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
      0: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
    });
  };

  // Days summary text calculation
  const getDaysSummary = useCallback((): string => {
    const ds = DAYS_ORDER.filter((d) => selectedDays.has(d));
    if (!ds.length) return 'Selecione ao menos um dia.';

    let t = '';

    if (hasCustomSchedule) {
      // Group consecutive active days with matching opening and closing hours
      const groups: { days: number[]; open: string; close: string }[] = [];
      for (const d of ds) {
        const h = dayHours[d] || { open: openTime, close: closeTime };
        const lastGroup = groups[groups.length - 1];
        if (lastGroup && lastGroup.open === h.open && lastGroup.close === h.close) {
          lastGroup.days.push(d);
        } else {
          groups.push({ days: [d], open: h.open, close: h.close });
        }
      }

      const summaryParts = groups.map((g) => {
        let label = '';
        if (g.days.length === 1) {
          label = DAYS_NAMES[g.days[0]];
        } else {
          const idx = g.days.map((d) => DAYS_ORDER.indexOf(d));
          const seq = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
          if (seq && g.days.length > 2) {
            label = `${DAYS_NAMES[g.days[0]]} a ${DAYS_NAMES[g.days[g.days.length - 1]]}`;
          } else {
            label = g.days.map((d) => DAYS_LABELS[d]).join(', ');
          }
        }
        return `${label}: das ${g.open} às ${g.close}`;
      });

      t += summaryParts.join('. ') + '. ';
    } else {
      const idx = ds.map((d) => DAYS_ORDER.indexOf(d));
      const seq = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
      const daysStr =
        seq && ds.length > 2
          ? `${DAYS_NAMES[ds[0]]} a ${DAYS_NAMES[ds[ds.length - 1]]}`
          : ds.map((d) => DAYS_LABELS[d]).join(', ');
      t += `${daysStr}, das ${openTime} às ${closeTime}. `;
    }

    if (hasLunch) t += `Pausa das ${lunchStart} às ${lunchEnd}. `;
    t += `Antecedência mínima: ${leadTime ? formatMinutes(leadTime) : 'nenhuma'}.`;
    return t.trim();
  }, [
    selectedDays,
    openTime,
    closeTime,
    hasCustomSchedule,
    dayHours,
    hasLunch,
    lunchStart,
    lunchEnd,
    leadTime,
  ]);

  // Add Service
  const addService = () => {
    if (services.length >= 12) return;
    const newId = String(Date.now());
    setServices((prev) => [...prev, { id: newId, name: '', price: '', duration: 30 }]);
  };

  // Update Service
  const updateService = (
    id: string,
    updates: Partial<Omit<ServiceItem, 'id'>>
  ) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    if (updates.name !== undefined && servicesBad[id]) {
      setServicesBad((b) => ({ ...b, [id]: false }));
    }
  };

  // Remove Service
  const removeService = (id: string, rowEl: HTMLDivElement | null) => {
    if (services.length <= 1) {
      if (rowEl) {
        rowEl.classList.remove('shake');
        void rowEl.offsetWidth;
        rowEl.classList.add('shake');
      }
      return;
    }
    if (rowEl) {
      gsap.to(rowEl, {
        opacity: 0,
        x: 40,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: -6,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => {
          setServices((prev) => prev.filter((s) => s.id !== id));
        },
      });
    } else {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Helper trigger for shake animation
  const shakeCard = () => {
    if (cardRef.current) {
      cardRef.current.classList.remove('shake');
      void cardRef.current.offsetWidth;
      cardRef.current.classList.add('shake');
    }
  };

  // Validation
  const validateStep = useCallback(
    (stepIdx: number): boolean => {
      if (stepIdx === 0) {
        const isShopOk = shop.trim().length >= 2;
        const isOwnerOk = owner.trim().length >= 2;
        const isWppOk = wpp.replace(/\D/g, '').length >= 10;

        setShopBad(!isShopOk);
        setOwnerBad(!isOwnerOk);
        setWppBad(!isWppOk);

        if (!isShopOk || !isOwnerOk || !isWppOk) {
          shakeCard();
          return false;
        }
        return true;
      }

      if (stepIdx === 1) {
        const isDaysOk = selectedDays.size > 0;
        let isTimeOk = openTime < closeTime;
        if (hasCustomSchedule) {
          isTimeOk = Array.from(selectedDays).every((d) => {
            const dh = dayHours[d] || { open: openTime, close: closeTime };
            return dh.open < dh.close;
          });
        }
        const isLunchOk = !hasLunch || lunchStart < lunchEnd;
        const ok = isDaysOk && isTimeOk && isLunchOk;

        setDaysBad(!isDaysOk);
        if (!ok) {
          shakeCard();
          return false;
        }
        return true;
      }

      if (stepIdx === 2) {
        let ok = true;
        const badMap: Record<string, boolean> = {};
        services.forEach((s) => {
          const v = s.name.trim().length > 0;
          if (!v) {
            badMap[s.id] = true;
            ok = false;
          }
        });
        setServicesBad(badMap);
        if (!ok) {
          shakeCard();
          return false;
        }
        return true;
      }

      return true;
    },
    [
      shop,
      owner,
      wpp,
      selectedDays,
      openTime,
      closeTime,
      hasCustomSchedule,
      dayHours,
      hasLunch,
      lunchStart,
      lunchEnd,
      services,
    ]
  );

  // Step navigation
  const goToStep = useCallback(
    (to: number) => {
      if (to < 0 || to > 4) return;
      const fwd = to > curStep;
      const cardEl = cardRef.current;

      if (cardEl) {
        gsap.to(cardEl, {
          y: fwd ? -60 : 60,
          opacity: 0,
          scale: 0.96,
          filter: 'blur(10px)',
          duration: 0.45,
          ease: 'power3.in',
          onComplete: () => {
            setCurStep(to);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (to === 4) {
              setTimeout(() => drawQRCode(qrCanvasRef.current, wpp || '11999999999'), 60);
            }
            gsap.fromTo(
              cardEl,
              { y: fwd ? 90 : -90, opacity: 0, scale: 0.95, filter: 'blur(14px)' },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.85,
                ease: 'expo.out',
                clearProps: 'transform,filter,opacity',
              }
            );
          },
        });
      } else {
        setCurStep(to);
        if (to === 4) {
          setTimeout(() => drawQRCode(qrCanvasRef.current, wpp || '11999999999'), 60);
        }
      }
    },
    [curStep, wpp]
  );

  const nextStep = useCallback(() => {
    if (validateStep(curStep)) {
      goToStep(curStep + 1);
    }
  }, [curStep, validateStep, goToStep]);

  const prevStep = useCallback(() => {
    goToStep(curStep - 1);
  }, [curStep, goToStep]);

  // Simulate Connection (Step 5)
  const handleSimulate = () => {
    setIsConnected(true);
    if (scanRef.current) scanRef.current.style.display = 'none';

    if (okRef.current) {
      gsap.to(okRef.current, { opacity: 1, duration: 0.5 });
    }
    if (checkRingRef.current) {
      gsap.to(checkRingRef.current, { strokeDashoffset: 0, duration: 1, ease: 'power2.out' });
    }
    if (checkTickRef.current) {
      gsap.to(checkTickRef.current, { strokeDashoffset: 0, duration: 0.6, delay: 0.7, ease: 'power2.out' });
    }
    if (goBtnRef.current) {
      gsap.from(goBtnRef.current, { opacity: 0, y: 14, duration: 0.8, delay: 0.9 });
    }
  };

  // Redraw QR code if on step 4 and canvas changes
  useEffect(() => {
    if (curStep === 4) {
      drawQRCode(qrCanvasRef.current, wpp || '11999999999');
    }
  }, [curStep, wpp]);

  // Initial mount entrance
  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, scale: 0.95, filter: 'blur(14px)' },
        { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', clearProps: 'all' }
      );
    }
  }, []);

  // Keyboard navigation (Enter moves to next step)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Enter' &&
        !['BUTTON', 'A', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) &&
        curStep < 4
      ) {
        e.preventDefault();
        if (validateStep(curStep)) {
          goToStep(curStep + 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [curStep, validateStep, goToStep]);

  return {
    curStep,
    goToStep,
    nextStep,
    prevStep,
    validateStep,
    // Form fields
    shop,
    setShop,
    shopBad,
    setShopBad,
    owner,
    setOwner,
    ownerBad,
    setOwnerBad,
    wpp,
    handleWppChange,
    wppBad,
    selectedDays,
    toggleDay,
    daysBad,
    openTime,
    setOpenTime,
    closeTime,
    setCloseTime,
    hasCustomSchedule,
    setHasCustomSchedule,
    dayHours,
    updateDayHours,
    applyDefaultHoursToAll,
    hasLunch,
    setHasLunch,
    lunchStart,
    setLunchStart,
    lunchEnd,
    setLunchEnd,
    leadTime,
    setLeadTime,
    services,
    addService,
    removeService,
    updateService,
    servicesBad,
    reminderTime,
    setReminderTime,
    cancelTime,
    setCancelTime,
    // Summaries
    daysSummary: getDaysSummary(),
    // Step 5 Connection
    isConnected,
    handleSimulate,
    // Refs & Spotlight
    cardRef,
    qrCanvasRef,
    qrBoxRef,
    scanRef,
    okRef,
    checkRingRef,
    checkTickRef,
    goBtnRef,
  };
}
