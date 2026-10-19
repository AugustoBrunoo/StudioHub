import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Building, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { Seo } from '@/components/common/Seo';
import type { UserRole } from '@/types/user';

export function RegisterPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('creator');
  const [studioName, setStudioName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, role);
    navigate('/dashboard');
  };

  return (
    <>
      <Seo
        title="Criar Conta | StudioHub • Noda Solutions"
        description="Cadastre-se no StudioHub. A plataforma mais avançada para gestão e agendamento de estúdios desenvolvida por Noda Solutions."
        canonicalUrl="https://studiohub.nodasolucoes.dev/cadastro"
      />
      <Card className="border-slate-800 shadow-2xl bg-slate-900/80 backdrop-blur-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Criar Conta no StudioHub</CardTitle>
          <CardDescription>
            Selecione seu perfil e comece a gerenciar ou reservar estúdios
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome Completo"
              placeholder="Ex: Augusto Bruno"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            {/* Role selector */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-medium text-slate-300">
                Tipo de Perfil
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${role === 'creator'
                      ? 'border-emerald-500 bg-emerald-500/10 text-white font-medium'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                    }`}
                >
                  <div className="font-semibold text-slate-200">Produtor / Músico</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Reservar e produzir</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('studio_manager')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${role === 'studio_manager'
                      ? 'border-emerald-500 bg-emerald-500/10 text-white font-medium'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                    }`}
                >
                  <div className="font-semibold text-slate-200">Gestor de Estúdio</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Disponibilizar salas</div>
                </button>
              </div>
            </div>

            {role === 'studio_manager' && (
              <Input
                label="Nome do Estúdio / Produtora"
                placeholder="Ex: Vintage Sound Lab"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                leftIcon={<Building className="w-4 h-4" />}
                required
              />
            )}

            <Input
              label="Criar Senha"
              type="password"
              placeholder="Pelo menos 8 caracteres"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Concluir Cadastro
            </Button>
          </form>

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
            Já possui conta?{' '}
            <Link to="/login" className="text-emerald-400 font-semibold hover:underline">
              Fazer login
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
