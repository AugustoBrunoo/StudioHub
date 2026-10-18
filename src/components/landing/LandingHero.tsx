import { Link } from 'react-router-dom';

export function LandingHero() {
  return (
    <header className="min-h-0 md:min-h-screen flex flex-col justify-start md:justify-center items-center text-center px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-14 sm:pb-20 md:pb-16 relative">
      <div id="hero" className="flex flex-col items-center max-w-5xl w-full mt-2 sm:mt-4 md:mt-0">
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-extrabold tracking-[-0.035em] sm:tracking-[-0.045em] leading-[1.15] sm:leading-[1.02] mb-4 sm:mb-6 md:mb-8">
          <span className="line">
            <span>Sua agenda no</span>
          </span>
          <span className="line">
            <span className="gt">piloto automático.</span>
          </span>
        </h1>
        <p className="hp max-w-2xl text-white text-sm sm:text-base md:text-xl leading-relaxed mb-6 sm:mb-8 md:mb-12 px-2">
          A gestão de agenda mais inteligente para Estúdios de Beleza. Unimos a
          facilidade do WhatsApp a um sistema exclusivo que organiza, remarca e otimiza seu tempo
          sem que você mova um dedo.
        </p>
        <div className="hp flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full max-w-sm sm:max-w-lg">
          <Link
            to="/precos"
            className="btn btn-gold px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg w-full sm:w-auto whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg text-center"
          >
            Ver Planos
          </Link>
          <a
            href="#"
            className="btn glass px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg w-full sm:w-auto whitespace-nowrap hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
          >
            Ver Demonstração
          </a>
        </div>
      </div>
      <div
        className="absolute bottom-2 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-px h-7 sm:h-10 md:h-14 bg-gradient-to-b from-[#d4af37] to-transparent opacity-60"
        id="cue"
      />
    </header>
  );
}
