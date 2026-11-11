import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, X } from 'lucide-react';
import { analyticsConfig } from '../config/analyticsConfig.js';
import { applyConsent, getConsentState } from '../utils/analytics.js';

export default function CookieConsent({ isOpenOverride, onCloseOverride, onOpenPolicy }) {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    const saved = getConsentState();

    if (isOpenOverride) {
      setAnalyticsEnabled(Boolean(saved?.analytics));
      setMarketingEnabled(Boolean(saved?.marketing));
      setShowSettings(true);
      setVisible(true);
      return;
    }

    if (!analyticsConfig.requireCookieConsent) {
      setVisible(false);
      return;
    }

    if (!saved) {
      setAnalyticsEnabled(false);
      setMarketingEnabled(false);
      setShowSettings(false);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpenOverride]);

  if (!visible) return null;

  const closeBanner = () => {
    setVisible(false);
    setShowSettings(false);
    onCloseOverride?.();
  };

  const handleAcceptAll = () => {
    applyConsent({ analytics: true, marketing: true }, 'accept_all');
    closeBanner();
  };

  const handleRejectAll = () => {
    applyConsent({ analytics: false, marketing: false }, 'reject_all');
    closeBanner();
  };

  const handleSaveCustom = () => {
    applyConsent(
      { analytics: analyticsEnabled, marketing: marketingEnabled },
      'custom'
    );
    closeBanner();
  };

  return (
    <aside
      aria-label="Управление файлами cookie"
      className="fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] sm:w-[360px]"
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl shadow-slate-900/10 p-4 text-left animate-smooth-fade">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
            <h3 className="text-sm font-bold text-slate-900">
              Файлы cookie и конфиденциальность
            </h3>
          </div>
          {isOpenOverride && (
            <button
              type="button"
              onClick={closeBanner}
              aria-label="Закрыть настройки cookie"
              className="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
          Мы используем файлы cookie: технические - для работы сайта, аналитические и рекламные - только с вашего согласия (Закон РБ № 99-З).
        </p>

        <div className="mt-2">
          <button
            type="button"
            onClick={() => onOpenPolicy?.()}
            className="text-xs font-medium text-sky-600 hover:text-sky-700 underline underline-offset-2 text-left transition-colors"
          >
            Политика обработки данных и cookie
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-colors"
          >
            Принять
          </button>
          <button
            type="button"
            onClick={handleRejectAll}
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
          >
            Отклонить
          </button>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowSettings((prev) => !prev)}
            aria-expanded={showSettings}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span>Настроить</span>
            {showSettings ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {showSettings && (
          <div className="mt-3 pt-3 border-t border-slate-200 space-y-2.5">
            <label className="flex items-start gap-2.5 cursor-not-allowed">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600"
              />
              <span className="text-xs leading-snug">
                <span className="block font-semibold text-slate-900">
                  Технические cookie (всегда активны)
                </span>
                <span className="block text-slate-500">
                  Работа сайта, защита форм и хранение настроек.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="text-xs leading-snug">
                <span className="block font-semibold text-slate-900">
                  Аналитика (Google Analytics, Яндекс.Метрика)
                </span>
                <span className="block text-slate-500">
                  Обезличенная статистика посещений и сценариев.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingEnabled}
                onChange={(event) => setMarketingEnabled(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="text-xs leading-snug">
                <span className="block font-semibold text-slate-900">
                  Рекламные трекеры (Meta Pixel, персонализация)
                </span>
                <span className="block text-slate-500">
                  Оценка эффективности деловых рекламных кампаний.
                </span>
              </span>
            </label>

            <button
              type="button"
              onClick={handleSaveCustom}
              className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Сохранить выбор
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
