import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Layers, ShieldCheck, HeartHandshake, UserCheck, ExternalLink, Code2, Globe } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { NodaLogo } from '@/components/common/NodaLogo';

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
      desc: 'Interface fluida e sem atrito para que profissionais gastem tempo criando e atendendo clientes, não preenchendo planilhas.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <Seo
        title="Sobre o StudioHub | Noda Solutions & Augusto Bruno Menezes Silva"
        description="Conheça a história e tecnologia por trás do StudioHub, concebido e desenvolvido por Augusto Bruno Menezes Silva como um produto oficial da Noda Solutions."
        canonicalUrl="https://studiohub.nodasolucoes.dev/sobre"
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sobre o StudioHub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Construindo o futuro da gestão de estúdios e agendamentos
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Nascido da necessidade real de proprietários, gestores e profissionais autônomos, o <strong className="text-white">StudioHub</strong> centraliza reservas, pagamentos, comunicação via WhatsApp e infraestrutura inteligente em um único ambiente elegante.
        </p>
      </div>

      {/* Pillars */}
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

      {/* Founder & Software House Section for High-Authority SEO */}
      <div className="border border-slate-800 bg-slate-900/50 rounded-2xl p-8 sm:p-10 space-y-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Engenharia & Concepção</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Idealizado e Desenvolvido por Augusto Bruno Menezes Silva
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-2">
            O StudioHub foi projetado do zero com os mais altos padrões de arquitetura de software por <strong className="text-slate-200">Augusto Bruno Menezes Silva</strong>, engenheiro de software e fundador da <strong className="text-slate-200">Noda Solutions</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Creator Profile */}
          <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                AB
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Augusto Bruno Menezes Silva</h3>
                <p className="text-xs text-indigo-400 font-mono">Fundador & Engenheiro de Software</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Especialista em ecossistemas web modernos, sistemas distribuídos e plataformas SaaS escaláveis. Responsável por toda a concepção de produto, experiência do usuário e arquitetura técnica do StudioHub.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/AugustoBrunoo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors underline underline-offset-4"
              >
                <Code2 className="w-4 h-4 text-slate-400" />
                <span>GitHub @AugustoBrunoo</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Noda Solutions Company */}
          <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-3">
              <NodaLogo iconSize={36} textSize="text-base" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              A <strong>Noda Solutions</strong> é a empresa desenvolvedora e mantenedora oficial do StudioHub. Focada em inovação e engenharia de precisão, a Noda constrói sistemas que eliminam atritos operacionais e aceleram o crescimento de negócios.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://nodasolucoes.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Conhecer Noda Solutions (nodasolucoes.dev)</span>
                <ExternalLink className="w-3 h-3 text-cyan-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-900/60 border border-slate-800 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Pronto para transformar seu estúdio?</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Experimente o StudioHub hoje mesmo e veja como a tecnologia desenvolvida pela Noda Solutions pode alavancar a produtividade do seu negócio.
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
