import { useState, useRef, useEffect, useCallback, type MouseEvent } from 'react';
import gsap from 'gsap';
import {
  type ServiceItem,
  type DaySchedule,
  DAYS_NAMES,
  DAYS_ORDER,
  DAYS_LABELS,
  DAYS_FULL_NAMES,
  formatMinutes,
  drawQRCode,
} from './register.types';

const DEFAULT_OPEN_TIME = '09:00';
const DEFAULT_CLOSE_TIME = '18:00';
const DRAFT_STORAGE_KEY = 'studiohub_register_draft';

const DEFAULT_SERVICES: ServiceItem[] = [
  { id: '1', name: 'Corte', price: '45,00', duration: 30 },
  { id: '2', name: 'Corte + Barba', price: '70,00', duration: 60 },
];

const DEFAULT_DAY_HOURS: Record<number, DaySchedule> = {
  1: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
  2: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
  3: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
  4: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
  5: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
  6: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
  0: { open: DEFAULT_OPEN_TIME, close: DEFAULT_CLOSE_TIME },
};

interface RegisterDraft {
  curStep?: number;
  shop?: string;
  owner?: string;
  wpp?: string;
  selectedDays?: number[];
  openTime?: string;
  closeTime?: string;
  hasCustomSchedule?: boolean;
  dayHours?: Record<number, DaySchedule>;
  hasLunch?: boolean;
  lunchStart?: string;
  lunchEnd?: string;
  leadTime?: number;
  reminderTime?: number;
  cancelTime?: number;
  services?: ServiceItem[];
  savedAt?: string;
}

function getStoredDraft(): RegisterDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function useRegisterWizard() {
  const initialDraft = getStoredDraft();

  // Wizard Step (0 to 4)
  const [curStep, setCurStep] = useState<number>(() => {
    if (
      initialDraft &&
      typeof initialDraft.curStep === 'number' &&
      initialDraft.curStep >= 0 &&
      initialDraft.curStep <= 4
    ) {
      return initialDraft.curStep;
    }
    return 0;
  });

  // Form State
  const [shop, setShop] = useState<string>(() => initialDraft?.shop ?? '');
  const [owner, setOwner] = useState<string>(() => initialDraft?.owner ?? '');
  const [wpp, setWpp] = useState<string>(() => initialDraft?.wpp ?? '');
  const [selectedDays, setSelectedDays] = useState<Set<number>>(() => {
    if (
      initialDraft?.selectedDays &&
      Array.isArray(initialDraft.selectedDays) &&
      initialDraft.selectedDays.length > 0
    ) {
      return new Set(initialDraft.selectedDays);
    }
    return new Set([1, 2, 3, 4, 5]);
  });
  const [openTime, setOpenTime] = useState<string>(() => initialDraft?.openTime ?? DEFAULT_OPEN_TIME);
  const [closeTime, setCloseTime] = useState<string>(() => initialDraft?.closeTime ?? DEFAULT_CLOSE_TIME);
  const [hasCustomSchedule, setHasCustomSchedule] = useState<boolean>(() => initialDraft?.hasCustomSchedule ?? false);
  const [dayHours, setDayHours] = useState<Record<number, DaySchedule>>(() => {
    if (initialDraft?.dayHours && Object.keys(initialDraft.dayHours).length > 0) {
      return initialDraft.dayHours;
    }
    return DEFAULT_DAY_HOURS;
  });
  const [hasLunch, setHasLunch] = useState<boolean>(() => initialDraft?.hasLunch ?? false);
  const [lunchStart, setLunchStart] = useState<string>(() => initialDraft?.lunchStart ?? '12:00');
  const [lunchEnd, setLunchEnd] = useState<string>(() => initialDraft?.lunchEnd ?? '13:00');
  const [leadTime, setLeadTime] = useState<number>(() => initialDraft?.leadTime ?? 60);
  const [reminderTime, setReminderTime] = useState<number>(() => initialDraft?.reminderTime ?? 2);
  const [cancelTime, setCancelTime] = useState<number>(() => initialDraft?.cancelTime ?? 2);
  const [services, setServices] = useState<ServiceItem[]>(() => {
    if (initialDraft?.services && Array.isArray(initialDraft.services) && initialDraft.services.length > 0) {
      return initialDraft.services;
    }
    return DEFAULT_SERVICES;
  });

  // Validation Error States
  const [shopBad, setShopBad] = useState(false);
  const [ownerBad, setOwnerBad] = useState(false);
  const [wppBad, setWppBad] = useState(false);
  const [daysBad, setDaysBad] = useState(false);
  const [servicesBad, setServicesBad] = useState<Record<string, boolean>>({});

  // Step 5 Connection State
  const [isConnected, setIsConnected] = useState(false);
  const [databasePayload, setDatabasePayload] = useState<any>(null);

  // Animation & DOM Refs
  const cardRef = useRef<HTMLDivElement | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const qrBoxRef = useRef<HTMLDivElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);
  const okRef = useRef<HTMLDivElement | null>(null);
  const checkRingRef = useRef<SVGCircleElement | null>(null);
  const checkTickRef = useRef<SVGPathElement | null>(null);
  const goBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Clear storage cache helper
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Smart Storage Auto-Save (only if not completed)
  useEffect(() => {
    if (isConnected) return;
    try {
      const draft: RegisterDraft = {
        curStep,
        shop,
        owner,
        wpp,
        selectedDays: Array.from(selectedDays),
        openTime,
        closeTime,
        hasCustomSchedule,
        dayHours,
        hasLunch,
        lunchStart,
        lunchEnd,
        leadTime,
        reminderTime,
        cancelTime,
        services,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore storage write errors
    }
  }, [
    curStep,
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
    leadTime,
    reminderTime,
    cancelTime,
    services,
    isConnected,
  ]);

  // Reset entire form and purge cache
  const resetForm = useCallback(() => {
    clearDraft();
    setCurStep(0);
    setShop('');
    setOwner('');
    setWpp('');
    setSelectedDays(new Set([1, 2, 3, 4, 5]));
    setOpenTime(DEFAULT_OPEN_TIME);
    setCloseTime(DEFAULT_CLOSE_TIME);
    setHasCustomSchedule(false);
    setDayHours(DEFAULT_DAY_HOURS);
    setHasLunch(false);
    setLunchStart('12:00');
    setLunchEnd('13:00');
    setLeadTime(60);
    setReminderTime(2);
    setCancelTime(2);
    setServices(DEFAULT_SERVICES);
    setIsConnected(false);
    setDatabasePayload(null);
  }, [clearDraft]);

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

  // Helper to reset all days to given or default hours
  const applyDefaultHoursToAll = (customOpen?: string, customClose?: string) => {
    const o = customOpen || openTime || DEFAULT_OPEN_TIME;
    const c = customClose || closeTime || DEFAULT_CLOSE_TIME;
    setDayHours({
      1: { open: o, close: c },
      2: { open: o, close: c },
      3: { open: o, close: c },
      4: { open: o, close: c },
      5: { open: o, close: c },
      6: { open: o, close: c },
      0: { open: o, close: c },
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

  // Construct comprehensive Database JSON payload
  const buildDatabasePayload = useCallback(() => {
    const rawWpp = wpp.replace(/\D/g, '');
    const cleanSlug =
      shop
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || 'studio';

    // Parse catalog services
    const parsedServices = services.map((s, idx) => {
      const numericPrice =
        parseFloat(s.price.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
      return {
        id: s.id || String(idx + 1),
        index: idx + 1,
        name: s.name.trim() || 'Serviço sem nome',
        price: {
          raw: s.price,
          numeric: numericPrice,
          currency: 'BRL',
          formatted: `R$ ${s.price}`,
        },
        duration: {
          minutes: s.duration,
          formatted: formatMinutes(s.duration),
        },
        active: true,
      };
    });

    const averagePrice =
      parsedServices.length > 0
        ? Number(
            (
              parsedServices.reduce((acc, s) => acc + s.price.numeric, 0) /
              parsedServices.length
            ).toFixed(2)
          )
        : 0;

    // Weekly schedule detailed day by day
    const weeklySchedule = DAYS_ORDER.map((d) => {
      const isSelected = selectedDays.has(d);
      const hours = dayHours[d] || { open: openTime, close: closeTime };
      return {
        dayIndex: d,
        dayLabel: DAYS_LABELS[d],
        dayFullName: DAYS_FULL_NAMES[d],
        isWeekend: d === 6 || d === 0,
        isOpen: isSelected,
        openTime: isSelected ? (hasCustomSchedule ? hours.open : openTime) : null,
        closeTime: isSelected ? (hasCustomSchedule ? hours.close : closeTime) : null,
        dailyHoursFormatted: isSelected
          ? `${hasCustomSchedule ? hours.open : openTime} às ${hasCustomSchedule ? hours.close : closeTime}`
          : 'Fechado',
      };
    });

    const activeDaysLabels = DAYS_ORDER
      .filter((d) => selectedDays.has(d))
      .map((d) => DAYS_FULL_NAMES[d]);

    // Calculate lunch duration
    let lunchDurationMinutes: number | null = null;
    if (hasLunch && lunchStart && lunchEnd) {
      const [sh, sm] = lunchStart.split(':').map(Number);
      const [eh, em] = lunchEnd.split(':').map(Number);
      lunchDurationMinutes = eh * 60 + em - (sh * 60 + sm);
    }

    return {
      meta: {
        schemaVersion: '2.0.0',
        environment: 'production',
        registeredAt: new Date().toISOString(),
        registrationSource: 'web_wizard_onboarding',
        plan: {
          id: 'solo',
          name: 'Plano Solo',
          tier: 'starter',
          maxProfessionals: 1,
          billingCycle: 'monthly',
        },
        deviceAudit: {
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          language: typeof navigator !== 'undefined' ? navigator.language : 'pt-BR',
          platform:
            typeof navigator !== 'undefined'
              ? (navigator as any).userAgentData?.platform || navigator.platform || 'web'
              : 'web',
          screenResolution:
            typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'unknown',
        },
      },
      business: {
        name: shop.trim(),
        slug: cleanSlug,
        owner: {
          name: owner.trim(),
          contactPhone: {
            raw: rawWpp,
            formatted: wpp,
            countryCode: '+55',
            nationalNumber: rawWpp,
          },
        },
        whatsappAssistant: {
          botPhoneNumber: rawWpp,
          botPhoneFormatted: wpp,
          status: 'connected' as const,
          connectedAt: new Date().toISOString(),
          welcomeGreetingTemplate: `Olá! Você está no WhatsApp do ${shop || 'Studio'}, com o assistente inteligente de ${owner || 'você'}.`,
        },
      },
      operatingSchedule: {
        mode: hasCustomSchedule ? ('custom' as const) : ('fixed' as const),
        activeDaysCount: selectedDays.size,
        activeDaysIndices: Array.from(selectedDays),
        activeDaysLabels,
        standardHours: {
          openTime,
          closeTime,
          workDurationHours: `${openTime} às ${closeTime}`,
        },
        weeklySchedule,
        lunchBreak: {
          hasFixedBreak: hasLunch,
          startTime: hasLunch ? lunchStart : null,
          endTime: hasLunch ? lunchEnd : null,
          durationMinutes: lunchDurationMinutes,
        },
        bookingRules: {
          minLeadTimeMinutes: leadTime,
          minLeadTimeFormatted: leadTime ? formatMinutes(leadTime) : 'Sem antecedência',
        },
        summaryText: getDaysSummary(),
      },
      servicesCatalog: {
        totalServices: parsedServices.length,
        averagePrice,
        items: parsedServices,
      },
      antiNoShowAutomation: {
        reminderRule: {
          hoursBefore: reminderTime,
          description: reminderTime === 24 ? '1 dia antes' : `${reminderTime} horas antes`,
          templatePreview: `Olá! Lembrete: seu horário no ${shop || 'Studio'} é ${
            reminderTime === 24 ? 'amanhã' : `daqui a ${formatMinutes(reminderTime * 60)}`
          }. Responda CANCELAR se precisar desmarcar.`,
        },
        cancellationPolicy: {
          maxHoursBeforeForAutoCancel: cancelTime,
          description: `Permitido até ${formatMinutes(cancelTime * 60)} antes`,
          policyText: `Cancelamentos automáticos só são permitidos com até ${formatMinutes(
            cancelTime * 60
          )} de antecedência; depois disso, o cliente recebe uma mensagem pedindo para ligar.`,
        },
      },
      onboarding: {
        stepCompleted: 5,
        isFullyConfigured: true,
        connectionMethod: 'qr_code_whatsapp' as const,
        qrCodeGenerated: true,
      },
    };
  }, [
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
    leadTime,
    services,
    reminderTime,
    cancelTime,
    getDaysSummary,
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
        for (const s of services) {
          if (!s.name.trim() || !s.price.trim()) {
            badMap[s.id] = true;
            ok = false;
          }
        }
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
          filter: 'blur(10px)',
          scale: 0.94,
          duration: 0.42,
          ease: 'power3.in',
          onComplete: () => {
            setCurStep(to);
            gsap.fromTo(
              cardEl,
              { y: fwd ? 60 : -60, opacity: 0, filter: 'blur(10px)', scale: 0.94 },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
                duration: 0.5,
                ease: 'power3.out',
                clearProps: 'transform,filter,opacity',
              }
            );
          },
        });
      } else {
        setCurStep(to);
      }
    },
    [curStep]
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
    // 1. Generate full detailed database payload
    const payload = buildDatabasePayload();
    setDatabasePayload(payload);

    // 2. Output detailed organized console.log
    console.group(
      '%c🚀 StudioHub Engine | Payload Completo para Banco de Dados',
      'background: #111; color: #f1c40f; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 6px; border: 1px solid #d4af37;'
    );
    console.log(
      '%c📌 Resumo Executivo:',
      'color: #38bdf8; font-weight: bold; font-size: 12px;',
      {
        Studio: payload.business.name,
        Responsável: payload.business.owner.name,
        WhatsApp: payload.business.owner.contactPhone.formatted,
        Serviços: `${payload.servicesCatalog.totalServices} cadastrados`,
        TicketMédio: `R$ ${payload.servicesCatalog.averagePrice.toFixed(2)}`,
        Escala: payload.operatingSchedule.summaryText,
        StatusConexão: payload.business.whatsappAssistant.status,
      }
    );
    console.log(
      '%c📋 JSON Estruturado (Objeto pronto para DB / ORM):',
      'color: #4ade80; font-weight: bold; font-size: 12px;',
      payload
    );
    console.log(
      '%c📄 JSON Stringify (Pronto para API POST /api/register):',
      'color: #fbbf24; font-weight: bold; font-size: 11px;',
      JSON.stringify(payload, null, 2)
    );
    console.groupEnd();

    // 3. Purge storage cache on simulate connection
    clearDraft();

    // 4. Update connection state and trigger GSAP animations
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
    // Summaries & Payloads
    daysSummary: getDaysSummary(),
    databasePayload,
    buildDatabasePayload,
    clearDraft,
    resetForm,
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
