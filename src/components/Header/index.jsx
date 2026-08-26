import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                duration: 1,
                y: -50,
                opacity: 0,
                ease: "power3.out"
            });
        });
        return () => ctx.revert();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            <nav
                ref={navRef}
                className="fixed w-full z-[100] py-4 px-8 flex justify-between items-center glass !border-t-0 !border-l-0 !border-r-0 !border-b-white/5"
            >
                <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
                    <div className="logo-box shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <mask id="header-mask">
                                    <rect width="24" height="24" fill="white" />
                                    <path d="M1 12h22" stroke="black" strokeWidth="2.5" fill="none" />
                                    <path d="M1 12 C 1 6, 23 6, 23 12" stroke="black" strokeWidth="2.5" fill="none" transform="translate(0, -5)" />
                                    <path d="M1 12 C 1 18, 23 18, 23 12" stroke="black" strokeWidth="2.5" fill="none" transform="translate(0, 5)" />
                                    <path d="M12 1v22" stroke="black" strokeWidth="2.5" fill="none" />
                                    <ellipse cx="12" cy="12" rx="6" ry="11" stroke="black" strokeWidth="2.5" fill="none" />
                                </mask>
                            </defs>
                            <circle cx="12" cy="12" r="10.5" mask="url(#header-mask)" />
                        </svg>
                    </div>
                    <div className="text-xl font-extrabold tracking-tighter">
                        STUDIO<span className="gradient-text">HUB</span>
                    </div>
                </div>

                <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    <Link to="/como-funciona" className={`transition ${location.pathname === '/como-funciona' ? 'text-amber-500' : 'hover:text-amber-500'}`}>Como funciona?</Link>
                    <Link to="/suporte" className="hover:text-amber-500 transition">Suporte</Link>
                    <Link to="/equipe" className="hover:text-amber-500 transition">Equipe</Link>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-6">
                        <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition">Entrar</Link>
                        <Link to="/planos" className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-xs hover:bg-amber-500 hover:text-black transition duration-300">
                            {location.pathname === '/planos' ? 'CRIAR CONTA' : 'VER PLANOS'}
                        </Link>
                    </div>

                    <button 
                        onClick={toggleMenu} 
                        className={`lg:hidden relative flex flex-col justify-center items-center w-11 h-11 rounded-full border border-solid backdrop-blur-md transition-all duration-300 z-[110] ${isMenuOpen ? 'border-amber-500/50 bg-amber-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'}`}
                        aria-label="Menu"
                    >
                        <span className={`absolute w-5 h-[1.5px] rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-amber-500 rotate-45' : 'bg-white -translate-y-[6px]'}`}></span>
                        <span className={`absolute w-5 h-[1.5px] rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-50' : 'bg-white opacity-100 scale-100'}`}></span>
                        <span className={`absolute w-5 h-[1.5px] rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-amber-500 -rotate-45' : 'bg-white translate-y-[6px]'}`}></span>
                    </button>
                </div>
            </nav>

            {/* Backdrop para fechar o menu ao clicar fora */}
            <div 
                className={`fixed inset-0 z-[80] lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => { if(isMenuOpen) toggleMenu(); }}
            ></div>

            <div
                id="mobile-menu-dropdown"
                className={`fixed top-[88px] right-8 w-64 glass rounded-3xl p-6 z-[90] lg:hidden flex flex-col origin-top-right transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${isMenuOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}
            >
                <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-wider text-right">
                    <Link to="/como-funciona" onClick={toggleMenu} className={`transition ${location.pathname === '/como-funciona' ? 'text-amber-500' : 'hover:text-amber-500'}`}>Como Funciona</Link>
                    <a href="#diferencial" onClick={toggleMenu} className="hover:text-amber-500 transition">Diferenciais</a>
                    <a href="#faq" onClick={toggleMenu} className="hover:text-amber-500 transition">Dúvidas Frequentes</a>
                    <hr className="border-white/10 w-full my-0" />
                    <Link to="/login" onClick={toggleMenu} className="text-amber-500 transition hover:text-white">Entrar</Link>
                    <Link to="/planos" onClick={toggleMenu} className="bg-white text-black py-3.5 rounded-full font-bold text-xs hover:bg-amber-500 hover:text-black transition duration-300 text-center mt-1">
                        {location.pathname === '/planos' ? 'CRIAR CONTA' : 'VER PLANOS'}
                    </Link>
                </div>
            </div>
        </>
    );
}
