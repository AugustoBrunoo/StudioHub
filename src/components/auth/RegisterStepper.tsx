import { STEP_NAMES } from './register.types';

interface RegisterStepperProps {
  curStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export function RegisterStepper({ curStep, onStepClick }: RegisterStepperProps) {
  return (
    <div id="stepper" className="w-full max-w-2xl mb-8" aria-label="Progresso do cadastro">
      <div className="relative flex justify-between items-center">
        {/* Track Line */}
        <div className="absolute left-[17px] right-[17px] top-1/2 h-px bg-white/10 -translate-y-1/2" />

        {/* Active Progress Bar */}
        <div
          id="bar"
          className="absolute left-[17px] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#d4af37] to-[#f1c40f] shadow-[0_0_12px_rgba(212,175,55,.8)] transition-all duration-700 ease-out"
          style={{ width: `${(curStep / 4) * 100}%` }}
        />

        {/* Step Indicators */}
        {STEP_NAMES.map((name, stepIdx) => {
          const isCur = stepIdx === curStep;
          const isDone = stepIdx < curStep;

          return (
            <button
              key={stepIdx}
              type="button"
              onClick={() => {
                if (isDone && onStepClick) {
                  onStepClick(stepIdx);
                }
              }}
              disabled={!isDone}
              aria-label={`Passo ${stepIdx + 1}: ${name}${isCur ? ' (atual)' : isDone ? ' (concluído)' : ''}`}
              className={`step-dot ${isCur ? 'cur' : ''} ${isDone ? 'done cursor-pointer hover:border-[#d4af37]' : 'cursor-default'}`}
            >
              {isDone ? (
                <svg className="i w-4 h-4" viewBox="0 0 24 24" style={{ strokeWidth: 3 }} aria-hidden="true">
                  <path d="M5 12l4 4 10-10" />
                </svg>
              ) : (
                stepIdx + 1
              )}
            </button>
          );
        })}
      </div>

      {/* Step Labels */}
      <div className="hidden sm:flex justify-between mt-3 text-[10px] font-semibold uppercase tracking-[.2em] text-gray-500">
        {STEP_NAMES.map((name, idx) => (
          <span
            key={name}
            className={`transition-colors duration-300 ${idx === curStep
                ? 'text-[#f1c40f]'
                : idx < curStep
                  ? 'text-gray-300'
                  : 'text-gray-500'
              }`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
