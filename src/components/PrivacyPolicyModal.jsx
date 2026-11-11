import React, { useEffect } from 'react';
import { ShieldCheck, SlidersHorizontal, X } from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose, onOpenCookieSettings }) {
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined' || typeof window === 'undefined') {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOpenSettings = () => {
    onClose?.();
    onOpenCookieSettings?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/15 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden text-left animate-smooth-fade">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200/80 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
            </div>
            <h2
              id="privacy-policy-modal-title"
              className="text-base font-bold text-slate-900 leading-snug"
            >
              Политика обработки персональных данных и файлов cookie
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно"
            className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto space-y-5 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              1. Оператор и правовые основания
            </h3>
            <p>
              Настоящая политика определяет порядок обработки персональных данных и использования файлов cookie на сайте SoftGreat AI в соответствии с Законом Республики Беларусь от 07.05.2021 № 99-З «О защите персональных данных» и рекомендациями Национального центра защиты персональных данных Республики Беларусь.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">
                Оператор: ООО «Инновационный Софт» (резидент Парка высоких технологий Республики Беларусь)
              </p>
              <p>
                Адрес: Республика Беларусь, г. Минск, пр-т Дзержинского, 57, БЦ Omega Tower
              </p>
              <p>
                Телефон для обращений:{' '}
                <a
                  href="tel:+375291245555"
                  className="text-sky-600 hover:text-sky-700 font-semibold"
                >
                  +375 (29) 124-5555
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              2. Цели обработки данных и заявок
            </h3>
            <p>
              Сведения, которые вы передаете через формы обратной связи, экспресс-разбор сценариев или мессенджеры, используются исключительно для:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>подготовки 3 - 4 релевантных сценариев автоматизации для вашего бизнеса до звонка;</li>
              <li>связи с вами, проведения бесплатного аудита процессов и согласования пилотного проекта;</li>
              <li>обеспечения стабильной работы сайта, защиты форм от автоматических атак и сохранения ваших настроек приватности.</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900">
              3. Категории используемых файлов cookie
            </h3>
            <div className="space-y-2.5">
              <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                <p className="text-xs font-bold text-slate-900">
                  Технические (обязательные)
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Необходимы для корректного отображения интерфейса, работы форм заявок и сохранения выбранных вами настроек cookie. Не требуют отдельного согласия. Срок хранения - на время сеанса и до 12 месяцев.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                <p className="text-xs font-bold text-slate-900">
                  Аналитические (включаются только с вашего согласия)
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Инструменты Google Analytics и Яндекс.Метрика помогают оценивать посещаемость разделов и удобство навигации в обезличенном виде без передачи контактных данных из форм. Срок хранения - до 24 месяцев.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                <p className="text-xs font-bold text-slate-900">
                  Рекламные (включаются только с вашего согласия)
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Средства оценки эффективности деловых рекламных кампаний (включая Meta Pixel и рекламные теги в Google Tag Manager). Без вашего явного согласия рекламные трекеры не загружаются. Срок хранения - до 12 месяцев.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              4. Трансграничная передача данных
            </h3>
            <p className="text-slate-600">
              При активном согласии на аналитические или рекламные файлы cookie технические параметры посещения могут обрабатываться на серверах поставщиков соответствующих сервисов (Google, Яндекс, Meta). Вы можете в любой момент отказаться от таких cookie без влияния на доступ к информации и услугам компании.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              5. Ваши права и управление согласием
            </h3>
            <p className="text-slate-600">
              В соответствии с Законом РБ № 99-З вы вправе отозвать согласие, запросить информацию об обработке ваших данных, потребовать их уточнения или удаления. Изменить настройки файлов cookie можно в любой момент через пункт «Настройки cookie» в нижней части сайта либо в настройках вашего браузера (Chrome, Safari, Firefox, Яндекс.Браузер).
            </p>
          </section>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleOpenSettings}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
            <span>Настроить файлы cookie</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
