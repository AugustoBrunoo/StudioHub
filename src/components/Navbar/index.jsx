import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                duration: 1,
                y: -100,
                opacity: 0,
                ease: "power3.out",
                clearProps: "all"
            });
        });

        return () => ctx.revert();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
    };

    return (
        <>
            <nav ref={navRef} className="fixed w-full z-[100] py-4 px-8 flex justify-between items-center glass">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
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
                </Link>

                {/* Links Desktop usando NavLink */}
                <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em]">
                    <NavLink
                        to="/como-funciona"
                        className={({ isActive }) =>
                            isActive ? "text-amber-500 transition" : "text-gray-400 hover:text-amber-500 transition"
                        }
                    >
                        Como funciona?
                    </NavLink>

                    <NavLink
                        to="/suporte"
                        className={({ isActive }) =>
                            isActive ? "text-amber-500 transition" : "text-gray-400 hover:text-amber-500 transition"
                        }
                    >
                        Suporte
                    </NavLink>

                    <NavLink
                        to="/equipe"
                        className={({ isActive }) =>
                            isActive ? "text-amber-500 transition" : "text-gray-400 hover:text-amber-500 transition"
                        }
                    >
                        Equipe
                    </NavLink>
                </div>

                {/* Auth & Hamburger (Usando Link para rotas sem cor de estado ativo) */}
                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-6">
                        <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition">
                            Entrar
                        </Link>
                        <Link to="/planos" className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-xs hover:bg-amber-500 hover:text-black transition duration-300">
                            VER PLANOS
                        </Link>
                    </div>

                    <button onClick={toggleMenu} className="lg:hidden flex flex-col gap-1.5 z-[110]">
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? 'translate-y-[8px] rotate-45' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? '-translate-y-[8px] -rotate-45' : ''}`}></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-menu-overlay"
                className={`fixed inset-0 bg-black/95 z-[90] lg:hidden flex flex-col items-center justify-center text-center p-8 ${isMenuOpen ? 'active' : ''}`}
            >
                <div className="flex flex-col gap-8 text-xl font-bold uppercase tracking-widest">
                    <NavLink
                        to="/como-funciona"
                        onClick={toggleMenu}
                        className={({ isActive }) => isActive ? "text-amber-500 transition" : "hover:text-amber-500 transition"}
                    >
                        COMO FUNCIONA?
                    </NavLink>

                    <NavLink
                        to="/suporte"
                        onClick={toggleMenu}
                        className={({ isActive }) => isActive ? "text-amber-500 transition" : "hover:text-amber-500 transition"}
                    >
                        SUPORTE
                    </NavLink>

                    <NavLink
                        to="/equipe"
                        onClick={toggleMenu}
                        className={({ isActive }) => isActive ? "text-amber-500 transition" : "hover:text-amber-500 transition"}
                    >
                        EQUIPE
                    </NavLink>

                    <hr className="border-white/10 w-full my-4" />

                    <Link to="/login" onClick={toggleMenu} className="text-amber-500">
                        Entrar
                    </Link>

                    <Link to="/planos" onClick={toggleMenu} className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm">
                        VER PLANOS
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;