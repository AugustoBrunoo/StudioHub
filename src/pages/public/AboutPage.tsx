import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Layers, ShieldCheck, HeartHandshake } from 'lucide-react';

export function AboutPage() {
  const pillars = [
    {
      icon: Layers,
      title: 'Arquitetura Modular',
      desc: 'Base desacoplada, pronta para suportar milhares de sessões simultâneas com baixa latência e alta disponibilidade.',
    },
    {
      icon: ShieldCheck,
      title: 'Segurança & RBAC',
      desc: 'Controle de acesso por funções refinado garantindo que cada usuário acesse apenas o que é seu por direito.',
    },
    {
      icon: HeartHandshake,
      title: 'Foco na Experiência',
      desc: 'Interface fluida e sem atrito para que músicos e produtores gastem tempo criando, não preenchendo planilhas.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sobre o StudioHub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Construindo o futuro da gestão de áudio e estúdios
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Nascido da necessidade real de produtores, bandas e gestores de espaço, o StudioHub centraliza reservas, pagamentos, comunicação e infraestrutura em um único ambiente elegante.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Card key={i} className="p-6">
              <CardContent className="p-0 space-y-3">
                <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-900/60 border border-slate-800 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Pronto para transformar seu estúdio?</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Experimente a plataforma gratuitamente ou explore a visão geral de demonstração.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link to="/cadastro">
            <Button variant="primary">Criar Conta Gratuita</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary">Ver Demonstração</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
