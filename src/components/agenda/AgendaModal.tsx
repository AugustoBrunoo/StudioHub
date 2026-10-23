import React from 'react';
import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import { SERVICES, dur, money, hm, toMin } from './types';

interface AgendaModalProps {
  isOpen: boolean;
  isEdit: boolean;
  onClose: () => void;
  onSave: () => void;
  client: string;
  onClientChange: (v: string) => void;
  phone: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  service: string;
  onServiceChange: (v: string) => void;
  data: string;
  onDataChange: (v: string) => void;
  time: string;
  onTimeChange: (v: string) => void;
  error: { msg: string; sug?: number } | null;
  onApplySuggestion: (sug: number) => void;
}

export function AgendaModal({
  isOpen,
  isEdit,
  onClose,
  onSave,
  client,
  onClientChange,
  phone,
  onPhoneChange,
  service,
  onServiceChange,
  data,
  onDataChange,
  time,
  onTimeChange,
  error,
  onApplySuggestion,
}: AgendaModalProps) {
  const currentServiceMeta = SERVICES[service] || { d: 30, p: 45 };

  return (
    <>
      {/* Modal Overlay Backdrop */}
      <div id="ov2" onClick={onClose} className={isOpen ? 'on' : ''} />

      {/* Modal Dialog */}
      <div
        id="md"
        className={`card p-7 sm:p-8 ${isOpen ? 'on' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="tag mb-1.5 text-[#d4af37]">
              {isEdit ? 'Remarcar' : 'Novo'}
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              {isEdit ? 'Remarcar agendamento' : 'Novo agendamento'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="nb !w-9 !h-9 cursor-pointer"
            aria-label="Fechar"
          >
            <DashboardIcon name="x" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Cliente Name */}
          <div>
            <label className="lbl" htmlFor="fC">
              Cliente
            </label>
            <input
              id="fC"
              type="text"
              value={client}
              onChange={(e) => onClientChange(e.target.value)}
              disabled={isEdit}
              className="inp disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Nome do cliente"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="lbl" htmlFor="fP">
              WhatsApp
            </label>
            <input
              id="fP"
              type="text"
              inputMode="tel"
              value={phone}
              onChange={onPhoneChange}
              disabled={isEdit}
              className="inp disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="(21) 99999-9999"
              maxLength={15}
            />
          </div>

          {/* Serviço */}
          <div>
            <label className="lbl" htmlFor="fS">
              Serviço
            </label>
            <select
              id="fS"
              value={service}
              onChange={(e) => onServiceChange(e.target.value)}
              disabled={isEdit}
              className="inp disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {Object.keys(SERVICES).map((s) => (
                <option key={s} value={s}>
                  {s} · {SERVICES[s].d} min · R$ {SERVICES[s].p}
                </option>
              ))}
            </select>
          </div>

          {/* Data e Horário */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="lbl" htmlFor="fD">
                Data
              </label>
              <input
                id="fD"
                type="date"
                value={data}
                onChange={(e) => onDataChange(e.target.value)}
                className="inp"
              />
            </div>
            <div>
              <label className="lbl" htmlFor="fT">
                Horário
              </label>
              <input
                id="fT"
                type="time"
                step="900"
                value={time}
                onChange={(e) => onTimeChange(e.target.value)}
                className="inp"
              />
            </div>
          </div>

          {/* Service & Time Info Box */}
          <div className="rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-gray-300">
            Duração <b className="text-white">{dur(currentServiceMeta.d)}</b> · Valor{' '}
            <b className="text-white">{money(currentServiceMeta.p)}</b>
            {time && (
              <>
                {' '}
                · Termina às{' '}
                <b className="text-white">
                  {hm(toMin(time) + currentServiceMeta.d)}
                </b>
              </>
            )}
          </div>

          {/* Validation Error Banner */}
          {error && (
            <div className="rounded-2xl p-4 text-sm bg-red-400/10 border border-red-400/30 text-red-300">
              {error.msg}
              {error.sug != null && (
                <button
                  type="button"
                  onClick={() => onApplySuggestion(error.sug!)}
                  className="underline font-semibold text-[#f1c40f] ml-1.5 cursor-pointer"
                >
                  Usar {hm(error.sug)}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal Buttons */}
        <div className="flex gap-3 mt-7">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost flex-1 py-4 rounded-2xl cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            className="btn btn-gold flex-[1.4] py-4 rounded-2xl cursor-pointer"
          >
            {isEdit ? 'Salvar novo horário' : 'Salvar agendamento'}
          </button>
        </div>
      </div>
    </>
  );
}
