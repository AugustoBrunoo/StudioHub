import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StudioHubLogo } from '@/components/landing/LandingIcons';
import { STEP_NAMES } from './register.types';

interface RegisterNavbarProps {
  curStep?: number;
  onStepClick?: (stepIndex: number) => void;
  onBackStep?: () => void;
  onExit?: () => void;
}

export function RegisterNavbar({
  curStep = 0,
  onStepClick,
  onBackStep,
  onExit,
}: RegisterNavbarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (curStep > 0 && onBackStep) {
      onBackStep();
    } else if (onExit) {
      onExit();
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExit) {
      onExit();
    } else {
      navigate('/');
    }
  };

  return (
    <header
      id="nav"
      className="fixed top-0 inset-x-0 z-[100] px-3.5 sm:px-6 pt-3 sm:pt-4 pb-2 flex justify-center pointer-events-none"
      style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top,0px))' }}
    >
      <nav
        aria-label="Navegação do cadastro"
        className="pointer-events-auto w-full max-w-2xl rounded-2xl glass border border-white/12 bg-[#0a0a0a]/90 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.65)] px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 relative overflow-hidden"
      >

        {/* Brand Logo (Left) */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-2 sm:gap-2.5 shrink-0 group select-none text-left cursor-pointer bg-transparent border-0 p-0"
          title="Ir para a página inicial"
        >
          <span className="logo-box !w-7 !h-7 sm:!w-8 sm:!h-8 !rounded-lg group-hover:scale-105 transition-transform">
            <StudioHubLogo id="reg-logo" />
          </span>
        </button>

        {/* Stepper Center (Aligned & Centered) */}
        {/* Desktop view (sm and up): Connected interactive step dots */}
        <div className="hidden sm:flex items-center gap-1.5 md:gap-2 select-none" aria-label="Etapas do processo">
          {STEP_NAMES.map((name, stepIdx) => {
            const isCur = stepIdx === curStep;
            const isDone = stepIdx < curStep;

            return (
              <div key={stepIdx} className="flex items-center gap-1.5 md:gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isDone && onStepClick) {
                      onStepClick(stepIdx);
                    }
                  }}
                  disabled={!isDone}
                  title={`Passo ${stepIdx + 1}: ${name}${isCur ? ' (atual)' : isDone ? ' (concluído)' : ''}`}
                  className={`relative flex items-center justify-center transition-all duration-300 ${isCur
                    ? 'w-7 h-7 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f1c40f] text-[#0a0a0a] font-extrabold text-xs shadow-[0_0_12px_rgba(212,175,55,0.65)] scale-105 cursor-default'
                    : isDone
                      ? 'w-6 h-6 rounded-full border border-[#d4af37]/60 text-[#d4af37] hover:border-[#f1c40f] hover:bg-[#d4af37]/10 cursor-pointer active:scale-95 text-[11px] font-bold'
                      : 'w-6 h-6 rounded-full border border-white/10 text-white/30 bg-white/[0.02] text-[11px] cursor-default'
                    }`}
                >
                  {isDone ? (
                    <svg className="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10" />
                    </svg>
                  ) : (
                    stepIdx + 1
                  )}
                </button>

                {/* Connecting track line between step dots */}
                {stepIdx < STEP_NAMES.length - 1 && (
                  <div
                    className={`h-0.5 w-2.5 sm:w-3 md:w-4 rounded-full transition-all duration-500 ${stepIdx < curStep
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f1c40f]'
                      : 'bg-white/10'
                      }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile view (< sm): Current step badge with step number & name */}
        <div className="flex sm:hidden items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 select-none shrink-0 whitespace-nowrap">
          <span className="text-[11px] font-bold text-white tracking-wide">
            <span className="text-[#f1c40f]">{curStep + 1}</span>
            <span className="text-white/40 font-normal">/5</span>
          </span>
          <span className="text-white/20 text-[10px]">·</span>
          <span className="text-[11px] font-medium text-white truncate max-w-[110px]">
            {STEP_NAMES[curStep]}
          </span>
        </div>

        {/* Back Button (Right) */}
        <button
          type="button"
          onClick={handleBack}
          aria-label={curStep > 0 ? "Voltar para o passo anterior" : "Voltar"}
          title={curStep > 0 ? "Voltar para o passo anterior" : "Voltar"}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass border border-white/12 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 flex items-center justify-center text-gray-300 hover:text-[#f1c40f] transition-all duration-300 shadow-sm group active:scale-95 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-[#f1c40f] transition-colors" />
        </button>
      </nav>
    </header>
  );
}
