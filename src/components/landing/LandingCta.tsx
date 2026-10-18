import { Link } from 'react-router-dom';

export function LandingCta() {
  return (
    <section className="panel py-16 sm:py-24 lg:py-28 px-4 sm:px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/[.06] to-transparent pointer-events-none" />
      <div className="max-w-3xl mx-auto rv relative">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white leading-tight">
          Pronto para ter o controle do seu tempo?
        </h2>
        <p className="text-gray-400 mb-8 sm:mb-10 text-sm sm:text-lg max-w-xl mx-auto">
          Junte-se a profissionais de alta performance que já automatizaram suas agendas e foque
          apenas no que você faz de melhor.
        </p>
        <Link
          to="/cadastro"
          className="btn btn-gold px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg w-full sm:w-auto inline-block hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-xl text-center"
        >
          Criar minha conta agora
        </Link>
      </div>
    </section>
  );
}
