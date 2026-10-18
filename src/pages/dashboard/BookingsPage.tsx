import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface Booking {
  id: string;
  studioName: string;
  clientName: string;
  producerName: string;
  date: string;
  timeSlot: string;
  hours: number;
  totalValue: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

const mockBookings: Booking[] = [
  {
    id: 'BK-1048',
    studioName: 'Sala Master & Gravação A',
    clientName: 'Gabriel Medeiros',
    producerName: 'Lucas Ferreira',
    date: '24/10/2024',
    timeSlot: '14:00 - 18:00',
    hours: 4,
    totalValue: 720,
    status: 'confirmed',
  },
  {
    id: 'BK-1049',
    studioName: 'Suíte Dolby Atmos & Mixagem',
    clientName: 'Gravadora Som Livre',
    producerName: 'Augusto Bruno',
    date: '25/10/2024',
    timeSlot: '10:00 - 16:00',
    hours: 6,
    totalValue: 1320,
    status: 'confirmed',
  },
  {
    id: 'BK-1050',
    studioName: 'Cabine Vocal Vintage',
    clientName: 'Carla Beatriz (Locutora)',
    producerName: 'Mariana Silva',
    date: '26/10/2024',
    timeSlot: '09:00 - 12:00',
    hours: 3,
    totalValue: 360,
    status: 'pending',
  },
  {
    id: 'BK-1051',
    studioName: 'Live Room / Sala de Ensaio',
    clientName: 'Banda Overdrive',
    producerName: 'Roberto Dias',
    date: '27/10/2024',
    timeSlot: '19:00 - 23:00',
    hours: 4,
    totalValue: 380,
    status: 'cancelled',
  },
  {
    id: 'BK-1052',
    studioName: 'Sala Master & Gravação A',
    clientName: 'Felipe Alencar',
    producerName: 'Lucas Ferreira',
    date: '20/10/2024',
    timeSlot: '13:00 - 17:00',
    hours: 4,
    totalValue: 720,
    status: 'completed',
  },
];

export function BookingsPage() {
  const [bookings] = useState<Booking[]>(mockBookings);
  const [filter, setFilter] = useState<string>('all');

  const filtered = bookings.filter((b) => filter === 'all' || b.status === filter);

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="emerald"><CheckCircle className="w-3 h-3" /> Confirmado</Badge>;
      case 'pending':
        return <Badge variant="amber"><AlertCircle className="w-3 h-3" /> Pendente</Badge>;
      case 'cancelled':
        return <Badge variant="rose"><XCircle className="w-3 h-3" /> Cancelado</Badge>;
      case 'completed':
        return <Badge variant="slate">Concluído</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Agendamentos & Sessões</h1>
          <p className="text-xs text-slate-400 mt-1">
            Controle de reservas por data, produtor responsável e confirmação de pagamento.
          </p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Agendar Nova Sessão
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        {[
          { key: 'all', label: 'Todos' },
          { key: 'confirmed', label: 'Confirmados' },
          { key: 'pending', label: 'Pendentes' },
          { key: 'completed', label: 'Concluídos' },
          { key: 'cancelled', label: 'Cancelados' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
              filter === tab.key
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Histórico de Reservas</CardTitle>
          <CardDescription>Mostrando {filtered.length} agendamentos registrados</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-y border-slate-800">
                <tr>
                  <th className="py-3 px-4">Código / Sala</th>
                  <th className="py-3 px-4">Cliente & Produtor</th>
                  <th className="py-3 px-4">Data & Horário</th>
                  <th className="py-3 px-4">Duração</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Valor Total</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {item.studioName}
                      <span className="block font-mono text-[10px] text-slate-400 font-normal">
                        {item.id}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium">{item.clientName}</div>
                      <div className="text-[10px] text-slate-400">Produtor: {item.producerName}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.timeSlot}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">
                      {item.hours} horas
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                      {formatCurrency(item.totalValue)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="text-xs text-slate-400 hover:text-white font-medium hover:underline">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
