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
    <article className="card w-full rise p-6 sm:p-7 flex-1 flex flex-col">
      <div className="mb-5">
        <span className="tag">Ações rápidas</span>
      </div>

      <div className="grid grid-cols-3 gap-3 flex-1 min-h-[120px]">
        {/* Novo Encaixe */}
        <button
          type="button"
          onClick={handleEncaixe}
          className="act"
        >
          <span className="ibox">
            <DashboardIcon name="plus" />
          </span>
          <span>Novo Encaixe</span>
        </button>

        {/* Bloquear Horário */}
        <button
          type="button"
          onClick={handleBloquear}
          className="act"
        >
          <span className="ibox">
            <DashboardIcon name="lock" />
          </span>
          <span>Bloquear Horário</span>
        </button>

        {/* Pausa */}
        <button
          type="button"
          id="pause"
          onClick={handlePause}
          className={`act ${isPaused ? 'on' : ''}`}
        >
          <span className="ibox">
            <DashboardIcon name="coffee" />
          </span>
          <span id="pauseT">{isPaused ? 'Em pausa' : 'Pausa'}</span>
        </button>
      </div>
    </article>
  );
}
