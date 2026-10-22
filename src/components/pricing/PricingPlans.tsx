import { Link } from 'react-router-dom';
import { LandingIcon } from '@/components/landing/LandingIcons';
import { GradientText } from '@/components/common/GradientText';

export function PricingPlans() {
  return (
    <section className="pb-20 sm:pb-28 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <div id="plans" className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch pt-4 sm:pt-8">
        {/* Plan 1: Solo */}
        <div className="plan rc p-6 sm:p-8 lg:p-10 rounded-[1.75rem] sm:rounded-[2.25rem] flex flex-col justify-between">
          <div>
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white">Solo</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Digitalização inteligente para o profissional autônomo.
              </p>
            </div>

            <div className="mb-6 sm:mb-8 flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                R$ <span data-count="97">97</span>
              </span>
              <span className="text-gray-500 text-xs sm:text-sm font-semibold">,00/mês</span>
            </div>

            <div className="trial mb-6 sm:mb-8">
              <span className="trial-icon">
                <LandingIcon name="gift" />
              </span>
              <div className="relative leading-tight">
                <p className="text-sm sm:text-base font-bold text-white">
                  <span className="gt">7 dias grátis</span> para testar
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  Experimente o sistema completo antes de assinar.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 sm:gap-6">
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <li className="flex gap-3 text-gray-300">
                  <LandingIcon name="person" className="text-[#d4af37] text-base mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white">01 Agenda/Profissional</strong> (Uso individual)
                  </span>
                </li>
                <li className="flex gap-3 text-gray-300">
                  <LandingIcon name="bot" className="text-[#d4af37] text-base mt-0.5 shrink-0" />
                  <span>Bot WhatsApp 24h (Conexão QR Code)</span>
                </li>
                <li className="flex gap-3 text-gray-300">
                  <LandingIcon name="calc" className="text-[#d4af37] text-base mt-0.5 shrink-0" />
                  <span>Agendamentos e Cancelamentos Automáticos</span>
                </li>
                <li className="flex gap-3 text-gray-300">
                  <LandingIcon name="bell" className="text-[#d4af37] text-base mt-0.5 shrink-0" />
                  <span>Lembretes Anti-falta (24h antes)</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-white/5 opacity-60">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Gestão Financeira
                </p>
                <div className="flex items-center gap-2.5 text-gray-500 text-xs sm:text-sm">
                  <LandingIcon name="x" className="shrink-0" />
                  Módulo EasyWallet Indisponível
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/cadastro"
            className="btn btn-ghost w-full mt-8 sm:mt-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-center text-sm font-semibold transition-all"
          >
            Começar Solo
          </Link>
          <p className="mt-3 text-center text-[11px] text-gray-500 tracking-wide">
            7 dias grátis · depois R$ 97,00/mês
          </p>
        </div>

        {/* Plan 2: Empresarial (Sob Demanda do Empresário) */}
        <div className="plan pro rc p-6 sm:p-8 lg:p-10 rounded-[1.75rem] sm:rounded-[2.25rem] flex flex-col justify-between relative mt-4 md:mt-0">
          <div className="badge">Sob Medida</div>

          <div>
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white">Empresarial</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Para barbearias em crescimento que buscam o diferencial da Negociação Inteligente.
              </p>
            </div>

            <div className="mb-6 sm:mb-8">
              <span className="text-gray-500 text-[11px] sm:text-xs font-semibold uppercase tracking-wider block mb-1">
                Volume e Demanda Personalizados
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight break-words">
                  <GradientText
                    colors={['#d4af37', '#f1c40f', '#fff1b8']}
                    speed={6}
                    glow={0.35}
                  >
                    Sob Demanda
                  </GradientText>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1.5 leading-relaxed">
                Valores ajustados à quantidade de profissionais e recursos utilizados.
              </p>
            </div>

            <div className="trial mb-6 sm:mb-8">
              <span className="trial-icon">
                <LandingIcon name="gift" />
              </span>
              <div className="relative leading-tight">
                <p className="text-sm sm:text-base font-bold text-white">
                  <span className="gt">7 dias grátis</span> para testar
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  Valide o StudioHub com sua equipe antes de fechar.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-4">
                  Funcionalidades:
                </p>
                <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                  <li className="flex gap-3 text-gray-300">
                    <LandingIcon name="ok" className="text-[#d4af37] text-base mt-0.5 shrink-0" />
                    <span>
                      Tudo do plano <strong className="text-white">Essential</strong>.
                    </span>
                  </li>
                  <li className="flex gap-3 text-gray-300">
                    <LandingIcon name="people" className="text-[#d4af37] text-base mt-0.5 shrink-0" />
                    <span>
                      Até <strong className="text-white">05 Perfis de Barbeiros</strong> simultâneos.
                    </span>
                  </li>
                  <li className="flex gap-3 text-gray-300">
                    <LandingIcon name="wallet" className="text-[#d4af37] text-base mt-0.5 shrink-0" />
                    <span>
                      Dashboard com Métricas de Faturamento e Ticket Médio detalhados (<strong className="text-white">EasyWallet</strong>).
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20personalizado%20para%20o%20plano%20Empresarial%20do%20StudioHub."
            target="_blank"
            rel="noreferrer"
            className="btn mag btn-gold w-full mt-8 sm:mt-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-extrabold text-center tracking-wide text-xs sm:text-sm"
          >
            Fazer Orçamento
          </a>
          <p className="mt-3 text-center text-[11px] text-gray-500 tracking-wide">
            Inclui 7 dias grátis para toda a equipe
          </p>
        </div>
      </div>
    </section>
  );
}
