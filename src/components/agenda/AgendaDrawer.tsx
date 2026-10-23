import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import {
  type AppointmentItem,
  STATUS_MAP,
  fromKey,
  hm,
  money,
  dur,
  ini,
} from './types';

interface AgendaDrawerProps {
  isOpen: boolean;
  appointment: AppointmentItem | null;
  onClose: () => void;
  onSetStatus: (id: number, s: 'agendado' | 'atendido' | 'falta' | 'cancelado') => void;
  onReschedule: (item: AppointmentItem) => void;
}

export function AgendaDrawer({
  isOpen,
  appointment: a,
  onClose,
  onSetStatus,
  onReschedule,
}: AgendaDrawerProps) {
  return (
    <>
      {/* Overlay Backdrop */}
      <div id="ov" onClick={onClose} className={isOpen ? 'on' : ''} />

      {/* Slide-over Drawer */}
      <aside id="dr" className={isOpen ? 'on' : ''} aria-hidden={!isOpen}>
        {a && (
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-7">
              <span
                className="badge"
                style={{ ['--c' as string]: STATUS_MAP[a.status].c }}
              >
                {STATUS_MAP[a.status].l}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="nb !w-9 !h-9 cursor-pointer"
                aria-label="Fechar"
              >
                <DashboardIcon name="x" />
              </button>
            </div>

            {/* Client Info */}
            <div className="flex items-center gap-4 mb-7">
              <div className="av2 !w-16 !h-16 !rounded-3xl !text-xl">
                {ini(a.client)}
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-extrabold tracking-tight truncate text-white">
                  {a.client}
                </h2>
                <p className="text-sm text-gray-400">{a.phone}</p>
              </div>
            </div>

            {/* Time Card */}
            <div className="card p-5 mb-5">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-extrabold tracking-tight tabular-nums text-white">
                  {hm(a.start)}
                </span>
                <span className="text-xl text-gray-500 font-semibold tabular-nums">
                  – {hm(a.start + a.dur)}
                </span>
              </div>
              <p className="text-sm text-gray-400 capitalize">
                {fromKey(a.k).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>

            {/* Service & Price */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <p className="text-[10px] uppercase tracking-[.16em] font-semibold text-gray-500 mb-1">
                  Serviço
                </p>
                <p className="font-bold text-white">{a.service}</p>
                <p className="text-xs text-gray-500">{dur(a.dur)}</p>
              </div>

              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <p className="text-[10px] uppercase tracking-[.16em] font-semibold text-gray-500 mb-1">
                  Valor
                </p>
                <p className="font-bold tabular-nums text-white">
                  {money(a.price)}
                </p>
                <p className="text-xs text-gray-500">
                  {a.origin === 'WhatsApp' ? 'Agendado pelo robô' : 'Agendado manualmente'}
                </p>
              </div>
            </div>

            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/55${a.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full py-3.5 rounded-2xl text-sm mb-5 hover:!text-green-400 hover:!border-green-400/40"
            >
              <DashboardIcon name="chat" className="text-lg" />
              Chamar no WhatsApp
            </a>

            {/* Action Buttons */}
            <div className="space-y-3">
              {a.status === 'agendado' ? (
                <>
                  <button
                    type="button"
                    onClick={() => onSetStatus(a.id, 'atendido')}
                    className="btn btn-gold w-full py-4 rounded-2xl cursor-pointer"
                  >
                    <DashboardIcon name="done" className="text-lg" />
                    Marcar como atendido
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => onSetStatus(a.id, 'falta')}
                      className="btn btn-ghost btn-danger py-3.5 rounded-2xl text-sm cursor-pointer"
                    >
                      <DashboardIcon name="userx" className="text-base" />
                      Registrar falta
                    </button>
                    <button
                      type="button"
                      onClick={() => onReschedule(a)}
                      className="btn btn-ghost py-3.5 rounded-2xl text-sm cursor-pointer"
                    >
                      <DashboardIcon name="edit" className="text-base" />
                      Remarcar
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSetStatus(a.id, 'cancelado')}
                    className="btn btn-ghost btn-danger w-full py-3.5 rounded-2xl text-sm cursor-pointer"
                  >
                    <DashboardIcon name="trash" className="text-base" />
                    Cancelar agendamento
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => onReschedule(a)}
                    className="btn btn-gold w-full py-4 rounded-2xl cursor-pointer"
                  >
                    <DashboardIcon name="edit" className="text-lg" />
                    Remarcar
                  </button>

                  <button
                    type="button"
                    onClick={() => onSetStatus(a.id, 'agendado')}
                    className="btn btn-ghost w-full py-3.5 rounded-2xl text-sm cursor-pointer"
                  >
                    <DashboardIcon name="undo" className="text-base" />
                    Reabrir como agendado
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
