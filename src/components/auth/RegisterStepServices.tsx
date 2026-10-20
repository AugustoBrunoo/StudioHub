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
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.26em] text-[#d4af37] mb-4">
          <span className="w-6 h-px bg-[#d4af37]" />
          Passo 3 de 5
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1] mb-3">
          O que você <span className="gt">vende?</span>
        </h2>
        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
          Quais serviços você oferece, quanto custam e quanto tempo leva cada um? O assistente usa a duração para não sobrepor clientes.
        </p>
      </div>

      <div id="svcs" className="space-y-3">
        {services.map((svc) => (
          <div
            key={svc.id}
            id={`svc-${svc.id}`}
            className="svc gl"
          >
            {/* Service Name & Duration Blocks */}
            <div>
              <input
                className={`inp gl sn ${servicesBad[svc.id] ? 'bad' : ''}`}
                placeholder="Nome do serviço"
                value={svc.name}
                aria-label="Nome do serviço"
                onChange={(e) => updateService(svc.id, { name: e.target.value })}
              />
              <p className="text-[11px] text-gray-500 mt-1.5 ml-1 sb">
                Ocupa {svc.duration / 15} bloco(s) de 15 min na agenda
              </p>
            </div>

            {/* Price with R$ Prefix */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm select-none">
                R$
              </span>
              <input
                className="inp gl sp"
                style={{ paddingLeft: '2.4rem' }}
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
              className="inp gl sd"
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

            {/* Remove Row Button */}
            <button
              type="button"
              onClick={(e) => {
                const rowEl = (e.currentTarget.closest('.svc') as HTMLDivElement) || null;
                removeService(svc.id, rowEl);
              }}
              className="rm"
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
        className="btn w-full mt-4 py-4 rounded-2xl border border-dashed border-white/20 text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/5 flex items-center justify-center gap-2 transition-all duration-200"
      >
        <svg className="i text-lg w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>Adicionar serviço</span>
      </button>

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
          className="btn btn-gold mag px-8 py-4 rounded-2xl nx flex items-center gap-2"
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
