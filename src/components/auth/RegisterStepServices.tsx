import {
  type ServiceItem,
  DURATION_OPTIONS,
  formatMinutes,
} from './register.types';

interface RegisterStepServicesProps {
  services: ServiceItem[];
  servicesBad: Record<string, boolean>;
  addService: () => void;
  removeService: (id: string, rowEl: HTMLDivElement | null) => void;
  updateService: (id: string, updates: Partial<Omit<ServiceItem, 'id'>>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function RegisterStepServices({
  services,
  servicesBad,
  addService,
  removeService,
  updateService,
  onBack,
  onContinue,
}: RegisterStepServicesProps) {
  return (
    <div>
      <div className="mb-5 sm:mb-8">
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[.22em] sm:tracking-[.26em] text-[#d4af37] mb-2 sm:mb-4">
          <span className="w-5 sm:w-6 h-px bg-[#d4af37]" />
          Passo 3 de 5
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] mb-2 sm:mb-3 text-white">
          O que você <span className="gt">vende?</span>
        </h2>
        <p className="text-white/85 leading-relaxed text-xs sm:text-sm md:text-base">
          Quais serviços você oferece, quanto custam e quanto tempo leva cada um? O assistente usa a duração para não sobrepor clientes.
        </p>
      </div>

      <div id="svcs" className="space-y-2.5 sm:space-y-3">
        {services.map((svc) => (
          <div
            key={svc.id}
            id={`svc-${svc.id}`}
            className="svc gl"
          >
            {/* Top on mobile: Name input + Mobile Delete Button */}
            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <input
                  className={`inp gl sn ${servicesBad[svc.id] ? 'bad' : ''} flex-1`}
                  placeholder="Nome do serviço"
                  value={svc.name}
                  aria-label="Nome do serviço"
                  onChange={(e) => updateService(svc.id, { name: e.target.value })}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const rowEl = (e.currentTarget.closest('.svc') as HTMLDivElement) || null;
                    removeService(svc.id, rowEl);
                  }}
                  className="rm sm:hidden"
                  aria-label={`Remover serviço ${svc.name || ''}`}
                  title="Remover serviço"
                >
                  <svg className="i text-base w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] sm:text-[11px] text-white/60 mt-1 ml-1 sb">
                Ocupa {svc.duration / 15} bloco(s) de 15 min na agenda
              </p>
            </div>

            {/* Bottom on mobile: Price & Duration in 2 columns. On desktop (sm:): direct grid items */}
            <div className="grid grid-cols-2 gap-2 sm:contents">
              {/* Price with R$ Prefix */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-xs sm:text-sm select-none">
                  R$
                </span>
                <input
                  className="inp gl sp"
                  style={{ paddingLeft: '2.1rem' }}
                  inputMode="decimal"
                  placeholder="0,00"
                  aria-label={`Preço do serviço ${svc.name || ''}`}
                  value={svc.price}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d,]/g, '');
                    updateService(svc.id, { price: val });
                  }}
                />
              </div>

              {/* Duration Select */}
              <select
                className="inp gl sd text-xs sm:text-sm"
                value={svc.duration}
                aria-label={`Duração do serviço ${svc.name || ''}`}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  updateService(svc.id, { duration: val });
                }}
              >
                {DURATION_OPTIONS.map((dur) => (
                  <option key={dur} value={dur}>
                    {formatMinutes(dur)}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Remove Row Button */}
            <button
              type="button"
              onClick={(e) => {
                const rowEl = (e.currentTarget.closest('.svc') as HTMLDivElement) || null;
                removeService(svc.id, rowEl);
              }}
              className="rm hidden sm:flex"
              aria-label={`Remover serviço ${svc.name || ''}`}
              title="Remover serviço"
            >
              <svg className="i text-lg w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Add New Service Button */}
      <button
        type="button"
        id="addSvc"
        onClick={addService}
        className="btn w-full mt-3 sm:mt-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-dashed border-white/20 text-white hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/5 flex items-center justify-center gap-2 text-xs sm:text-sm transition-all duration-200"
      >
        <svg className="i text-base sm:text-lg w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>Adicionar serviço</span>
      </button>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-2.5 sm:gap-4 mt-6 sm:mt-9">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost px-4 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm bk flex items-center justify-center gap-1.5 sm:gap-2"
        >
          <svg className="i w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Voltar</span>
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="btn btn-gold px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm nx flex items-center justify-center gap-1.5 sm:gap-2 font-semibold"
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
