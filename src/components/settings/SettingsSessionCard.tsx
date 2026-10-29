import { LogOut } from 'lucide-react';

interface SettingsSessionCardProps {
  onLogout: () => void;
}

export function SettingsSessionCard({ onLogout }: SettingsSessionCardProps) {
  return (
    <section className="rise rounded-[1.65rem] bg-[#111111] hover:bg-[#151515] border border-white/[0.08] hover:border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_28px_60px_-30px_rgba(0,0,0,0.95)] p-5 sm:p-7 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-4">
          <div className="ibox !w-12 !h-12 !rounded-2xl shrink-0">
            <LogOut className="w-5 h-5 text-[#d4af37]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Encerrar Sessão no Dispositivo
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.05] text-neutral-400">
                Segurança
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Deseja sair da sua conta agora? Fique tranquilo: seu robô de agendamento no WhatsApp continuará atendendo seus clientes normalmente 24 horas por dia.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="btn btn-ghost hover:!bg-red-500/10 hover:!border-red-500/30 hover:!text-red-300 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </section>
  );
}

