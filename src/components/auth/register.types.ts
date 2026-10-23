export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  duration: number; // in minutes
}

export interface DaySchedule {
  open: string;
  close: string;
}

export const DAYS_NAMES = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
] as const;

export const DAYS_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Seg a Dom

export const DAYS_LABELS: Record<number, string> = {
  1: 'Seg',
  2: 'Ter',
  3: 'Qua',
  4: 'Qui',
  5: 'Sex',
  6: 'Sáb',
  0: 'Dom',
};

export const DAYS_FULL_NAMES: Record<number, string> = {
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
  0: 'Domingo',
};

export const LEAD_OPTIONS = [
  { label: 'Sem antecedência', value: 0 },
  { label: '30 min', value: 30 },
  { label: '1 hora', value: 60 },
  { label: '2 horas', value: 120 },
  { label: '4 horas', value: 240 },
  { label: '1 dia', value: 1440 },
] as const;

export const REMINDER_OPTIONS = [
  { label: '1 hora antes', value: 1 },
  { label: '2 horas antes', value: 2 },
  { label: '4 horas antes', value: 4 },
  { label: 'No dia anterior', value: 24 },
] as const;

export const CANCEL_OPTIONS = [
  { label: '1 hora', value: 1 },
  { label: '2 horas', value: 2 },
  { label: '4 horas', value: 4 },
  { label: '12 horas', value: 12 },
  { label: '24 horas', value: 24 },
] as const;

export const DURATION_OPTIONS = [15, 30, 45, 60, 75, 90, 120] as const;

export const STEP_NAMES = [
  'Identidade',
  'Horários',
  'Serviços',
  'Anti-falta',
  'Conexão',
] as const;

/**
 * Format minutes into friendly human-readable strings (e.g. 30 min, 1 hora, 1 dia).
 */
export const formatMinutes = (m: number): string => {
  if (m >= 1440) return '1 dia';
  if (m >= 60) return `${m / 60}${m === 60 ? ' hora' : ' horas'}`;
  return `${m} min`;
};

/**
 * Renders a stylized deterministic QR Code matrix on a canvas element.
 */
export function drawQRCode(canvas: HTMLCanvasElement | null, seedStr: string): void {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const N = 33;
  const m = 8;
  let h = 2166136261;

  for (const ch of seedStr + 'studiohub') {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }

  const rnd = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };

  // Canvas background
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, 264, 264);
  ctx.fillStyle = '#0a0a0a';

  const isFinder = (a: number, b: number) =>
    (a < 8 && b < 8) || (a >= N - 8 && b < 8) || (a < 8 && b >= N - 8);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (isFinder(i, j)) continue;
      if (rnd() < 0.5) {
        ctx.beginPath();
        ctx.roundRect(i * m, j * m, m - 1, m - 1, 2);
        ctx.fill();
      }
    }
  }

  // Finder corners
  const corners: [number, number][] = [
    [0, 0],
    [N - 7, 0],
    [0, N - 7],
  ];

  corners.forEach(([a, b]) => {
    ctx.fillStyle = '#0a0a0a';
    ctx.beginPath();
    ctx.roundRect(a * m, b * m, 7 * m, 7 * m, 9);
    ctx.fill();

    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.roundRect((a + 1) * m, (b + 1) * m, 5 * m, 5 * m, 6);
    ctx.fill();

    ctx.fillStyle = '#0a0a0a';
    ctx.beginPath();
    ctx.roundRect((a + 2) * m, (b + 2) * m, 3 * m, 3 * m, 4);
    ctx.fill();
  });
}
