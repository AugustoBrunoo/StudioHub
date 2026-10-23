import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import type { FilterMode } from './types';

interface AgendaFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: FilterMode;
  onSelectFilter: (f: FilterMode) => void;
}

const FILTER_OPTIONS: { id: FilterMode; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'pendentes', label: 'Pendentes' },
  { id: 'atendidos', label: 'Atendidos' },
  { id: 'faltas', label: 'Faltas' },
  { id: 'cancelados', label: 'Cancelados' },
];

export function AgendaFilterBar({
  searchQuery,
  onSearchChange,
  activeFilter,
  onSelectFilter,
}: AgendaFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
      {/* Search Input */}
      <div className="relative md:w-72">
        <DashboardIcon
          name="search"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none"
        />
        <input
          id="q"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value.toLowerCase())}
          className="inp"
          style={{ paddingLeft: '2.75rem' }}
          placeholder="Buscar cliente ou serviço"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mb-1" id="chips">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            data-f={opt.id}
            onClick={() => onSelectFilter(opt.id)}
            className={`chip cursor-pointer ${activeFilter === opt.id ? 'on' : ''}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
