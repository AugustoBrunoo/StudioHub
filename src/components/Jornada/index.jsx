export default function Jornada() {
    return (
        <section id="jornada" className="py-16 px-8 max-w-5xl mx-auto relative w-full">
            <div className="text-center mb-20 reveal-up">
                <h2 className="text-3xl md:text-5xl font-black mb-4">A Jornada do <span className="gradient-text">Agendamento Invisível</span></h2>
                <p className="text-gray-400 text-lg">Veja como conectamos seu paciente ao seu calendário em segundos.</p>
            </div>

            <div className="relative w-full max-w-3xl mx-auto z-0">
                <div className="timeline-line hidden md:block"></div>

                <div className="timeline-step flex flex-col md:flex-row gap-8 mb-16 reveal-up relative z-10">
                    <div className="flex items-center justify-center md:justify-start gap-4 mx-auto md:mx-0">
                        <div className="md:w-16 md:h-16 w-12 h-12 bg-zinc-900 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 text-2xl flex-shrink-0 z-10 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            <i className="bi bi-whatsapp"></i>
                        </div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold md:hidden">Passo 1: O Gatilho</h3>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-white/5 flex-1 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-2 hidden md:block">Passo 1: O Gatilho</h3>
                        <h4 className="text-2xl font-black mb-4 text-white">O Paciente chama no WhatsApp</h4>
                        <p className="text-gray-400 leading-relaxed">
                            Esqueça links complexos. O seu cliente simplesmente manda um "Oi, quero marcar um horário" para
                            o número do seu negócio. Ele usa o aplicativo que já domina, sem baixar nada novo.
                        </p>
                    </div>
                </div>

                <div className="timeline-step flex flex-col md:flex-row gap-8 mb-16 reveal-up relative z-10">
                    <div className="flex items-center justify-center md:justify-start gap-4 mx-auto md:mx-0">
                        <div className="md:w-16 md:h-16 w-12 h-12 bg-zinc-900 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 text-2xl flex-shrink-0 z-10 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            <i className="bi bi-robot"></i>
                        </div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold md:hidden">Passo 2: A Mágica</h3>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-white/5 flex-1 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-2 hidden md:block">Passo 2: A Mágica</h3>
                        <h4 className="text-2xl font-black mb-4 text-white">Nossa Inteligência Assume</h4>
                        <p className="text-gray-400 leading-relaxed">O bot do StudioHub lê a sua agenda em tempo real. Ele
                            entende as folgas, horários de almoço e cruza os dados para oferecer opções de horários de forma
                            natural.</p>
                    </div>
                </div>

                <div className="timeline-step flex flex-col md:flex-row gap-8 mb-16 reveal-up relative z-10">
                    <div className="flex items-center justify-center md:justify-start gap-4 mx-auto md:mx-0">
                        <div className="md:w-16 md:h-16 w-12 h-12 bg-zinc-900 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 text-2xl flex-shrink-0 z-10 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            <i className="bi bi-calendar2-check"></i>
                        </div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold md:hidden">Passo 3: A Sincronização</h3>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-white/5 flex-1 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-2 hidden md:block">Passo 3: A Sincronização</h3>
                        <h4 className="text-2xl font-black mb-4 text-white">Sua Tela é Atualizada</h4>
                        <p className="text-gray-400 leading-relaxed">O cliente escolhe o horário e... <em>Puf!</em> Aquele
                            espaço é bloqueado e o agendamento aparece magicamente no seu Dashboard.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
