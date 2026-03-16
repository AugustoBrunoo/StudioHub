import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BiBot, BiCalendarCheck, BiBarChartAlt2 } from "react-icons/bi"; // Ícones equivalentes
import { ContainerFeatures } from '../ContainerFeatures';
import { TextInitialFeatures } from '../TextInitialFeatures';
import { ContainerCardFeatures } from '../ContainerCardFeatures';
import { CardFeatures } from '../CardFeatures';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const containerRef = useRef();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.utils.toArray(".reveal").forEach((elem) => {
                gsap.from(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 90%"
                    },
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    ease: "power3.out",
                    onComplete: () => {
                        elem.classList.add("transition-all", "duration-300");
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        
        <ContainerFeatures ref={containerRef} id="funcionalidades" className="py-24 px-8 max-w-7xl mx-auto">
            <TextInitialFeatures />
            <ContainerCardFeatures>

                <CardFeatures
                    text="Bot de WhatsApp"
                    description="Fluxo automático de marcação. Seu cliente agenda em segundos sem você precisar tocar no celular."
                    icon={<BiBot />}
                />

                <CardFeatures
                    text="Ciclo Semanal"
                    description="Ciclos semanais que se adaptam à sua rotina. Defina o momento exato para abrir novos horários."
                    icon={<BiCalendarCheck />}
                />

                <CardFeatures
                    text="Dashboard Real-Time"
                    description="Web App completo para gerenciar a grade, cancelar ou ajustar horários com um clique."
                    icon={<BiBarChartAlt2 />}
                />

            </ContainerCardFeatures>
        </ContainerFeatures>
    );
};

export default Features;