import { GradientText } from '@/components/common/GradientText';

export function PricingHero() {
  return (
    <header className="pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 flex flex-col items-center text-center w-full">
      <div id="hero" className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 sm:mb-7 leading-[1.08] tracking-[-0.03em] sm:tracking-[-0.04em] px-2">
          <span className="hl block">O sistema operacional do</span>
          <span className="hl block">
            <GradientText
              colors={['#d4af37', '#f1c40f', '#fff1b8']}
              speed={6}
              glow={0.45}
            >
              seu negócio.
            </GradientText>
          </span>
        </h1>
        <p className="hp max-w-2xl mx-auto text-gray-300/90 text-sm sm:text-lg md:text-xl leading-relaxed px-2">
          Muito mais que uma agenda. Automatize marcações, reduza faltas, faça a gestão financeira e escale seu faturamento.
        </p>
        <div className="rule max-w-xs mx-auto mt-8 sm:mt-12 hp" />
      </div>
    </header>
  );
}
