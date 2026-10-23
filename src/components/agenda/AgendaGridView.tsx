import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import {
  type AppointmentItem,
  type SpanMode,
  OPEN,
  CLOSE,
  P0,
  P1,
  PX,
  OPEN_D,
  STATUS_MAP,
  key,
  fromKey,
  addDays,
  hm,
  pad,
  nowMin,
} from './types';

interface AgendaGridViewProps {
  selectedDate: Date;
  spanMode: SpanMode;
  onSelectDate: (d: Date) => void;
  onSetSpanMode: (s: SpanMode) => void;
  listFor: (k: string) => AppointmentItem[];
  getGaps: (k: string) => [number, number][];
  onOpenDrawer: (id: number) => void;
  onOpenModal: (opts?: { k?: string; t?: string | number }) => void;
}

export function AgendaGridView({
  selectedDate,
  spanMode,
  onSelectDate,
  onSetSpanMode,
  listFor,
  getGaps,
  onOpenDrawer,
  onOpenModal,
}: AgendaGridViewProps) {
  const isWk = spanMode === 'week';
  const d = selectedDate;
  const mon = addDays(d, -((d.getDay() + 6) % 7));
  const cols = isWk ? Array.from({ length: 7 }, (_, i) => key(addDays(mon, i))) : [key(d)];
  const H = (CLOSE - OPEN) * PX;
  const tk = key(new Date());
  const nm = nowMin();

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <div style={{ minWidth: isWk ? '860px' : '0' }}>
          {/* Week column header */}
          {isWk && (
            <div className="flex border-b border-white/10">
              <div className="gut" style={{ height: '56px' }} />
              <div
                className="flex-1 grid"
                style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
              >
                {cols.map((colKey) => {
                  const colDate = fromKey(colKey);
                  return (
                    <button
                      key={colKey}
                      type="button"
                      onClick={() => {
                        onSelectDate(colDate);
                        onSetSpanMode('day');
                      }}
                      className={`py-3 text-center border-l border-white/[.07] hover:bg-white/5 transition cursor-pointer ${
                        colKey === tk ? 'text-[#f1c40f]' : ''
                      }`}
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-[.16em] text-gray-500">
                        {colDate
                          .toLocaleDateString('pt-BR', { weekday: 'short' })
                          .replace('.', '')}
                      </span>
                      <span className="block text-lg font-extrabold text-white">
                        {colDate.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Schedule body */}
          <div className="flex pt-3 pb-3">
            {/* Hour labels gutter */}
            <div className="gut" style={{ height: `${H}px` }}>
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i} style={{ top: `${i * 60 * PX}px` }}>
                  {pad(9 + i)}:00
                </span>
              ))}
            </div>

            {/* Day Columns */}
            <div
              className="flex-1 grid"
              style={{
                gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))`,
              }}
            >
              {cols.map((colKey) => {
                const isOpenDay = OPEN_D.includes(fromKey(colKey).getDay());
                const colAppointments = listFor(colKey);
                const colGaps = getGaps(colKey);

                return (
                  <div
                    key={colKey}
                    className={`col ${isOpenDay ? '' : 'closed'}`}
                    style={{ height: `${H}px` }}
                  >
                    {!isOpenDay ? (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-600 tracking-[.2em] uppercase select-none"
                        style={{
                          writingMode: isWk ? 'vertical-rl' : 'horizontal-tb',
                        }}
                      >
                        Fechado
                      </div>
                    ) : (
                      <>
                        {/* Pause / Lunch break block */}
                        <div
                          className="brk"
                          style={{
                            top: `${(P0 - OPEN) * PX + 3}px`,
                            height: `${(P1 - P0) * PX - 6}px`,
                          }}
                        >
                          {!isWk && <DashboardIcon name="coffee" className="text-base" />}
                          Pausa
                          {!isWk && ' · 12:00 – 13:00'}
                        </div>

                        {/* Free slots encaixar buttons */}
                        {colGaps.map(([gStart, gEnd], gIdx) => (
                          <button
                            key={`gap-${gIdx}`}
                            type="button"
                            onClick={() => onOpenModal({ k: colKey, t: gStart })}
                            className="freeb cursor-pointer"
                            style={{
                              top: `${(gStart - OPEN) * PX + 2}px`,
                              height: `${(gEnd - gStart) * PX - 4}px`,
                            }}
                          >
                            {gEnd - gStart >= 30 ? `+ Encaixar ${hm(gStart)}` : '+'}
                          </button>
                        ))}

                        {/* Appointment Blocks */}
                        {colAppointments.map((a) => {
                          const m = STATUS_MAP[a.status];
                          const hgt = a.dur * PX - 4;
                          const tiny = a.dur <= 15;
                          const isShort = isWk && a.dur <= 30;

                          return (
                            <div
                              key={a.id}
                              onClick={() => onOpenDrawer(a.id)}
                              className={`ap ${a.status === 'cancelado' ? 'cx' : ''}`}
                              style={{
                                ['--c' as string]: m.c,
                                top: `${(a.start - OPEN) * PX + 2}px`,
                                height: `${hgt}px`,
                              }}
                            >
                              <b>
                                {tiny || isShort ? `${hm(a.start)} · ` : ''}
                                {isWk ? a.client.split(' ')[0] : a.client}
                              </b>
                              {!tiny && !isShort && (
                                <small>
                                  {a.service} · {hm(a.start)}–{hm(a.start + a.dur)}
                                </small>
                              )}
                            </div>
                          );
                        })}

                        {/* Current time line */}
                        {colKey === tk && nm >= OPEN && nm <= CLOSE && (
                          <div
                            className="now"
                            style={{ top: `${(nm - OPEN) * PX}px` }}
                          >
                            {!isWk && <i>{hm(nm)}</i>}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
