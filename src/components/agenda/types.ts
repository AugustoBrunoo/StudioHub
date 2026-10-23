export interface AppointmentItem {
  id: number;
  k: string; // YYYY-MM-DD
  start: number; // minutes from 00:00
  dur: number; // minutes
  client: string;
  service: string;
  price: number;
  phone: string;
  origin: 'WhatsApp' | 'Manual';
  status: 'agendado' | 'atendido' | 'falta' | 'cancelado';
}

export interface ServiceMeta {
  d: number;
  p: number;
}

export type FilterMode = 'todos' | 'pendentes' | 'atendidos' | 'faltas' | 'cancelados';
export type ViewMode = 'cards' | 'agenda';
export type SpanMode = 'day' | 'week';

export interface AgendaStats {
  tot: number;
  at: number;
  fa: number;
  min: number;
  rev: number;
}

export interface AgendaInsights {
  ocupacao: string;
  receita: string;
  tempoLivre: string;
  proximoLivre: string;
}

export interface StripDay {
  date: Date;
  k: string;
  open: boolean;
  total: number;
  isSelected: boolean;
  isToday: boolean;
  weekday: string;
  dayNum: number;
}

/* ---------- Constants ---------- */
export const OPEN = 540; // 09:00
export const CLOSE = 1140; // 19:00
export const P0 = 720; // 12:00
export const P1 = 780; // 13:00
export const PX = 1.3;
export const OPEN_D = [2, 3, 4, 5, 6]; // Terça a Sábado (2,3,4,5,6)

export const SERVICES: Record<string, ServiceMeta> = {
  'Corte': { d: 30, p: 45 },
  'Barba': { d: 30, p: 35 },
  'Corte + Barba': { d: 60, p: 70 },
  'Sobrancelha': { d: 15, p: 15 },
  'Hidratação': { d: 30, p: 40 },
};

export const POOL = [
  'Corte',
  'Corte',
  'Corte + Barba',
  'Corte + Barba',
  'Barba',
  'Sobrancelha',
  'Hidratação',
];

export const NAMES = [
  'Marcelo Andrade',
  'Rafael Lima',
  'Bruno Teixeira',
  'Diego Martins',
  'Lucas Ferreira',
  'Thiago Souza',
  'Felipe Costa',
  'Gustavo Alves',
  'Pedro Nunes',
  'André Rocha',
  'Caio Ribeiro',
  'Vinícius Dias',
  'Renan Barros',
  'Matheus Pires',
  'Eduardo Campos',
];

export const STATUS_MAP = {
  agendado: { l: 'Agendado', c: '#d4af37' },
  atendido: { l: 'Atendido', c: '#4ade80' },
  falta: { l: 'Falta', c: '#f87171' },
  cancelado: { l: 'Cancelado', c: '#6b7280' },
} as const;

export const FILTER_MAP: Record<string, 'agendado' | 'atendido' | 'falta' | 'cancelado'> = {
  pendentes: 'agendado',
  atendidos: 'atendido',
  faltas: 'falta',
  cancelados: 'cancelado',
};

export const SCHEDULE_CONFIG = {
  days: [2, 3, 4, 5, 6],
  open: '09:00',
  close: '19:00',
  p0: '12:00',
  p1: '13:00',
  lead: '1 hora',
  rem: '2 horas antes',
  cxl: 'até 2 horas antes',
};

/* ---------- Helpers ---------- */
export const pad = (n: number) => String(n).padStart(2, '0');

export const key = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const fromKey = (k: string) => {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const hm = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

export const toMin = (s: string) => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
};

export const money = (v: number) =>
  'R$ ' +
  v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const ini = (n: string) =>
  n
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const dur = (m: number) =>
  m >= 60
    ? Math.floor(m / 60) + 'h' + (m % 60 ? ' ' + pad(m % 60) + 'min' : '')
    : m + ' min';

export const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

export const rng = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const nowMin = () => {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
};

let UID_INITIAL = 100;

export function generateDayMock(k: string): AppointmentItem[] {
  const d = fromKey(k);
  const arr: AppointmentItem[] = [];
  if (!OPEN_D.includes(d.getDay())) return arr;

  const r = rng(+k.replace(/-/g, ''));
  const now = new Date();
  const tk = key(now);
  const nm = now.getHours() * 60 + now.getMinutes();
  let c = OPEN;

  while (c < CLOSE) {
    if (c >= P0 && c < P1) {
      c = P1;
      continue;
    }
    if (r() < 0.72) {
      const s = POOL[Math.floor(r() * POOL.length)];
      const v = SERVICES[s];
      if ((c < P0 && c + v.d > P0) || c + v.d > CLOSE) {
        c += 15;
        continue;
      }
      let status: 'agendado' | 'atendido' | 'falta' | 'cancelado' = 'agendado';
      if (k < tk || (k === tk && c + v.d <= nm)) {
        const x = r();
        status = x < 0.84 ? 'atendido' : x < 0.94 ? 'falta' : 'cancelado';
      }
      arr.push({
        id: UID_INITIAL++,
        k,
        start: c,
        dur: v.d,
        client: NAMES[Math.floor(r() * NAMES.length)],
        service: s,
        price: v.p,
        phone: `(21) 9${Math.floor(1000 + r() * 9000)}-${Math.floor(1000 + r() * 9000)}`,
        origin: r() < 0.7 ? 'WhatsApp' : 'Manual',
        status,
      });
      c += v.d + (r() < 0.25 ? 15 : 0);
    } else {
      c += 30;
    }
  }

  // Guaranteed Marcelo Andrade appointment for today
  if (k === tk) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].start < 885 && arr[i].start + arr[i].dur > 840) {
        arr.splice(i, 1);
      }
    }
    arr.push({
      id: UID_INITIAL++,
      k,
      start: 840,
      dur: 45,
      client: 'Marcelo Andrade',
      service: 'Corte + Barba',
      price: 70,
      phone: '(21) 98877-6655',
      origin: 'WhatsApp',
      status: 885 <= nm ? 'atendido' : 'agendado',
    });
  }

  arr.sort((a, b) => a.start - b.start);
  return arr;
}
