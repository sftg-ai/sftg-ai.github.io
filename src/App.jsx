import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProcessExplorer from './components/ProcessExplorer';
import RealCases from './components/RealCases';
import WorkStages from './components/WorkStages';
import TrustMarquee from './components/TrustMarquee';
import ClosedContour from './components/ClosedContour';
import TeamAndExpertise from './components/TeamAndExpertise';
import FaqSection from './components/FaqSection';
import ContactsSection from './components/ContactsSection';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import { useAnimatedFavicon } from './hooks/useAnimatedFavicon';
import { initAnalytics } from './utils/analytics';

export default function App() {
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  // Анимация фирменной звезды во вкладке браузера
  useAnimatedFavicon();

  // Инициализация Consent Mode v2 и контейнера аналитики
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-500/20 selection:text-sky-900">
      {/* 1. Плавающая навигационная капсула (max-w-7xl, вровень с экранами) */}
      <Header />

      {/* 2. Основной контент (8 экранов по канонам SDLC и эстетике Sherpa RPA / ROBIN) */}
      <main>
        {/* Экран 1: Входной голубой экран с 3 карточками экономической выгоды */}
        <Hero />

        {/* Экран 2: Интерактивный разбор 7 бизнес-процессов с каскадной анимацией карточки */}
        <ProcessExplorer />

        {/* Экран 3: Каталог прикладных B2B-сценариев по отделам со статическими схемами */}
        <RealCases />

        {/* Поясок доверия: 80+ реализованных решений и партнеры */}
        <TrustMarquee />

        {/* Экран 4: Понятные этапы работы и прозрачные условия */}
        <WorkStages />

        {/* Экран 5: Защита коммерческой тайны и работа в закрытом контуре */}
        <ClosedContour />

        {/* Экран 6: Опыт инженерной команды, надежность и Закон № 99-З РБ */}
        <TeamAndExpertise />

        {/* Частые вопросы руководителей (синхронизировано с FAQPage Schema.org) */}
        <FaqSection />

        {/* Экран 7: Предпроектный разбор бизнеса до созвона (без 1С-селектов и процентов) */}
        <LeadForm />

        {/* Экран 8: Лаконичный строгий блок контактов и офиса */}
        <ContactsSection />
      </main>

      {/* 3. Интерактивный подвал с физическим Canvas-эффектом волн и реквизитами Беларуси */}
      <Footer
        onOpenPolicy={() => setPolicyModalOpen(true)}
        onOpenCookieSettings={() => setCookieSettingsOpen(true)}
      />

      {/* Минималистичный Cookie Consent (Закон РБ № 99-З) и модалка Политики */}
      <CookieConsent
        isOpenOverride={cookieSettingsOpen}
        onCloseOverride={() => setCookieSettingsOpen(false)}
        onOpenPolicy={() => setPolicyModalOpen(true)}
      />
      <PrivacyPolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        onOpenCookieSettings={() => setCookieSettingsOpen(true)}
      />
    </div>
  );
}
