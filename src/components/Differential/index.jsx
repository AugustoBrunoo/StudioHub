import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Differential() {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".reveal-left", {
                scrollTrigger: {
                    trigger: ".reveal-left",
                    start: "top 80%"
                },
                duration: 1.2,
                x: -80,
                opacity: 0,
                ease: "power3.out"
            });

            gsap.from(".reveal-right", {
                scrollTrigger: {
                    trigger: ".reveal-right",
                    start: "top 80%"
                },
                duration: 1.2,
                x: 80,
                opacity: 0,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="diferencial" ref={sectionRef} className="py-32 px-8 bg-gradient-to-b from-transparent to-amber-900/10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 reveal-left">
                    <span className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-4 block">Exclusividade StudioHub</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
                        Mediação de conflitos <span className="gradient-text">automatizada.</span>
                    </h2>
                    <div className="space-y-8">
                        <div className="flex gap-5">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]">1</div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">Choque de Agendas</h4>
                                <p className="text-gray-400 leading-relaxed">Um cliente VIP ou urgência solicita um horário já reservado? O StudioHub entra em ação como seu secretário.</p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]">2</div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">Negociação via IA</h4>
                                <p className="text-gray-400 leading-relaxed">O sistema entra em contato educadamente com o cliente agendado e sugere uma troca em troca de um benefício ou prioridade futura.</p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]">3</div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">Reajuste em Tempo Real</h4>
                                <p className="text-gray-400 leading-relaxed">Troca confirmada? A grade se reorganiza sozinha no Dashboard e todos recebem a confirmação instantânea no WhatsApp.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 w-full relative reveal-right mt-10 lg:mt-0">
                    <div className="glass p-6 md:p-8 rounded-[2.5rem] border border-amber-500/20 relative z-10 shadow-2xl bg-[#0a0a0a]/80 backdrop-blur-xl">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                <i className="bi bi-whatsapp text-green-500 text-xl"></i>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Assistente Virtual da Clínica</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <p className="text-sm font-bold text-white">Online & Otimizando</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 flex flex-col">
                            <div className="bg-white/5 p-5 rounded-3xl rounded-tl-none max-w-[85%] border border-white/5 self-start">
                                <p className="text-sm leading-relaxed text-gray-200">
                                    Olá, Marcos! Tivemos uma emergência clínica que necessita do horário de <span className="text-amber-500 font-bold">Terça às 14h</span>.
                                    Você aceitaria reagendar sua consulta de rotina para Quarta às 10h e ganhar <span className="text-amber-500 font-bold">prioridade máxima</span> no próximo retorno?
                                </p>
                            </div>

                            <div className="bg-amber-500 text-black p-4 rounded-3xl rounded-tr-none max-w-[80%] font-bold shadow-lg self-end">
                                <p className="text-sm">Sem problemas! Pode mudar para a Quarta-feira, fica bom pra mim também.</p>
                            </div>

                            <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none max-w-[85%] border border-white/5 self-start flex items-center gap-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="bi bi-check2 text-black font-black text-sm"></i>
                                </div>
                                <p className="text-sm font-medium text-gray-200">Perfeito! Sua consulta foi remarcada e sua prioridade futura está salva no sistema. Agradecemos a compreensão!</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/10 rounded-full blur-[80px] -z-0"></div>
                </div>
            </div>
        </section>
    );
}
