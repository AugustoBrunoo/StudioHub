import { useState } from 'react';
import { LandingIcon } from './LandingIcons';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Meu número do WhatsApp pode ser banido?',
    answer:
      'O risco é extremamente baixo. Nosso bot atua de forma "passiva", ou seja, ele apenas responde quem entra em contato primeiro querendo agendar. Ele não envia spam ou mensagens em massa. De qualquer forma, recomendamos sempre ter um chip/número exclusivo para o seu negócio para melhor organização.',
  },
  {
    question: 'O robô vai responder minha família e amigos?',
    answer:
      'Não se preocupe! Você pode configurar o sistema para ser ativado apenas com uma palavra-chave (ex: "Agendar") ou para ignorar contatos que já estão salvos na agenda do seu celular. Assim, conversas pessoais continuam pessoais.',
  },
  {
    question: 'Preciso ter um CNPJ para conectar o WhatsApp?',
    answer:
      'Não. Diferente de plataformas burocráticas, nós usamos a tecnologia de espelhamento via QR Code. Basta assinar a plataforma, ler o código na tela do computador com o seu celular e o sistema já começa a funcionar instantaneamente.',
  },
  {
    question: 'O cliente precisa baixar algum aplicativo?',
    answer:
      'Zero aplicativos novos. O seu paciente ou cliente fará todo o processo de agendamento de forma fluida pelo próprio aplicativo do WhatsApp que ele já usa todos os dias.',
  },
];

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section id="faq" className="panel py-28 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 rv">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-gray-400">Transparência total sobre o funcionamento da plataforma.</p>
        </div>

        <div className="space-y-4 rv" id="faqs">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq glass rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? 'on' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <LandingIcon
                    name="plus"
                    className="ico text-[#d4af37] text-xl shrink-0 transition-transform duration-300"
                  />
                </button>
                <div className="faq-a">
                  <div>
                    <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
