import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingHero from '../../components/PricingHero';
import PricingCards from '../../components/PricingCards';
import EasyWalletDeepDive from '../../components/EasyWalletDeepDive';
import FaqSection from '../../components/FaqSection';

gsap.registerPlugin(ScrollTrigger);

export default function Planos() {
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from("#hero-pricing", { duration: 1.2, y: 40, opacity: 0, ease: "power3.out", delay: 0.1 });

            gsap.from(".reveal-card", {
                scrollTrigger: { trigger: ".grid", start: "top 80%" },
                duration: 1,
                opacity: 0,
                y: 50,
                stagger: 0.2,
                ease: "power4.out",
                clearProps: "all"
            });

            gsap.utils.toArray(".reveal").forEach((elem) => {
                gsap.from(elem, {
                    scrollTrigger: { trigger: elem, start: "top 85%" },
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    ease: "power3.out"
                });
            });

            gsap.from(".reveal-left", {
                scrollTrigger: { trigger: "#easywallet-section", start: "top 80%" },
                duration: 1.2, x: -60, opacity: 0, ease: "power3.out"
            });

            gsap.from(".reveal-right", {
                scrollTrigger: { trigger: "#easywallet-section", start: "top 80%" },
                duration: 1.2, x: 60, opacity: 0, ease: "power3.out", delay: 0.2
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-[#0a0a0a] text-[#f5f5f5] min-h-screen overflow-x-hidden font-['Inter']">
            <Header />
            <main>
                <PricingHero />
                <PricingCards />
                <EasyWalletDeepDive />
                <FaqSection />
            </main>
            <Footer />
        </div>
    );
}
