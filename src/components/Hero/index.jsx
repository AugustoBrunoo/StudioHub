import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ContainerHero } from '../ContainerHero';
import { DesignYellowBlockHero } from '../DesignYellowBlockHero';
import { InitialTextHero } from '../InitialTextHero';
import { SecondaryTextHero } from '../SecondaryTextHero';
import { ContainerButtonsHero } from '../ContainerButtonsHero';

const Hero = () => {
    const heroContentRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {

            gsap.from("h1", {
                duration: 1.2,
                y: 50,
                opacity: 0,
                ease: "power4.out",
                delay: 0.2
            });

            gsap.from("p", {
                duration: 1.2,
                opacity: 0,
                delay: 0.5,
                ease: "power3.out"
            });

            
            gsap.from(".btn-container", {
                duration: 1,
                y: 20,
                opacity: 0,
                delay: 0.8,
                ease: "back.out(1.7)"
            });

        }, heroContentRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
            <ContainerHero ref={heroContentRef}>
                <DesignYellowBlockHero />
                <InitialTextHero />
                <SecondaryTextHero />
                <ContainerButtonsHero />
            </ContainerHero>
        </section>
    );
};

export default Hero;