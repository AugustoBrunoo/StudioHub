import { LandingIcon, type IconName } from './LandingIcons';

interface FeatureCard {
  icon: IconName;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: 'bot',
    title: 'Bot Inteligente no WhatsApp',
    description:
      'Seu cliente agenda, cancela ou tira dúvidas em segundos diretamente pelo WhatsApp, 24 horas por dia, sem precisar baixar nenhum aplicativo.',
  },
  {
    icon: 'cal',
    title: 'Recorrência Flexível',
    description:
      'Trabalha apenas terça e quinta de manhã? Nosso sistema cria padrões diários, semanais, mensais ou anuais instantaneamente para adaptar-se à sua rotina real.',
  },
  {
    icon: 'grid',
    title: 'Multi-Visões em Tempo Real',
    description:
      'Acesse um dashboard completo no computador ou celular. Alterne entre visão diária, semanal ou mensal com um clique para gerenciar seus compromissos.',
  },
];

export function LandingFeatures() {
  return (
    <section id="funcionalidades" className="panel py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 rv">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight mb-3 sm:mb-4">
            A tecnologia a favor do seu tempo
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Recursos corporativos simplificados para profissionais que valorizam cada minuto do
            seu dia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="card glass p-6 sm:p-9 rounded-2xl sm:rounded-3xl rv">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-5 sm:mb-7 text-[#d4af37] border border-[#d4af37]/25 bg-[#d4af37]/10 text-xl sm:text-2xl shrink-0">
                <LandingIcon name={item.icon} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{item.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
