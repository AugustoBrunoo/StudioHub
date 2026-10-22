import { DashboardIcon } from './DashboardIcons';

interface AutomationCardProps {
  onClickConversations: () => void;
}

export function AutomationCard({ onClickConversations }: AutomationCardProps) {
  return (
    <button
      type="button"
      onClick={onClickConversations}
      className="dash-card dash-lift w-full rise p-6 flex items-center gap-5 group text-left cursor-pointer transition-all"
    >
      <div className="ibox">
        <DashboardIcon name="bot" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="dot" />
          <span className="text-sm font-bold text-green-400">Status: Online</span>
        </div>
        <p className="text-gray-300 text-sm sm:text-base">
          O robô respondeu a <b className="text-white font-semibold">5 clientes</b> hoje.
        </p>
      </div>

      <span className="pill">
        <span className="hidden sm:inline">Ver conversas</span>
        <span className="pill-ic">
          <DashboardIcon name="arr" />
        </span>
      </span>
    </button>
  );
}
