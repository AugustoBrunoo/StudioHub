import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function UnauthorizedPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-xl">
        <ShieldAlert className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <span className="text-sm font-semibold uppercase tracking-wider text-rose-400">
          Erro 403 • Acesso Negado
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Permissão Insuficiente
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Seu perfil atual (<span className="text-emerald-400 font-mono font-semibold">{user?.role}</span>) não possui privilégios para acessar esta área restrita.
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
        <Link to="/dashboard">
          <Button variant="primary" size="md" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
            Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
