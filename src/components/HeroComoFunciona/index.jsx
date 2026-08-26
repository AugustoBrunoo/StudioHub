import { Link } from 'react-router-dom';

export default function HeroComoFunciona({ onOpenSimulador }) {
    return (
        <header className="pt-40 pb-20 px-8 flex flex-col items-center text-center relative overflow-hidden">
            {/* Glow de Fundo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto" id="hero-intro">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
                    Trabalhe menos. <br /><span className="gradient-text">Fature muito mais.</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                    O StudioHub substitui sua agenda de papel, sua planilha financeira e as horas perdidas confirmando
                    pacientes no WhatsApp. Tudo rodando <strong>100% no automático</strong>, 24 horas por dia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/planos"
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-8 py-4 rounded-full font-black text-sm hover:scale-105 transition duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] w-full sm:w-auto text-center">
                        CONHECER PLANOS
                    </Link>
                    <button onClick={onOpenSimulador}
                        className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                        <i className="bi bi-play-circle-fill text-amber-500"></i> Ver como funciona
                    </button>
                </div>
            </div>
        </header>
    );
}
