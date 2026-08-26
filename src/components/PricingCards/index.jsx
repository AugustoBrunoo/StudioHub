export default function PricingCards() {
    return (
        <section className="pb-24 px-8 max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-3 gap-8 items-start pt-8">

                {/* Plano 1: Solo */}
                <div className="plan-card p-10 rounded-[2.5rem] flex flex-col reveal-card h-full">
                    <div className="mb-8">
                        <h3 className="text-3xl font-bold mb-2">Solo</h3>
                        <p className="text-gray-500 text-sm">Digitalização inteligente para o profissional autônomo.</p>
                    </div>
                    <div className="mb-8">
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-white">R$ 97</span>
                            <span className="text-gray-500 text-sm font-bold">,00/mês</span>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col gap-6">
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-person text-amber-500 mt-0.5"></i>
                                <span><strong>01 Agenda/Profissional</strong> (Uso individual)</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-robot text-amber-500 mt-0.5"></i>
                                <span>Bot WhatsApp 24h (Conexão QR Code)</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-calendar-check text-amber-500 mt-0.5"></i>
                                <span>Agendamentos e Cancelamentos Automáticos</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-bell text-amber-500 mt-0.5"></i>
                                <span>Lembretes Anti-falta (24h antes)</span>
                            </li>
                        </ul>

                        {/* Módulo Financeiro Ausente */}
                        <div className="pt-4 border-t border-white/5 opacity-50">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Gestão Financeira</p>
                            <li className="flex items-center gap-3 text-gray-500 text-sm">
                                <i className="bi bi-x-lg"></i> Módulo EasyWallet Indisponível
                            </li>
                        </div>
                    </div>

                    <button className="w-full mt-10 py-4 rounded-2xl border border-white/10 hover:bg-white hover:text-black font-bold transition duration-300">
                        Começar Solo
                    </button>
                </div>

                {/* Plano 2: Premium (O Mais Popular) */}
                <div className="plan-card plan-pro p-10 rounded-[2.5rem] flex flex-col reveal-card h-full">
                    <div className="popular-badge">O mais popular</div>
                    <div className="mb-8">
                        <div className="flex justify-between items-start">
                            <h3 className="text-3xl font-bold mb-2">Premium</h3>
                        </div>
                        <p className="text-gray-400 text-sm">Para clínicas e escritórios em expansão.</p>
                    </div>
                    <div className="mb-8">
                        <span className="text-gray-500 line-through text-sm block mb-1">De R$ 247,00</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black gradient-text">R$ 197</span>
                            <span className="text-gray-400 text-sm font-bold">,00/mês</span>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col gap-6">
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 text-white bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 -mx-2.5">
                                <i className="bi bi-stars text-amber-500 mt-0.5"></i>
                                <span><strong>Motor de Mediação IA:</strong> O bot negocia e remaneja conflitos de horário sozinho.</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-people text-amber-500 mt-0.5"></i>
                                <span>Até <strong>05 Agendas/Profissionais</strong></span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-arrow-repeat text-amber-500 mt-0.5"></i>
                                <span>Lembretes de Retorno (Fidelização a longo prazo)</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-calendar-range text-amber-500 mt-0.5"></i>
                                <span>Visões de Calendário Complexas (RRULE)</span>
                            </li>
                        </ul>

                        {/* Módulo Financeiro Lite */}
                        <div className="pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 mb-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gestão Financeira</p>
                                <span className="wallet-badge"><i className="bi bi-wallet2"></i> EasyWallet Lite</span>
                            </div>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3 text-gray-300">
                                    <i className="bi bi-graph-up text-green-500 mt-0.5"></i>
                                    <span><strong>Previsão de Receita:</strong> Saiba quanto vai faturar baseado na agenda.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-300">
                                    <i className="bi bi-receipt text-green-500 mt-0.5"></i>
                                    <span>Registro de Pagamento Simples (Pix/Cartão/Dinheiro).</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button className="w-full mt-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black hover:scale-[1.02] transition duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        ASSINAR PREMIUM
                    </button>
                </div>

                {/* Plano 3: Hub Master */}
                <div className="plan-card p-10 rounded-[2.5rem] flex flex-col reveal-card h-full">
                    <div className="mb-8">
                        <h3 className="text-3xl font-bold mb-2">Hub Master</h3>
                        <p className="text-gray-500 text-sm">Controle absoluto para policlínicas e grandes redes.</p>
                    </div>
                    <div className="mb-8">
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-white">R$ 397</span>
                            <span className="text-gray-500 text-sm font-bold">,00/mês</span>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col gap-6">
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-infinity text-amber-500 mt-0.5"></i>
                                <span><strong>Agendas Ilimitadas</strong> (A partir de 10 perfis)</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-building text-amber-500 mt-0.5"></i>
                                <span>Gestão de Múltiplas Unidades/Filiais</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <i className="bi bi-code-slash text-amber-500 mt-0.5"></i>
                                <span>Acesso via API (Integração com Prontuários Legados)</span>
                            </li>
                        </ul>

                        {/* Módulo Financeiro Pro */}
                        <div className="pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 mb-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gestão Financeira</p>
                                <span className="wallet-badge !bg-amber-500/10 !text-amber-500 !border-amber-500/20"><i className="bi bi-wallet2"></i> EasyWallet Pro</span>
                            </div>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3 text-white font-medium">
                                    <i className="bi bi-pie-chart text-amber-500 mt-0.5"></i>
                                    <span><strong>Split Automático de Comissões</strong> (Ex: 60% Médico / 40% Clínica).</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-300">
                                    <i className="bi bi-file-earmark-bar-graph text-amber-500 mt-0.5"></i>
                                    <span>Gestão de Despesas e DRE (Lucro Real).</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-300">
                                    <i className="bi bi-file-text text-amber-500 mt-0.5"></i>
                                    <span>Emissão de Notas Fiscais e Recibos automáticos.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button className="w-full mt-10 py-4 rounded-2xl border border-white/10 hover:bg-white hover:text-black font-bold transition duration-300">
                        Falar com Especialista
                    </button>
                </div>

            </div>
        </section>
    );
}
