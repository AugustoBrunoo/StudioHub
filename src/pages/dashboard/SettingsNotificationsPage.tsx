import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Seo } from '@/components/common/Seo';
import { useDashboardToast } from '@/layouts/DashboardLayout';
import {
  Bell,
  ShieldCheck,
  ArrowLeft,
  Check,
  Smartphone,
  KeyRound,
  Sparkles,
  Laptop,
} from 'lucide-react';

export function SettingsNotificationsPage() {
  const showToast = useDashboardToast();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [notifyNewBooking, setNotifyNewBooking] = useState(true);
  const [notifyCancellation, setNotifyCancellation] = useState(true);
  const [notifyDailySummary, setNotifyDailySummary] = useState(true);
  const [notifyWeeklyFinance, setNotifyWeeklyFinance] = useState(false);
  const [antiFaltaReminder, setAntiFaltaReminder] = useState('2');
  const [cancelLimitHours, setCancelLimitHours] = useState('2');
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from(
          '.rise',
          {
            y: 32,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
            clearProps: 'opacity,transform',
          },
          0.05
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    showToast('Preferências de notificações e segurança salvas!');
    setTimeout(() => setSaved(false), 2400);
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword) {
      showToast('Preencha a senha atual e a nova senha para atualizar.');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Senha de acesso alterada com segurança!');
  };

  const solidCardClass =
    'rounded-[1.6rem] bg-[#111111] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_28px_60px_-30px_rgba(0,0,0,0.95)] p-5 sm:p-7 transition-colors duration-300';

  const innerSolidBoxClass =
    'rounded-2xl bg-[#171717] border border-white/[0.07] p-4 sm:p-5 transition-colors';

  return (
    <div ref={containerRef} className="w-full">
      <Seo
        title="StudioHub | Notificações e Segurança"
        description="Configure alertas automáticos via WhatsApp, regras anti-falta, autenticação em duas etapas e senha de acesso."
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24 relative z-10">
        {/* Back Breadcrumb */}
        <div className="rise mb-5">
          <Link
            to="/dashboard/configuracoes"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#d4af37] transition-colors auth-back"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
            <span>Voltar para Configurações</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="rise flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-6 border-b border-white/[0.08]">
          <div>
            <p className="tag !text-[#d4af37] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block" />
              <span>Configurações • Alertas &amp; Proteção</span>
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Notificações <span className="gt">&amp; Segurança.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
              Controle os avisos operacionais que você recebe, a automação anti-falta enviada aos clientes e a segurança de acesso da sua conta.
            </p>
          </div>
        </header>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Notificações Operacionais & Anti-falta */}
          <section className={`${solidCardClass} rise`}>
            <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-white/[0.07]">
              <div className="ibox shrink-0">
                <Bell className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Alertas Operacionais &amp; Regras Anti-Falta
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Escolha como deseja ser avisado e quando o robô deve cobrar confirmação dos clientes
                </p>
              </div>
            </div>

            <div className="space-y-3.5 mb-6">
              <div className={`${innerSolidBoxClass} flex items-center justify-between gap-4`}>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    Novos agendamentos confirmados
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Receber alerta no seu WhatsApp pessoal a cada novo horário fechado pelo robô
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifyNewBooking}
                  onClick={() => setNotifyNewBooking((prev) => !prev)}
                  className={`sw bg-[#111111] border border-white/[0.14] ${
                    notifyNewBooking ? 'on !border-transparent' : ''
                  }`}
                />
              </div>

              <div className={`${innerSolidBoxClass} flex items-center justify-between gap-4`}>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    Avisos de cancelamento ou reagendamento
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Notificar imediatamente quando uma vaga abrir na agenda do dia
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifyCancellation}
                  onClick={() => setNotifyCancellation((prev) => !prev)}
                  className={`sw bg-[#111111] border border-white/[0.14] ${
                    notifyCancellation ? 'on !border-transparent' : ''
                  }`}
                />
              </div>

              <div className={`${innerSolidBoxClass} flex items-center justify-between gap-4`}>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    Resumo matinal da agenda (07:30)
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Receba toda manhã a lista completa dos clientes e horários do dia
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifyDailySummary}
                  onClick={() => setNotifyDailySummary((prev) => !prev)}
                  className={`sw bg-[#111111] border border-white/[0.14] ${
                    notifyDailySummary ? 'on !border-transparent' : ''
                  }`}
                />
              </div>

              <div className={`${innerSolidBoxClass} flex items-center justify-between gap-4`}>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    Relatório financeiro semanal por e-mail
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Resumo de comparecimento, faltas evitadas e receita da semana
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifyWeeklyFinance}
                  onClick={() => setNotifyWeeklyFinance((prev) => !prev)}
                  className={`sw bg-[#111111] border border-white/[0.14] ${
                    notifyWeeklyFinance ? 'on !border-transparent' : ''
                  }`}
                />
              </div>
            </div>

            {/* Anti-falta timing */}
            <div className={`${innerSolidBoxClass} grid grid-cols-1 sm:grid-cols-2 gap-4`}>
              <div>
                <label className="lbl" htmlFor="rem-time">
                  Envio do lembrete anti-falta ao cliente
                </label>
                <select
                  id="rem-time"
                  value={antiFaltaReminder}
                  onChange={(e) => setAntiFaltaReminder(e.target.value)}
                  className="inp !bg-[#111111] !border-white/[0.1]"
                >
                  <option value="1">1 hora antes do atendimento</option>
                  <option value="2">2 horas antes do atendimento</option>
                  <option value="4">4 horas antes do atendimento</option>
                  <option value="24">24 horas antes (No dia anterior)</option>
                </select>
              </div>

              <div>
                <label className="lbl" htmlFor="cxl-time">
                  Limite para cancelamento pelo WhatsApp
                </label>
                <select
                  id="cxl-time"
                  value={cancelLimitHours}
                  onChange={(e) => setCancelLimitHours(e.target.value)}
                  className="inp !bg-[#111111] !border-white/[0.1]"
                >
                  <option value="1">Até 1 hora antes</option>
                  <option value="2">Até 2 horas antes</option>
                  <option value="4">Até 4 horas antes</option>
                  <option value="12">Até 12 horas antes</option>
                  <option value="24">Até 24 horas antes</option>
                </select>
              </div>
            </div>
          </section>

          {/* Card 2: Segurança & Senha */}
          <section className={`${solidCardClass} rise`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/[0.07]">
              <div className="flex items-center gap-3.5">
                <div className="ibox shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Segurança &amp; Credenciais de Acesso
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Verificação em duas etapas, troca de senha e controle de dispositivos conectados
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-3 py-1 rounded-full self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
                Criptografia Ponta a Ponta
              </span>
            </div>

            <div className="space-y-5">
              {/* 2FA Toggle */}
              <div className={`${innerSolidBoxClass} flex items-center justify-between gap-4`}>
                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      Autenticação em Duas Etapas (2FA via WhatsApp)
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Solicita um código de 6 dígitos enviado ao seu celular ao entrar em um novo navegador
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={twoFactorAuth}
                  onClick={() => setTwoFactorAuth((prev) => !prev)}
                  className={`sw bg-[#111111] border border-white/[0.14] ${
                    twoFactorAuth ? 'on !border-transparent' : ''
                  }`}
                />
              </div>

              {/* Password Update */}
              <div className={innerSolidBoxClass}>
                <div className="flex items-center gap-2.5 mb-4">
                  <KeyRound className="w-4 h-4 text-[#d4af37]" />
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    Alterar Senha de Acesso
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="lbl" htmlFor="cur-pass">
                      Senha Atual
                    </label>
                    <input
                      id="cur-pass"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="inp !bg-[#111111] !border-white/[0.1]"
                    />
                  </div>
                  <div>
                    <label className="lbl" htmlFor="new-pass">
                      Nova Senha
                    </label>
                    <input
                      id="new-pass"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mín. 8 caracteres"
                      className="inp !bg-[#111111] !border-white/[0.1]"
                    />
                  </div>
                  <div>
                    <label className="lbl" htmlFor="conf-pass">
                      Confirmar Senha
                    </label>
                    <input
                      id="conf-pass"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a nova senha"
                      className="inp !bg-[#111111] !border-white/[0.1]"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    className="btn btn-ghost px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Atualizar Senha Agora
                  </button>
                </div>
              </div>

              {/* Active Session */}
              <div className={`${innerSolidBoxClass} flex items-center justify-between gap-4`}>
                <div className="flex items-center gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#d4af37] shrink-0">
                    <Laptop className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      macOS • Navegador Web (Sessão Atual)
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      São Paulo, Brasil • Conexão verificada
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ativo Agora
                </span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 mt-6 border-t border-white/[0.07]">
              <Link
                to="/dashboard/configuracoes"
                className="btn btn-ghost px-5 py-3 rounded-xl text-xs font-bold"
              >
                Cancelar e Voltar
              </Link>

              <button
                type="submit"
                className="btn btn-gold px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Preferências Salvas!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Salvar Notificações e Segurança</span>
                  </>
                )}
              </button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}

export default SettingsNotificationsPage;
