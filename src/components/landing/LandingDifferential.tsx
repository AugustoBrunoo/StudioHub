import { LandingIcon, WhatsAppIcon } from './LandingIcons';

interface DifferentialPoint {
  step: string;
  title: string;
  description: string;
}

const points: DifferentialPoint[] = [
  {
    step: '1',
    title: 'Choque de Agendas',
    description:
      'Um cliente VIP ou urgência solicita um horário já reservado? O StudioHub entra em ação como seu secretário.',
  },
  {
    step: '2',
    title: 'Negociação via IA',
    description:
      'O sistema entra em contato educadamente com o cliente agendado e sugere uma troca em troca de um benefício ou prioridade futura.',
  },
  {
    step: '3',
    title: 'Reajuste em Tempo Real',
    description:
      'Troca confirmada? A grade se reorganiza sozinha no Dashboard e todos recebem a confirmação instantânea no WhatsApp.',
  },
];

export function LandingDifferential() {
  return (
    <section id="diferencial" className="panel py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left Column (Content & Steps) */}
        <div className="lg:w-1/2 w-full rl">
          <span className="eyebrow mb-3 sm:mb-5 block text-[10px] sm:text-[11px]">
            Exclusividade StudioHub
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-10 leading-[1.12]">
            Mediação de conflitos <span className="gt">automatizada.</span>
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {points.map((p) => (
              <div key={p.step} className="flex gap-3.5 sm:gap-5 items-start">
                <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f1c40f] text-[#0a0a0a] shadow-md shadow-[#d4af37]/30 flex items-center justify-center font-bold text-xs sm:text-base mt-0.5">
                  {p.step}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">{p.title}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Simulated Live Chat Interface) */}
        <div className="lg:w-1/2 w-full relative rr mt-4 lg:mt-0">
          <div className="absolute inset-0 m-auto w-full h-full bg-[#d4af37]/10 rounded-full blur-[70px] sm:blur-[90px] pointer-events-none" />
          <div className="glass relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border-[#d4af37]/20 shadow-2xl bg-[#0a0a0a]/85 backdrop-blur-xl">
            {/* Chat Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8 border-b border-white/10 pb-3 sm:pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/15 flex items-center justify-center text-green-500 text-lg sm:text-xl shrink-0">
                <WhatsAppIcon size={24} className="text-green-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider sm:tracking-widest truncate">
                  Assistente Virtual da Clínica
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                  <p className="text-xs sm:text-sm font-semibold text-white">Online &amp; Otimizando</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3.5 sm:space-y-5 flex flex-col" id="chat">
              {/* Message 1 (Incoming) */}
              <div className="msg bg-white/5 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl rounded-tl-none max-w-[94%] sm:max-w-[85%] border border-white/5 self-start shadow-sm">
                <p className="text-xs sm:text-sm leading-relaxed text-gray-200">
                  Olá, Marcos! Tivemos uma emergência clínica que necessita do horário de{' '}
                  <b className="text-[#d4af37]">Terça às 14h</b>. Você aceitaria reagendar sua
                  consulta de rotina para Quarta às 10h e ganhar{' '}
                  <b className="text-[#d4af37]">prioridade máxima</b> no próximo retorno?
                </p>
              </div>

              {/* Message 2 (Outgoing) */}
              <div className="msg bg-gradient-to-r from-[#d4af37] to-[#f1c40f] text-[#0a0a0a] p-3 sm:p-4 rounded-2xl sm:rounded-3xl rounded-tr-none max-w-[90%] sm:max-w-[80%] font-semibold self-end shadow-md shadow-[#d4af37]/20">
                <p className="text-xs sm:text-sm">
                  Sem problemas! Pode mudar para a Quarta-feira, fica bom pra mim também.
                </p>
              </div>

              {/* Message 3 (System Response) */}
              <div className="msg bg-white/5 p-3 sm:p-4 rounded-2xl sm:rounded-3xl rounded-tl-none max-w-[94%] sm:max-w-[85%] border border-white/5 self-start flex items-start sm:items-center gap-2.5 sm:gap-3 shadow-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0 text-black text-xs sm:text-sm mt-0.5 sm:mt-0">
                  <LandingIcon name="ok" style={{ strokeWidth: 3 }} />
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-200 leading-relaxed">
                  Perfeito! Sua consulta foi remarcada e sua prioridade futura está salva no sistema.
                  Agradecemos a compreensão!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
