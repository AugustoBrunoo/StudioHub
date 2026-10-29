import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Seo } from '@/components/common/Seo';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardToast } from '@/layouts/DashboardLayout';
import {
  Building2,
  ArrowLeft,
  Check,
  QrCode,
  Clock,
  Sparkles,
  MapPin,
  Coffee,
} from 'lucide-react';

const WEEK_DAYS = [
  { label: 'Seg', value: 1 },
  { label: 'Ter', value: 2 },
  { label: 'Qua', value: 3 },
  { label: 'Qui', value: 4 },
  { label: 'Sex', value: 5 },
  { label: 'Sáb', value: 6 },
  { label: 'Dom', value: 0 },
];

export function SettingsStudioPage() {
  const { user } = useAuth();
  const showToast = useDashboardToast();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [studioName, setStudioName] = useState(user?.studioName || 'Studio Navalha de Ouro');
  const [botWhatsapp, setBotWhatsapp] = useState('(11) 98765-4321');
  const [cnpj, setCnpj] = useState('42.819.302/0001-88');
  const [address, setAddress] = useState(
    'Rua Oscar Freire, 1140 - Cerqueira César, São Paulo - SP'
  );
  const [openTime, setOpenTime] = useState('09:00');
  const [closeTime, setCloseTime] = useState('19:00');
  const [lunchStart, setLunchStart] = useState('12:30');
  const [lunchEnd, setLunchEnd] = useState('13:30');
  const [hasLunchBreak, setHasLunchBreak] = useState(true);
  const [workDays, setWorkDays] = useState<number[]>([2, 3, 4, 5, 6]);
  const [minLeadTime, setMinLeadTime] = useState('60');
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

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const toggleWorkDay = (dayVal: number) => {
    setWorkDays((prev) =>
      prev.includes(dayVal) ? prev.filter((d) => d !== dayVal) : [...prev, dayVal]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    showToast('Dados do estúdio e horários atualizados com sucesso!');
    setTimeout(() => setSaved(false), 2400);
  };

  const solidCardClass =
    'rounded-[1.6rem] bg-[#111111] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_28px_60px_-30px_rgba(0,0,0,0.95)] p-5 sm:p-7 transition-colors duration-300';

  const innerSolidBoxClass =
    'rounded-2xl bg-[#171717] border border-white/[0.07] p-4 sm:p-5 transition-colors';

  return (
    <div ref={containerRef} className="w-full">
      <Seo
        title="StudioHub | Dados do Estúdio e Expediente"
        description="Configure o nome comercial do seu estúdio, conexão WhatsApp, dias de atendimento e horários."
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
              <span>Configurações • Estúdio</span>
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Dados do Estúdio <span className="gt">&amp; Expediente.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
              Ajuste as informações comerciais enviadas nos comprovantes, o número de WhatsApp controlado pelo robô e sua grade de horários.
            </p>
          </div>
        </header>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Identidade Comercial e Bot */}
          <section className={`${solidCardClass} rise`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/[0.07]">
              <div className="flex items-center gap-3.5">
                <div className="ibox shrink-0">
                  <Building2 className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                      Identidade Comercial &amp; Conexão
                    </h2>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Robô Online
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Dados visíveis aos clientes durante o agendamento automático
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast('Sincronização com o WhatsApp verificada e ativa!')}
                className="btn btn-ghost !py-2.5 !px-4 rounded-xl text-xs cursor-pointer self-start sm:self-auto"
              >
                <QrCode className="w-4 h-4 text-[#d4af37]" />
                <span>Verificar QR Code</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="lbl" htmlFor="studio-name">
                  Nome Comercial do Estúdio
                </label>
                <input
                  id="studio-name"
                  type="text"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="inp !bg-[#181818] !border-white/[0.1]"
                  placeholder="Ex: Studio Navalha de Ouro"
                />
              </div>

              <div>
                <label className="lbl" htmlFor="studio-wpp">
                  WhatsApp Controlado pelo Robô
                </label>
                <input
                  id="studio-wpp"
                  type="tel"
                  value={botWhatsapp}
                  onChange={(e) => setBotWhatsapp(formatPhone(e.target.value))}
                  className="inp !bg-[#181818] !border-white/[0.1]"
                  placeholder="(11) 98765-4321"
                />
              </div>

              <div>
                <label className="lbl" htmlFor="studio-cnpj">
                  CNPJ / Documento Fiscal
                </label>
                <input
                  id="studio-cnpj"
                  type="text"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className="inp !bg-[#181818] !border-white/[0.1]"
                  placeholder="00.000.000/0001-00"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="lbl" htmlFor="studio-address">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    Endereço Completo (Enviado na confirmação do cliente)
                  </span>
                </label>
                <input
                  id="studio-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="inp !bg-[#181818] !border-white/[0.1]"
                  placeholder="Rua, Número, Bairro, Cidade - UF"
                />
              </div>
            </div>
          </section>

          {/* Card 2: Horários de Funcionamento e Pausa */}
          <section className={`${solidCardClass} rise`}>
            <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-white/[0.07]">
              <div className="ibox shrink-0">
                <Clock className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Dias de Funcionamento &amp; Intervalos
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  O assistente nunca oferecerá horários fora do seu expediente ou durante sua pausa fixa
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Days Selector */}
              <div className={innerSolidBoxClass}>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="lbl !m-0">Quais dias da semana o estúdio abre?</span>
                  <span className="text-xs font-extrabold text-[#d4af37]">
                    {workDays.length} dias selecionados
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-5">
                  {WEEK_DAYS.map((day) => {
                    const isSelected = workDays.includes(day.value);
                    return (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => toggleWorkDay(day.value)}
                        className={`py-3 rounded-xl font-extrabold text-xs transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#d4af37] to-[#f1c40f] text-[#0a0a0a] border-transparent shadow-[0_8px_20px_-6px_rgba(212,175,55,0.65)]'
                            : 'bg-[#111111] text-neutral-400 border-white/[0.08] hover:border-[#d4af37]/40 hover:text-white'
                        }`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.07]">
                  <div>
                    <label className="lbl" htmlFor="open-time">
                      Horário de Abertura
                    </label>
                    <input
                      id="open-time"
                      type="time"
                      value={openTime}
                      onChange={(e) => setOpenTime(e.target.value)}
                      className="inp !bg-[#111111] !border-white/[0.1]"
                    />
                  </div>
                  <div>
                    <label className="lbl" htmlFor="close-time">
                      Horário de Fechamento
                    </label>
                    <input
                      id="close-time"
                      type="time"
                      value={closeTime}
                      onChange={(e) => setCloseTime(e.target.value)}
                      className="inp !bg-[#111111] !border-white/[0.1]"
                    />
                  </div>
                </div>
              </div>

              {/* Lunch & Lead Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={innerSolidBoxClass}>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <Coffee className="w-4 h-4 text-[#d4af37]" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white">
                          Pausa / Almoço Fixo
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          Bloqueio diário automático na grade
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={hasLunchBreak}
                      onClick={() => setHasLunchBreak((prev) => !prev)}
                      className={`sw bg-[#111111] border border-white/[0.14] ${
                        hasLunchBreak ? 'on !border-transparent' : ''
                      }`}
                    />
                  </div>

                  <div
                    className={`grid grid-cols-2 gap-3 transition-opacity ${
                      hasLunchBreak ? 'opacity-100' : 'opacity-40 pointer-events-none'
                    }`}
                  >
                    <div>
                      <label className="lbl" htmlFor="lunch-start">
                        Início da Pausa
                      </label>
                      <input
                        id="lunch-start"
                        type="time"
                        value={lunchStart}
                        onChange={(e) => setLunchStart(e.target.value)}
                        className="inp !bg-[#111111] !border-white/[0.1] !py-2.5"
                      />
                    </div>
                    <div>
                      <label className="lbl" htmlFor="lunch-end">
                        Fim da Pausa
                      </label>
                      <input
                        id="lunch-end"
                        type="time"
                        value={lunchEnd}
                        onChange={(e) => setLunchEnd(e.target.value)}
                        className="inp !bg-[#111111] !border-white/[0.1] !py-2.5"
                      />
                    </div>
                  </div>
                </div>

                <div className={`${innerSolidBoxClass} flex flex-col justify-between`}>
                  <div>
                    <label className="lbl" htmlFor="lead-time">
                      Antecedência Mínima para Agendar
                    </label>
                    <select
                      id="lead-time"
                      value={minLeadTime}
                      onChange={(e) => setMinLeadTime(e.target.value)}
                      className="inp !bg-[#111111] !border-white/[0.1]"
                    >
                      <option value="0">Sem antecedência mínima</option>
                      <option value="30">30 minutos antes</option>
                      <option value="60">1 hora antes</option>
                      <option value="120">2 horas antes</option>
                      <option value="240">4 horas antes</option>
                    </select>
                  </div>
                  <p className="hint mt-3">
                    Evita agendamentos de última hora em cima de um atendimento já em andamento.
                  </p>
                </div>
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
                    <span>Dados do Estúdio Salvos!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Salvar Dados do Estúdio</span>
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

export default SettingsStudioPage;
