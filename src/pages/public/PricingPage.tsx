import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

export function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 'R$ 89',
      period: '/mês',
      description: 'Ideal para produtores independentes e pequenos estúdios de gravação.',
      features: [
        'Até 1 sala de gravação',
        'Gestão de até 30 agendamentos/mês',
        'Perfil público de estúdio',
        'Suporte por email',
      ],
      cta: 'Começar com Starter',
      popular: false,
    },
    {
      name: 'Professional',
      price: 'R$ 199',
      period: '/mês',
      description: 'Perfeito para estúdios comerciais com múltiplos profissionais e salas.',
      features: [
        'Até 4 salas de gravação',
        'Agendamentos ilimitados',
        'Múltiplos perfis de produtores/gestores',
        'Relatórios de faturamento e ocupação',
        'Integração com Google Calendar e WhatsApp',
        'Suporte prioritário',
      ],
      cta: 'Experimentar 14 Dias Grátis',
      popular: true,
    },
    {
      name: 'Enterprise / Rede',
      price: 'R$ 449',
      period: '/mês',
      description: 'Para redes de estúdios e produtoras com alto volume e customizações.',
      features: [
        'Salas e filiais ilimitadas',
        'Acesso à API completa do StudioHub',
        'Controle granular de permissões (RBAC)',
        'Gerente de conta dedicado',
        'SLA garantido de 99.9%',
      ],
      cta: 'Falar com Consultor',
      popular: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Planos transparentes para o seu estúdio crescer
        </h1>
        <p className="text-slate-400 text-base">
          Escolha o plano que melhor atende à sua operação de gravação, ensaio e pós-produção.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col justify-between relative ${
              plan.popular
                ? 'border-emerald-500/50 bg-slate-900/80 shadow-2xl shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                : 'hover:border-slate-700/80'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Mais Recomendado
              </div>
            )}

            <div>
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-xs">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="border-t border-slate-800/80 pt-6 mt-2 space-y-3">
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Recursos inclusos:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </div>

            <CardFooter className="pt-4 border-none">
              <Link to="/cadastro" className="w-full">
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
