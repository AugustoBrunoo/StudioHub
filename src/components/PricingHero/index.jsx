export default function PricingHero() {
    return (
        <header className="pt-40 pb-16 px-8 flex flex-col items-center text-center relative z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -z-10 pointer-events-none">
            </div>
            <div id="hero-pricing" className="relative z-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
                    O sistema operacional do seu <span className="gradient-text">negócio.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                    Muito mais que uma agenda. Automatize marcações, reduza faltas, faça a gestão financeira e escale seu
                    faturamento.
                </p>
            </div>
        </header>
    );
}
