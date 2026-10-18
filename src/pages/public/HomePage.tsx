import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GrainientBackground } from '@/components/landing/GrainientBackground';
import { StudioHubLogo, LandingIcon } from '@/components/landing/LandingIcons';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Toggle mobile menu and lock body scroll
  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : 'auto';
      return next;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nav = document.getElementById('nav');
      const prog = document.getElementById('prog');

      // Scroll progress & Navbar glass transformation
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (s) => {
          if (prog) {
            prog.style.transform = `scaleX(${s.progress})`;
          }
          if (nav) {
            const on = window.scrollY > 40;
            nav.style.background = on ? 'rgba(10,10,10,.65)' : 'transparent';
            nav.style.backdropFilter = on ? 'blur(16px)' : 'none';
            nav.style.borderBottom = on
              ? '1px solid rgba(255,255,255,.06)'
              : '1px solid transparent';
          }
        },
      });

      // Hero entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if (nav) {
        tl.from(nav, { y: -60, opacity: 0, duration: 1.1 });
      }
      tl.from(
        '#hero h1 .line > span',
        { yPercent: 110, duration: 1.4, stagger: 0.15 },
        0.2
      )
        .from('.hp', { y: 24, opacity: 0, duration: 1.1, stagger: 0.15 }, 0.7)
        .from('#cue', { scaleY: 0, transformOrigin: 'top', duration: 1 }, 1.2);

      // Hero scroll scrub
      gsap.to('#hero', {
        yPercent: -12,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: 'header',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Section scroll reveals
      gsap.utils.toArray<HTMLElement>('.rv').forEach((e) => {
        gsap.from(e, {
          scrollTrigger: { trigger: e, start: 'top 88%' },
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
        });
      });

      gsap.from('.rl', {
        scrollTrigger: { trigger: '.rl', start: 'top 80%' },
        x: -70,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.out',
      });

      gsap.from('.rr', {
        scrollTrigger: { trigger: '.rr', start: 'top 80%' },
        x: 70,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.out',
      });

      gsap.from('.st', {
        scrollTrigger: { trigger: '#steps', start: 'top 85%' },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.22,
        ease: 'power3.out',
      });

      gsap.from('#rail', {
        scrollTrigger: { trigger: '#steps', start: 'top 85%' },
        scaleX: 0,
        duration: 1.8,
        ease: 'power3.inOut',
      });

      gsap.from('.msg', {
        scrollTrigger: { trigger: '#chat', start: 'top 80%' },
        y: 24,
        scale: 0.94,
        opacity: 0,
        duration: 0.7,
        stagger: 0.9,
        delay: 0.6,
        ease: 'back.out(1.4)',
      });

      // Card Spotlight pointermove effect
      const cards = document.querySelectorAll<HTMLElement>('.card');
      const handlePointerMove = (e: PointerEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        target.style.setProperty('--my', `${e.clientY - rect.top}px`);
      };

      cards.forEach((c) => {
        c.addEventListener('pointermove', handlePointerMove);
      });

      // Magnetic Buttons effect
      if (window.matchMedia('(hover:hover)').matches) {
        const magnets = document.querySelectorAll<HTMLElement>('.mag');
        magnets.forEach((el) => {
          const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
          const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

          const onMove = (e: PointerEvent) => {
            const b = el.getBoundingClientRect();
            xTo((e.clientX - b.left - b.width / 2) * 0.25);
            yTo((e.clientY - b.top - b.height / 2) * 0.35);
          };

          const onLeave = () => {
            xTo(0);
            yTo(0);
          };

          el.addEventListener('pointermove', onMove);
          el.addEventListener('pointerleave', onLeave);
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = 'auto';
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#f5f5f5]">
      {/* WebGL2 Grainient Shader Background, Veil & Scroll Progress Bar */}
      <GrainientBackground />

      {/* Navigation Header */}
      <nav
        id="nav"
        className="fixed top-0 inset-x-0 z-[100] px-6 lg:px-10 py-4 flex justify-between items-center transition-all duration-500"
        style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top,0px))' }}
      >
        <Link to="/" className="flex items-center gap-3">
          <span className="logo-box">
            <StudioHubLogo id="nav-logo" />
          </span>
          <span className="text-xl font-extrabold tracking-tighter">
            STUDIO<span className="gt">HUB</span>
          </span>
        </Link>

        <div className="hidden lg:flex gap-10 text-[11px] font-semibold uppercase tracking-[.22em] text-gray-400">
          <a href="#como-funciona" className="hover:text-white transition">
            Como funciona?
          </a>
          <a href="#diferencial" className="hover:text-white transition">
            Suporte
          </a>
          <Link to="/sobre" className="hover:text-white transition">
            Equipe
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/login"
              className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition"
            >
              Entrar
            </Link>
            <Link
              to="/planos"
              className="btn mag bg-white text-black px-6 py-2.5 rounded-full text-xs hover:bg-[#f1c40f]"
            >
              VER PLANOS
            </Link>
          </div>

          <button
            id="mt"
            onClick={toggleMenu}
            className="lg:hidden flex flex-col gap-1.5 z-[110]"
            aria-label="Menu"
          >
            <span
              className="w-6 h-0.5 bg-white transition-all duration-300"
              style={{
                transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="w-6 h-0.5 bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="w-6 h-0.5 bg-white transition-all duration-300"
              style={{
                transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        id="menu"
        className={`fixed inset-0 bg-black/95 z-[90] lg:hidden flex flex-col items-center justify-center text-center p-8 ${
          menuOpen ? 'on' : ''
        }`}
      >
        <div className="flex flex-col gap-8 text-xl font-semibold uppercase tracking-widest">
          <a href="#como-funciona" onClick={closeMenu} className="ml">
            Como Funciona
          </a>
          <a href="#diferencial" onClick={closeMenu} className="ml">
            Diferenciais
          </a>
          <a href="#faq" onClick={closeMenu} className="ml">
            Dúvidas Frequentes
          </a>
          <hr className="border-white/10 w-full my-2" />
          <Link to="/login" onClick={closeMenu} className="ml text-[#d4af37]">
            Entrar
          </Link>
          <Link
            to="/planos"
            onClick={closeMenu}
            className="btn btn-gold px-8 py-4 rounded-full text-sm"
          >
            VER PLANOS
          </Link>
        </div>
      </div>

      {/* Hero Section */}
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
            facilidade do WhatsApp a um sistema exclusivo que organiza, remarca e otimiza seu
            tempo sem que você mova um dedo.
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

      {/* Funcionalidades */}
      <section id="funcionalidades" className="panel py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 rv">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
              A tecnologia a favor do seu tempo
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Recursos corporativos simplificados para profissionais que valorizam cada minuto do
              seu dia.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card glass p-9 rounded-3xl rv">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-7 text-[#d4af37] border border-[#d4af37]/25 bg-[#d4af37]/10 text-2xl">
                <LandingIcon name="bot" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bot Inteligente no WhatsApp</h3>
              <p className="text-gray-400 leading-relaxed">
                Seu cliente agenda, cancela ou tira dúvidas em segundos diretamente pelo WhatsApp, 24
                horas por dia, sem precisar baixar nenhum aplicativo.
              </p>
            </div>

            <div className="card glass p-9 rounded-3xl rv">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-7 text-[#d4af37] border border-[#d4af37]/25 bg-[#d4af37]/10 text-2xl">
                <LandingIcon name="cal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recorrência Flexível</h3>
              <p className="text-gray-400 leading-relaxed">
                Trabalha apenas terça e quinta de manhã? Nosso sistema cria padrões diários, semanais,
                mensais ou anuais instantaneamente para adaptar-se à sua rotina real.
              </p>
            </div>

            <div className="card glass p-9 rounded-3xl rv">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-7 text-[#d4af37] border border-[#d4af37]/25 bg-[#d4af37]/10 text-2xl">
                <LandingIcon name="grid" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Visões em Tempo Real</h3>
              <p className="text-gray-400 leading-relaxed">
                Acesse um dashboard completo no computador ou celular. Alterne entre visão diária,
                semanal ou mensal com um clique para gerenciar seus compromissos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="panel py-28 px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 rv">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
              Adeus burocracia.
              <br />
              <span className="gt">Conecte em 10 segundos.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Esqueça configurações difíceis com o Facebook. Nossa plataforma usa o modelo de
              &quot;Aparelho Conectado&quot; para rodar instantaneamente.
            </p>
          </div>
          <div id="steps" className="grid md:grid-cols-3 gap-12 text-center relative">
            <div
              id="rail"
              className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent origin-left"
            />
            <div className="st flex flex-col items-center">
              <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-7 text-4xl text-[#d4af37] border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,.15)] bg-[#0a0a0a]">
                <LandingIcon name="qr" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Escaneie o QR Code</h4>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Acesse nosso painel e aponte o WhatsApp do seu negócio para o QR Code na tela. Simples
                assim.
              </p>
            </div>
            <div className="st flex flex-col items-center">
              <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-7 text-4xl text-[#d4af37] border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,.15)] bg-[#0a0a0a]">
                <LandingIcon name="chat" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. O Cliente chama</h4>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                O paciente/cliente manda um &quot;Oi&quot; ou uma palavra-chave e o nosso assistente assume
                o atendimento.
              </p>
            </div>
            <div className="st flex flex-col items-center">
              <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-7 text-4xl text-[#d4af37] border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,.15)] bg-[#0a0a0a]">
                <LandingIcon name="calc" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Agenda Sincronizada</h4>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                O horário é reservado na hora e aparece desenhado no seu calendário online sem conflitos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferencial */}
      <section id="diferencial" className="panel py-32 px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 rl">
            <span className="eyebrow mb-5 block">Exclusividade StudioHub</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-10 leading-[1.08]">
              Mediação de conflitos <span className="gt">automatizada.</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full btn-gold flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Choque de Agendas</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Um cliente VIP ou urgência solicita um horário já reservado? O StudioHub entra em
                    ação como seu secretário.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full btn-gold flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Negociação via IA</h4>
                  <p className="text-gray-400 leading-relaxed">
                    O sistema entra em contato educadamente com o cliente agendado e sugere uma troca em
                    troca de um benefício ou prioridade futura.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full btn-gold flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Reajuste em Tempo Real</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Troca confirmada? A grade se reorganiza sozinha no Dashboard e todos recebem a
                    confirmação instantânea no WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full relative rr">
            <div className="absolute inset-0 m-auto w-[110%] h-[110%] -left-[5%] -top-[5%] bg-[#d4af37]/10 rounded-full blur-[90px]" />
            <div className="glass relative p-6 md:p-8 rounded-[2.5rem] border-[#d4af37]/20 shadow-2xl bg-[#0a0a0a]/80">
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center text-green-500 text-xl">
                  <LandingIcon name="chat" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                    Assistente Virtual da Clínica
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-sm font-semibold">Online &amp; Otimizando</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 flex flex-col" id="chat">
                <div className="msg bg-white/5 p-5 rounded-3xl rounded-tl-none max-w-[85%] border border-white/5 self-start">
                  <p className="text-sm leading-relaxed text-gray-200">
                    Olá, Marcos! Tivemos uma emergência clínica que necessita do horário de{' '}
                    <b className="text-[#d4af37]">Terça às 14h</b>. Você aceitaria reagendar sua
                    consulta de rotina para Quarta às 10h e ganhar{' '}
                    <b className="text-[#d4af37]">prioridade máxima</b> no próximo retorno?
                  </p>
                </div>
                <div className="msg btn-gold p-4 rounded-3xl rounded-tr-none max-w-[80%] font-semibold self-end">
                  <p className="text-sm">
                    Sem problemas! Pode mudar para a Quarta-feira, fica bom pra mim também.
                  </p>
                </div>
                <div className="msg bg-white/5 p-4 rounded-3xl rounded-tl-none max-w-[85%] border border-white/5 self-start flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0 text-black text-sm">
                    <LandingIcon name="ok" style={{ strokeWidth: 3 }} />
                  </div>
                  <p className="text-sm font-medium text-gray-200">
                    Perfeito! Sua consulta foi remarcada e sua prioridade futura está salva no sistema.
                    Agradecemos a compreensão!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dúvidas Frequentes (FAQ) */}
      <section id="faq" className="panel py-28 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14 rv">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-gray-400">Transparência total sobre o funcionamento da plataforma.</p>
          </div>

          <div className="space-y-4 rv" id="faqs">
            {[
              {
                q: 'Meu número do WhatsApp pode ser banido?',
                a: 'O risco é extremamente baixo. Nosso bot atua de forma "passiva", ou seja, ele apenas responde quem entra em contato primeiro querendo agendar. Ele não envia spam ou mensagens em massa. De qualquer forma, recomendamos sempre ter um chip/número exclusivo para o seu negócio para melhor organização.',
              },
              {
                q: 'O robô vai responder minha família e amigos?',
                a: 'Não se preocupe! Você pode configurar o sistema para ser ativado apenas com uma palavra-chave (ex: "Agendar") ou para ignorar contatos que já estão salvos na agenda do seu celular. Assim, conversas pessoais continuam pessoais.',
              },
              {
                q: 'Preciso ter um CNPJ para conectar o WhatsApp?',
                a: 'Não. Diferente de plataformas burocráticas, nós usamos a tecnologia de espelhamento via QR Code. Basta assinar a plataforma, ler o código na tela do computador com o seu celular e o sistema já começa a funcionar instantaneamente.',
              },
              {
                q: 'O cliente precisa baixar algum aplicativo?',
                a: 'Zero aplicativos novos. O seu paciente ou cliente fará todo o processo de agendamento de forma fluida pelo próprio aplicativo do WhatsApp que ele já usa todos os dias.',
              },
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`faq glass rounded-2xl overflow-hidden transition-colors ${
                    isOpen ? 'on' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
                  >
                    <span className="font-semibold text-lg">{faq.q}</span>
                    <LandingIcon
                      name="plus"
                      className="ico text-[#d4af37] text-xl shrink-0 transition-transform duration-300"
                    />
                  </button>
                  <div className="faq-a">
                    <div>
                      <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
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

      {/* Footer */}
      <footer id="contato" className="bg-[#0a0a0a]/90 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="logo-box">
              <StudioHubLogo id="footer-logo" />
            </span>
            <span className="text-xl font-extrabold tracking-tighter">
              STUDIO<span className="gt">HUB</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 StudioHub. Todos os direitos reservados.</p>
          <div className="flex gap-4 text-xl text-gray-400">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-green-500 hover:border-green-500/30 transition"
              aria-label="WhatsApp"
            >
              <LandingIcon name="chat" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-white hover:border-white/30 transition"
              aria-label="GitHub"
            >
              <LandingIcon name="gh" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-pink-500 hover:border-pink-500/30 transition"
              aria-label="Instagram"
            >
              <LandingIcon name="ig" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
