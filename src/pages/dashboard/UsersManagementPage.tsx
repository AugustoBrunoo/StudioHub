import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import type { UserRole, UserStatus } from '@/types/user';
import { UserPlus, Search, Shield, Check, Ban } from 'lucide-react';
import { getInitials } from '@/utils/formatters';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  studioName?: string;
  createdAt: string;
}

const mockUsers: UserRecord[] = [
  {
    id: 'usr_01',
    name: 'Augusto Bruno',
    email: 'admin@studiohub.com',
    role: 'admin',
    status: 'active',
    studioName: 'StudioHub Global HQ',
    createdAt: '15/01/2024',
  },
  {
    id: 'usr_02',
    name: 'Mariana Silva',
    email: 'mariana@soundstudio.com',
    role: 'studio_manager',
    status: 'active',
    studioName: 'Acoustic Sound Labs',
    createdAt: '10/02/2024',
  },
  {
    id: 'usr_03',
    name: 'Lucas Ferreira',
    email: 'lucas@beatmaker.io',
    role: 'creator',
    status: 'active',
    studioName: 'BeatLab Pro',
    createdAt: '01/03/2024',
  },
  {
    id: 'usr_04',
    name: 'Camila Rocha',
    email: 'camila@empresa.com.br',
    role: 'client',
    status: 'active',
    createdAt: '20/04/2024',
  },
  {
    id: 'usr_05',
    name: 'Eduardo Ramos',
    email: 'eduardo@audiofilia.com',
    role: 'creator',
    status: 'pending',
    studioName: 'Studio B',
    createdAt: '12/05/2024',
  },
];

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrador Geral',
  studio_manager: 'Gestor de Estúdio',
  creator: 'Produtor / Músico',
  client: 'Cliente Final',
};

export function UsersManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus: UserStatus = u.status === 'active' ? 'suspended' : 'active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Gestão de Usuários</h1>
            <Badge variant="purple">Área Administrativa</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Controle de acessos, papéis (roles), estúdios vinculados e permissões da plataforma.
          </p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
          Convidar Novo Usuário
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nome ou email de usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
        >
          <option value="all">Todas as Funções (Roles)</option>
          <option value="admin">Administrador</option>
          <option value="studio_manager">Gestor de Estúdio</option>
          <option value="creator">Produtor / Músico</option>
          <option value="client">Cliente</option>
        </select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Diretório de Usuários ({filtered.length})</CardTitle>
          <CardDescription>Usuários cadastrados e seus níveis de permissão</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-y border-slate-800">
                <tr>
                  <th className="py-3 px-4">Usuário</th>
                  <th className="py-3 px-4">Função / Perfil</th>
                  <th className="py-3 px-4">Estúdio Vinculado</th>
                  <th className="py-3 px-4">Data Cadastro</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-[11px] shrink-0">
                          {getInitials(u.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{u.name}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge roleType={u.role}>
                        <Shield className="w-3 h-3" />
                        {roleLabels[u.role]}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {u.studioName || <span className="text-slate-500">—</span>}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {u.createdAt}
                    </td>
                    <td className="py-3.5 px-4">
                      {u.status === 'active' ? (
                        <Badge variant="emerald"><Check className="w-3 h-3" /> Ativo</Badge>
                      ) : u.status === 'pending' ? (
                        <Badge variant="amber">Pendente</Badge>
                      ) : (
                        <Badge variant="rose"><Ban className="w-3 h-3" /> Suspenso</Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                          u.status === 'active'
                            ? 'border-rose-800/60 text-rose-400 hover:bg-rose-950/40'
                            : 'border-emerald-800/60 text-emerald-400 hover:bg-emerald-950/40'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspender' : 'Reativar'}
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
