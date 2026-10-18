import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface PricingMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingMobileMenu({ isOpen, onClose }: PricingMobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  return (
    <div
      id="menu"
      className={`fixed inset-0 bg-black/95 z-[90] lg:hidden flex flex-col items-center justify-center text-center p-8 ${
        isOpen ? 'on pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div className="flex flex-col gap-7 text-xl font-semibold uppercase tracking-widest w-full max-w-xs">
        <Link to="/" onClick={onClose} className="ml hover:text-[#d4af37] transition">
          Início
        </Link>
        <Link to="/#como-funciona" onClick={onClose} className="ml hover:text-[#d4af37] transition">
          Como Funciona
        </Link>
        <a href="#faq" onClick={onClose} className="ml hover:text-[#d4af37] transition">
          Dúvidas Frequentes
        </a>

        <hr className="border-white/10 w-full my-2" />

        <Link to="/login" onClick={onClose} className="ml text-[#d4af37] hover:text-[#f1c40f] transition">
          Entrar
        </Link>
        <Link
          to="/cadastro"
          onClick={onClose}
          className="btn btn-gold w-full py-3.5 rounded-full text-xs font-bold tracking-wider uppercase mt-2"
        >
          CRIAR CONTA
        </Link>
      </div>
    </div>
  );
}
