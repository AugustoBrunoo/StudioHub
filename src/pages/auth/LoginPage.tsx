import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types/user';

export function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@studiohub.com');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  // Redirection destination after login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, selectedRole);
    navigate(from, { replace: true });
  };

  const handleQuickPersona = async (role: UserRole, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    await login(demoEmail, role);
    navigate(from, { replace: true });
  };

  return (
    <Card className="border-slate-800 shadow-2xl bg-slate-900/80 backdrop-blur-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Acessar Conta</CardTitle>
        <CardDescription>
          Entre com seu email ou selecione um perfil de demonstração
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick persona selector for rapid testing */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            Acesso Rápido por Perfil (Demo)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickPersona('admin', 'admin@studiohub.com')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-left text-xs transition-colors"
            >
              <span className="font-semibold text-rose-400 block">Admin</span>
              <span className="text-[10px] text-slate-400 truncate block">admin@studiohub.com</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickPersona('studio_manager', 'mariana@soundstudio.com')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-left text-xs transition-colors"
            >
              <span className="font-semibold text-purple-400 block">Gestor de Estúdio</span>
              <span className="text-[10px] text-slate-400 truncate block">mariana@soundstudio.com</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickPersona('creator', 'lucas@beatmaker.io')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-left text-xs transition-colors"
            >
              <span className="font-semibold text-emerald-400 block">Produtor / Criador</span>
              <span className="text-[10px] text-slate-400 truncate block">lucas@beatmaker.io</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickPersona('client', 'camila@empresa.com.br')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-left text-xs transition-colors"
            >
              <span className="font-semibold text-blue-400 block">Cliente</span>
              <span className="text-[10px] text-slate-400 truncate block">camila@empresa.com.br</span>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Profissional"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Lembrar de mim</span>
            </label>
            <a href="#" className="text-emerald-400 hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Entrar no StudioHub
          </Button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Não tem uma conta ainda?{' '}
          <Link to="/cadastro" className="text-emerald-400 font-semibold hover:underline">
            Cadastre-se grátis
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
