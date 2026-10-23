import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import {
  RegisterBackground,
  RegisterNavbar,
  RegisterStepIdentity,
  RegisterStepSchedule,
  RegisterStepServices,
  RegisterStepAntiNoShow,
  RegisterStepConnection,
  RegisterExitModal,
  useRegisterWizard,
} from '@/components/auth';

export function RegisterPage() {
  const wizard = useRegisterWizard();
  const { curStep } = wizard;
  const navigate = useNavigate();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const handleConfirmExit = () => {
    wizard.resetForm();
    setIsExitModalOpen(false);
    navigate('/');
  };

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
          curStep={curStep}
          onStepClick={wizard.goToStep}
          onBackStep={wizard.prevStep}
          onExit={() => setIsExitModalOpen(true)}
        />

        {/* Main Wizard Area */}
        <main className="w-full px-3 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 flex flex-col items-center">
          {/* Dynamic Card Stage */}
          <div id="stage" className="w-full max-w-2xl relative">
            <div
              ref={wizard.cardRef}
              className="lg p-4 sm:p-7 md:p-10 step text-white rounded-2xl sm:rounded-[2rem]"
            >
              {/* Passo 1: Identidade */}
              {curStep === 0 && (
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
                  onCancel={() => setIsExitModalOpen(true)}
                />
              )}

              {/* Passo 2: Horários */}
              {curStep === 1 && (
                <RegisterStepSchedule
                  selectedDays={wizard.selectedDays}
                  toggleDay={wizard.toggleDay}
                  daysBad={wizard.daysBad}
                  openTime={wizard.openTime}
                  setOpenTime={wizard.setOpenTime}
                  closeTime={wizard.closeTime}
                  setCloseTime={wizard.setCloseTime}
                  hasCustomSchedule={wizard.hasCustomSchedule}
                  setHasCustomSchedule={wizard.setHasCustomSchedule}
                  dayHours={wizard.dayHours}
                  updateDayHours={wizard.updateDayHours}
                  applyDefaultHoursToAll={wizard.applyDefaultHoursToAll}
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
              {curStep === 2 && (
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
              {curStep === 3 && (
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
              {curStep === 4 && (
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
                  databasePayload={wizard.databasePayload}
                  buildDatabasePayload={wizard.buildDatabasePayload}
                />
              )}
            </div>
          </div>

          <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-[.3em]">
            StudioHub Engine &copy; 2026
          </p>
        </main>
      </div>

      {/* Confirmation Exit Modal */}
      <RegisterExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirmExit={handleConfirmExit}
      />
    </div>
  );
}
