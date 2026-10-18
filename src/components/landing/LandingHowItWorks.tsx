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
    icon: 'chat',
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
    <section id="como-funciona" className="panel py-28 px-6 lg:px-8 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 rv">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Adeus burocracia.
            <br />
            <span className="gt">Conecte em 10 segundos.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Esqueça configurações difíceis com o Facebook. Nossa plataforma usa o modelo de
            &quot;Aparelho Conectado&quot; para rodar instantaneamente.
          </p>
        </div>

        <div id="steps" className="grid md:grid-cols-3 gap-12 text-center relative">
          <div
            id="rail"
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent origin-left"
          />
          {steps.map((st) => (
            <div key={st.number} className="st flex flex-col items-center">
              <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-7 text-4xl text-[#d4af37] border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,.15)] bg-[#0a0a0a]">
                <LandingIcon name={st.icon} />
              </div>
              <h4 className="text-xl font-semibold mb-2">{st.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{st.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
