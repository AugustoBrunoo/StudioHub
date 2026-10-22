import { type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterStepConnectionProps {
  shop: string;
  wpp: string;
  isConnected: boolean;
  qrBoxRef: RefObject<HTMLDivElement | null>;
  qrCanvasRef: RefObject<HTMLCanvasElement | null>;
  scanRef: RefObject<HTMLDivElement | null>;
  okRef: RefObject<HTMLDivElement | null>;
  checkRingRef: RefObject<SVGCircleElement | null>;
  checkTickRef: RefObject<SVGPathElement | null>;
  goBtnRef: RefObject<HTMLAnchorElement | null>;
  handleSimulate: () => void;
  onBack: () => void;
}

export function RegisterStepConnection({
  shop,
  wpp,
  isConnected,
  qrBoxRef,
  qrCanvasRef,
  scanRef,
  okRef,
  checkRingRef,
  checkTickRef,
  goBtnRef,
  handleSimulate,
  onBack,
}: RegisterStepConnectionProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.26em] text-[#d4af37] mb-4">
          <span className="w-6 h-px bg-[#d4af37]" />
          Passo 5 de 5
        </span>
        <h2 id="t5" className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1] mb-3 text-white">
          {isConnected ? (
            <>
              Tudo <span className="gt">pronto!</span>
            </>
          ) : (
            <>
              Conecte em <span className="gt">10 segundos.</span>
            </>
          )}
        </h2>
        <p id="p5" className="text-white/85 leading-relaxed max-w-md mx-auto text-sm sm:text-base">
          {isConnected ? (
            `O StudioHub de ${shop || 'seu estúdio'} já está atendendo no WhatsApp.`
          ) : (
            <>
              Aponte o WhatsApp <b className="text-white">{wpp || 'cadastrado'}</b> para o QR Code e finalize.
            </>
          )}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
        {/* QR Code Canvas Box */}
        <div className="relative shrink-0">
          <div className="absolute -inset-5 rounded-[2rem] bg-[#d4af37]/20 blur-2xl" />
          <div
            id="qrBox"
            ref={qrBoxRef}
            className="relative bg-[#f5f5f5] p-4 rounded-3xl overflow-hidden shadow-2xl"
          >
            <canvas
              id="qr"
              ref={qrCanvasRef}
              width={264}
              height={264}
              aria-label="QR Code para parear WhatsApp"
              className="block w-[220px] h-[220px] sm:w-[240px] sm:h-[240px]"
            />
            {!isConnected && <div className="scan" id="scan" ref={scanRef} />}
            <div
              id="ok"
              ref={okRef}
              className={`absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur flex items-center justify-center transition-opacity duration-500 ${isConnected ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
              <svg
                width="96"
                height="96"
                viewBox="0 0 64 64"
                fill="none"
                stroke="#f1c40f"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle ref={checkRingRef} className="ring" cx="32" cy="32" r="28" />
                <path ref={checkTickRef} className="tick" d="M20 33l9 9 16-18" />
              </svg>
            </div>
          </div>
        </div>

        {/* Step Instructions */}
        <ol
          id="how"
          className={`space-y-4 text-sm text-white max-w-[16rem] transition-opacity duration-500 ${isConnected ? 'opacity-35' : 'opacity-100'
            }`}
        >
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full gl flex items-center justify-center text-[11px] font-bold text-[#d4af37] shrink-0">
              1
            </span>
            <span>Abra o WhatsApp no celular do negócio.</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full gl flex items-center justify-center text-[11px] font-bold text-[#d4af37] shrink-0">
              2
            </span>
            <span>
              Toque em <b className="text-white">Aparelhos conectados</b>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full gl flex items-center justify-center text-[11px] font-bold text-[#d4af37] shrink-0">
              3
            </span>
            <span>
              Escolha <b className="text-white">Conectar um aparelho</b> e aponte para o código.
            </span>
          </li>
          <li className="flex items-center gap-2 pt-1 text-xs text-white/70" id="st">
            {isConnected ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-green-500 font-semibold">Conectado</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#f1c40f] animate-pulse" />
                <span>Aguardando leitura...</span>
              </>
            )}
          </li>
        </ol>
      </div>

      {/* Navigation & Action Buttons */}
      <div className="flex justify-between items-center mt-9 gap-3">
        {!isConnected && (
          <button
            type="button"
            onClick={onBack}
            className="btn btn-ghost px-7 py-4 rounded-2xl bk flex items-center gap-2"
            id="bk5"
          >
            <svg className="i w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Voltar</span>
          </button>
        )}

        <div className="flex gap-3 ml-auto">
          {!isConnected ? (
            <button
              type="button"
              id="sim"
              onClick={handleSimulate}
              className="btn btn-ghost px-5 py-4 rounded-2xl text-sm font-semibold"
            >
              Simular conexão
            </button>
          ) : (
            <a
              id="go"
              ref={goBtnRef}
              href="/dashboard"
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
              className="btn btn-gold px-7 py-4 rounded-2xl flex items-center gap-2 font-bold"
            >
              <span>Ir para o painel</span>
              <svg className="i w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
