import { DashboardIcon } from './DashboardIcons';

interface AutomationCardProps {
  onClickConversations: () => void;
}

export function AutomationCard({ onClickConversations }: AutomationCardProps) {
  return (
    <button
      type="button"
      onClick={onClickConversations}
      className="card lift w-full rise p-3 sm:p-3.5 lg:p-4 flex items-center justify-between gap-3 group text-left cursor-pointer transition-all"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="ibox !w-9 !h-9 sm:!w-10 sm:!h-10 !text-base shrink-0">
          <DashboardIcon name="bot" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="dot shrink-0 !w-2 !h-2" />
            <span className="text-[11px] sm:text-xs font-bold text-green-400 truncate">
              Status: Online
            </span>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm leading-snug line-clamp-1 sm:line-clamp-none">
            O robô respondeu a <b className="text-white font-semibold">5 clientes</b> hoje.
          </p>
        </div>
      </div>

      <span className="pill shrink-0 !py-1 !px-2.5 text-xs">
        <span className="hidden sm:inline">Ver conversas</span>
        <span className="pill-ic !w-5 !h-5 !text-xs">
          <DashboardIcon name="arr" />
        </span>
      </span>
    </button>
  );
}
