export default function FaqSection() {
    return (
        <section id="faq" className="py-24 px-8 max-w-4xl mx-auto">
            <div className="text-center mb-16 reveal">
                <h2 className="text-3xl font-bold mb-4 uppercase tracking-widest text-gray-400 text-sm">Dúvidas sobre assinaturas</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-left reveal">
                <div className="p-6 glass rounded-2xl border border-white/5">
                    <h5 className="font-bold text-white mb-2 text-lg">Posso mudar de plano depois?</h5>
                    <p className="text-sm text-gray-400 leading-relaxed">Totalmente. Você pode fazer upgrade ou downgrade a qualquer momento direto pelo painel, com o valor sendo proporcionalizado na fatura (prorata).</p>
                </div>
                <div className="p-6 glass rounded-2xl border border-white/5">
                    <h5 className="font-bold text-white mb-2 text-lg">O que é a Mediação via IA?</h5>
                    <p className="text-sm text-gray-400 leading-relaxed">Disponível a partir do plano Premium, nossa inteligência detecta conflitos ou urgências na agenda e entra em contato com o paciente anterior para oferecer bônus em troca de reagendamento.</p>
                </div>
                <div className="p-6 glass rounded-2xl border border-white/5">
                    <h5 className="font-bold text-white mb-2 text-lg">O EasyWallet emite Nota Fiscal?</h5>
                    <p className="text-sm text-gray-400 leading-relaxed">Sim. No plano Hub Master (Pro), nós nos conectamos à sua prefeitura para emitir a NFS-e automaticamente após a confirmação do pagamento da consulta/serviço.</p>
                </div>
                <div className="p-6 glass rounded-2xl border border-white/5">
                    <h5 className="font-bold text-white mb-2 text-lg">Tem taxa de adesão ou multa?</h5>
                    <p className="text-sm text-gray-400 leading-relaxed">Nenhuma. Nosso modelo é 100% SaaS (Software as a Service) pago mensalmente. Você é livre para cancelar quando desejar sem taxas ocultas.</p>
                </div>
            </div>
        </section>
    );
}
