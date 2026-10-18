import { StudioHubLogo, LandingIcon } from './LandingIcons';

export function LandingFooter() {
  return (
    <footer id="contato" className="bg-[#0a0a0a]/90 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <span className="logo-box">
            <StudioHubLogo id="footer-logo" />
          </span>
          <span className="text-xl font-extrabold tracking-tighter">
            STUDIO<span className="gt">HUB</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} StudioHub. Todos os direitos reservados.
        </p>

        {/* Social Links */}
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
  );
}
