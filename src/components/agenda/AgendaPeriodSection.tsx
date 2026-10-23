import { useEffect, useRef } from 'react';
import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import { AgendaWeekStrip } from './AgendaWeekStrip';
import { type StripDay, type ViewMode, type SpanMode, fromKey } from './types';

interface AgendaPeriodSectionProps {
  topDateHeader: {
    line1: string;
    line2: string;
    isToday: boolean;
  };
  currentDateKey: string;
  onSelectDate: (d: Date) => void;
  onStep: (n: number) => void;
  onGoToday: () => void;
  viewMode: ViewMode;
  onSetViewMode: (v: ViewMode) => void;
  spanMode: SpanMode;
  onSetSpanMode: (s: SpanMode) => void;
  stripDays: StripDay[];
}

export function AgendaPeriodSection({
  topDateHeader,
  currentDateKey,
  onSelectDate,
  onStep,
  onGoToday,
  viewMode,
  onSetViewMode,
  spanMode,
  onSetSpanMode,
  stripDays,
}: AgendaPeriodSectionProps) {
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const segViewRef = useRef<HTMLDivElement | null>(null);
  const segSpanRef = useRef<HTMLDivElement | null>(null);

  // Animate Seg Indicators
  useEffect(() => {
    const updateSeg = (container: HTMLDivElement | null) => {
      if (!container) return;
      const indicator = container.querySelector<HTMLSpanElement>('.seg-i');
      const activeBtn = container.querySelector<HTMLButtonElement>('button.on');
      if (indicator && activeBtn && activeBtn.offsetWidth) {
        indicator.style.width = `${activeBtn.offsetWidth}px`;
        indicator.style.transform = `translateX(${activeBtn.offsetLeft - 4}px)`;
      }
    };

    updateSeg(segViewRef.current);
    if (viewMode === 'agenda') {
      updateSeg(segSpanRef.current);
    }

    const handleResize = () => {
      updateSeg(segViewRef.current);
      if (viewMode === 'agenda') {
        updateSeg(segSpanRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode, spanMode]);

  return (
    <section className="pnl rise mb-5">
      <p className="tag mb-4">Período</p>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        {/* Date Navigator */}
        <div className="flex items-center gap-3">
          <button
            className="nb cursor-pointer"
            id="prev"
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Anterior"
          >
            <DashboardIcon name="cl" />
          </button>

          <button
            id="dlabel"
            type="button"
            onClick={() => {
              try {
                dateInputRef.current?.showPicker();
              } catch {
                dateInputRef.current?.focus();
              }
            }}
            className="min-w-[190px] text-center px-2 cursor-pointer"
          >
            <span className="block text-lg font-bold capitalize" id="dl1">
              {topDateHeader.line1}
            </span>
            <span className="block text-xs text-gray-500 font-medium" id="dl2">
              {topDateHeader.line2}
            </span>
          </button>

          <input
            ref={dateInputRef}
            type="date"
            id="dpick"
            className="absolute opacity-0 pointer-events-none w-0 h-0"
            value={currentDateKey}
            onChange={(e) => {
              if (e.target.value) {
                onSelectDate(fromKey(e.target.value));
              }
            }}
          />

          <button
            className="nb cursor-pointer"
            id="next"
            type="button"
            onClick={() => onStep(1)}
            aria-label="Próximo"
          >
            <DashboardIcon name="cr" />
          </button>

          <button
            id="today"
            type="button"
            onClick={onGoToday}
            style={{ opacity: topDateHeader.isToday ? 0.4 : 1 }}
            className="btn btn-ghost px-5 py-2.5 rounded-full text-sm cursor-pointer"
          >
            Hoje
          </button>
        </div>

        {/* Segment Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Span Segment: Dia vs Semana (only in Agenda view) */}
          <div
            ref={segSpanRef}
            className="seg"
            id="segSpan"
            style={{ display: viewMode === 'agenda' ? 'inline-grid' : 'none' }}
          >
            <span className="seg-i" />
            <button
              type="button"
              data-v="day"
              onClick={() => onSetSpanMode('day')}
              className={`cursor-pointer ${spanMode === 'day' ? 'on' : ''}`}
            >
              Dia
            </button>
            <button
              type="button"
              data-v="week"
              onClick={() => onSetSpanMode('week')}
              className={`cursor-pointer ${spanMode === 'week' ? 'on' : ''}`}
            >
              Semana
            </button>
          </div>

          {/* View Segment: Cards vs Agenda */}
          <div ref={segViewRef} className="seg" id="segView">
            <span className="seg-i" />
            <button
              type="button"
              data-v="cards"
              onClick={() => onSetViewMode('cards')}
              className={`cursor-pointer ${viewMode === 'cards' ? 'on' : ''}`}
            >
              <DashboardIcon name="grid" className="text-base" />
              Cards
            </button>
            <button
              type="button"
              data-v="agenda"
              onClick={() => onSetViewMode('agenda')}
              className={`cursor-pointer ${viewMode === 'agenda' ? 'on' : ''}`}
            >
              <DashboardIcon name="cal" className="text-base" />
              Agenda
            </button>
          </div>
        </div>
      </div>

      {/* Week Strip */}
      <AgendaWeekStrip days={stripDays} onSelectDate={onSelectDate} />
    </section>
  );
}
