import { Link } from 'react-router-dom';

interface LandingMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LandingMobileMenu({ isOpen, onClose }: LandingMobileMenuProps) {
  return (
    <div
      id="menu"
      className={`fixed inset-0 bg-black/95 z-[90] lg:hidden flex flex-col items-center justify-center text-center p-8 ${
        isOpen ? 'on' : ''
      }`}
    >
      <div className="flex flex-col gap-8 text-xl font-semibold uppercase tracking-widest">
        <a href="#como-funciona" onClick={onClose} className="ml">
          Como Funciona
        </a>
        <a href="#diferencial" onClick={onClose} className="ml">
          Diferenciais
        </a>
        <a href="#faq" onClick={onClose} className="ml">
          Dúvidas Frequentes
        </a>
        <hr className="border-white/10 w-full my-2" />
        <Link to="/login" onClick={onClose} className="ml text-[#d4af37]">
          Entrar
        </Link>
        <Link
          to="/planos"
          onClick={onClose}
          className="btn btn-gold px-8 py-4 rounded-full text-sm"
        >
          VER PLANOS
        </Link>
      </div>
    </div>
  );
}
