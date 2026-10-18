import { StudioHubLogo, LandingIcon } from './LandingIcons';
import { NodaLogo } from '@/components/common/NodaLogo';

export function LandingFooter() {
  return (
    <footer id="contato" className="bg-[#0a0a0a]/90 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="logo-box">
              <StudioHubLogo id="footer-logo" />
            </span>
            <span className="text-xl font-extrabold tracking-tighter">
              STUDIO<span className="gt">HUB</span>
            </span>
          </div>
          <span className="hidden sm:inline text-gray-700">•</span>
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} StudioHub. Todos os direitos reservados.
          </p>
        </div>

        {/* Powered By Noda */}
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-gray-500">
            POWERED BY
          </span>
          <NodaLogo iconSize={26} textSize="text-sm" />
        </div>

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
