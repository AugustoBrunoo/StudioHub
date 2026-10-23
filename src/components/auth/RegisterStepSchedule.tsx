import { useState, type MouseEvent } from 'react';
import { Copy, Check, RotateCcw, Clock } from 'lucide-react';
import {
  DAYS_ORDER,
  DAYS_LABELS,
  DAYS_FULL_NAMES,
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
  hasCustomSchedule: boolean;
  setHasCustomSchedule: (value: boolean | ((prev: boolean) => boolean)) => void;
  dayHours: Record<number, { open: string; close: string }>;
  updateDayHours: (day: number, field: 'open' | 'close', value: string) => void;
  applyDefaultHoursToAll: (customOpen?: string, customClose?: string) => void;
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

function calculateDuration(open: string, close: string): string {
  if (!open || !close) return '--';
  const [oh, om] = open.split(':').map(Number);
  const [ch, cm] = close.split(':').map(Number);
  if (isNaN(oh) || isNaN(om) || isNaN(ch) || isNaN(cm)) return '--';
  const totalMins = ch * 60 + cm - (oh * 60 + om);
  if (totalMins <= 0) return 'Horário inválido';
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

export function RegisterStepSchedule({
  selectedDays,
  toggleDay,
  daysBad,
  openTime,
  setOpenTime,
  closeTime,
  setCloseTime,
  hasCustomSchedule,
  setHasCustomSchedule,
  dayHours,
  updateDayHours,
  applyDefaultHoursToAll,
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
  const [copiedDay, setCopiedDay] = useState<number | null>(null);

  const activeDays = DAYS_ORDER.filter((d) => selectedDays.has(d));
  const inactiveDays = DAYS_ORDER.filter((d) => !selectedDays.has(d));

  // Toggle between single fixed schedule and per-day customized schedule
  const handleToggleCustom = (custom: boolean) => {
    if (custom === hasCustomSchedule) return;
    if (custom) {
      // Ensure all active days are initialized with the current openTime & closeTime
      activeDays.forEach((d) => {
        if (!dayHours[d]) {
          updateDayHours(d, 'open', openTime);
          updateDayHours(d, 'close', closeTime);
        }
      });
    }
    setHasCustomSchedule(custom);
  };

  const handleOpenTimeChange = (time: string) => {
    setOpenTime(time);
    activeDays.forEach((d) => {
      updateDayHours(d, 'open', time);
    });
  };

  const handleCloseTimeChange = (time: string) => {
    setCloseTime(time);
    activeDays.forEach((d) => {
      updateDayHours(d, 'close', time);
    });
  };

  const handleResetAllHours = () => {
    applyDefaultHoursToAll(openTime, closeTime);
  };

  const handleCopyDayToAll = (dayNum: number, open: string, close: string) => {
    activeDays.forEach((d) => {
      updateDayHours(d, 'open', open);
      updateDayHours(d, 'close', close);
    });
    setCopiedDay(dayNum);
    setTimeout(() => {
      setCopiedDay(null);
    }, 1500);
  };

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

        {/* Unified Schedule Card (Switch Fixo vs Personalizado por Dia) */}
        <div className="f gl rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-white/10 transition-all duration-300">
          {/* Header com Switch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="lbl !mb-0 text-white font-bold text-xs sm:text-sm tracking-wide">
                  Horário de atendimento
                </span>
                <span
                  className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded transition-all duration-300 ${
                    hasCustomSchedule
                      ? 'bg-[#d4af37]/20 text-[#f1c40f] border border-[#d4af37]/40 shadow-[0_0_12px_rgba(241,196,15,0.15)]'
                      : 'bg-white/10 text-white/70 border border-white/15'
                  }`}
                >
                  {hasCustomSchedule ? 'Personalizado' : 'Horário Fixo'}
                </span>
              </div>
              <p className="hint !m-0 !mt-1 text-[11px] sm:text-xs text-white/60">
                {hasCustomSchedule
                  ? 'Ajuste abertura e fechamento para cada dia ativo da semana.'
                  : 'Mesmo horário de abertura e fechamento para todos os dias selecionados.'}
              </p>
            </div>

            {/* Switch & Mode Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 self-start sm:self-auto bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => handleToggleCustom(false)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all duration-200 ${
                  !hasCustomSchedule
                    ? 'bg-[#d4af37]/25 text-[#f1c40f] font-semibold shadow-sm'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                Fixo
              </button>

              <button
                type="button"
                id="customScheduleSw"
                onClick={() => handleToggleCustom(!hasCustomSchedule)}
                className={`sw gl ${hasCustomSchedule ? 'on' : ''}`}
                aria-label="Alternar entre horário fixo e horários personalizados por dia"
                aria-checked={hasCustomSchedule}
                role="switch"
              />

              <button
                type="button"
                onClick={() => handleToggleCustom(true)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all duration-200 ${
                  hasCustomSchedule
                    ? 'bg-[#d4af37]/25 text-[#f1c40f] font-semibold shadow-sm'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                Por dia
              </button>
            </div>
          </div>

          {/* Conditional Body: Fixed vs Custom Schedule */}
          {!hasCustomSchedule ? (
            /* Modo 1: Horário Fixo (Mexe em um só horário) */
            <div className="pt-3.5 sm:pt-4 space-y-3 animate-fadeIn">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="open"
                      className="text-[10px] uppercase tracking-wider text-white/60 font-semibold flex items-center gap-1.5"
                    >
                      <Clock className="w-3 h-3 text-[#f1c40f]" />
                      Abertura
                    </label>
                    <span className="text-[10px] text-white/40">Início</span>
                  </div>
                  <input
                    id="open"
                    type="time"
                    value={openTime}
                    onChange={(e) => handleOpenTimeChange(e.target.value)}
                    className="inp gl font-mono text-center sm:text-left !py-2.5 sm:!py-3 w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="close"
                      className="text-[10px] uppercase tracking-wider text-white/60 font-semibold flex items-center gap-1.5"
                    >
                      <Clock className="w-3 h-3 text-[#f1c40f]" />
                      Fechamento
                    </label>
                    <span className="text-[10px] text-white/40">Término</span>
                  </div>
                  <input
                    id="close"
                    type="time"
                    value={closeTime}
                    onChange={(e) => handleCloseTimeChange(e.target.value)}
                    className="inp gl font-mono text-center sm:text-left !py-2.5 sm:!py-3 w-full"
                  />
                </div>
              </div>

              {/* Informative summary bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-white/70">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f1c40f] shadow-[0_0_6px_rgba(241,196,15,0.8)]" />
                  <span>
                    Jornada:{' '}
                    <strong className="text-white font-semibold">
                      {calculateDuration(openTime, closeTime)}
                    </strong>
                    <span className="text-white/40 ml-1">por dia de atendimento</span>
                  </span>
                </span>
                <span className="text-white/60">
                  Aplicado para os{' '}
                  <strong className="text-[#f1c40f] font-semibold">
                    {selectedDays.size} {selectedDays.size === 1 ? 'dia ativo' : 'dias ativos'}
                  </strong>
                </span>
              </div>
            </div>
          ) : (
            /* Modo 2: Personalizado por dia (Troca os inputs e personaliza cada um) */
            <div className="pt-3.5 sm:pt-4 space-y-3 animate-fadeIn">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-white/60">
                  Defina abertura e fechamento para cada dia ativo:
                </span>
                <button
                  type="button"
                  onClick={handleResetAllHours}
                  className="text-[11px] font-semibold text-[#f1c40f] hover:text-[#f39c12] hover:underline transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replicar padrão ({openTime} às {closeTime}) para todos</span>
                </button>
              </div>

              {/* Active days list */}
              {activeDays.length > 0 ? (
                <div className="space-y-2 sm:space-y-2.5">
                  {activeDays.map((dayNum) => {
                    const isWeekend = dayNum === 6 || dayNum === 0;
                    const schedule = dayHours[dayNum] || { open: openTime, close: closeTime };
                    const duration = calculateDuration(schedule.open, schedule.close);
                    const isCopied = copiedDay === dayNum;

                    return (
                      <div
                        key={dayNum}
                        className="bg-white/[0.03] hover:bg-white/[0.05] p-3 sm:p-3.5 rounded-xl border border-white/10 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                          {/* Day info */}
                          <div className="flex items-center justify-between sm:justify-start gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#f1c40f] shadow-[0_0_8px_rgba(241,196,15,0.7)]" />
                              <span className="text-xs sm:text-sm font-bold text-white">
                                {DAYS_FULL_NAMES[dayNum]}
                              </span>
                              {isWeekend && (
                                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#d4af37]/15 text-[#f1c40f] border border-[#d4af37]/30">
                                  Fim de semana
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-white/50 font-mono sm:hidden">
                              {duration}
                            </span>
                          </div>

                          {/* Time Inputs */}
                          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
                            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
                              <label
                                className="text-[10px] text-white/50 uppercase tracking-wider shrink-0"
                                htmlFor={`open-${dayNum}`}
                              >
                                De
                              </label>
                              <input
                                id={`open-${dayNum}`}
                                type="time"
                                value={schedule.open}
                                onChange={(e) => updateDayHours(dayNum, 'open', e.target.value)}
                                className="inp gl !py-1.5 !px-2.5 !text-xs !w-full sm:!w-24 text-center font-mono"
                                aria-label={`Horário de abertura para ${DAYS_FULL_NAMES[dayNum]}`}
                              />
                            </div>

                            <span className="text-white/30 text-xs shrink-0">às</span>

                            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
                              <label
                                className="text-[10px] text-white/50 uppercase tracking-wider shrink-0"
                                htmlFor={`close-${dayNum}`}
                              >
                                Até
                              </label>
                              <input
                                id={`close-${dayNum}`}
                                type="time"
                                value={schedule.close}
                                onChange={(e) => updateDayHours(dayNum, 'close', e.target.value)}
                                className="inp gl !py-1.5 !px-2.5 !text-xs !w-full sm:!w-24 text-center font-mono"
                                aria-label={`Horário de fechamento para ${DAYS_FULL_NAMES[dayNum]}`}
                              />
                            </div>

                            <span className="hidden sm:inline-block text-[11px] text-white/50 font-mono w-14 text-right">
                              {duration}
                            </span>

                            {/* Button to copy this schedule to other days */}
                            <button
                              type="button"
                              onClick={() => handleCopyDayToAll(dayNum, schedule.open, schedule.close)}
                              title="Copiar este horário para todos os dias ativos"
                              className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                                isCopied
                                  ? 'bg-[#d4af37]/30 text-[#f1c40f] border-[#d4af37]/60'
                                  : 'bg-white/5 text-white/50 hover:text-[#f1c40f] hover:bg-white/10 border-white/10'
                              }`}
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-[#f1c40f]" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-xs text-white/70 text-center">
                  Selecione ao menos um dia acima para configurar os horários.
                </div>
              )}

              {/* Inactive days bar (convenient 1-click activate) */}
              {inactiveDays.length > 0 && (
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-white/60">
                  <span className="text-[11px] text-white/50">Dias desativados:</span>
                  {inactiveDays.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#f1c40f] border border-white/10 transition-colors flex items-center gap-1 text-[11px]"
                    >
                      <span>+ Ativar {DAYS_FULL_NAMES[d]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
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
                      className="inp gl font-mono"
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
                      className="inp gl font-mono"
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
