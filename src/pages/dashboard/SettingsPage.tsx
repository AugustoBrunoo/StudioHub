import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Lock, Building, Check, Sparkles } from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [studioName, setStudioName] = useState(user?.studioName || 'StudioHub Central');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">Configurações da Conta & Estúdio</h1>
        <p className="text-xs text-slate-400 mt-1">
          Ajuste suas preferências de perfil, notificações e dados operacionais.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Perfil do Usuário
            </CardTitle>
            <CardDescription>Informações públicas e dados de contato</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email Principal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Studio Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-400" />
              Dados do Estúdio / Produtora
            </CardTitle>
            <CardDescription>Nome exibido para clientes nos comprovantes e agendamentos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nome Comercial do Estúdio"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
              />
              <Input
                label="Telefone / WhatsApp Comercial"
                placeholder="(11) 99999-9999"
                defaultValue="(11) 98765-4321"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-400" />
              Notificações & Segurança
            </CardTitle>
            <CardDescription>Como e quando você deseja ser notificado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center gap-3 text-xs text-slate-300 p-2 rounded-lg bg-slate-950/40 border border-slate-800/80 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500" />
              <span>Receber alertas no WhatsApp a cada novo agendamento confirmado</span>
            </label>
            <label className="flex items-center gap-3 text-xs text-slate-300 p-2 rounded-lg bg-slate-950/40 border border-slate-800/80 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500" />
              <span>Relatório financeiro semanal resumido por email</span>
            </label>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Sessão criptografada
            </span>
            <Button type="submit" variant="primary" leftIcon={saved ? <Check className="w-4 h-4" /> : undefined}>
              {saved ? 'Salvo com sucesso!' : 'Salvar Alterações'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
