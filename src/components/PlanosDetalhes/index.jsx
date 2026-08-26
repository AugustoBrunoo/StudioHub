export default function PlanosDetalhes({ activeTab, handleTabChange }) {
    return (
        <section id="planos-detalhes" className="py-24 px-8 bg-zinc-900/30 relative border-y border-white/5 flex-1">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 reveal-up">
                    <h2 className="text-3xl md:text-5xl font-black mb-4">Um sistema que <span className="gradient-text">escala com você.</span></h2>
                    <p className="text-gray-400 text-lg">Do profissional autônomo às redes de clínicas. Escolha sua realidade.</p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 reveal-up">
                    <button onClick={() => handleTabChange('solo')}
                        className={`tab-btn px-8 py-4 rounded-full border text-sm font-bold uppercase tracking-wider ${activeTab === 'solo' ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'border-white/10 text-gray-400 hover:border-amber-500/50'}`}>
                        Modo Solo
                    </button>
                    <button onClick={() => handleTabChange('premium')}
                        className={`tab-btn px-8 py-4 rounded-full border text-sm font-bold uppercase tracking-wider ${activeTab === 'premium' ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'border-white/10 text-gray-400 hover:border-amber-500/50'}`}>
                        Modo Premium
                    </button>
                    <button onClick={() => handleTabChange('hub')}
                        className={`tab-btn px-8 py-4 rounded-full border text-sm font-bold uppercase tracking-wider ${activeTab === 'hub' ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'border-white/10 text-gray-400 hover:border-amber-500/50'}`}>
                        Modo Hub Master
                    </button>
                </div>

                {/* Tab Contents */}
                <div className="relative w-full min-h-[400px]">
                    {/* SOLO TAB */}
                    {activeTab === 'solo' && (
                        <div className="tab-content grid lg:grid-cols-2 gap-12 items-center w-full animate-[fadeIn_0.5s_ease-out]">
                            <div>
                                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                                    Para Autônomos
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Seu paciente agenda sozinho. Você foca no atendimento.</h3>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    No Plano Solo, você recebe acesso total ao nosso Bot de WhatsApp 24h. Conecte seu número
                                    escaneando um QR Code e deixe o sistema cuidar dos agendamentos, cancelamentos e lembretes
                                    para sua agenda individual.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-gray-300"><i className="bi bi-check-circle-fill text-amber-500"></i> 01 Agenda / Profissional</li>
                                    <li className="flex items-center gap-3 text-gray-300"><i className="bi bi-check-circle-fill text-amber-500"></i> Conexão QR Code Imediata</li>
                                    <li className="flex items-center gap-3 text-gray-300"><i className="bi bi-check-circle-fill text-amber-500"></i> Lembretes automáticos anti-falta</li>
                                </ul>
                            </div>
                            <div className="relative bg-black rounded-3xl border border-white/10 p-6 flex items-center justify-center overflow-hidden h-[400px]">
                                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent"></div>
                                <div className="w-full max-w-sm bg-zinc-900 rounded-2xl border border-white/5 p-4 shadow-2xl relative z-10">
                                    <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                            <i className="bi bi-whatsapp"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">Seu Número Comercial</p>
                                            <p className="text-[10px] text-green-400">Online</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-zinc-800 text-gray-300 text-xs p-3 rounded-r-xl rounded-bl-xl w-3/4">Olá! Quero marcar um horário.</div>
                                        <div className="bg-amber-500/10 text-amber-500 text-xs p-3 rounded-l-xl rounded-br-xl w-3/4 ml-auto border border-amber-500/20">
                                            Claro! Tenho vagas livres na Terça às 14h ou 16h. Qual prefere?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PREMIUM TAB */}
                    {activeTab === 'premium' && (
                        <div className="tab-content grid lg:grid-cols-2 gap-12 items-center w-full animate-[fadeIn_0.5s_ease-out]">
                            <div>
                                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                                    Para Empresas
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Sua agenda cheia, com a previsão de faturamento na palma da mão.</h3>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    A dor de cabeça do choque de horários acaba aqui. O Premium gerencia até 5 profissionais e
                                    inclui o <strong>EasyWallet Lite</strong>. Além de organizar o tempo, o sistema prevê quanto
                                    você vai faturar no mês com base na sua agenda.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-gray-300"><i className="bi bi-check-circle-fill text-amber-500"></i> Motor de Mediação IA</li>
                                    <li className="flex items-center gap-3 text-gray-300"><i className="bi bi-check-circle-fill text-amber-500"></i> Até 05 Agendas/Profissionais</li>
                                    <li className="flex items-center gap-3 text-white font-bold"><i className="bi bi-wallet2 text-amber-500"></i> EasyWallet Lite: Previsão de Receita</li>
                                </ul>
                            </div>
                            <div className="relative bg-black rounded-3xl border border-white/10 p-6 flex flex-col justify-center overflow-hidden h-[400px] gap-4">
                                <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/5 to-transparent"></div>
                                <div className="w-full bg-zinc-900 rounded-2xl border border-white/5 p-4 shadow-xl z-10 flex gap-2">
                                    <div className="flex-1 bg-zinc-800/50 rounded-lg p-2">
                                        <div className="w-full h-1 bg-blue-500 rounded-full mb-2"></div>
                                        <p className="text-[9px] text-gray-400">Dr. Paulo</p>
                                    </div>
                                    <div className="flex-1 bg-zinc-800/50 rounded-lg p-2">
                                        <div className="w-full h-1 bg-green-500 rounded-full mb-2"></div>
                                        <p className="text-[9px] text-gray-400">Dra. Ana</p>
                                    </div>
                                    <div className="flex-1 bg-zinc-800/50 rounded-lg p-2">
                                        <div className="w-full h-1 bg-purple-500 rounded-full mb-2"></div>
                                        <p className="text-[9px] text-gray-400">Dr. Lucas</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gradient-to-r from-zinc-900 to-black rounded-2xl border border-amber-500/20 p-5 shadow-xl z-10">
                                    <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">Previsão EasyWallet</p>
                                    <h4 className="text-2xl font-black text-white">R$ 14.500,00</h4>
                                    <p className="text-xs text-gray-500 mt-1">Baseado nos agendamentos desta semana.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* HUB MASTER TAB */}
                    {activeTab === 'hub' && (
                        <div className="tab-content grid lg:grid-cols-2 gap-12 items-center w-full animate-[fadeIn_0.5s_ease-out]">
                            <div>
                                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                                    Para Grandes Redes
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Controle absoluto. Da agenda ao split de comissão automático.</h3>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    A solução definitiva para policlínicas. Agendas ilimitadas e o poder do <strong>EasyWallet
                                        Pro</strong>. Quando o paciente paga a consulta, o sistema já calcula automaticamente a
                                    porcentagem da clínica e do médico.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-gray-300"><i className="bi bi-check-circle-fill text-amber-500"></i> Agendas Ilimitadas</li>
                                    <li className="flex items-center gap-3 text-gray-300"><i className="bi bi-check-circle-fill text-amber-500"></i> Acesso via API para Integrações</li>
                                    <li className="flex items-center gap-3 text-white font-bold"><i className="bi bi-diagram-3-fill text-amber-500"></i> EasyWallet Pro: Split Automático</li>
                                </ul>
                            </div>
                            <div className="relative bg-black rounded-3xl border border-white/10 p-6 flex items-center justify-center overflow-hidden h-[400px]">
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
                                <div className="w-full max-w-sm bg-zinc-900 rounded-2xl border border-amber-500/20 p-6 shadow-2xl relative z-10 text-center">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Split de Consulta</p>
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="text-left">
                                            <p className="text-[10px] text-gray-500 uppercase">Clínica (40%)</p>
                                            <p className="text-lg font-bold text-amber-500">R$ 80,00</p>
                                        </div>
                                        <div className="h-10 w-[1px] bg-white/10"></div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-500 uppercase">Médico (60%)</p>
                                            <p className="text-lg font-bold text-white">R$ 120,00</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-amber-500 w-[40%]"></div>
                                        <div className="h-full bg-white/80 w-[60%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
