import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Faq() {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
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

    const handleFaqClick = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <section id="faq" ref={sectionRef} className="py-24 px-8 max-w-4xl mx-auto border-t border-white/5">
            <div className="text-center mb-16 reveal">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Dúvidas Frequentes</h2>
                <p className="text-gray-500">Transparência total sobre o funcionamento da plataforma.</p>
            </div>

            <div className="space-y-4 reveal">
                {[
                    {
                        q: "Meu número do WhatsApp pode ser banido?",
                        a: "O risco é extremamente baixo. Nosso bot atua de forma \"passiva\", ou seja, ele apenas responde quem entra em contato primeiro querendo agendar. Ele não envia spam ou mensagens em massa. De qualquer forma, recomendamos sempre ter um chip/número exclusivo para o seu negócio para melhor organização."
                    },
                    {
                        q: "O robô vai responder minha família e amigos?",
                        a: "Não se preocupe! Você pode configurar o sistema para ser ativado apenas com uma palavra-chave (ex: \"Agendar\") ou para ignorar contatos que já estão salvos na agenda do seu celular. Assim, conversas pessoais continuam pessoais."
                    },
                    {
                        q: "Preciso ter um CNPJ para conectar o WhatsApp?",
                        a: "Não. Diferente de plataformas burocráticas, nós usamos a tecnologia de espelhamento via QR Code. Basta assinar a plataforma, ler o código na tela do computador com o seu celular e o sistema já começa a funcionar instantaneamente."
                    },
                    {
                        q: "O cliente precisa baixar algum aplicativo?",
                        a: "Zero aplicativos novos. O seu paciente ou cliente fará todo o processo de agendamento de forma fluida pelo próprio aplicativo do WhatsApp que ele já usa todos os dias."
                    }
                ].map((faq, idx) => (
                    <div key={idx} className={`faq-item glass rounded-2xl border border-white/5 overflow-hidden ${openFaqIndex === idx ? 'active' : ''}`}>
                        <button
                            className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                            onClick={() => handleFaqClick(idx)}
                        >
                            <span className="font-bold text-lg">{faq.q}</span>
                            <i className="bi bi-plus-lg text-amber-500 text-xl transition-transform duration-300 faq-icon"></i>
                        </button>
                        <div className="faq-answer px-6 text-gray-400 text-sm leading-relaxed">
                            {faq.a}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
