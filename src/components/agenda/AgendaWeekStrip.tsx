import type { StripDay } from './types';

interface AgendaWeekStripProps {
  days: StripDay[];
  onSelectDate: (d: Date) => void;
}

export function AgendaWeekStrip({ days, onSelectDate }: AgendaWeekStripProps) {
  return (
    <div id="strip" className="grid grid-cols-7 gap-1.5 sm:gap-3">
      {days.map((item) => (
        <button
          key={item.k}
          type="button"
          data-d={item.k}
          onClick={() => onSelectDate(item.date)}
          aria-label={`${item.weekday} ${item.dayNum} · ${
            item.open ? `${item.total} agendamentos` : 'Fechado'
          }`}
          className={`wd cursor-pointer ${item.isSelected ? 'on' : ''} ${
            item.isToday ? 'today' : ''
          } ${item.open ? '' : 'off'}`}
        >
          <span className="wl">{item.weekday}</span>
          <span className="wn">{item.dayNum}</span>
          <span className="wc">
            {item.open ? (
              <>
                {item.total}
                <span className="hidden sm:inline"> agend.</span>
              </>
            ) : (
              <>
                <span className="sm:hidden">—</span>
                <span className="hidden sm:inline">Fechado</span>
              </>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
