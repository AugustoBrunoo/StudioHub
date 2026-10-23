interface RegisterStepIdentityProps {
  shop: string;
  setShop: (value: string) => void;
  shopBad: boolean;
  setShopBad: (bad: boolean) => void;
  owner: string;
  setOwner: (value: string) => void;
  ownerBad: boolean;
  setOwnerBad: (bad: boolean) => void;
  wpp: string;
  handleWppChange: (val: string) => void;
  wppBad: boolean;
  onContinue: () => void;
  onCancel?: () => void;
}

export function RegisterStepIdentity({
  shop,
  setShop,
  shopBad,
  setShopBad,
  owner,
  setOwner,
  ownerBad,
  setOwnerBad,
  wpp,
  handleWppChange,
  wppBad,
  onContinue,
  onCancel,
}: RegisterStepIdentityProps) {
  return (
    <div>
      <div className="mb-5 sm:mb-8 text-center sm:text-left">
        <span className="inline-flex items-center justify-center sm:justify-start gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[.22em] sm:tracking-[.26em] text-[#d4af37] mb-2 sm:mb-4 mx-auto sm:mx-0">
          <span className="w-5 sm:w-6 h-px bg-[#d4af37]" />
          Plano Solo · Passo 1 de 5
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] mb-2 sm:mb-3 text-white">
          Bem-vindo ao <span className="gt">StudioHub</span>
        </h1>
        <p className="text-white/85 leading-relaxed text-xs sm:text-sm md:text-base max-w-lg mx-auto sm:mx-0">
          Identidade e Conexão: esses dados personalizam a experiência do cliente final no WhatsApp.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Studio / Shop Name */}
        <div className="f">
          <label className="lbl" htmlFor="shop">
            Qual o nome da sua barbearia / estúdio?
          </label>
          <input
            id="shop"
            className={`inp gl ${shopBad ? 'bad' : ''}`}
            placeholder="Ex: Studio Navalha de Ouro"
            value={shop}
            onChange={(e) => {
              setShop(e.target.value);
              if (shopBad) setShopBad(false);
            }}
            autoComplete="organization"
          />
        </div>

        {/* Owner Name */}
        <div className="f">
          <label className="lbl" htmlFor="owner">
            Como você gosta de ser chamado?
          </label>
          <input
            id="owner"
            className={`inp gl ${ownerBad ? 'bad' : ''}`}
            placeholder="Ex: João"
            value={owner}
            onChange={(e) => {
              setOwner(e.target.value);
              if (ownerBad) setOwnerBad(false);
            }}
            autoComplete="given-name"
          />
        </div>

        {/* WhatsApp Phone */}
        <div className="f">
          <label className="lbl" htmlFor="wpp">
            Qual o número de WhatsApp que o robô vai controlar?
          </label>
          <input
            id="wpp"
            className={`inp gl ${wppBad ? 'bad' : ''}`}
            inputMode="tel"
            placeholder="(21) 99999-9999"
            maxLength={15}
            value={wpp}
            onChange={(e) => handleWppChange(e.target.value)}
            autoComplete="tel"
          />
          <p className="hint">Esse número será vinculado ao seu assistente no último passo.</p>
        </div>

        {/* Live Client Perspective Bubble */}
        <div className="f gl bubble rounded-xl sm:rounded-2xl">
          <p className="text-[10px] uppercase tracking-[.2em] text-white/60 font-semibold mb-1 sm:mb-1.5">
            Como o cliente verá
          </p>
          <p id="pv1" className="text-white text-xs sm:text-sm leading-relaxed">
            Olá! Você está no WhatsApp do <b className="text-[#f1c40f]">{shop || 'Studio'}</b>, com o assistente de{' '}
            <b className="text-[#f1c40f]">{owner || 'você'}</b>.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-3 mt-6 sm:mt-9">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-white/50 hover:text-white/80 underline-offset-4 hover:underline transition-colors py-2 px-1"
          >
            Cancelar e sair
          </button>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={onContinue}
          className="btn btn-gold w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl nx flex items-center justify-center gap-2 text-sm sm:text-base font-semibold"
        >
          <span>Continuar</span>
          <svg className="i w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
