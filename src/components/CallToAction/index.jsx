import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
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
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/5 -z-10"></div>
            <div className="max-w-3xl mx-auto reveal">
                <h2 className="text-4xl md:text-5xl font-black mb-6">Pronto para ter o controle do seu tempo?</h2>
                <p className="text-gray-400 mb-10 text-lg">Junte-se a profissionais de alta performance que já automatizaram suas agendas e foque apenas no que você faz de melhor.</p>
                <Link to="/planos" className="glow-button inline-block bg-amber-500 text-black px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                    Criar minha conta agora
                </Link>
            </div>
        </section>
    );
}
