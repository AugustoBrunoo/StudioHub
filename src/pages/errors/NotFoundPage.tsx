import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="space-y-2">
        <span className="text-7xl font-extrabold font-mono text-emerald-400">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Página Não Encontrada
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          O caminho solicitado não existe ou foi movido para outra rota do sistema.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Ir para o Início
          </Button>
        </Link>
      </div>
    </div>
  );
}
