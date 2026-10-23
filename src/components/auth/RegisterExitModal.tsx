import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface RegisterExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
}

export function RegisterExitModal({
  isOpen,
  onClose,
  onConfirmExit,
}: RegisterExitModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-md rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0e0e0e]/95 p-6 sm:p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal e continuar cadastro"
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Alert Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/35 flex items-center justify-center mx-auto mb-4 text-[#f1c40f] shadow-[0_0_24px_rgba(241,196,15,0.2)]">
          <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
        </div>

        {/* Title & Description */}
        <h3
          id="exit-modal-title"
          className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2"
        >
          Deseja sair do cadastro?
        </h3>
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
          Se você confirmar a saída, todos os dados preenchidos serão descartados e o rascunho temporário salvo será <strong className="text-white font-semibold">completamente limpo</strong>.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-gold flex-1 py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-lg"
          >
            Continuar cadastrando
          </button>
          <button
            type="button"
            onClick={onConfirmExit}
            className="flex-1 py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/15 border border-red-500/30 transition-all"
          >
            Sim, sair e limpar
          </button>
        </div>
      </div>
    </div>
  );
}
