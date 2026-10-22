import {
  REMINDER_OPTIONS,
  CANCEL_OPTIONS,
  formatMinutes,
} from './register.types';

interface RegisterStepAntiNoShowProps {
  shop: string;
  reminderTime: number;
  setReminderTime: (time: number) => void;
  cancelTime: number;
  setCancelTime: (time: number) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function RegisterStepAntiNoShow({
  shop,
  reminderTime,
  setReminderTime,
  cancelTime,
  setCancelTime,
  onBack,
  onContinue,
}: RegisterStepAntiNoShowProps) {
  const reminderWindow =
    reminderTime === 24 ? 'amanhã' : `daqui a ${formatMinutes(reminderTime * 60)}`;

  return (
    <div>
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.26em] text-[#d4af37] mb-4">
          <span className="w-6 h-px bg-[#d4af37]" />
          Passo 4 de 5
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1] mb-3 text-white">
          Automação <span className="gt">anti-falta.</span>
        </h2>
        <p className="text-white/85 leading-relaxed text-sm sm:text-base">
          As regras do jogo: configurações finais para o assistente agir preventivamente.
        </p>
      </div>

      <div className="space-y-7">
        {/* Reminder Timing */}
        <div className="f">
          <span className="lbl">Quanto tempo antes do corte o robô envia o lembrete?</span>
          <div className="flex flex-wrap gap-2.5">
            {REMINDER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setReminderTime(opt.value)}
                className={`chip gl ${reminderTime === opt.value ? 'on' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Reminder Bubble Preview */}
        <div className="f gl bubble rounded-2xl">
          <p className="text-[10px] uppercase tracking-[.2em] text-white/60 font-semibold mb-1.5">
            Exemplo de lembrete
          </p>
          <p id="pv4" className="text-white">
            Olá! Lembrete: seu horário no <b className="text-[#f1c40f]">{shop || 'Studio'}</b> é{' '}
            {reminderWindow}. Responda <b>CANCELAR</b> se precisar desmarcar.
          </p>
        </div>

        {/* Cancellation Window */}
        <div className="f">
          <span className="lbl">Até quanto tempo antes o cliente pode cancelar pelo WhatsApp?</span>
          <div className="flex flex-wrap gap-2.5">
            {CANCEL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCancelTime(opt.value)}
                className={`chip gl ${cancelTime === opt.value ? 'on' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="hint" id="h4">
            Cancelamentos automáticos só são permitidos com até {formatMinutes(cancelTime * 60)} de
            antecedência; depois disso, o cliente recebe uma mensagem pedindo para ligar.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-9">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost px-7 py-4 rounded-2xl bk flex items-center gap-2"
        >
          <svg className="i w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Voltar</span>
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="btn btn-gold px-8 py-4 rounded-2xl nx flex items-center gap-2"
        >
          <span>Gerar QR Code</span>
          <svg className="i w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
