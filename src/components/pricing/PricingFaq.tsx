const FAQ_ITEMS = [
  {
    q: 'Posso mudar de plano depois?',
    a: 'Totalmente. Você pode fazer upgrade ou downgrade a qualquer momento direto pelo painel, com o valor sendo proporcionalizado na fatura (prorata).',
  },
  {
    q: 'O que é a Mediação via IA?',
    a: 'Disponível no plano Empresarial, nossa inteligência detecta conflitos ou urgências na agenda e entra em contato com o paciente anterior para oferecer bônus em troca de reagendamento.',
  },
  {
    q: 'O EasyWallet emite Nota Fiscal?',
    a: 'Sim. No plano Empresarial, nós nos conectamos à sua prefeitura para emitir a NFS-e automaticamente após a confirmação do pagamento do serviço ou consulta.',
  },
  {
    q: 'Tem taxa de adesão ou multa?',
    a: 'Nenhuma. Nosso modelo é 100% SaaS (Software as a Service) pago mensalmente. Você é livre para cancelar quando desejar sem taxas ocultas.',
  },
];

export function PricingFaq() {
  return (
    <section id="faq" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 max-w-4xl mx-auto w-full">
      <div className="text-center mb-10 sm:mb-14 rv">
        <span className="eyebrow">Dúvidas sobre assinaturas</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-left">
        {FAQ_ITEMS.map((item, idx) => (
          <div key={idx} className="plan fq p-5 sm:p-7 rounded-2xl">
            <h5 className="font-semibold text-white mb-2 text-base sm:text-lg leading-snug">{item.q}</h5>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
