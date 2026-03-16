import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BiLogoWhatsapp, BiCheck } from "react-icons/bi";
import { PriorityStep } from '../PriorityStep';
import { ChatMessage } from '../ChatMessage';

gsap.registerPlugin(ScrollTrigger);

const PrioritySystem = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".reveal-left", {
                scrollTrigger: { trigger: ".reveal-left", start: "top 80%" },
                duration: 1.2, x: -100, opacity: 0, ease: "power3.out"
            });

            gsap.from(".reveal-right", {
                scrollTrigger: { trigger: ".reveal-right", start: "top 80%" },
                duration: 1.2, x: 100, opacity: 0, ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (

        <section ref={containerRef} id="prioridade" className="py-24 px-8 bg-gradient-to-b from-transparent to-amber-900/10 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

                {/* LADO ESQUERDO */}
                <div className="md:w-1/2 reveal-left">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                        O Grande <span className="gradient-text">Diferencial.</span>
                    </h2>

                    <div className="space-y-8">
                        <PriorityStep
                            number="1"
                            title="Conflito Amigável"
                            description="Um cliente solicita um horário já ocupado? O StudioHub entra em ação como mediador inteligente."
                        />
                        <PriorityStep
                            number="2"
                            title="Mediação n8n"
                            description="Nossa automação pergunta ao cliente agendado se ele aceita trocar por um benefício ou novo horário."
                        />
                        <PriorityStep
                            number="3"
                            title="Reajuste em Tempo Real"
                            description="Troca confirmada? A agenda se atualiza sozinha no Dashboard e ambos são avisados no WhatsApp."
                        />
                    </div>
                </div>

                {/* LADO DIREITO */}
                <div className="md:w-1/2 relative">
                    
                    <div className="reveal-right">
                        <div className="glass p-8 rounded-[2.5rem] border border-amber-500/20 relative z-10 shadow-2xl">

                            {/* HEADER DO WHATSAPP */}
                            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xl">
                                    <BiLogoWhatsapp />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Atendimento StudioHub</p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <p className="text-sm font-bold text-green-500">Inteligência Ativa</p>
                                    </div>
                                </div>
                            </div>

                            {/* MENSAGENS */}
                            <div className="space-y-6">
                                <ChatMessage variant="received">
                                    <p>Olá, Marcos! Outro cliente solicitou seu horário de <span className="text-amber-500 font-bold">Terça às 14h</span>. Você aceitaria trocar por Quarta às 10h e ganhar um <span className="text-amber-500 font-bold">bônus de 15%</span> no próximo corte?</p>
                                </ChatMessage>

                                <ChatMessage variant="sent">
                                    <p>Com certeza! Pode mudar, o novo horário é até melhor pra mim.</p>
                                </ChatMessage>

                                <ChatMessage variant="received" icon={<BiCheck className="text-white" />}>
                                    <p className="font-medium">Perfeito! Agenda atualizada com sucesso. ✂️</p>
                                </ChatMessage>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] -z-0 pointer-events-none"></div>
                </div>
            </div>
        </section>
    ); 
};

export default PrioritySystem;