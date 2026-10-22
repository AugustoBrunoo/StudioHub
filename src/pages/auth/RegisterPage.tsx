import { Seo } from '@/components/common/Seo';
import {
  RegisterBackground,
  RegisterNavbar,
  RegisterStepIdentity,
  RegisterStepSchedule,
  RegisterStepServices,
  RegisterStepAntiNoShow,
  RegisterStepConnection,
  useRegisterWizard,
} from '@/components/auth';

export function RegisterPage() {
  const wizard = useRegisterWizard();

  return (
    <div className="relative min-h-screen text-[#f5f5f5] overflow-x-hidden w-full selection:bg-[#d4af37]/30 selection:text-white">
      <Seo
        title="Criar Conta - Plano Solo | StudioHub • Noda Solutions"
        description="Configure seu assistente inteligente no WhatsApp em 5 passos simples e comece a operar sua agenda no piloto automático."
        canonicalUrl="https://studiohub.nodasolucoes.dev/cadastro"
      />

      {/* Dynamic WebGL2 GhostFibers Background (z-0) */}
      <RegisterBackground />

      {/* Foreground Content (z-10) */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Navigation Header with Centered Steps & Actions */}
        <RegisterNavbar
          curStep={wizard.curStep}
          onStepClick={wizard.goToStep}
          onBackStep={wizard.prevStep}
        />

        {/* Main Wizard Area */}
        <main className="w-full px-4 sm:px-6 pt-24 sm:pt-28 pb-16 flex flex-col items-center">
          {/* Dynamic Card Stage */}
          <div id="stage" className="w-full max-w-2xl relative">
            <div
              ref={wizard.cardRef}
              onPointerMove={wizard.handleCardPointerMove}
              className="lg p-7 sm:p-10 step text-white"
            >
              {/* Passo 1: Identidade */}
              {wizard.curStep === 0 && (
                <RegisterStepIdentity
                  shop={wizard.shop}
                  setShop={wizard.setShop}
                  shopBad={wizard.shopBad}
                  setShopBad={wizard.setShopBad}
                  owner={wizard.owner}
                  setOwner={wizard.setOwner}
                  ownerBad={wizard.ownerBad}
                  setOwnerBad={wizard.setOwnerBad}
                  wpp={wizard.wpp}
                  handleWppChange={wizard.handleWppChange}
                  wppBad={wizard.wppBad}
                  onContinue={wizard.nextStep}
                />
              )}

              {/* Passo 2: Horários */}
              {wizard.curStep === 1 && (
                <RegisterStepSchedule
                  selectedDays={wizard.selectedDays}
                  toggleDay={wizard.toggleDay}
                  daysBad={wizard.daysBad}
                  openTime={wizard.openTime}
                  setOpenTime={wizard.setOpenTime}
                  closeTime={wizard.closeTime}
                  setCloseTime={wizard.setCloseTime}
                  hasLunch={wizard.hasLunch}
                  setHasLunch={wizard.setHasLunch}
                  lunchStart={wizard.lunchStart}
                  setLunchStart={wizard.setLunchStart}
                  lunchEnd={wizard.lunchEnd}
                  setLunchEnd={wizard.setLunchEnd}
                  leadTime={wizard.leadTime}
                  setLeadTime={wizard.setLeadTime}
                  daysSummary={wizard.daysSummary}
                  onBack={wizard.prevStep}
                  onContinue={wizard.nextStep}
                />
              )}

              {/* Passo 3: Serviços */}
              {wizard.curStep === 2 && (
                <RegisterStepServices
                  services={wizard.services}
                  servicesBad={wizard.servicesBad}
                  addService={wizard.addService}
                  removeService={wizard.removeService}
                  updateService={wizard.updateService}
                  onBack={wizard.prevStep}
                  onContinue={wizard.nextStep}
                />
              )}

              {/* Passo 4: Anti-falta */}
              {wizard.curStep === 3 && (
                <RegisterStepAntiNoShow
                  shop={wizard.shop}
                  reminderTime={wizard.reminderTime}
                  setReminderTime={wizard.setReminderTime}
                  cancelTime={wizard.cancelTime}
                  setCancelTime={wizard.setCancelTime}
                  onBack={wizard.prevStep}
                  onContinue={wizard.nextStep}
                />
              )}

              {/* Passo 5: Conexão */}
              {wizard.curStep === 4 && (
                <RegisterStepConnection
                  shop={wizard.shop}
                  wpp={wizard.wpp}
                  isConnected={wizard.isConnected}
                  qrBoxRef={wizard.qrBoxRef}
                  qrCanvasRef={wizard.qrCanvasRef}
                  scanRef={wizard.scanRef}
                  okRef={wizard.okRef}
                  checkRingRef={wizard.checkRingRef}
                  checkTickRef={wizard.checkTickRef}
                  goBtnRef={wizard.goBtnRef}
                  handleSimulate={wizard.handleSimulate}
                  onBack={wizard.prevStep}
                />
              )}
            </div>
          </div>

          <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-[.3em]">
            StudioHub Engine &copy; 2026
          </p>
        </main>
      </div>
    </div>
  );
}
