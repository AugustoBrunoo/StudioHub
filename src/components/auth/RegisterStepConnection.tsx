import { useState, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Code2, Copy, Check, ChevronDown, ChevronUp, Terminal } from 'lucide-react';

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
  databasePayload?: any;
  buildDatabasePayload?: () => any;
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
  databasePayload,
  buildDatabasePayload,
}: RegisterStepConnectionProps) {
  const navigate = useNavigate();
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get payload (either generated after simulation, or live preview from wizard)
  const currentPayload = databasePayload || (buildDatabasePayload ? buildDatabasePayload() : null);

  const handleCopyJson = () => {
    if (!currentPayload) return;
    navigator.clipboard.writeText(JSON.stringify(currentPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-4 sm:mb-6 text-center">
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[.22em] sm:tracking-[.26em] text-[#d4af37] mb-2 sm:mb-4">
          <span className="w-5 sm:w-6 h-px bg-[#d4af37]" />
          Passo 5 de 5
        </span>
        <h2 id="t5" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] mb-2 sm:mb-3 text-white">
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
        <p id="p5" className="text-white/85 leading-relaxed max-w-md mx-auto text-xs sm:text-sm md:text-base">
          {isConnected ? (
            `O StudioHub de ${shop || 'seu estúdio'} já está conectado e pronto para operar no WhatsApp.`
          ) : (
            <>
              Aponte o WhatsApp <b className="text-white">{wpp || 'cadastrado'}</b> para o QR Code e finalize o cadastro.
            </>
          )}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-8 justify-center">
        {/* QR Code Canvas Box */}
        <div className="relative shrink-0">
          <div className="absolute -inset-5 rounded-[2rem] bg-[#d4af37]/20 blur-2xl" />
          <div
            id="qrBox"
            ref={qrBoxRef}
            className="relative bg-[#f5f5f5] p-3 sm:p-4 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
          >
            <canvas
              id="qr"
              ref={qrCanvasRef}
              width={264}
              height={264}
              aria-label="QR Code para parear WhatsApp"
              className="block w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]"
            />
            {!isConnected && <div className="scan" id="scan" ref={scanRef} />}
            <div
              id="ok"
              ref={okRef}
              className={`absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur flex items-center justify-center transition-opacity duration-500 ${
                isConnected ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 64 64"
                fill="none"
                stroke="#f1c40f"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-16 h-16 sm:w-20 sm:h-20"
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
          className={`space-y-2.5 sm:space-y-4 text-xs sm:text-sm text-white max-w-full sm:max-w-[17rem] transition-opacity duration-500 ${
            isConnected ? 'opacity-35' : 'opacity-100'
          }`}
        >
          <li className="flex gap-2.5 sm:gap-3">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full gl flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-[#d4af37] shrink-0">
              1
            </span>
            <span>Abra o WhatsApp no celular do negócio.</span>
          </li>
          <li className="flex gap-2.5 sm:gap-3">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full gl flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-[#d4af37] shrink-0">
              2
            </span>
            <span>
              Toque em <b className="text-white">Aparelhos conectados</b>.
            </span>
          </li>
          <li className="flex gap-2.5 sm:gap-3">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full gl flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-[#d4af37] shrink-0">
              3
            </span>
            <span>
              Escolha <b className="text-white">Conectar um aparelho</b> e aponte para o código.
            </span>
          </li>
          <li className="flex items-center gap-2 pt-1 text-xs text-white/70" id="st">
            {isConnected ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                <span className="text-green-400 font-semibold">Conectado com sucesso</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#f1c40f] animate-pulse" />
                <span>Aguardando leitura do QR Code...</span>
              </>
            )}
          </li>
        </ol>
      </div>

      {/* Database Payload Inspection Accordion */}
      {currentPayload && (
        <div className="mt-6 sm:mt-8 f gl rounded-xl sm:rounded-2xl border border-white/10 p-3.5 sm:p-4 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f1c40f] shrink-0">
                <Database className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                  <span>Payload do Banco de Dados</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    JSON Pronto
                  </span>
                </p>
                <p className="text-[11px] text-white/50">
                  {isConnected
                    ? 'Dados impressos no console e rascunho limpo.'
                    : 'Clique em Simular Conexão para logar no console e limpar o cache.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setShowJsonPreview((prev) => !prev)}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 text-[#f1c40f]" />
                <span>{showJsonPreview ? 'Ocultar JSON' : 'Ver JSON'}</span>
                {showJsonPreview ? (
                  <ChevronUp className="w-3.5 h-3.5 text-white/50" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                )}
              </button>
            </div>
          </div>

          {/* Collapsible JSON Preview Area */}
          {showJsonPreview && (
            <div className="mt-3.5 pt-3.5 border-t border-white/10 relative animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-white/50 flex items-center gap-1.5 font-mono">
                  <Terminal className="w-3 h-3 text-[#f1c40f]" />
                  schema: v2.0.0 (Pronto para POST /api/register)
                </span>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="px-2.5 py-1 rounded-lg bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#f1c40f] border border-[#d4af37]/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar JSON</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 sm:p-4 rounded-xl bg-black/75 border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-72 leading-relaxed selection:bg-[#d4af37]/40">
                {JSON.stringify(currentPayload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Navigation & Action Buttons */}
      <div className="flex justify-between items-center gap-2.5 sm:gap-3 mt-6 sm:mt-9">
        {!isConnected && (
          <button
            type="button"
            onClick={onBack}
            className="btn btn-ghost px-4 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm bk flex items-center justify-center gap-1.5 sm:gap-2"
            id="bk5"
          >
            <svg className="i w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Voltar</span>
          </button>
        )}

        <div className="flex gap-2 sm:gap-3 ml-auto">
          {!isConnected ? (
            <button
              type="button"
              id="sim"
              onClick={handleSimulate}
              className="btn btn-gold px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2"
            >
              <span>Simular conexão</span>
              <Terminal className="w-4 h-4" />
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
              className="btn btn-gold px-5 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-1.5 sm:gap-2 font-bold text-xs sm:text-sm"
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
