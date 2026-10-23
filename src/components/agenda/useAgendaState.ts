import { useState, useMemo, useCallback } from 'react';
import {
  type AppointmentItem,
  type FilterMode,
  type ViewMode,
  type SpanMode,
  SERVICES,
  OPEN,
  CLOSE,
  P0,
  P1,
  OPEN_D,
  FILTER_MAP,
  generateDayMock,
  key,
  fromKey,
  addDays,
  hm,
  dur,
  money,
  toMin,
  nowMin,
} from './types';

let UID_INCREMENT = 1000;

export function useAgendaState() {
  // Appointment database map
  const [db, setDb] = useState<Record<string, AppointmentItem[]>>({});

  // Active navigation & filters
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [spanMode, setSpanMode] = useState<SpanMode>('day');
  const [filter, setFilter] = useState<FilterMode>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // UI Drawer & Popover state
  const [activeDrawerId, setActiveDrawerId] = useState<number | null>(null);
  const [isHoursPopOpen, setIsHoursPopOpen] = useState(false);

  // Modal & Form state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    editItem: AppointmentItem | null;
    defaultKey?: string;
    defaultTime?: string;
  }>({
    isOpen: false,
    editItem: null,
  });

  const [formClient, setFormClient] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formService, setFormService] = useState('Corte');
  const [formData, setFormData] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formError, setFormError] = useState<{ msg: string; sug?: number } | null>(null);

  // Get appointments for any date key
  const getDayList = useCallback(
    (k: string): AppointmentItem[] => {
      if (db[k]) return db[k];
      const generated = generateDayMock(k);
      setDb((prev) => ({ ...prev, [k]: generated }));
      return generated;
    },
    [db]
  );

  const currentDateKey = key(selectedDate);

  // Get stats for a date
  const getStats = useCallback(
    (k: string) => {
      const a = getDayList(k);
      const act = a.filter((x) => x.status !== 'cancelado');
      const ok = act.filter((x) => x.status !== 'falta');
      return {
        tot: act.length,
        at: a.filter((x) => x.status === 'atendido').length,
        fa: a.filter((x) => x.status === 'falta').length,
        min: ok.reduce((s, x) => s + x.dur, 0),
        rev: ok.reduce((s, x) => s + x.price, 0),
      };
    },
    [getDayList]
  );

  const currentStats = useMemo(() => getStats(currentDateKey), [getStats, currentDateKey]);

  // Compute gaps for free slots
  const getGaps = useCallback(
    (k: string, minLen = 15, ignoreId?: number): [number, number][] => {
      const d = fromKey(k);
      if (!OPEN_D.includes(d.getDay())) return [];
      const now = new Date();
      const tk = key(now);
      if (k < tk) return [];

      let from = OPEN;
      if (k === tk) {
        from = Math.max(OPEN, Math.ceil((now.getHours() * 60 + now.getMinutes()) / 15) * 15);
      }

      const busy: [number, number][] = [
        ...getDayList(k)
          .filter((x) => x.status !== 'cancelado' && x.id !== ignoreId)
          .map((x) => [x.start, x.start + x.dur] as [number, number]),
        [P0, P1] as [number, number],
      ].sort((p, q) => p[0] - q[0]);

      const out: [number, number][] = [];
      let c = from;
      for (const [s, e] of busy) {
        if (s - c >= minLen) out.push([c, s]);
        c = Math.max(c, e);
      }
      if (CLOSE - c >= minLen) out.push([c, CLOSE]);
      return out;
    },
    [getDayList]
  );

  const currentGaps = useMemo(() => getGaps(currentDateKey, 15), [getGaps, currentDateKey]);

  // Insights
  const insights = useMemo(() => {
    const s = currentStats;
    const g = currentGaps;
    const free = g.reduce((t, x) => t + x[1] - x[0], 0);
    const nx = g.find((x) => x[1] - x[0] >= 30);
    const ocupacao = Math.round((s.min / 540) * 100) + '%';
    const receita = money(s.rev).replace(',00', '');
    const tempoLivre = free
      ? dur(free)
      : OPEN_D.includes(selectedDate.getDay()) && currentDateKey >= key(new Date())
      ? 'Lotado'
      : '—';
    const proximoLivre = nx ? hm(nx[0]) : '—';
    return { ocupacao, receita, tempoLivre, proximoLivre };
  }, [currentStats, currentGaps, selectedDate, currentDateKey]);

  // Filtered appointment list for view
  const listFor = useCallback(
    (k: string) => {
      return getDayList(k).filter((a) => {
        const st = FILTER_MAP[filter];
        if (st ? a.status !== st : a.status === 'cancelado') return false;
        if (!searchQuery) return true;
        return (a.client + ' ' + a.service + ' ' + a.phone).toLowerCase().includes(searchQuery);
      });
    },
    [getDayList, filter, searchQuery]
  );

  // Status changer
  const setStatus = (
    id: number,
    s: 'agendado' | 'atendido' | 'falta' | 'cancelado',
    showToast?: (m: string) => void
  ) => {
    setDb((prev) => {
      const nextDb = { ...prev };
      for (const k in nextDb) {
        const idx = nextDb[k].findIndex((x) => x.id === id);
        if (idx !== -1) {
          const updated = [...nextDb[k]];
          updated[idx] = { ...updated[idx], status: s };
          nextDb[k] = updated;
          break;
        }
      }
      return nextDb;
    });
    setActiveDrawerId(null);
    if (showToast) {
      const msgs: Record<string, string> = {
        atendido: 'Marcado como atendido',
        falta: 'Falta registrada',
        cancelado: 'Agendamento cancelado',
        agendado: 'Agendamento reaberto',
      };
      showToast(msgs[s]);
    }
  };

  // Step days / weeks
  const step = (n: number) => {
    const isWeekAgenda = viewMode === 'agenda' && spanMode === 'week';
    setSelectedDate((prev) => addDays(prev, isWeekAgenda ? 7 * n : n));
  };

  // Week strip data
  const stripDays = useMemo(() => {
    const d = selectedDate;
    const mon = addDays(d, -((d.getDay() + 6) % 7));
    const tk = key(new Date());
    const sk = key(d);
    return Array.from({ length: 7 }, (_, i) => {
      const x = addDays(mon, i);
      const k = key(x);
      const open = OPEN_D.includes(x.getDay());
      const st = getStats(k);
      return {
        date: x,
        k,
        open,
        total: st.tot,
        isSelected: k === sk,
        isToday: k === tk,
        weekday: x.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
        dayNum: x.getDate(),
      };
    });
  }, [selectedDate, getStats]);

  // Top date header info
  const topDateHeader = useMemo(() => {
    const d = selectedDate;
    const tk = key(new Date());
    const k = key(d);
    const isWk = viewMode === 'agenda' && spanMode === 'week';
    const mon = addDays(d, -((d.getDay() + 6) % 7));
    const sun = addDays(mon, 6);

    if (isWk) {
      return {
        line1: `${mon.getDate()} – ${sun.getDate()} de ${sun.toLocaleDateString('pt-BR', {
          month: 'long',
        })}`,
        line2: 'Visão semanal',
        isToday: k === tk,
      };
    }
    const diff = Math.round((fromKey(k).getTime() - fromKey(tk).getTime()) / 864e5);
    const suffix =
      diff === 0 ? ' · Hoje' : diff === 1 ? ' · Amanhã' : diff === -1 ? ' · Ontem' : '';
    return {
      line1: d.toLocaleDateString('pt-BR', { weekday: 'long' }),
      line2:
        d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) + suffix,
      isToday: k === tk,
    };
  }, [selectedDate, viewMode, spanMode]);

  // Active drawer item
  const activeDrawerItem = useMemo(() => {
    if (!activeDrawerId) return null;
    for (const k in db) {
      const found = db[k].find((x) => x.id === activeDrawerId);
      if (found) return found;
    }
    return null;
  }, [activeDrawerId, db]);

  // Modal actions
  const openModal = (opts?: {
    edit?: AppointmentItem | null;
    k?: string;
    t?: string | number;
  }) => {
    const edit = opts?.edit || null;
    setFormError(null);
    if (edit) {
      setFormClient(edit.client);
      setFormPhone(edit.phone);
      setFormService(edit.service);
      setFormData(edit.k);
      setFormTime(hm(edit.start));
    } else {
      setFormClient('');
      setFormPhone('');
      setFormService('Corte');
      setFormData(opts?.k || key(selectedDate));
      setFormTime(opts?.t != null && opts?.t !== '' ? hm(Number(opts.t)) : '');
    }
    setModalState({
      isOpen: true,
      editItem: edit,
      defaultKey: opts?.k,
      defaultTime: opts?.t?.toString(),
    });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, editItem: null });
    setFormError(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 2) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    if (raw.length > 7) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    setFormPhone(formatted);
  };

  const handleSaveModal = (onSuccessToast: (msg: string) => void) => {
    const name = formClient.trim();
    const k = formData;
    const t = formTime;
    const sv = formService;
    const v = SERVICES[sv];
    const isEdit = !!modalState.editItem;

    if (!isEdit && name.length < 2) {
      setFormError({ msg: 'Informe o nome do cliente.' });
      return;
    }
    if (!k || !t) {
      setFormError({ msg: 'Escolha a data e o horário.' });
      return;
    }

    const st = toMin(t);
    const en = st + v.d;
    const d = fromKey(k);

    if (!OPEN_D.includes(d.getDay())) {
      setFormError({ msg: 'Esse dia não tem atendimento (Terça a Sábado).' });
      return;
    }
    if (st < OPEN || en > CLOSE) {
      setFormError({ msg: `Fora do expediente (${hm(OPEN)} – ${hm(CLOSE)}).` });
      return;
    }

    const availableGaps = getGaps(k, v.d, modalState.editItem?.id);
    const firstSug = availableGaps.find((g) => g[1] - g[0] >= v.d)?.[0];

    if (st < P1 && en > P0) {
      setFormError({
        msg: 'Esse horário cai na sua pausa (12:00 – 13:00).',
        sug: firstSug,
      });
      return;
    }

    const now = new Date();
    if (k < key(now) || (k === key(now) && st < nowMin())) {
      setFormError({
        msg: 'Esse horário já passou.',
        sug: firstSug,
      });
      return;
    }

    const currentDayItems = getDayList(k);
    const conflict = currentDayItems.find(
      (x) =>
        x.status !== 'cancelado' &&
        (!modalState.editItem || x.id !== modalState.editItem.id) &&
        st < x.start + x.dur &&
        en > x.start
    );

    if (conflict) {
      setFormError({
        msg: `Conflito com ${conflict.client} (${hm(conflict.start)} – ${hm(
          conflict.start + conflict.dur
        )}).`,
        sug: firstSug,
      });
      return;
    }

    // Save to state
    setDb((prev) => {
      const nextDb = { ...prev };
      if (modalState.editItem) {
        const oldK = modalState.editItem.k;
        if (nextDb[oldK]) {
          nextDb[oldK] = nextDb[oldK].filter((x) => x.id !== modalState.editItem!.id);
        }
        const updatedItem: AppointmentItem = {
          ...modalState.editItem,
          k,
          start: st,
          status: 'agendado',
        };
        const targetList = nextDb[k] ? [...nextDb[k], updatedItem] : [updatedItem];
        targetList.sort((a, b) => a.start - b.start);
        nextDb[k] = targetList;
      } else {
        const newItem: AppointmentItem = {
          id: UID_INCREMENT++,
          k,
          start: st,
          dur: v.d,
          client: name,
          service: sv,
          price: v.p,
          phone: formPhone || '—',
          origin: 'Manual',
          status: 'agendado',
        };
        const targetList = nextDb[k] ? [...nextDb[k], newItem] : [newItem];
        targetList.sort((a, b) => a.start - b.start);
        nextDb[k] = targetList;
      }
      return nextDb;
    });

    setSelectedDate(d);
    closeModal();
    onSuccessToast(isEdit ? 'Agendamento remarcado' : 'Agendamento criado');
  };

  return {
    selectedDate,
    setSelectedDate,
    currentDateKey,
    viewMode,
    setViewMode,
    spanMode,
    setSpanMode,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    currentStats,
    currentGaps,
    insights,
    stripDays,
    topDateHeader,
    listFor,
    getGaps,
    step,
    setStatus,
    // Drawer
    activeDrawerId,
    setActiveDrawerId,
    activeDrawerItem,
    // Popover
    isHoursPopOpen,
    setIsHoursPopOpen,
    // Modal
    modalState,
    openModal,
    closeModal,
    handleSaveModal,
    // Form
    formClient,
    setFormClient,
    formPhone,
    handlePhoneChange,
    formService,
    setFormService,
    formData,
    setFormData,
    formTime,
    setFormTime,
    formError,
    setFormError,
  };
}
