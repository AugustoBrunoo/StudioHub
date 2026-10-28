import React from 'react';
import gsap from 'gsap';
import { DashboardIcon } from './DashboardIcons';

interface QuickActionsCardProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onActionToast: (msg: string) => void;
}

export function QuickActionsCard({
  isPaused,
  onTogglePause,
  onActionToast,
}: QuickActionsCardProps) {
  const triggerBounce = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    gsap.fromTo(
      el,
      { scale: 0.94 },
      { scale: 1, duration: 0.5, ease: 'back.out(3)' }
    );
  };

  const handleEncaixe = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerBounce(e);
    onActionToast('Novo encaixe aberto na agenda');
  };

  const handleBloquear = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerBounce(e);
    onActionToast('Selecione o horário a bloquear');
  };

  const handlePause = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerBounce(e);
    onTogglePause();
  };

  return (
    <article className="card w-full rise p-3.5 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between">
      <div className="mb-3 sm:mb-4">
        <span className="tag text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.2em] font-bold uppercase">
          Ações rápidas
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:gap-3 flex-1">
        {/* Novo Encaixe */}
        <button
          type="button"
          onClick={handleEncaixe}
          className="act !p-2 sm:!p-3 !gap-1.5 text-center rounded-xl cursor-pointer"
        >
          <span className="ibox !w-8 !h-8 sm:!w-9 sm:!h-9 !text-sm">
            <DashboardIcon name="plus" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold leading-tight line-clamp-2">
            Novo Encaixe
          </span>
        </button>

        {/* Bloquear Horário */}
        <button
          type="button"
          onClick={handleBloquear}
          className="act !p-2 sm:!p-3 !gap-1.5 text-center rounded-xl cursor-pointer"
        >
          <span className="ibox !w-8 !h-8 sm:!w-9 sm:!h-9 !text-sm">
            <DashboardIcon name="lock" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold leading-tight line-clamp-2">
            Bloquear Horário
          </span>
        </button>

        {/* Pausa */}
        <button
          type="button"
          id="pause"
          onClick={handlePause}
          className={`act !p-2 sm:!p-3 !gap-1.5 text-center rounded-xl cursor-pointer ${isPaused ? 'on' : ''}`}
        >
          <span className="ibox !w-8 !h-8 sm:!w-9 sm:!h-9 !text-sm">
            <DashboardIcon name="coffee" />
          </span>
          <span id="pauseT" className="text-[10px] sm:text-[11px] font-semibold leading-tight line-clamp-2">
            {isPaused ? 'Em pausa' : 'Pausa'}
          </span>
        </button>
      </div>
    </article>
  );
}
