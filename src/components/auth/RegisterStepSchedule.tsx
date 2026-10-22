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
      <div className="mb-5 sm:mb-8">
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[.22em] sm:tracking-[.26em] text-[#d4af37] mb-2 sm:mb-4">
          <span className="w-5 sm:w-6 h-px bg-[#d4af37]" />
          Passo 2 de 5
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] mb-2 sm:mb-3 text-white">
          Como você <span className="gt">trabalha?</span>
        </h2>
        <p className="text-white/85 leading-relaxed text-xs sm:text-sm md:text-base">
          Essa é a base para o assistente nunca marcar clientes de madrugada ou no seu horário de descanso.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-7">
        {/* Working Days */}
        <div className="f">
          <span className="lbl">Quais dias da semana você atende?</span>
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
                >
                  {DAYS_LABELS[dayNum]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Schedule Hours */}
        <div className="f grid grid-cols-2 gap-2.5 sm:gap-4">
          <div>
            <label className="lbl" htmlFor="open">
              Abertura
            </label>
            <input
              id="open"
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="inp gl"
            />
          </div>
          <div>
            <label className="lbl" htmlFor="close">
              Fechamento
            </label>
            <input
              id="close"
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="inp gl"
            />
          </div>
        </div>

        {/* Lunch Break Toggle Box */}
        <div className="f gl rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div>
              <p className="font-semibold text-xs sm:text-sm md:text-base text-white">Você tem horário de almoço/pausa fixo?</p>
              <p className="hint !m-0 !mt-0.5 sm:!mt-1 text-[11px] sm:text-xs">Nesse intervalo o assistente nunca oferece horário.</p>
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

          <div
            id="lunchBox"
            className={`grid grid-cols-2 gap-2.5 sm:gap-4 mt-3.5 sm:mt-5 transition-opacity duration-300 ${hasLunch ? 'opacity-100' : 'opacity-30 pointer-events-none'
              }`}
          >
            <div>
              <label className="lbl" htmlFor="ls">
                Início
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
                Fim
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
        <div className="f gl bubble rounded-xl sm:rounded-2xl">
          <p className="text-[10px] uppercase tracking-[.2em] text-white/60 font-semibold mb-1 sm:mb-1.5">
            Resumo da sua agenda
          </p>
          <p id="pv2" className="text-white text-xs sm:text-sm leading-relaxed">{daysSummary}</p>
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
