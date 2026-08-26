import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Hero() {
    const heroH1Ref = useRef(null);
    const heroPRef = useRef(null);
    const heroButtonsRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(heroH1Ref.current, {
                duration: 1.2,
                y: 40,
                opacity: 0,
                ease: "power4.out",
                delay: 0.2
            });

            gsap.from(heroPRef.current, {
                duration: 1.2,
                y: 20,
                opacity: 0,
                delay: 0.4,
                ease: "power3.out"
            });

            gsap.from(heroButtonsRef.current, {
                duration: 1,
                y: 20,
                opacity: 0,
                delay: 0.6,
                ease: "back.out(1.5)"
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-5 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div id="hero-content" className="w-full flex flex-col items-center z-10">
                <h1 ref={heroH1Ref} className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
                    Sua agenda no<br />
                    <span className="gradient-text">piloto automático.</span>
                </h1>
                <p ref={heroPRef} className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
                    A gestão de agenda mais inteligente para médicos, clínicas e empresários. Unimos a facilidade do WhatsApp a um sistema exclusivo que organiza, remarca e otimiza seu tempo sem que você mova um dedo.
                </p>
                <div ref={heroButtonsRef} className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-lg mx-auto">
                    <Link to="/comecar" className="glow-button bg-amber-500 text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform w-full md:w-auto whitespace-nowrap">
                        Começar Agora
                    </Link>
                    <a href="#demonstracao" className="glass px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition w-full md:w-auto whitespace-nowrap">
                        Ver Demonstração
                    </a>
                </div>
            </div>
        </section>
    );
}
