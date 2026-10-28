import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import { AgendaAppointmentCard } from './AgendaAppointmentCard';
import {
  type AppointmentItem,
  type FilterMode,
  OPEN_D,
  P0,
  key,
  fromKey,
  hm,
  dur,
  nowMin,
} from './types';

interface AgendaCardsViewProps {
  currentDateKey: string;
  selectedDate: Date;
  appointments: AppointmentItem[];
  gaps: [number, number][];
  filter: FilterMode;
  searchQuery: string;
  onOpenDrawer: (id: number) => void;
  onSetStatus: (id: number, s: 'agendado' | 'atendido' | 'falta' | 'cancelado') => void;
  onOpenModal: (opts?: { k?: string; t?: string | number }) => void;
}

type CompositeItem =
  | { t: 'a'; s: number; a: AppointmentItem }
  | { t: 'f'; s: number; g: [number, number] }
  | { t: 'p'; s: number };

export function AgendaCardsView({
  currentDateKey,
  selectedDate,
  appointments,
  gaps,
  filter,
  searchQuery,
  onOpenDrawer,
  onSetStatus,
  onOpenModal,
}: AgendaCardsViewProps) {
  const isToday = currentDateKey === key(new Date());
  const nm = nowMin();

  const items: CompositeItem[] = appointments.map((a) => ({ t: 'a', s: a.start, a }));

  if (filter === 'todos' && !searchQuery && OPEN_D.includes(selectedDate.getDay())) {
    gaps
      .filter((g) => g[1] - g[0] >= 30)
      .forEach((g) => {
        items.push({ t: 'f', s: g[0], g });
      });
    items.push({ t: 'p', s: P0 });
  }

  items.sort((x, y) => x.s - y.s);
  let nextDone = false;

  if (!items.length || !items.some((i) => i.t === 'a')) {
    return (
      <div className="col-span-full card p-12 text-center">
        <div className="ibox mx-auto mb-4 !w-14 !h-14 text-[#d4af37]">
          <DashboardIcon name="cal" />
        </div>
        <h3 className="text-xl font-bold mb-1.5 text-white">
          {OPEN_D.includes(fromKey(currentDateKey).getDay())
            ? 'Nenhum agendamento por aqui'
            : 'Dia sem atendimento'}
        </h3>
        <p className="text-gray-500 text-sm mb-5">
          {searchQuery || filter !== 'todos'
            ? 'Tente ajustar a busca ou os filtros.'
            : 'Que tal encaixar um cliente?'}
        </p>
        <button
          type="button"
          onClick={() => onOpenModal({ k: currentDateKey })}
          className="btn btn-gold px-6 py-3 rounded-2xl cursor-pointer"
        >
          <DashboardIcon name="plus" />
          Novo agendamento
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
      {items.map((item, idx) => {
        if (item.t === 'p') {
          return (
            <div key={`pause-${idx}`} className="pausa col-span-full">
              <DashboardIcon name="coffee" className="text-lg" />
              Pausa · 12:00 – 13:00
              <span className="ml-auto font-medium normal-case tracking-normal hidden sm:inline">
                O robô não oferece horários neste intervalo
              </span>
            </div>
          );
        }

        if (item.t === 'f') {
          return (
            <button
              key={`free-${item.g[0]}`}
              type="button"
              onClick={() => onOpenModal({ k: currentDateKey, t: item.g[0] })}
              className="freec text-left cursor-pointer"
            >
              <div>
                <p className="text-[11px] font-bold tracking-[.18em] uppercase text-gray-500 mb-1.5">
                  Horário livre
                </p>
                <p className="text-base font-extrabold tabular-nums text-gray-300">
                  {hm(item.g[0])}{' '}
                  <span className="text-gray-600 text-sm">– {hm(item.g[1])}</span>
                </p>
                <p className="text-xs mt-0.5">{dur(item.g[1] - item.g[0])} livres</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37]">
                <DashboardIcon name="plus" />
                Encaixar
              </span>
            </button>
          );
        }

        const a = item.a;
        const isNext =
          isToday && !nextDone && a.status === 'agendado' && a.start + a.dur > nm;
        if (isNext) nextDone = true;

        return (
          <AgendaAppointmentCard
            key={a.id}
            appointment={a}
            isNext={isNext}
            onClick={() => onOpenDrawer(a.id)}
            onSetStatus={onSetStatus}
          />
        );
      })}
    </div>
  );
}
