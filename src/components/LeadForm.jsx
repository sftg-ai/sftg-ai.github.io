import React, { useEffect, useRef, useState } from 'react';
import { Search, MessageSquare, PhoneCall, CheckCircle2, ExternalLink, Send, Loader2, Sparkles } from 'lucide-react';
import { onB24PrefillApplied } from '../utils/b24Bridge';

export default function LeadForm() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [prefillInfo, setPrefillInfo] = useState(null);

  useEffect(() => {
    // Подписка на префилл из HeroScenarioAnalyzer
    const unsubscribe = onB24PrefillApplied((data) => {
      setPrefillInfo(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Очищаем контейнер перед добавлением скрипта
    container.innerHTML = '';

    // Таймер на случай блокировки корпоративными AdBlock / Firewall
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://cdn-ru.bitrix24.by/b33075640/crm/form/loader_43.js?${(Date.now() / 180000) | 0}`;
    script.setAttribute('data-b24-form', 'inline/43/jps6a7');
    script.setAttribute(
      'data-b24-form-telemetry-sign',
      'v1:43:site.423e8e2979092b628b864e7b9f98f9f489e3d6b866abe3289cfba0e03246c715'
    );
    script.setAttribute('data-skip-moving', 'true');

    script.onload = () => {
      clearTimeout(fallbackTimer);
      // Небольшая задержка, чтобы iframe Битрикс24 успел отрендериться
      setTimeout(() => setIsLoading(false), 300);
    };

    script.onerror = () => {
      clearTimeout(fallbackTimer);
      setIsLoading(false);
      setLoadError(true);
    };

    container.appendChild(script);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  const steps = [
    {
      icon: Search,
      num: '01',
      title: 'Изучаем ваш бизнес по сайту',
      desc: 'Анализируем вашу сферу, каналы заявок и типовой документооборот.'
    },
    {
      icon: MessageSquare,
      num: '02',
      title: 'Присылаем подборку гипотез и короткие вопросы',
      desc: 'Наш специалист отправит вам в мессенджер 3 - 4 готовых варианта решений, чтобы вы просто отметили «да / нет» или назвали свою задачу.'
    },
    {
      icon: PhoneCall,
      num: '03',
      title: 'Проводим предметный созвон (20 - 30 минут)',
      desc: 'На встрече обсуждаем выбранные варианты, глубже разбираем ваши процессы и вместе находим дополнительные точки экономии под ваши задачи.'
    }
  ];

  return (
    <section id="lead-form" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-200/80 relative z-10 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* Слева: 6 колонок - Описание предпроектного разбора (прижато кверху) */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-sky-800 w-fit mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Бесплатный аудит и подбор решений</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Оставьте сайт вашей компании - подготовим варианты автоматизации до звонка
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
            Вам не нужно заранее писать техническое задание. Мы сами изучим ваш сайт и специфику бизнеса, подготовим 3 - 4 конкретных сценария автоматизации именно для вашей компании и пришлем короткий список перед созвоном.
          </p>

          {/* 3 прозрачных шага сразу под текстом без разрывов */}
          <div className="space-y-3.5 w-full">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-700 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-sky-600 bg-sky-100 px-1.5 py-0.5 rounded">
                        Шаг {step.num}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Справа: 6 колонок - Официальная CRM-форма Битрикс24 */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Баннер с подтверждением передачи экспресс-анализа */}
          {prefillInfo && (
            <div className="mb-3 p-3.5 rounded-2xl bg-sky-50 border border-sky-200/90 text-left flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
              <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div className="text-xs text-sky-950 leading-relaxed">
                <span className="font-bold">Экспресс-анализ добавлен в заявку:</span>{' '}
                сценарии для компании <strong>{prefillInfo.company || 'вашего бизнеса'}</strong> внесены в комментарий к форме. Вы можете дополнить или скорректировать их.
              </div>
            </div>
          )}

          <p className="text-xs sm:text-sm text-slate-500 mb-2">
            Заполните форму, и мы вернемся с готовыми сценариями для вашей компании
          </p>

            {/* Контейнер для нативного виджета Битрикс24 */}
            <div className="relative min-h-[460px] flex-1 flex flex-col justify-center">
              
              {/* Прелоадер на время инициализации виджета */}
              {isLoading && (
                <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-slate-400 py-12">
                  <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
                  <span className="text-xs font-medium text-slate-500">
                    Загрузка формы Битрикс24...
                  </span>
                </div>
              )}

              {/* DOM-точка монтирования скрипта Битрикс24 */}
              <div 
                ref={containerRef} 
                className="b24-form-wrapper w-full flex-1"
              />

              {/* Fallback-блок если форма заблокирована браузером или AdBlock */}
              {loadError && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-left my-4">
                  <p className="text-xs font-semibold text-amber-900 mb-2">
                    Форма не смогла загрузиться из-за настроек блокировщика рекламы в вашем браузере.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <a
                      href="https://b24-xxbdwe.b24site.online/crm_form_gg1ic/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-500 transition-colors"
                    >
                      <span>Открыть форму в новом окне</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://t.me/yurasvidersky"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Написать напрямую в Telegram</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
        </div>

      </div>
    </section>
  );
}
