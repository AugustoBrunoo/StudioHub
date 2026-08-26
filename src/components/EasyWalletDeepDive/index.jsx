export default function EasyWalletDeepDive() {
    return (
        <section id="easywallet-section" className="py-20 px-8 bg-black/40 border-y border-white/5 relative overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                <div className="md:w-1/2 reveal-left">
                    <span className="wallet-badge mb-4"><i className="bi bi-wallet2"></i> Integrado ao StudioHub</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Pare de fazer contas no Excel.</h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        A partir do plano Premium, você ganha acesso ao <strong>EasyWallet</strong>, nosso módulo financeiro nativo. Ele sabe exatamente quem agendou, quem pagou e qual é a comissão de cada profissional do seu escritório ou clínica.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <i className="bi bi-check-lg"></i>
                            </div>
                            <p className="font-medium text-gray-300">Fim das horas perdidas fechando o caixa no fim do mês.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <i className="bi bi-check-lg"></i>
                            </div>
                            <p className="font-medium text-gray-300">Saiba seu lucro líquido deduzindo taxas e despesas.</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 reveal-right">
                    {/* Dashboard Mockup Abstrato */}
                    <div className="glass p-6 rounded-3xl border border-white/10 shadow-2xl bg-gradient-to-br from-zinc-900 to-black">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-bold text-gray-300">Faturamento Semanal</h4>
                            <i className="bi bi-three-dots text-gray-500"></i>
                        </div>
                        <div className="mb-8">
                            <p className="text-4xl font-black text-white mb-1">R$ 14.590,00</p>
                            <p className="text-sm text-green-500"><i className="bi bi-arrow-up-right"></i> +12% em relação à semana passada</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                                        <i className="bi bi-person-fill"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Dr. Marcos</p>
                                        <p className="text-xs text-gray-500">Comissão de 60%</p>
                                    </div>
                                </div>
                                <p className="font-bold text-white">R$ 8.754,00</p>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <i className="bi bi-person-fill"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Dra. Aline</p>
                                        <p className="text-xs text-gray-500">Comissão de 50%</p>
                                    </div>
                                </div>
                                <p className="font-bold text-white">R$ 5.836,00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] -z-0"></div>
        </section>
    );
}
