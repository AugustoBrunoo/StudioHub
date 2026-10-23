import type { StripDay } from './types';

interface AgendaWeekStripProps {
  days: StripDay[];
  onSelectDate: (d: Date) => void;
}

export function AgendaWeekStrip({ days, onSelectDate }: AgendaWeekStripProps) {
  return (
    <div id="strip" className="grid grid-cols-7 gap-2 sm:gap-3">
      {days.map((item) => (
        <button
          key={item.k}
          type="button"
          data-d={item.k}
          onClick={() => onSelectDate(item.date)}
          className={`wd cursor-pointer ${item.isSelected ? 'on' : ''} ${
            item.isToday ? 'today' : ''
          } ${item.open ? '' : 'off'}`}
        >
          <span className="wl">{item.weekday}</span>
          <span className="wn">{item.dayNum}</span>
          <span className="wc">{item.open ? `${item.total} agend.` : 'Fechado'}</span>
        </button>
      ))}
    </div>
  );
}
