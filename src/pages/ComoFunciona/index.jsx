import { useState, useEffect, useRef } from 'react';

import './comoFunciona.css';
import { HeroComoFunciona } from '../../components/HeroComoFunciona';
import { PilaresComoFunciona } from '../../components/PilaresComoFunciona';
import { ContainerParceriaCF } from '../../components/ContainerParceriaCF';

export default function App() {
    const [barsVisible, setBarsVisible] = useState(false);
    const mainRef = useRef(null);

    // Inicialização do GSAP e animações
    useEffect(() => {
        let isCleanedUp = false;
        let ctx;

        const initAnimations = () => {
            if (isCleanedUp) return;

            const gsap = window.gsap;
            const ScrollTrigger = window.ScrollTrigger;

            if (!gsap || !ScrollTrigger) return;

            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                
                gsap.from("#hero-sys", { duration: 1.2, y: 50, opacity: 0, ease: "power4.out" });

                gsap.fromTo(".pillar-card",
                    {
                        opacity: 0,
                        y: 40
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: "#ecossistema",
                            start: "top 70%"
                        }
                    }
                );

                // Animação da seção EasyWallet
                gsap.from("#easywallet .reveal-left", {
                    scrollTrigger: { trigger: "#easywallet", start: "top 70%" },
                    duration: 1, x: -50, opacity: 0
                });

                gsap.from("#easywallet .reveal-right", {
                    scrollTrigger: { trigger: "#easywallet", start: "top 70%" },
                    duration: 1, x: 50, opacity: 0,
                    onComplete: () => {
                        // Dispara a animação das barras usando o state do React
                        setBarsVisible(true);
                    }
                });

                // Animação da seção Engenharia
                gsap.from("#engenharia .reveal-left", {
                    scrollTrigger: { trigger: "#engenharia", start: "top 70%" },
                    duration: 1, x: -50, opacity: 0
                });

                gsap.from("#engenharia .reveal-right", {
                    scrollTrigger: { trigger: "#engenharia", start: "top 70%" },
                    duration: 1, x: 50, opacity: 0
                });
            }, mainRef);
        };

        const loadScripts = async () => {
            // Injeta os scripts do GSAP dinamicamente se não existirem
            if (!window.gsap) {
                await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }
            if (!window.ScrollTrigger) {
                await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }
            initAnimations();
        };

        loadScripts();

        return () => {
            isCleanedUp = true;
            if (ctx) ctx.revert(); // Reverte todas as animações caso o componente seja desmontado
        };
    }, []);

    return (
        <div className="font-sans bg-[#0a0a0a] text-[#f5f5f5]" ref={mainRef}>

            <HeroComoFunciona />

            {/* Os 3 Pilares Principais */}
            <PilaresComoFunciona />

            {/* INTEGRAÇÃO EASYWALLET */}
            <ContainerParceriaCF barsVisible={barsVisible}/>

            {/* Engenharia */}
            <section id="engenharia" className="py-24 px-8 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal-left">
                            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight text-white">
                                A Engenharia por<br /><span className="gradient-text">trás da Magia.</span>
                            </h2>
                            <p className="text-gray-400 mb-10 text-lg">Um triunfo da integração de sistemas modernos projetado para escala e performance.</p>

                            <ul className="space-y-6 p-0 m-0 list-none">
                                <li className="flex gap-4 p-6 glass rounded-2xl border border-white/5">
                                    <div className="text-amber-500 font-bold">01</div>
                                    <div>
                                        <h5 className="font-bold text-white mb-1">Orquestração de Fluxos</h5>
                                        <p className="text-sm text-gray-400">Implementado com n8n para garantir escalabilidade e lógica condicional avançada.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-6 glass rounded-2xl border border-white/5">
                                    <div className="text-amber-500 font-bold">02</div>
                                    <div>
                                        <h5 className="font-bold text-white mb-1">Frontend de Alta Resposta</h5>
                                        <p className="text-sm text-gray-400">Construído com React, focado em UX (User Experience) e carregamento instantâneo.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-6 glass rounded-2xl border border-white/5">
                                    <div className="text-amber-500 font-bold">03</div>
                                    <div>
                                        <h5 className="font-bold text-white mb-1">Interoperabilidade de APIs</h5>
                                        <p className="text-sm text-gray-400">Comunicação fluida via Webhooks e REST APIs em milissegundos.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4 reveal-right">
                            <div className="p-8 glass rounded-[2rem] border border-amber-500/10 flex flex-col justify-center items-center text-center">
                                <span className="text-4xl font-black gradient-text mb-2">24/7</span>
                                <p className="text-xs uppercase font-bold tracking-widest text-gray-500 m-0">Disponibilidade</p>
                            </div>
                            <div className="p-8 glass rounded-[2rem] border border-white/10 mt-8 flex flex-col justify-center items-center text-center">
                                <span className="text-4xl font-black text-white mb-2">ZERO</span>
                                <p className="text-xs uppercase font-bold tracking-widest text-gray-500 m-0">Fricção</p>
                            </div>
                            <div className="p-8 glass rounded-[2rem] border border-white/10 flex flex-col justify-center items-center text-center">
                                <span className="text-4xl font-black text-white mb-2">100%</span>
                                <p className="text-xs uppercase font-bold tracking-widest text-gray-500 m-0">Sincronizado</p>
                            </div>
                            <div className="p-8 glass rounded-[2rem] border border-amber-500/10 mt-8 flex flex-col justify-center items-center text-center">
                                <span className="text-4xl font-black gradient-text mb-2">+VALOR</span>
                                <p className="text-xs uppercase font-bold tracking-widest text-gray-500 m-0">Percebido</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}