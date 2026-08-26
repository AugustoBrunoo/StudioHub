export default function Footer() {
    return (
        <footer id="contato" className="py-12 border-t border-white/5 px-8 glass !border-b-0 !border-x-0">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="logo-box shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <mask id="footer-mask">
                                    <rect width="24" height="24" fill="white" />
                                    <path d="M1 12h22" stroke="black" strokeWidth="2.5" fill="none" />
                                    <path d="M1 12 C 1 6, 23 6, 23 12" stroke="black" strokeWidth="2.5" fill="none" transform="translate(0, -5)" />
                                    <path d="M1 12 C 1 18, 23 18, 23 12" stroke="black" strokeWidth="2.5" fill="none" transform="translate(0, 5)" />
                                    <path d="M12 1v22" stroke="black" strokeWidth="2.5" fill="none" />
                                    <ellipse cx="12" cy="12" rx="6" ry="11" stroke="black" strokeWidth="2.5" fill="none" />
                                </mask>
                            </defs>
                            <circle cx="12" cy="12" r="10.5" mask="url(#footer-mask)" />
                        </svg>
                    </div>
                    <div className="text-xl font-bold uppercase tracking-tighter">
                        STUDIO<span className="gradient-text">HUB</span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm">© 2026 StudioHub. Todos os direitos reservados.</p>

                <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">Powered By</span>
                    <a href="https://nodasolucoes.dev" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                        <img src="/logos/logoNoda-nobackground.png" alt="Noda" className="h-20 object-contain" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
