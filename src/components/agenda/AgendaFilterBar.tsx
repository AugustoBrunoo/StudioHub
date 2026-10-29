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
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4 sm:mb-5 mt-1 sm:mt-1.5">
      {/* Search Input */}
      <div className="relative w-full md:w-72">
        <DashboardIcon
          name="search"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none"
        />
        <input
          id="q"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value.toLowerCase())}
          className="inp"
          style={{ paddingLeft: '2.75rem' }}
          placeholder="Buscar cliente ou serviço"
          enterKeyHint="search"
        />
      </div>

      {/* Filter Chips */}
      <div
        className="no-scrollbar flex items-center gap-2 overflow-x-auto py-2 -my-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x"
        id="chips"
      >
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            data-f={opt.id}
            onClick={() => onSelectFilter(opt.id)}
            className={`chip shrink-0 snap-start cursor-pointer transition-all duration-200 ${activeFilter === opt.id ? 'on' : ''}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
