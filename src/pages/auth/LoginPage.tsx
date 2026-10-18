import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { StudioHubLogo, LandingIcon } from '@/components/landing/LandingIcons';
import { PricingBackground } from '@/components/pricing/PricingBackground';
import { useAuth } from '@/hooks/useAuth';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline matching prototype
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.rt', { y: -16, opacity: 0, duration: 1 })
        .from('.rc', { y: 40, opacity: 0, scale: 0.96, duration: 1.3, ease: 'expo.out' }, 0)
        .from('.lg', { y: 16, opacity: 0, duration: 1 }, 0.35)
        .from('.rule', { scaleX: 0, duration: 1.1 }, 0.5)
        .from('h1, .card-sub', { y: 18, opacity: 0, duration: 1, stagger: 0.1 }, 0.55)
        .from('.ig', { y: 20, opacity: 0, duration: 0.9, stagger: 0.09, clearProps: 'opacity,y' }, 0.7);

      // Spotlight effect on card pointermove
      const card = cardRef.current;
      const handlePointerMove = (e: PointerEvent) => {
        if (!card) return;
        const b = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - b.left}px`);
        card.style.setProperty('--my', `${e.clientY - b.top}px`);
      };

      if (card) {
        card.addEventListener('pointermove', handlePointerMove);
      }

      // Magnetic button hover effect
      const btn = btnRef.current;
      if (btn && window.matchMedia('(hover: hover)').matches) {
        const x = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3' });
        const y = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3' });

        const handleMouseMove = (e: MouseEvent) => {
          const b = btn.getBoundingClientRect();
          x((e.clientX - b.left - b.width / 2) * 0.12);
          y((e.clientY - b.top - b.height / 2) * 0.25);
        };

        const handleMouseLeave = () => {
          x(0);
          y(0);
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, 'admin');
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(from, { replace: true });
      }, 900);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen min-h-[100dvh] w-full flex items-center justify-center relative text-[#f5f5f5] overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-white"
    >
      {/* Dynamic Golden Ambient Background */}
      <PricingBackground />

      {/* Floating Back to Home button */}
      <Link
        to="/"
        className="auth-back rt fixed flex items-center gap-2 text-gray-500 font-semibold uppercase tracking-[.2em] text-xs z-20 hover:text-white transition-all"
        style={{ top: 'calc(1.5rem + env(safe-area-inset-top,0px))', left: '1.5rem' }}
      >
        <LandingIcon name="arrow" className="text-lg" />
        Voltar
      </Link>

      {/* Centered Login Card */}
      <main className="w-full max-w-md px-4 sm:px-6 py-20 sm:py-24 relative z-10">
        <div ref={cardRef} className="auth-card rc rounded-[2.25rem] sm:rounded-[2.5rem] p-7 sm:p-11">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-9">
            <div className="lg flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <span className="logo-box !w-9 !h-9 sm:!w-[38px] sm:!h-[38px]">
                <StudioHubLogo id="login-brand-logo" />
              </span>
              <span className="text-2xl font-extrabold tracking-tighter">
                STUDIO<span className="gt">HUB</span>
              </span>
            </div>

            <div className="rule max-w-[9rem] mx-auto mb-6 sm:mb-8" />

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
              Olá! <span className="gt">Novamente.</span>
            </h1>
            <p className="card-sub text-gray-500 text-xs sm:text-sm">
              Bem-vindo de volta ao seu ecossistema.
            </p>
          </div>

          {/* Form */}
          <form id="loginForm" onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="ig">
              <label className="auth-lbl" htmlFor="email">
                E-mail
              </label>
              <div className="field relative">
                <span className="ico absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-colors">
                  <LandingIcon name="mail" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  className="auth-inp"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="ig">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="auth-lbl !m-0" htmlFor="passwordInput">
                  Senha
                </label>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[10px] uppercase tracking-[.2em] text-[#d4af37] font-semibold hover:text-white transition"
                >
                  Esqueci a senha
                </a>
              </div>
              <div className="field relative">
                <span className="ico absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-colors">
                  <LandingIcon name="lock" />
                </span>
                <input
                  id="passwordInput"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="auth-inp pr-12"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition text-lg flex items-center justify-center p-1"
                >
                  <LandingIcon name={showPassword ? 'eyeoff' : 'eye'} />
                </button>
              </div>
            </div>

            <div className="ig flex items-center gap-3 ml-1">
              <input
                type="checkbox"
                id="remember"
                className="auth-chk"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="text-xs text-gray-500 font-medium cursor-pointer hover:text-gray-300 transition select-none"
              >
                Manter conectado
              </label>
            </div>

            <button
              ref={btnRef}
              type="submit"
              disabled={isSubmitting}
              className="auth-btn btn mag ig w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none transition-all"
            >
              {isSubmitting ? (
                <>
                  <LandingIcon name="spin" className="spin text-base" />
                  Verificando...
                </>
              ) : (
                'Entrar na Plataforma'
              )}
            </button>

            <p className="ig text-center text-xs text-gray-500">
              Ainda não tem conta?{' '}
              <Link to="/planos" className="text-white font-semibold hover:text-[#d4af37] transition">
                Veja Planos
              </Link>
            </p>
          </form>
        </div>

        <p className="rt text-center mt-6 sm:mt-8 text-[10px] text-gray-600 uppercase tracking-[.3em]">
          StudioHub Engine &copy; 2026
        </p>
      </main>
    </div>
  );
}
