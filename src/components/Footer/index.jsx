import { BiLogoWhatsapp, BiLogoGithub, BiLogoInstagram } from "react-icons/bi";

const Footer = () => {
    return (
        <footer id="contato" className="py-16 border-t border-white/5 px-8">
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
                <p className="text-gray-500 text-sm">© 2026 StudioHub</p>

                <div className="flex justify-center gap-4">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-green-500 transition cursor-pointer text-xl border border-transparent hover:border-green-500/30">
                        <BiLogoWhatsapp />
                    </div>
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer text-xl border border-transparent hover:border-white/30">
                        <BiLogoGithub />
                    </div>
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-pink-500 transition cursor-pointer text-xl border border-transparent hover:border-pink-500/30">
                        <BiLogoInstagram />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;