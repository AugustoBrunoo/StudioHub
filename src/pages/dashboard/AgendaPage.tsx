import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Seo } from '@/components/common/Seo';
import { DashboardBackground } from '@/components/dashboard/DashboardBackground';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import {
  DashboardToast,
  type DashboardToastHandle,
} from '@/components/dashboard/DashboardToast';
import {
  useAgendaState,
  AgendaHeader,
  AgendaPeriodSection,
  AgendaSummarySection,
  AgendaFilterBar,
  AgendaCardsView,
  AgendaGridView,
  AgendaDrawer,
  AgendaModal,
} from '@/components/agenda';

export function AgendaPage() {
  const toastRef = useRef<DashboardToastHandle | null>(null);
  const hoursBtnRef = useRef<HTMLButtonElement | null>(null);
  const hoursPopRef = useRef<HTMLDivElement | null>(null);

  const handleShowToast = useCallback((msg: string) => {
    toastRef.current?.show(msg);
  }, []);

  // Hook managing all agenda state, mock db, calculations, and handlers
  const agenda = useAgendaState();

  // Entrance rise animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.rise', {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          clearProps: 'opacity,transform',
        }, 0.1);
    });
    return () => ctx.revert();
  }, []);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        hoursPopRef.current &&
        !hoursPopRef.current.contains(e.target as Node) &&
        hoursBtnRef.current &&
        !hoursBtnRef.current.contains(e.target as Node)
      ) {
        agenda.setIsHoursPopOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        agenda.setIsHoursPopOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [agenda]);

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#d4af37]/30 selection:text-white relative overflow-x-hidden">
      <Seo
        title="StudioHub | Agenda do Estúdio"
        description="Gerenciamento de agenda, horários e atendimentos em tempo real com o StudioHub."
      />

      <DashboardBackground />
      <DashboardNav onShowToast={handleShowToast} />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 relative z-10">
        {/* Title, Popover & Action Buttons */}
        <AgendaHeader
          isHoursPopOpen={agenda.isHoursPopOpen}
          onToggleHoursPop={(e) => {
            e.stopPropagation();
            agenda.setIsHoursPopOpen((prev) => !prev);
          }}
          onCloseHoursPop={() => agenda.setIsHoursPopOpen(false)}
          onOpenNewAppointment={() => agenda.openModal()}
          hoursBtnRef={hoursBtnRef}
          hoursPopRef={hoursPopRef}
        />

        {/* Section 1: Period Navigator, Segments & Week Strip */}
        <AgendaPeriodSection
          topDateHeader={agenda.topDateHeader}
          currentDateKey={agenda.currentDateKey}
          onSelectDate={agenda.setSelectedDate}
          onStep={agenda.step}
          onGoToday={() => agenda.setSelectedDate(new Date())}
          viewMode={agenda.viewMode}
          onSetViewMode={agenda.setViewMode}
          spanMode={agenda.spanMode}
          onSetSpanMode={agenda.setSpanMode}
          stripDays={agenda.stripDays}
        />

        {/* Section 2: KPIs & Insights Summary */}
        <AgendaSummarySection
          stats={agenda.currentStats}
          insights={agenda.insights}
          filter={agenda.filter}
          onSelectFilter={agenda.setFilter}
        />

        {/* Section 3: Appointments List & Views */}
        <section className="pnl rise mb-8">
          <p className="tag mb-4">Atendimentos</p>

          <AgendaFilterBar
            searchQuery={agenda.searchQuery}
            onSearchChange={agenda.setSearchQuery}
            activeFilter={agenda.filter}
            onSelectFilter={agenda.setFilter}
          />

          <div id="view">
            {agenda.viewMode === 'cards' ? (
              <AgendaCardsView
                currentDateKey={agenda.currentDateKey}
                selectedDate={agenda.selectedDate}
                appointments={agenda.listFor(agenda.currentDateKey)}
                gaps={agenda.currentGaps}
                filter={agenda.filter}
                searchQuery={agenda.searchQuery}
                onOpenDrawer={agenda.setActiveDrawerId}
                onSetStatus={(id, s) => agenda.setStatus(id, s, handleShowToast)}
                onOpenModal={agenda.openModal}
              />
            ) : (
              <AgendaGridView
                selectedDate={agenda.selectedDate}
                spanMode={agenda.spanMode}
                onSelectDate={agenda.setSelectedDate}
                onSetSpanMode={agenda.setSpanMode}
                listFor={agenda.listFor}
                getGaps={agenda.getGaps}
                onOpenDrawer={agenda.setActiveDrawerId}
                onOpenModal={agenda.openModal}
              />
            )}
          </div>
        </section>
      </main>

      {/* Slide-over Drawer */}
      <AgendaDrawer
        isOpen={!!agenda.activeDrawerId}
        appointment={agenda.activeDrawerItem}
        onClose={() => agenda.setActiveDrawerId(null)}
        onSetStatus={(id, s) => agenda.setStatus(id, s, handleShowToast)}
        onReschedule={(item) => {
          agenda.setActiveDrawerId(null);
          agenda.openModal({ edit: item });
        }}
      />

      {/* Appointment Creation / Reschedule Modal */}
      <AgendaModal
        isOpen={agenda.modalState.isOpen}
        isEdit={!!agenda.modalState.editItem}
        onClose={agenda.closeModal}
        onSave={() => agenda.handleSaveModal(handleShowToast)}
        client={agenda.formClient}
        onClientChange={agenda.setFormClient}
        phone={agenda.formPhone}
        onPhoneChange={agenda.handlePhoneChange}
        service={agenda.formService}
        onServiceChange={agenda.setFormService}
        data={agenda.formData}
        onDataChange={agenda.setFormData}
        time={agenda.formTime}
        onTimeChange={agenda.setFormTime}
        error={agenda.formError}
        onApplySuggestion={(sug) => {
          agenda.setFormTime(
            `${String(Math.floor(sug / 60)).padStart(2, '0')}:${String(sug % 60).padStart(2, '0')}`
          );
          agenda.setFormError(null);
        }}
      />

      {/* Floating Pill Toast Notification */}
      <DashboardToast ref={toastRef} />
    </div>
  );
}
export default AgendaPage;
