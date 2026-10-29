import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Seo } from '@/components/common/Seo';
import { useDashboardToast } from '@/layouts/DashboardLayout';
import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import {
  CreditCard,
  ArrowLeft,
  Check,
  FileText,
  Download,
  Crown,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  month: string;
  date: string;
  amount: string;
  method: string;
  status: 'Pago' | 'Pendente';
}

const INVOICES: InvoiceItem[] = [
  {
    id: 'INV-2026-10',
    month: 'Outubro 2026',
    date: '15 Out, 2026',
    amount: 'R$ 97,00',
    method: 'Pix Automático',
    status: 'Pago',
  },
  {
    id: 'INV-2026-09',
    month: 'Setembro 2026',
    date: '15 Set, 2026',
    amount: 'R$ 97,00',
    method: 'Cartão •••• 4829',
    status: 'Pago',
  },
  {
    id: 'INV-2026-08',
    month: 'Agosto 2026',
    date: '15 Ago, 2026',
    amount: 'R$ 97,00',
    method: 'Cartão •••• 4829',
    status: 'Pago',
  },
];

export function SettingsBillingPage() {
  const showToast = useDashboardToast();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<'solo' | 'premium' | 'master'>('solo');
  const [autoRenew, setAutoRenew] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('card');
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

  const handleSaveBilling = () => {
    setSaved(true);
    showToast('Configurações de plano e faturamento salvas com sucesso!');
    setTimeout(() => setSaved(false), 2400);
  };

  const solidCardClass =
    'rounded-[1.6rem] bg-[#111111] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_28px_60px_-30px_rgba(0,0,0,0.95)] p-5 sm:p-7 transition-colors duration-300';

  const innerSolidBoxClass =
    'rounded-2xl bg-[#171717] border border-white/[0.07] p-4 sm:p-5 transition-colors';

  return (
    <div ref={containerRef} className="w-full">
      <Seo
        title="StudioHub | Faturamento, Mensalidade e Plano"
        description="Gerencie sua assinatura StudioHub, faça upgrade de plano, altere o método de pagamento e baixe suas faturas."
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24 relative z-10">
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
              <span>Configurações • Assinatura</span>
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Faturamento <span className="gt">&amp; Plano.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
              Acompanhe sua mensalidade atual, compare recursos para expandir seu estúdio, gerencie formas de pagamento e baixe seus recibos.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-end">
            <span className="text-xs text-neutral-400">Próximo vencimento:</span>
            <span className="text-xs font-extrabold text-white bg-[#181818] border border-white/[0.1] px-3 py-1.5 rounded-xl">
              15 Nov, 2026
            </span>
          </div>
        </header>

        <div className="space-y-6">
          {/* Card 1: Planos e Upgrade */}
          <section className={`${solidCardClass} rise`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/[0.07]">
              <div className="flex items-center gap-3.5">
                <div className="ibox shrink-0">
                  <Crown className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                      Seu Plano StudioHub
                    </h2>
                    <span className="wb gold">Assinatura Ativa</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Mude de plano a qualquer momento sem multa ou fidelidade
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Plano Solo */}
              <div
                onClick={() => setSelectedPlan('solo')}
                className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'solo'
                    ? 'bg-[#19160e] border-[#d4af37] shadow-[0_18px_40px_-20px_rgba(212,175,55,0.45)]'
                    : 'bg-[#161616] border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-extrabold text-white">Plano Solo</h3>
                    {selectedPlan === 'solo' && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f1c40f] text-[#0a0a0a]">
                        Atual
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mb-4">
                    Digitalização inteligente para o profissional autônomo.
                  </p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">R$ 97</span>
                    <span className="text-xs text-neutral-400 font-semibold">,00 / mês</span>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300 mb-5">
                    <li className="flex items-center gap-2">
                      <DashboardIcon name="ok" className="text-[#d4af37] shrink-0" />
                      <span>01 Agenda / Profissional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <DashboardIcon name="ok" className="text-[#d4af37] shrink-0" />
                      <span>Bot WhatsApp 24h via QR Code</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <DashboardIcon name="ok" className="text-[#d4af37] shrink-0" />
                      <span>Lembretes Anti-falta automáticos</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan('solo');
                    showToast('Plano Solo mantido como sua assinatura atual.');
                  }}
                  className={`btn w-full py-2.5 rounded-xl text-xs font-extrabold ${
                    selectedPlan === 'solo' ? 'btn-gold' : 'btn-ghost'
                  }`}
                >
                  {selectedPlan === 'solo' ? 'Plano Ativo' : 'Selecionar Solo'}
                </button>
              </div>

              {/* Plano Premium */}
              <div
                onClick={() => setSelectedPlan('premium')}
                className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'premium'
                    ? 'bg-[#19160e] border-[#d4af37] shadow-[0_18px_40px_-20px_rgba(212,175,55,0.45)]'
                    : 'bg-[#161616] border-[#d4af37]/35 hover:border-[#d4af37]/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Crown className="w-4 h-4 text-[#f1c40f]" />
                      <h3 className="text-base font-extrabold text-white">Premium</h3>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 text-[#f1c40f] border border-[#d4af37]/30">
                      Popular
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4">
                    Para estúdios em expansão com Mediação IA e EasyWallet Lite.
                  </p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#f1c40f]">
                      R$ 197
                    </span>
                    <span className="text-xs text-neutral-400 font-semibold">,00 / mês</span>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300 mb-5">
                    <li className="flex items-center gap-2">
                      <DashboardIcon name="ok" className="text-[#d4af37] shrink-0" />
                      <span>Até 05 Agendas / Profissionais</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <DashboardIcon name="ok" className="text-[#d4af37] shrink-0" />
                      <span>Motor de Mediação de Conflitos IA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <DashboardIcon name="ok" className="text-[#d4af37] shrink-0" />
                      <span>Módulo Financeiro EasyWallet Lite</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan('premium');
                    showToast('Upgrade para o Plano Premium selecionado!');
                  }}
                  className={`btn w-full py-2.5 rounded-xl text-xs font-extrabold ${
                    selectedPlan === 'premium' ? 'btn-gold' : 'btn-ghost'
                  }`}
                >
                  {selectedPlan === 'premium' ? 'Plano Selecionado' : 'Fazer Upgrade Premium'}
                </button>
              </div>

              {/* Plano Hub Master */}
              <div
                onClick={() => setSelectedPlan('master')}
                className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'master'
                    ? 'bg-[#19160e] border-[#d4af37] shadow-[0_18px_40px_-20px_rgba(212,175,55,0.45)]'
                    : 'bg-[#161616] border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-extrabold text-white">Hub Master</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.06] text-neutral-300">
                      Redes
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4">
                    Controle total, split de comissões e emissão de NFS-e.
                  </p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">R$ 397</span>
                    <span className="text-xs text-neutral-400 font-semibold">,00 / mês</span>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300 mb-5">
                    <li className="flex items-center gap-2">
                      <DashboardIcon name="ok" className="text-[#d4af37] shrink-0" />
                      <span>Agendas &amp; Profissionais Ilimitados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <DashboardIcon name="ok" className="text-[#d4af37] shrink-0" />
                      <span>EasyWallet Pro (Split de Comissões)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <DashboardIcon name="ok" className="text-[#d4af37] shrink-0" />
                      <span>Emissão automática de Notas Fiscais</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan('master');
                    showToast('Plano Hub Master selecionado!');
                  }}
                  className={`btn w-full py-2.5 rounded-xl text-xs font-extrabold ${
                    selectedPlan === 'master' ? 'btn-gold' : 'btn-ghost'
                  }`}
                >
                  {selectedPlan === 'master' ? 'Plano Selecionado' : 'Migrar para Master'}
                </button>
              </div>
            </div>
          </section>

          {/* Card 2: Método de Pagamento & Histórico de Mensalidades */}
          <section className={`${solidCardClass} rise`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Método de Pagamento */}
              <div className={`lg:col-span-5 ${innerSolidBoxClass} flex flex-col justify-between gap-4`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#d4af37]" />
                      <p className="text-xs font-extrabold uppercase tracking-wider text-white">
                        Método de Pagamento
                      </p>
                    </div>
                    <span className="text-[11px] text-[#d4af37] font-semibold">Ativo</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[#1f1b10] border-[#d4af37] text-white'
                          : 'bg-[#111111] border-white/[0.08] text-neutral-400 hover:text-white'
                      }`}
                    >
                      <p className="text-xs font-extrabold">Cartão de Crédito</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">Mastercard •••• 4829</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === 'pix'
                          ? 'bg-[#1f1b10] border-[#d4af37] text-white'
                          : 'bg-[#111111] border-white/[0.08] text-neutral-400 hover:text-white'
                      }`}
                    >
                      <p className="text-xs font-extrabold">Pix Automático</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">QR Code mensal</p>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/[0.07]">
                    <div>
                      <p className="text-xs font-bold text-white">Renovação Automática</p>
                      <p className="text-[11px] text-neutral-400">
                        Evita interrupção do robô no vencimento
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={autoRenew}
                      onClick={() => setAutoRenew((prev) => !prev)}
                      className={`sw bg-[#111111] border border-white/[0.14] ${
                        autoRenew ? 'on !border-transparent' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      showToast('Modal de atualização de cartão / chave Pix acionado')
                    }
                    className="btn btn-ghost w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Alterar Cartão ou Chave Pix
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      showToast('Para pausar ou cancelar sua assinatura, fale com nosso suporte VIP.')
                    }
                    className="btn btn-ghost w-full py-2 rounded-xl text-[11px] text-neutral-400 cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Pausar Assinatura</span>
                  </button>
                </div>
              </div>

              {/* Histórico de Faturas */}
              <div className={`lg:col-span-7 ${innerSolidBoxClass}`}>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#d4af37]" />
                    <p className="text-xs font-extrabold uppercase tracking-wider text-white">
                      Histórico de Faturas &amp; Recibos
                    </p>
                  </div>
                  <span className="text-[11px] text-neutral-400">Últimos 3 meses</span>
                </div>

                <div className="divide-y divide-white/[0.07]">
                  {INVOICES.map((inv) => (
                    <div
                      key={inv.id}
                      className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#d4af37] shrink-0">
                          <Check className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-white">
                            {inv.month}{' '}
                            <span className="text-neutral-500 font-normal">• {inv.id}</span>
                          </p>
                          <p className="text-[11px] text-neutral-400">
                            Pago em {inv.date} via {inv.method}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className="text-xs sm:text-sm font-extrabold tabular-nums text-white">
                          {inv.amount}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {inv.status}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            showToast(`Recibo ${inv.id} (${inv.month}) baixado em PDF`)
                          }
                          className="p-2 rounded-lg bg-[#111111] border border-white/[0.08] text-neutral-300 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors cursor-pointer"
                          title="Baixar nota / recibo em PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 mt-6 border-t border-white/[0.07]">
              <Link
                to="/dashboard/configuracoes"
                className="btn btn-ghost px-5 py-3 rounded-xl text-xs font-bold"
              >
                Voltar para Configurações
              </Link>

              <button
                type="button"
                onClick={handleSaveBilling}
                className="btn btn-gold px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Assinatura Atualizada!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirmar Preferências de Plano</span>
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SettingsBillingPage;
