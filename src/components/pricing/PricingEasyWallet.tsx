import { LandingIcon } from '@/components/landing/LandingIcons';

export function PricingEasyWallet() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/45 border-y border-white/5 overflow-hidden w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left column */}
        <div className="md:w-1/2 w-full rl">
          <span className="wb mb-4 sm:mb-5 inline-flex items-center gap-1.5 text-[10px]">
            <LandingIcon name="wallet" />
            Integrado ao StudioHub
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.15]">
            Pare de fazer contas no Excel.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
            A partir do plano Empresarial, você ganha acesso ao{' '}
            <strong className="text-white">EasyWallet</strong>, nosso módulo financeiro nativo. Ele
            sabe exatamente quem agendou, quem pagou e qual é a comissão de cada profissional do seu
            escritório ou clínica.
          </p>

          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/15 flex items-center justify-center text-green-500 shrink-0 mt-0.5 sm:mt-0">
                <LandingIcon name="ok" style={{ strokeWidth: 2.6 }} />
              </div>
              <p className="font-medium text-gray-300 text-xs sm:text-sm md:text-base leading-snug">
                Fim das horas perdidas fechando o caixa no fim do mês.
              </p>
            </div>

            <div className="flex items-start sm:items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/15 flex items-center justify-center text-green-500 shrink-0 mt-0.5 sm:mt-0">
                <LandingIcon name="ok" style={{ strokeWidth: 2.6 }} />
              </div>
              <p className="font-medium text-gray-300 text-xs sm:text-sm md:text-base leading-snug">
                Saiba seu lucro líquido deduzindo taxas e despesas.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Revenue Card */}
        <div className="md:w-1/2 w-full rr relative">
          <div className="absolute inset-0 -m-6 bg-[#d4af37]/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="glass relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-zinc-900/90 to-black/90 w-full">
            <div className="flex justify-between items-center mb-5 sm:mb-6">
              <h4 className="font-semibold text-gray-300 text-sm sm:text-base">Faturamento Semanal</h4>
              <LandingIcon name="dots" className="text-gray-500 text-lg sm:text-xl" />
            </div>

            <div className="mb-6 sm:mb-8">
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-1 text-white">
                R$ <span data-count="14590" data-dec="1">14.590,00</span>
              </p>
              <p className="text-xs sm:text-sm text-green-500 flex items-center gap-1">
                <LandingIcon name="up" />
                +12% em relação à semana passada
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <div className="rowi flex justify-between items-center p-2.5 sm:p-3 rounded-xl bg-white/5 gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37] text-base sm:text-lg shrink-0">
                    <LandingIcon name="person" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-white truncate">Dr. Marcos</p>
                    <p className="text-[11px] text-gray-500">Comissão de 60%</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">R$ 8.754,00</p>
              </div>

              <div className="rowi flex justify-between items-center p-2.5 sm:p-3 rounded-xl bg-white/5 gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-500 text-base sm:text-lg shrink-0">
                    <LandingIcon name="person" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-white truncate">Dra. Aline</p>
                    <p className="text-[11px] text-gray-500">Comissão de 50%</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">R$ 5.836,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
