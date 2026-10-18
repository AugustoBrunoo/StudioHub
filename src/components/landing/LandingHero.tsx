import { Link } from 'react-router-dom';

export function LandingHero() {
  return (
    <header className="min-h-screen flex flex-col justify-center items-center text-center px-5 relative">
      <div id="hero" className="flex flex-col items-center max-w-5xl">
        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-extrabold tracking-[-0.045em] leading-[1.02] mb-8">
          <span className="line">
            <span>Sua agenda no</span>
          </span>
          <span className="line">
            <span className="gt">piloto automático.</span>
          </span>
        </h1>
        <p className="hp max-w-2xl text-gray-300/90 text-lg md:text-xl leading-relaxed mb-12">
          A gestão de agenda mais inteligente para médicos, clínicas e empresários. Unimos a
          facilidade do WhatsApp a um sistema exclusivo que organiza, remarca e otimiza seu tempo
          sem que você mova um dedo.
        </p>
        <div className="hp flex flex-col md:flex-row gap-4 items-center w-full max-w-lg">
          <Link
            to="/cadastro"
            className="btn mag btn-gold px-10 py-4 rounded-xl text-lg w-full md:w-auto whitespace-nowrap"
          >
            Começar Agora
          </Link>
          <Link
            to="/dashboard"
            className="btn mag glass px-10 py-4 rounded-xl text-lg w-full md:w-auto whitespace-nowrap hover:bg-white/10"
          >
            Ver Demonstração
          </Link>
        </div>
      </div>
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-14 bg-gradient-to-b from-[#d4af37] to-transparent opacity-60"
        id="cue"
      />
    </header>
  );
}
