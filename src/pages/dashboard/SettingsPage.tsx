import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Seo } from '@/components/common/Seo';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardToast } from '@/layouts/DashboardLayout';
import {
  SettingsNavigationCard,
  SettingsSessionCard,
  type SettingsNavigationCardProps,
} from '@/components/settings';
import {
  User,
  Building2,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

interface SettingsCardConfig extends SettingsNavigationCardProps {
  id: string;
}

export function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const showToast = useDashboardToast();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const displayName = user?.name?.replace(/\s*\(.*?\)\s*/g, '') || 'João Mendes';
  const displayStudio = user?.studioName || 'Studio Navalha de Ouro';

  const initials =
    displayName
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'SH';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from(
          '.rise',
          {
            y: 34,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            clearProps: 'opacity,transform',
          },
          0.05
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLogout = () => {
    showToast('Sessão encerrada com segurança.');
    logout();
    navigate('/login');
  };

  const settingsCards: SettingsCardConfig[] = [
    {
      id: 'perfil',
      to: '/dashboard/configuracoes/perfil',
      title: 'Perfil do Profissional',
      subtitle: 'Identidade & Contatos Pessoais',
      description:
        'Gerencie seu nome, apelido usado pelo assistente nas conversas de WhatsApp, especialidade, e-mail de acesso e telefone para avisos.',
      icon: User,
      ctaLabel: 'Gerenciar perfil',
    },
    {
      id: 'estudio',
      to: '/dashboard/configuracoes/estudio',
      title: 'Dados do Estúdio & Expediente',
      subtitle: 'Operação, Horários & Robô WhatsApp',
      description:
        'Configure o nome comercial da barbearia/estúdio, endereço enviado aos clientes, número controlado pelo robô, dias de funcionamento e pausa de almoço.',
      icon: Building2,
      ctaLabel: 'Configurar estúdio',
    },
    {
      id: 'notificacoes',
      to: '/dashboard/configuracoes/notificacoes',
      title: 'Notificações & Segurança',
      subtitle: 'Automação Anti-Falta & Proteção 2FA',
      description:
        'Defina quando receber alertas no seu celular, antecedência dos lembretes anti-falta para clientes, verificação em duas etapas e senha de acesso.',
      icon: ShieldCheck,
      ctaLabel: 'Ajustar alertas e senha',
    },
    {
      id: 'faturamento',
      to: '/dashboard/configuracoes/faturamento',
      title: 'Faturamento & Mensalidade / Plano',
      subtitle: 'Assinatura, Cartão/Pix & Recibos',
      description:
        'Consulte seu plano atual, compare opções de upgrade (Premium e Hub Master), gerencie sua forma de pagamento e baixe notas ou recibos mensais.',
      icon: CreditCard,
      ctaLabel: 'Ver plano e faturas',
    },
  ];

  return (
    <div ref={containerRef} className="w-full">
      <Seo
        title="StudioHub | Configurações da Conta & Estúdio"
        description="Central de configurações do StudioHub. Acesse seu perfil, dados do estúdio, notificações, segurança e faturamento."
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24 relative z-10">
        {/* Top Header */}
        <header className="rise flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 pb-6 mb-7 border-b border-white/[0.08]">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Configurações
            </h1>
          </div>
        </header>

        {/* 4 Clean Navigation Cards Grid */}
        <section
          aria-label="Categorias de Configuração"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-7"
        >
          {settingsCards.map((card) => (
            <SettingsNavigationCard key={card.id} {...card} />
          ))}
        </section>

        {/* Dedicated Logout / Session Card */}
        <SettingsSessionCard onLogout={handleLogout} />
      </main>
    </div>
  );
}

export default SettingsPage;
