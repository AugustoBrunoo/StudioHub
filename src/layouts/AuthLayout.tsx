import { Link, Outlet } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-indigo-600/15 blur-[140px] pointer-events-none rounded-full" />

      {/* Top Bar */}
      <header className="p-6 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800/80"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao início</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <span className="font-bold tracking-tight text-white">StudioHub</span>
          </div>
        </div>
      </header>

      {/* Form content outlet */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Auth footer */}
      <footer className="p-6 text-center text-xs text-slate-500 relative z-10">
        Protegido por criptografia de ponta a ponta • StudioHub Auth
      </footer>
    </div>
  );
}
