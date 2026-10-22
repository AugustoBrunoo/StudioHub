import { type MouseEvent } from 'react';
import {
  DAYS_ORDER,
  DAYS_LABELS,
  LEAD_OPTIONS,
} from './register.types';

interface RegisterStepScheduleProps {
  selectedDays: Set<number>;
  toggleDay: (d: number, e?: MouseEvent<HTMLButtonElement>) => void;
  daysBad: boolean;
  openTime: string;
  setOpenTime: (time: string) => void;
  closeTime: string;
  setCloseTime: (time: string) => void;
  hasCustomWeekend: boolean;
  setHasCustomWeekend: (value: boolean | ((prev: boolean) => boolean)) => void;
  saturdayOpen: string;
  setSaturdayOpen: (time: string) => void;
  saturdayClose: string;
  setSaturdayClose: (time: string) => void;
  sundayOpen: string;
  setSundayOpen: (time: string) => void;
  sundayClose: string;
  setSundayClose: (time: string) => void;
  hasLunch: boolean;
  setHasLunch: (value: boolean | ((prev: boolean) => boolean)) => void;
  lunchStart: string;
  setLunchStart: (time: string) => void;
  lunchEnd: string;
  setLunchEnd: (time: string) => void;
  leadTime: number;
  setLeadTime: (mins: number) => void;
  daysSummary: string;
  onBack: () => void;
  onContinue: () => void;
}

export function RegisterStepSchedule({
  selectedDays,
  toggleDay,
  daysBad,
  openTime,
  setOpenTime,
  closeTime,
  setCloseTime,
  hasCustomWeekend,
  setHasCustomWeekend,
  saturdayOpen,
  setSaturdayOpen,
  saturdayClose,
  setSaturdayClose,
  sundayOpen,
  setSundayOpen,
  sundayClose,
  setSundayClose,
  hasLunch,
  setHasLunch,
  lunchStart,
  setLunchStart,
  lunchEnd,
  setLunchEnd,
  leadTime,
  setLeadTime,
  daysSummary,
  onBack,
  onContinue,
}: RegisterStepScheduleProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-5 sm:mb-8 text-center sm:text-left">
        <span className="inline-flex items-center justify-center sm:justify-start gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[.22em] sm:tracking-[.26em] text-[#d4af37] mb-2 sm:mb-4 mx-auto sm:mx-0">
          <span className="w-5 sm:w-6 h-px bg-[#d4af37]" />
          Passo 2 de 5
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] mb-2 sm:mb-3 text-white">
          Como você <span className="gt">trabalha?</span>
        </h2>
        <p className="text-white/85 leading-relaxed text-xs sm:text-sm md:text-base max-w-lg mx-auto sm:mx-0">
          Essa é a base para o assistente nunca marcar clientes de madrugada ou no seu horário de descanso.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Working Days */}
        <div className="f">
          <div className="flex items-center justify-between mb-2">
            <span className="lbl !mb-0">Quais dias da semana você atende?</span>
            <span className="text-[10px] text-white/50 font-medium">
              {selectedDays.size} {selectedDays.size === 1 ? 'dia ativo' : 'dias ativos'}
            </span>
          </div>
          <div id="days" className={`grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 ${daysBad ? 'bad' : ''}`}>
            {DAYS_ORDER.map((dayNum) => {
              const isSelected = selectedDays.has(dayNum);
              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={(e) => toggleDay(dayNum, e)}
                  className={`day gl ${isSelected ? 'on' : ''}`}
                  aria-pressed={isSelected}
                  title={`${DAYS_LABELS[dayNum]}${isSelected ? ' (selecionado)' : ''}`}
                >
                  {DAYS_LABELS[dayNum]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Schedule Hours (Weekdays or Standard) */}
        <div className="f">
          <div className="flex items-center justify-between mb-1.5">
            <label className="lbl !mb-0" htmlFor="open">
              {hasCustomWeekend ? 'Horário nos dias de semana' : 'Horário de atendimento'}
            </label>
            {hasCustomWeekend && (
              <span className="text-[10px] text-[#f1c40f] font-semibold tracking-wider uppercase">
                Seg a Sex
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                Abertura
              </span>
              <input
                id="open"
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="inp gl"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                Fechamento
              </span>
              <input
                id="close"
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="inp gl"
              />
            </div>
          </div>
        </div>

        {/* Weekend Differentiated Hours Toggle Box (Dropdown Inteligente) */}
        <div className="f gl rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all duration-300">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-xs sm:text-sm md:text-base text-white">
                  Horário diferenciado no fim de semana?
                </p>
                <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#d4af37]/15 text-[#f1c40f] border border-[#d4af37]/30">
                  Sáb / Dom
                </span>
              </div>
              <p className="hint !m-0 !mt-0.5 sm:!mt-1 text-[11px] sm:text-xs">
                Ajuste o expediente específico para sábado ou domingo.
              </p>
            </div>
            <button
              type="button"
              id="weekendSw"
              onClick={() => {
                setHasCustomWeekend((prev) => {
                  const nextVal = !prev;
                  // If enabling and neither Saturday nor Sunday is active, activate Saturday by default
                  if (nextVal && !selectedDays.has(6) && !selectedDays.has(0)) {
                    toggleDay(6);
                  }
                  return nextVal;
                });
              }}
              className={`sw gl ${hasCustomWeekend ? 'on' : ''}`}
              aria-label="Ativar horários diferenciados de fim de semana"
              aria-checked={hasCustomWeekend}
              role="switch"
            />
          </div>

          {/* Dropdown with smooth animated expansion */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              hasCustomWeekend ? 'grid-rows-[1fr] opacity-100 mt-3.5 sm:mt-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
            }`}
          >
            <div className="overflow-hidden">
              <div className="pt-3.5 sm:pt-4 border-t border-white/10 space-y-3">
                {/* Saturday Schedule Card */}
                {selectedDays.has(6) ? (
                  <div className="bg-white/[0.025] p-3 sm:p-3.5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#f1c40f] shadow-[0_0_8px_rgba(241,196,15,0.7)]" />
                        Sábado
                      </span>
                      <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
                        Expediente
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      <div>
                        <label className="lbl !text-[10px]" htmlFor="satOpen">
                          Abertura
                        </label>
                        <input
                          id="satOpen"
                          type="time"
                          value={saturdayOpen}
                          onChange={(e) => setSaturdayOpen(e.target.value)}
                          className="inp gl"
                        />
                      </div>
                      <div>
                        <label className="lbl !text-[10px]" htmlFor="satClose">
                          Fechamento
                        </label>
                        <input
                          id="satClose"
                          type="time"
                          value={saturdayClose}
                          onChange={(e) => setSaturdayClose(e.target.value)}
                          className="inp gl"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-xs text-white/70">
                    <span>Sábado não está ativo nos seus dias de atendimento.</span>
                    <button
                      type="button"
                      onClick={() => toggleDay(6)}
                      className="text-[11px] font-bold text-[#f1c40f] hover:underline shrink-0 ml-2"
                    >
                      + Ativar Sábado
                    </button>
                  </div>
                )}

                {/* Sunday Schedule Card */}
                {selectedDays.has(0) ? (
                  <div className="bg-white/[0.025] p-3 sm:p-3.5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#f1c40f] shadow-[0_0_8px_rgba(241,196,15,0.7)]" />
                        Domingo
                      </span>
                      <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
                        Expediente
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      <div>
                        <label className="lbl !text-[10px]" htmlFor="sunOpen">
                          Abertura
                        </label>
                        <input
                          id="sunOpen"
                          type="time"
                          value={sundayOpen}
                          onChange={(e) => setSundayOpen(e.target.value)}
                          className="inp gl"
                        />
                      </div>
                      <div>
                        <label className="lbl !text-[10px]" htmlFor="sunClose">
                          Fechamento
                        </label>
                        <input
                          id="sunClose"
                          type="time"
                          value={sundayClose}
                          onChange={(e) => setSundayClose(e.target.value)}
                          className="inp gl"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-xs text-white/70">
                    <span>Domingo não está ativo nos seus dias de atendimento.</span>
                    <button
                      type="button"
                      onClick={() => toggleDay(0)}
                      className="text-[11px] font-bold text-[#f1c40f] hover:underline shrink-0 ml-2"
                    >
                      + Ativar Domingo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lunch Break Toggle Box (Dropdown Inteligente) */}
        <div className="f gl rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all duration-300">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div>
              <p className="font-semibold text-xs sm:text-sm md:text-base text-white">
                Você tem horário de almoço/pausa fixo?
              </p>
              <p className="hint !m-0 !mt-0.5 sm:!mt-1 text-[11px] sm:text-xs">
                Nesse intervalo o assistente nunca oferece horário aos clientes.
              </p>
            </div>
            <button
              type="button"
              id="lunchSw"
              onClick={() => setHasLunch((prev) => !prev)}
              className={`sw gl ${hasLunch ? 'on' : ''}`}
              aria-label="Ativar pausa fixa"
              aria-checked={hasLunch}
              role="switch"
            />
          </div>

          {/* Dropdown with smooth animated expansion */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              hasLunch ? 'grid-rows-[1fr] opacity-100 mt-3.5 sm:mt-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
            }`}
          >
            <div className="overflow-hidden">
              <div className="pt-3.5 sm:pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label className="lbl" htmlFor="ls">
                      Início da pausa
                    </label>
                    <input
                      id="ls"
                      type="time"
                      value={lunchStart}
                      onChange={(e) => setLunchStart(e.target.value)}
                      disabled={!hasLunch}
                      className="inp gl"
                    />
                  </div>
                  <div>
                    <label className="lbl" htmlFor="le">
                      Fim da pausa
                    </label>
                    <input
                      id="le"
                      type="time"
                      value={lunchEnd}
                      onChange={(e) => setLunchEnd(e.target.value)}
                      disabled={!hasLunch}
                      className="inp gl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimum Lead Time */}
        <div className="f">
          <span className="lbl">Com quanta antecedência mínima o cliente pode agendar?</span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
            {LEAD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setLeadTime(opt.value)}
                className={`chip gl ${leadTime === opt.value ? 'on' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="hint">
            Evita um agendamento para daqui a 5 minutos enquanto você já está com a mão na tesoura.
          </p>
        </div>

        {/* Dynamic Schedule Summary */}
        <div className="f gl bubble rounded-xl sm:rounded-2xl p-3.5 sm:p-4">
          <p className="text-[10px] uppercase tracking-[.2em] text-white/60 font-semibold mb-1 sm:mb-1.5">
            Resumo da sua agenda
          </p>
          <p id="pv2" className="text-white text-xs sm:text-sm leading-relaxed">
            {daysSummary}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-2.5 sm:gap-4 mt-6 sm:mt-9">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost px-4 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm bk flex items-center justify-center gap-1.5 sm:gap-2"
        >
          <svg className="i w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Voltar</span>
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="btn btn-gold px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm nx flex items-center justify-center gap-1.5 sm:gap-2 font-semibold"
        >
          <span>Continuar</span>
          <svg className="i w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
