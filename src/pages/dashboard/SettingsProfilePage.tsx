import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Seo } from '@/components/common/Seo';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardToast } from '@/layouts/DashboardLayout';
import {
  User,
  ArrowLeft,
  Check,
  Sparkles,
  Mail,
  Phone,
  Briefcase,
  BadgeCheck,
} from 'lucide-react';

export function SettingsProfilePage() {
  const { user } = useAuth();
  const showToast = useDashboardToast();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState(user?.name?.replace(/\s*\(.*?\)\s*/g, '') || 'João Mendes');
  const [nickname, setNickname] = useState('João');
  const [email, setEmail] = useState(user?.email || 'joao@navalhadeouro.com.br');
  const [personalPhone, setPersonalPhone] = useState('(11) 99812-4500');
  const [roleTitle, setRoleTitle] = useState('Barbeiro Mestre & Fundador');
  const [bio, setBio] = useState(
    'Especialista em cortes clássicos, visagismo e barba na toalha quente há mais de 8 anos.'
  );
  const [saved, setSaved] = useState(false);

  const studioName = user?.studioName || 'Studio Navalha de Ouro';

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    showToast('Perfil do profissional atualizado com sucesso!');
    setTimeout(() => setSaved(false), 2400);
  };

  const initials =
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'SH';

  const solidCardClass =
    'rounded-[1.6rem] bg-[#111111] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_28px_60px_-30px_rgba(0,0,0,0.95)] p-5 sm:p-7 transition-colors duration-300';

  const innerSolidBoxClass =
    'rounded-2xl bg-[#171717] border border-white/[0.07] p-4 sm:p-5 transition-colors';

  return (
    <div ref={containerRef} className="w-full">
      <Seo
        title="StudioHub | Perfil do Profissional"
        description="Gerencie seus dados pessoais, forma de tratamento e apresentação aos clientes no StudioHub."
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
              <span>Configurações • Perfil</span>
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Perfil do <span className="gt">Profissional.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
              Defina suas informações pessoais, contatos diretos para avisos e como o assistente se refere a você no WhatsApp.
            </p>
          </div>
        </header>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Identidade & Crachá */}
          <section className={`${solidCardClass} rise`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/[0.07]">
              <div className="flex items-center gap-3.5">
                <div className="ibox shrink-0">
                  <User className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                      Identidade &amp; Apresentação
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                      Conta Titular
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Esses dados identificam você no painel e nas confirmações enviadas aos clientes
                  </p>
                </div>
              </div>

              {/* Avatar Badge */}
              <div className="flex items-center gap-3 p-2.5 pr-4 rounded-2xl bg-[#171717] border border-white/[0.07]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#f1c40f] text-[#0a0a0a] font-extrabold text-base flex items-center justify-center shadow-[0_0_18px_rgba(212,175,55,0.4)] shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs sm:text-sm font-extrabold text-white truncate">
                      {name || 'Profissional'}
                    </p>
                    <BadgeCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate">{roleTitle}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="lbl" htmlFor="prof-name">
                  Nome Completo
                </label>
                <input
                  id="prof-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="inp !bg-[#181818] !border-white/[0.1]"
                  placeholder="Ex: João Mendes"
                />
              </div>

              <div>
                <label className="lbl" htmlFor="prof-nickname">
                  Como gosta de ser chamado (Apelido)
                </label>
                <input
                  id="prof-nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="inp !bg-[#181818] !border-white/[0.1]"
                  placeholder="Ex: João"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="lbl" htmlFor="prof-role">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#d4af37]" />
                    Especialidade / Cargo no Estúdio
                  </span>
                </label>
                <input
                  id="prof-role"
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="inp !bg-[#181818] !border-white/[0.1]"
                  placeholder="Ex: Barbeiro Mestre & Fundador"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="lbl" htmlFor="prof-bio">
                  Resumo Profissional (Opcional)
                </label>
                <textarea
                  id="prof-bio"
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="inp !bg-[#181818] !border-white/[0.1] resize-none"
                  placeholder="Conte brevemente sua especialidade..."
                />
              </div>
            </div>

            {/* WhatsApp Greeting Preview */}
            <div className={innerSolidBoxClass}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-1.5">
                Como o cliente verá no WhatsApp
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                &ldquo;Olá! Você está no WhatsApp do{' '}
                <strong className="text-[#f1c40f]">{studioName}</strong>, falando com o assistente virtual de{' '}
                <strong className="text-[#f1c40f]">{nickname || name || 'você'}</strong>. Como posso agendar seu horário hoje?&rdquo;
              </p>
            </div>
          </section>

          {/* Card 2: Contatos Diretos do Titular */}
          <section className={`${solidCardClass} rise`}>
            <div className="pb-4 mb-5 border-b border-white/[0.07]">
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Canais de Contato Pessoal
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Utilizados para login, recuperação de conta e recebimento de alertas particulares da sua agenda
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="lbl" htmlFor="prof-email">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                    E-mail Principal de Acesso
                  </span>
                </label>
                <input
                  id="prof-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inp !bg-[#181818] !border-white/[0.1]"
                  placeholder="seu@email.com.br"
                />
                <p className="hint">Usado para entrar no StudioHub e receber relatórios financeiros.</p>
              </div>

              <div>
                <label className="lbl" htmlFor="prof-phone">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    Celular Pessoal (Receber Avisos)
                  </span>
                </label>
                <input
                  id="prof-phone"
                  type="tel"
                  value={personalPhone}
                  onChange={(e) => setPersonalPhone(formatPhone(e.target.value))}
                  className="inp !bg-[#181818] !border-white/[0.1]"
                  placeholder="(11) 99999-9999"
                />
                <p className="hint">Onde você recebe o resumo matinal e avisos de novos agendamentos.</p>
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
                    <span>Perfil Salvo com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Salvar Alterações do Perfil</span>
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

export default SettingsProfilePage;
