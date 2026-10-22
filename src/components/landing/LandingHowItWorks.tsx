import { LandingIcon, type IconName } from './LandingIcons';

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: IconName;
}

const steps: StepItem[] = [
  {
    number: '1',
    title: '1. Escaneie o QR Code',
    description:
      'Acesse nosso painel e aponte o WhatsApp do seu negócio para o QR Code na tela. Simples assim.',
    icon: 'qr',
  },
  {
    number: '2',
    title: '2. O Cliente chama',
    description:
      'O paciente/cliente manda um "Oi" ou uma palavra-chave e o nosso assistente assume o atendimento.',
    icon: 'whatsapp',
  },
  {
    number: '3',
    title: '3. Agenda Sincronizada',
    description:
      'O horário é reservado na hora e aparece desenhado no seu calendário online sem conflitos.',
    icon: 'calc',
  },
];

export function LandingHowItWorks() {
  return (
    <section id="como-funciona" className="panel py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-20 rv">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight mb-3 sm:mb-4">
            Adeus burocracia.
            <br />
            <span className="gt">Conecte em 10 segundos.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Esqueça configurações difíceis com o Facebook. Nossa plataforma usa o modelo de
            &quot;Aparelho Conectado&quot; para rodar instantaneamente.
          </p>
        </div>

        <div id="steps" className="relative max-w-md md:max-w-none mx-auto">
          {/* Horizontal connecting rail (desktop >= md) */}
          <div
            id="rail"
            className="hidden md:block absolute top-10 lg:top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent origin-left z-0 pointer-events-none"
          />

          {/* Vertical connecting rail (mobile/tablet < md) */}
          <div
            id="rail-v"
            className="md:hidden absolute left-[2.25rem] sm:left-[2.75rem] top-9 sm:top-11 bottom-9 sm:bottom-11 w-px bg-gradient-to-b from-transparent via-[#d4af37] to-transparent origin-top z-0 pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 lg:gap-12">
            {steps.map((st) => (
              <div
                key={st.number}
                className="st flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 sm:gap-6 md:gap-0 relative z-10"
              >
                <div className="w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem] md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mb-0 md:mb-4 lg:mb-7 text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-[#d4af37] border border-[#d4af37]/35 shadow-[0_0_35px_rgba(212,175,55,.18)] bg-[#0a0a0a] shrink-0">
                  <LandingIcon name={st.icon} />
                </div>
                <div className="pt-2 sm:pt-3 md:pt-0">
                  <h4 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-1.5 md:mb-2 text-white">
                    {st.title}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs">
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
