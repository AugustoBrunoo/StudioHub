import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import { type AppointmentItem, STATUS_MAP, hm, money } from './types';

interface AgendaAppointmentCardProps {
  appointment: AppointmentItem;
  isNext?: boolean;
  onClick: () => void;
  onSetStatus: (id: number, s: 'agendado' | 'atendido' | 'falta' | 'cancelado') => void;
}

export function AgendaAppointmentCard({
  appointment: a,
  isNext = false,
  onClick,
  onSetStatus,
}: AgendaAppointmentCardProps) {
  const m = STATUS_MAP[a.status];

  return (
    <article
      onClick={onClick}
      className={`ac cursor-pointer ${a.status === 'cancelado' ? 'dim' : ''}`}
      style={{ ['--c' as string]: m.c }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-extrabold tabular-nums text-white">
          {hm(a.start)}
          <span className="text-gray-600 font-semibold text-xs">
            {' '}
            – {hm(a.start + a.dur)}
          </span>
        </span>
        {isNext ? (
          <span className="nxt">Próximo</span>
        ) : a.status === 'agendado' ? (
          <span className="sdot" />
        ) : null}
      </div>

      <p
        className={`font-semibold truncate mt-2 text-white ${
          a.status === 'cancelado' ? 'line-through' : ''
        }`}
      >
        {a.client}
      </p>
      <p className="text-xs text-gray-500 truncate">
        {a.service} · {a.dur} min
      </p>

      <div className="flex items-center justify-between mt-3">
        <span className="text-sm font-bold tabular-nums text-gray-300">
          {money(a.price).replace(',00', '')}
        </span>
        {a.status === 'agendado' ? (
          <div
            className="flex gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onSetStatus(a.id, 'atendido')}
              className="qa ok cursor-pointer"
              title="Marcar como atendido"
            >
              <DashboardIcon name="ok" />
            </button>
            <button
              type="button"
              onClick={() => onSetStatus(a.id, 'falta')}
              className="qa bad cursor-pointer"
              title="Registrar falta"
            >
              <DashboardIcon name="userx" />
            </button>
          </div>
        ) : (
          <span className="mini-st">{m.l}</span>
        )}
      </div>
    </article>
  );
}
