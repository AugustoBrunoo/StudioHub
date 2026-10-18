import { LandingIcon } from './LandingIcons';

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
    <section id="diferencial" className="panel py-32 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Column (Content & Steps) */}
        <div className="lg:w-1/2 rl">
          <span className="eyebrow mb-5 block">Exclusividade StudioHub</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-10 leading-[1.08]">
            Mediação de conflitos <span className="gt">automatizada.</span>
          </h2>
          <div className="space-y-8">
            {points.map((p) => (
              <div key={p.step} className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full btn-gold flex items-center justify-center font-bold">
                  {p.step}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">{p.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Simulated Live Chat Interface) */}
        <div className="lg:w-1/2 w-full relative rr">
          <div className="absolute inset-0 m-auto w-[110%] h-[110%] -left-[5%] -top-[5%] bg-[#d4af37]/10 rounded-full blur-[90px]" />
          <div className="glass relative p-6 md:p-8 rounded-[2.5rem] border-[#d4af37]/20 shadow-2xl bg-[#0a0a0a]/80">
            {/* Chat Header */}
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center text-green-500 text-xl">
                <LandingIcon name="chat" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                  Assistente Virtual da Clínica
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-semibold">Online &amp; Otimizando</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-5 flex flex-col" id="chat">
              <div className="msg bg-white/5 p-5 rounded-3xl rounded-tl-none max-w-[85%] border border-white/5 self-start">
                <p className="text-sm leading-relaxed text-gray-200">
                  Olá, Marcos! Tivemos uma emergência clínica que necessita do horário de{' '}
                  <b className="text-[#d4af37]">Terça às 14h</b>. Você aceitaria reagendar sua
                  consulta de rotina para Quarta às 10h e ganhar{' '}
                  <b className="text-[#d4af37]">prioridade máxima</b> no próximo retorno?
                </p>
              </div>

              <div className="msg btn-gold p-4 rounded-3xl rounded-tr-none max-w-[80%] font-semibold self-end">
                <p className="text-sm">
                  Sem problemas! Pode mudar para a Quarta-feira, fica bom pra mim também.
                </p>
              </div>

              <div className="msg bg-white/5 p-4 rounded-3xl rounded-tl-none max-w-[85%] border border-white/5 self-start flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0 text-black text-sm">
                  <LandingIcon name="ok" style={{ strokeWidth: 3 }} />
                </div>
                <p className="text-sm font-medium text-gray-200">
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
