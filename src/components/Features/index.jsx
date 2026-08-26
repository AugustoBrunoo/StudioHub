import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.utils.toArray(".reveal").forEach((elem) => {
                gsap.from(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                    },
                    duration: 1,
                    y: 40,
                    opacity: 0,
                    ease: "power3.out"
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="funcionalidades" ref={sectionRef} className="py-24 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">A tecnologia a favor do seu tempo</h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">Recursos corporativos simplificados para profissionais que valorizam cada minuto do seu dia.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-card glass p-8 rounded-3xl reveal">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 text-amber-500 border border-amber-500/20">
                        <i className="bi bi-robot text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Bot Inteligente no WhatsApp</h3>
                    <p className="text-gray-400 leading-relaxed">Seu cliente agenda, cancela ou tira dúvidas em segundos diretamente pelo WhatsApp, 24 horas por dia, sem precisar baixar nenhum aplicativo.</p>
                </div>

                <div className="glass-card glass p-8 rounded-3xl reveal">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 text-amber-500 border border-amber-500/20">
                        <i className="bi bi-calendar-range text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Recorrência Flexível</h3>
                    <p className="text-gray-400 leading-relaxed">Trabalha apenas terça e quinta de manhã? Nosso sistema cria padrões diários, semanais, mensais ou anuais instantaneamente para adaptar-se à sua rotina real.</p>
                </div>

                <div className="glass-card glass p-8 rounded-3xl reveal">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 text-amber-500 border border-amber-500/20">
                        <i className="bi bi-grid-1x2 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Multi-Visões em Tempo Real</h3>
                    <p className="text-gray-400 leading-relaxed">Acesse um dashboard completo no computador ou celular. Alterne entre visão diária, semanal ou mensal com um clique para gerenciar seus compromissos.</p>
                </div>
            </div>
        </section>
    );
}
