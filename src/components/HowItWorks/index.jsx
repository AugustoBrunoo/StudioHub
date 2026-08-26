import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
    const stepsContainerRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".reveal", {
                scrollTrigger: {
                    trigger: ".reveal",
                    start: "top 85%",
                },
                duration: 1,
                y: 40,
                opacity: 0,
                ease: "power3.out"
            });

            gsap.from(".step-card", {
                scrollTrigger: {
                    trigger: stepsContainerRef.current,
                    start: "top 85%",
                },
                duration: 1,
                y: 40,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="como-funciona" ref={sectionRef} className="py-24 px-8 bg-black/50 border-y border-white/5 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Adeus burocracia.<br /> <span className="gradient-text">Conecte em 10 segundos.</span></h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Esqueça configurações difíceis com o Facebook. Nossa plataforma usa o modelo de &quot;Aparelho Conectado&quot; para rodar instantaneamente.</p>
                </div>

                <div id="steps-container" ref={stepsContainerRef} className="grid md:grid-cols-3 gap-12 text-center relative z-10">
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent -z-10"></div>

                    <div className="step-card flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.15)] border-amber-500/30">
                            <i className="bi bi-qr-code-scan text-4xl text-amber-500"></i>
                        </div>
                        <h4 className="text-xl font-bold mb-2">1. Escaneie o QR Code</h4>
                        <p className="text-gray-400 text-sm">Acesse nosso painel e aponte o WhatsApp do seu negócio para o QR Code na tela. Simples assim.</p>
                    </div>

                    <div className="step-card flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.15)] border-amber-500/30">
                            <i className="bi bi-chat-dots text-4xl text-amber-500"></i>
                        </div>
                        <h4 className="text-xl font-bold mb-2">2. O Cliente chama</h4>
                        <p className="text-gray-400 text-sm">O paciente/cliente manda um &quot;Oi&quot; ou uma palavra-chave e o nosso assistente assume o atendimento.</p>
                    </div>

                    <div className="step-card flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.15)] border-amber-500/30">
                            <i className="bi bi-calendar-check text-4xl text-amber-500"></i>
                        </div>
                        <h4 className="text-xl font-bold mb-2">3. Agenda Sincronizada</h4>
                        <p className="text-gray-400 text-sm">O horário é reservado na hora e aparece desenhado no seu calendário online sem conflitos.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
