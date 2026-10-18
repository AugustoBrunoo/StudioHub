import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Palette, 
  Layers, 
  Terminal,
  Cpu
} from 'lucide-react';

interface TechItem {
  name: string;
  version: string;
  category: string;
  status: 'Ativo' | 'Configurado';
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

const techStack: TechItem[] = [
  {
    name: 'React',
    version: '19.x',
    category: 'Frontend Library',
    status: 'Ativo',
    icon: Code2,
    accent: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30'
  },
  {
    name: 'TypeScript',
    version: '5.x / 6.x',
    category: 'Type Safety',
    status: 'Ativo',
    icon: Layers,
    accent: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30'
  },
  {
    name: 'Tailwind CSS',
    version: 'v3 LTS (3.4.19)',
    category: 'Estável & Recomendada',
    status: 'Configurado',
    icon: Palette,
    accent: 'from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30'
  },
  {
    name: 'Vite',
    version: '6.x',
    category: 'Build Tool & Dev Server',
    status: 'Ativo',
    icon: Cpu,
    accent: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30'
  }
];

export default function App() {
  const [counter, setCounter] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('npm run dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden font-sans">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-emerald-600/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-lg">StudioHub</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                new-model
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Ambiente Pronto
            </span>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 flex flex-col justify-center items-center text-center relative z-10 w-full">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-sm mb-8 shadow-inner">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Configuração moderna com TypeScript + Tailwind v3 LTS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight sm:leading-tight mb-6">
          Base reestruturada com{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            React, TypeScript & Tailwind
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
          O projeto foi limpo e reconfigurado na branch <code className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 font-mono text-sm">new-model</code> com a versão estável e mais recomendada do Tailwind CSS.
        </p>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="group relative p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tech.accent} border`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {tech.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{tech.category}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span>Versão:</span>
                  <span className="font-mono font-medium text-slate-200">{tech.version}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Playground / Testing Area */}
        <div className="w-full max-w-2xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Teste de Reatividade (State & TypeScript)
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Verifique o funcionamento em tempo real do React Hook e TypeScript.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCounter((prev) => prev + 1)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-2"
            >
              <span>Cliques:</span>
              <span className="bg-slate-950/20 px-2 py-0.5 rounded font-mono">{counter}</span>
            </button>
            <button
              onClick={handleCopyCmd}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all duration-200 border border-slate-700/60 flex items-center gap-2"
            >
              {copied ? 'Copiado!' : 'npm run dev'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} StudioHub. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Branch atual:</span>
            <span className="font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              new-model
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
