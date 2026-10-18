import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  Building2, 
  Plus, 
  TrendingUp, 
  Music, 
  User as UserIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export function DashboardOverviewPage() {
  const { user } = useAuth();

  const metrics = [
    {
      title: 'Faturamento Estimado',
      value: formatCurrency(14850),
      change: '+18.2% vs mês anterior',
      icon: DollarSign,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Horas em Sessão',
      value: '136h',
      change: '88% de taxa de ocupação',
      icon: Clock,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Salas / Estúdios Ativos',
      value: '4 Salas',
      change: '1 em manutenção preventiva',
      icon: Building2,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Sessões Agendadas',
      value: '28 Sessões',
      change: '4 para hoje',
      icon: Calendar,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    },
  ];

  const recentSessions = [
    {
      id: 'SES-901',
      studio: 'Sala A - Gravação Acústica',
      artist: 'Banda Sonora Nova',
      producer: 'Lucas Ferreira',
      time: 'Hoje • 14:00 - 18:00',
      status: 'confirmed',
      value: 720,
    },
    {
      id: 'SES-902',
      studio: 'Suíte de Mixagem & Atmos',
      artist: 'Dj Markos & Equipe',
      producer: 'Augusto Bruno',
      time: 'Hoje • 19:00 - 23:00',
      status: 'in_progress',
      value: 850,
    },
    {
      id: 'SES-903',
      studio: 'Cabine Vocal Vintage',
      artist: 'Aline Castro',
      producer: 'Mariana Silva',
      time: 'Amanhã • 10:00 - 13:00',
      status: 'pending',
      value: 390,
    },
    {
      id: 'SES-904',
      studio: 'Live Room Principal',
      artist: 'Orquestra de Metais',
      producer: 'Roberto Dias',
      time: '22 Out • 15:00 - 20:00',
      status: 'confirmed',
      value: 1200,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="emerald"><CheckCircle2 className="w-3 h-3" /> Confirmado</Badge>;
      case 'in_progress':
        return <Badge variant="purple"><Music className="w-3 h-3 animate-pulse" /> Em Sessão</Badge>;
      case 'pending':
        return <Badge variant="amber"><AlertCircle className="w-3 h-3" /> Pendente</Badge>;
      default:
        return <Badge variant="slate">Concluído</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Olá, {user?.name?.split(' ')[0] || 'Usuário'}!
            </h1>
            <Badge roleType={user?.role}>{user?.role?.toUpperCase()}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Aqui está o panorama operacional e financeiro do estúdio hoje.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="secondary" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
            Ver Calendário
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Metrics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <Card key={i} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{metric.title}</span>
                <div className={`p-2 rounded-lg border ${metric.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">{metric.value}</h3>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {metric.change}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Sessions Table & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Sessões Recentes & Próximas</CardTitle>
              <CardDescription>Acompanhe o status e horários em tempo real</CardDescription>
            </div>
            <Button variant="ghost" size="sm">Ver Todas</Button>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/50 text-slate-400 uppercase text-[10px] tracking-wider border-y border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Estúdio / Sala</th>
                    <th className="py-3 px-4">Artista / Produtor</th>
                    <th className="py-3 px-4">Horário</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {session.studio}
                        <span className="block text-[10px] text-slate-400 font-normal font-mono">{session.id}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-200 font-medium">{session.artist}</span>
                        <span className="block text-[10px] text-slate-400 flex items-center gap-1">
                          <UserIcon className="w-2.5 h-2.5" />
                          {session.producer}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                        {session.time}
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(session.status)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-emerald-400 font-mono">
                        {formatCurrency(session.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick studio status */}
        <Card>
          <CardHeader>
            <CardTitle>Ocupação das Salas</CardTitle>
            <CardDescription>Visão geral de disponibilidade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Sala A (Acústica)</p>
                <p className="text-[11px] text-slate-400">Microfones Neumann U87, Avalon 737</p>
              </div>
              <Badge variant="emerald">Livre</Badge>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Suíte Atmos</p>
                <p className="text-[11px] text-slate-400">Sistema 7.1.4 Genelec</p>
              </div>
              <Badge variant="purple">Ocupada</Badge>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Cabine Vocal B</p>
                <p className="text-[11px] text-slate-400">Tratamento absorção total</p>
              </div>
              <Badge variant="emerald">Livre</Badge>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Live Room</p>
                <p className="text-[11px] text-slate-400">Manutenção periódica de cabos</p>
              </div>
              <Badge variant="amber">Manutenção</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
