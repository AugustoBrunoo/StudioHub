import { Link } from 'react-router-dom';

export function LandingCta() {
  return (
    <section className="panel py-28 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/[.06] to-transparent" />
      <div className="max-w-3xl mx-auto rv relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Pronto para ter o controle do seu tempo?
        </h2>
        <p className="text-gray-400 mb-10 text-lg">
          Junte-se a profissionais de alta performance que já automatizaram suas agendas e foque
          apenas no que você faz de melhor.
        </p>
        <Link
          to="/cadastro"
          className="btn mag btn-gold px-12 py-5 rounded-full text-lg inline-block"
        >
          Criar minha conta agora
        </Link>
      </div>
    </section>
  );
}
