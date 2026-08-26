import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SimuladorModal from '../../components/SimuladorModal';
import HeroComoFunciona from '../../components/HeroComoFunciona';
import Divider from '../../components/Divider';
import Jornada from '../../components/Jornada';
import PlanosDetalhes from '../../components/PlanosDetalhes';

gsap.registerPlugin(ScrollTrigger);

export default function ComoFunciona() {
    const [activeTab, setActiveTab] = useState('solo');
    const [isSimOpen, setIsSimOpen] = useState(false);
    const mainRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from("#hero-intro", { duration: 1.2, y: 30, opacity: 0, ease: "power4.out" });
            gsap.to("#divider", { duration: 1, opacity: 1, delay: 0.8, ease: "power2.out" });
            
            gsap.utils.toArray('.reveal-up').forEach(element => {
                gsap.from(element, { 
                    scrollTrigger: { trigger: element, start: "top 85%" }, 
                    y: 40, 
                    opacity: 0, 
                    duration: 1, 
                    ease: "power3.out" 
                });
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const handleTabChange = (tab) => {
        if (tab === activeTab) return;
        setActiveTab(tab);
    };

    return (
        <div ref={mainRef} className="bg-[#0a0a0a] text-[#f5f5f5] font-['Inter'] overflow-x-hidden min-h-screen flex flex-col relative">
            <Header />

            <HeroComoFunciona onOpenSimulador={() => setIsSimOpen(true)} />
            <Divider />
            <Jornada />
            <PlanosDetalhes activeTab={activeTab} handleTabChange={handleTabChange} />

            <SimuladorModal isOpen={isSimOpen} onClose={() => setIsSimOpen(false)} />
            
            <Footer />

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
