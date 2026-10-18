import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, SlidersHorizontal, Radio, CheckCircle, Search } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface StudioItem {
  id: string;
  name: string;
  category: string;
  hourlyRate: number;
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance';
  equipment: string[];
  description: string;
}

const initialStudios: StudioItem[] = [
  {
    id: 'std_01',
    name: 'Sala Master & Gravação A',
    category: 'Gravação Completa',
    hourlyRate: 180,
    capacity: 8,
    status: 'available',
    equipment: ['Neumann U87', 'Universal Audio Apollo x8p', 'Avalon Vt-737sp', 'Focal Trio6'],
    description: 'Espaço principal acusticamente isolado, ideal para gravações de banda completa, vocais e bateria acústica.',
  },
  {
    id: 'std_02',
    name: 'Suíte Dolby Atmos & Mixagem',
    category: 'Pós-Produção & Mix',
    hourlyRate: 220,
    capacity: 4,
    status: 'occupied',
    equipment: ['Genelec 7.1.4 Smart Active', 'Avid Pro Tools Ultimate', 'Grace Design m908'],
    description: 'Ambiente certificado para mixagem espacial imersiva Dolby Atmos e masterização de alta precisão.',
  },
  {
    id: 'std_03',
    name: 'Cabine Vocal Vintage',
    category: 'Voz & Podcast',
    hourlyRate: 120,
    capacity: 3,
    status: 'available',
    equipment: ['Shure SM7B', 'Telefunken U47', 'Neve 1073 Preamp', 'Tratamento Sonex Pro'],
    description: 'Cabine compacta com pré-amplificação valvulada analógica, especializada em vocais, locuções e dublagens.',
  },
  {
    id: 'std_04',
    name: 'Live Room / Sala de Ensaio',
    category: 'Ensaio & Captação',
    hourlyRate: 95,
    capacity: 12,
    status: 'maintenance',
    equipment: ['Bateria DW Collectors', 'Ampeg SVT Classic', 'Marshall JCM800', 'Mesa Digital Behringer X32'],
    description: 'Espaço amplo com 65m², acústica controlada e backline completo para ensaios pré-turnê e gravações ao vivo.',
  },
];

export function StudiosPage() {
  const [studios] = useState<StudioItem[]>(initialStudios);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = studios.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: StudioItem['status']) => {
    switch (status) {
      case 'available':
        return <Badge variant="emerald"><CheckCircle className="w-3 h-3" /> Disponível</Badge>;
      case 'occupied':
        return <Badge variant="purple"><Radio className="w-3 h-3 animate-pulse" /> Em Sessão</Badge>;
      case 'maintenance':
        return <Badge variant="amber">Em Manutenção</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Estúdios & Salas</h1>
          <p className="text-xs text-slate-400 mt-1">
            Gerenciamento do inventário de salas, equipamentos e tabelas de preço por hora.
          </p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Cadastrar Nova Sala
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nome da sala ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Todos os Status</option>
            <option value="available">Apenas Disponíveis</option>
            <option value="occupied">Em Sessão</option>
            <option value="maintenance">Em Manutenção</option>
          </select>
        </div>
      </div>

      {/* Studio Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((studio) => (
          <Card key={studio.id} className="p-6 flex flex-col justify-between hover:border-slate-700/80 transition-all">
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                    {studio.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{studio.name}</h3>
                </div>
                {getStatusBadge(studio.status)}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {studio.description}
              </p>

              {/* Equipment badges */}
              <div className="space-y-1.5 mb-6">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Equipamentos Inclusos:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {studio.equipment.map((eq, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Valor da hora</span>
                <div className="text-lg font-bold text-white font-mono">
                  {formatCurrency(studio.hourlyRate)}
                  <span className="text-xs text-slate-400 font-normal"> /h</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Editar Detalhes
                </Button>
                <Button variant="primary" size="sm">
                  Reservar Horário
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
