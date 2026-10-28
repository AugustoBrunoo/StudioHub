import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardIcon } from '@/components/dashboard/DashboardIcons';
import { SCHEDULE_CONFIG } from './types';

interface AgendaHeaderProps {
  isHoursPopOpen: boolean;
  onToggleHoursPop: (e: React.MouseEvent) => void;
  onCloseHoursPop: () => void;
  onOpenNewAppointment: () => void;
  hoursBtnRef: React.RefObject<HTMLButtonElement | null>;
  hoursPopRef: React.RefObject<HTMLDivElement | null>;
}

export function AgendaHeader({
  isHoursPopOpen,
  onToggleHoursPop,
  onCloseHoursPop,
  onOpenNewAppointment,
  hoursBtnRef,
  hoursPopRef,
}: AgendaHeaderProps) {
  return (
    <div className="rise flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-5 mb-6 sm:mb-8">
      <div>
        <h1 className="text-[1.85rem] leading-tight sm:text-4xl font-extrabold tracking-tight">
          Sua <span className="gt">agenda.</span>
        </h1>
      </div>

      <div className="relative grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
        {/* Meus Horários Button */}
        <button
          ref={hoursBtnRef}
          id="hrsBtn"
          type="button"
          onClick={onToggleHoursPop}
          className="btn btn-ghost px-3 sm:px-5 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base cursor-pointer"
          aria-haspopup="true"
          aria-expanded={isHoursPopOpen}
        >
          <DashboardIcon name="clock" className="text-base sm:text-lg" />
          <span className="sm:hidden">Horários</span>
          <span className="hidden sm:inline">Meus horários</span>
        </button>

        {/* Novo Agendamento Button */}
        <button
          id="newBtn"
          type="button"
          onClick={onOpenNewAppointment}
          className="btn btn-gold px-3 sm:px-7 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base cursor-pointer"
        >
          <DashboardIcon name="plus" className="text-base sm:text-lg" />
          <span className="sm:hidden">Agendar</span>
          <span className="hidden sm:inline">Novo agendamento</span>
        </button>

        {/* Popover Meus Horários */}
        <div
          ref={hoursPopRef}
          id="pop"
          className={`absolute left-0 right-0 sm:left-auto top-full mt-3 z-50 sm:w-[22rem] max-w-full sm:max-w-[calc(100vw-2.5rem)] p-4 sm:p-5 rounded-3xl border border-white/10 bg-[#0f0f0f]/95 backdrop-blur-xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] ${
            isHoursPopOpen ? 'on' : ''
          }`}
        >
          <div className="mb-4">
            <p className="tag text-[#d4af37]">Seus horários</p>
            <p className="text-xs text-gray-500 mt-1">Definidos por você no cadastro</p>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-3">
            {[
              ['Seg', 1],
              ['Ter', 2],
              ['Qua', 3],
              ['Qui', 4],
              ['Sex', 5],
              ['Sáb', 6],
              ['Dom', 0],
            ].map(([label, dayIndex]) => (
              <span
                key={String(label)}
                className={`text-center text-[11px] font-bold py-2 rounded-lg ${
                  SCHEDULE_CONFIG.days.includes(Number(dayIndex))
                    ? 'text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] to-[#f1c40f]'
                    : 'text-gray-600 bg-white/5'
                }`}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="divide-y divide-white/10">
            <div className="flex items-center gap-3 py-2.5">
              <span className="ibox !w-8 !h-8 !rounded-lg !text-sm text-[#d4af37]">
                <DashboardIcon name="clock" />
              </span>
              <span className="text-sm text-gray-400 flex-1">Expediente</span>
              <span className="text-sm font-bold tabular-nums text-right">
                {SCHEDULE_CONFIG.open} – {SCHEDULE_CONFIG.close}
              </span>
            </div>
            <div className="flex items-center gap-3 py-2.5">
              <span className="ibox !w-8 !h-8 !rounded-lg !text-sm text-[#d4af37]">
                <DashboardIcon name="coffee" />
              </span>
              <span className="text-sm text-gray-400 flex-1">Pausa</span>
              <span className="text-sm font-bold tabular-nums text-right">
                {SCHEDULE_CONFIG.p0} – {SCHEDULE_CONFIG.p1}
              </span>
            </div>
            <div className="flex items-center gap-3 py-2.5">
              <span className="ibox !w-8 !h-8 !rounded-lg !text-sm text-[#d4af37]">
                <DashboardIcon name="cal" />
              </span>
              <span className="text-sm text-gray-400 flex-1">Antecedência mínima</span>
              <span className="text-sm font-bold tabular-nums text-right">
                {SCHEDULE_CONFIG.lead}
              </span>
            </div>
            <div className="flex items-center gap-3 py-2.5">
              <span className="ibox !w-8 !h-8 !rounded-lg !text-sm text-[#d4af37]">
                <DashboardIcon name="bot" />
              </span>
              <span className="text-sm text-gray-400 flex-1">Lembrete ao cliente</span>
              <span className="text-sm font-bold tabular-nums text-right">
                {SCHEDULE_CONFIG.rem}
              </span>
            </div>
            <div className="flex items-center gap-3 py-2.5">
              <span className="ibox !w-8 !h-8 !rounded-lg !text-sm text-[#d4af37]">
                <DashboardIcon name="userx" />
              </span>
              <span className="text-sm text-gray-400 flex-1">Cancelamento pelo cliente</span>
              <span className="text-sm font-bold tabular-nums text-right">
                {SCHEDULE_CONFIG.cxl}
              </span>
            </div>
          </div>

          <Link
            to="/dashboard/configuracoes"
            onClick={onCloseHoursPop}
            className="btn btn-ghost w-full mt-4 py-3 rounded-2xl text-sm"
          >
            <DashboardIcon name="gear" className="text-base" />
            Editar em Configurações
          </Link>
        </div>
      </div>
    </div>
  );
}
