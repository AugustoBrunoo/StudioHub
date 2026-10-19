import { StudioHubLogo, LandingIcon, WhatsAppIcon } from './LandingIcons';
import { NodaLogo } from '@/components/common/NodaLogo';

const CURRENT_YEAR = new Date().getFullYear();

export function LandingFooter() {
  return (
    <footer id="contato" className="bg-[#0a0a0a]/90 border-t border-white/5 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
        {/* Brand Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <span className="logo-box !w-8 !h-8 sm:!w-[34px] sm:!h-[34px]">
              <StudioHubLogo id="footer-logo" />
            </span>
            <span className="text-lg sm:text-xl font-extrabold tracking-tighter">
              STUDIO<span className="gt">HUB</span>
            </span>
          </div>
          <span className="hidden sm:inline text-gray-700">•</span>
          <p className="text-gray-500 text-xs leading-relaxed">
            © {CURRENT_YEAR} StudioHub. Todos os direitos reservados. O StudioHub é um produto oficial da{' '}
            <a
              href="https://nodasolucoes.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors underline underline-offset-2 font-medium"
            >
              Noda Solutions
            </a>
            .
          </p>
        </div>

        {/* Powered By Noda */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
            POWERED BY
          </span>
          <NodaLogo iconSize={24} textSize="text-xs sm:text-sm" />
        </div>

        {/* Social Links */}
        <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl text-gray-400 shrink-0">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 glass rounded-xl flex items-center justify-center hover:text-green-500 hover:border-green-500/30 transition text-gray-400"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon size={18} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 glass rounded-xl flex items-center justify-center hover:text-white hover:border-white/30 transition"
            aria-label="GitHub"
          >
            <LandingIcon name="gh" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 glass rounded-xl flex items-center justify-center hover:text-pink-500 hover:border-pink-500/30 transition"
            aria-label="Instagram"
          >
            <LandingIcon name="ig" />
          </a>
        </div>
      </div>
    </footer>
  );
}
