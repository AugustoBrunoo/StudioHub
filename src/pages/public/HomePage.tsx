import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Mic2, 
  Calendar, 
  ShieldCheck, 
  Users, 
  BarChart3,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export function HomePage() {
  const highlights = [
    {
      icon: Calendar,
      title: 'Agendamento Inteligente',
      description: 'Gestão de horários em tempo real com prevenção de conflitos e confirmação instantânea.',
    },
    {
      icon: Users,
      title: 'Múltiplos Perfis de Usuário',
      description: 'Permissões específicas para Administradores, Gestores de Estúdio, Produtores e Clientes.',
    },
    {
      icon: BarChart3,
      title: 'Métricas & Faturamento',
      description: 'Relatórios detalhados de ocupação, rendimento por sala e histórico de locações.',
    },
    {
      icon: ShieldCheck,
      title: 'Controle de Acessos & Equipamentos',
      description: 'Check-in e inventário de microfones, consoles e periféricos em cada sessão.',
    },
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400 mb-8 shadow-inner">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Estrutura Escalável com React 19 & TypeScript</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          O Sistema Operacional para{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Estúdios de Produção
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
          Gerencie salas, engenheiros de som, agendas e clientes em uma única plataforma modular construída para alta performance.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/dashboard">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Acessar Demonstração do Dashboard
            </Button>
          </Link>
          <Link to="/planos">
            <Button size="lg" variant="secondary">
              Conhecer os Planos
            </Button>
          </Link>
        </div>

        {/* Hero Preview Card */}
        <div className="w-full mt-14 p-2 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/20 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="bg-slate-950/90 rounded-xl p-6 sm:p-8 border border-slate-850 text-left grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Mic2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Estúdios Cadastrados</p>
                <p className="text-2xl font-bold text-white mt-0.5">+48 Salas</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Sessões Realizadas</p>
                <p className="text-2xl font-bold text-white mt-0.5">+1.420h</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Produtores & Clientes</p>
                <p className="text-2xl font-bold text-white mt-0.5">99.8% Aprovação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Projetado para estúdios modernos
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Cada módulo foi pensado para otimizar o fluxo de trabalho de produtores e gestores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-6 hover:border-slate-700/80 transition-colors">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
