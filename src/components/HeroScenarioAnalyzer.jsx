import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, Sparkles, X, RefreshCw, Layers, FileText, CheckCircle2, AlertCircle, Link2, Copy, HelpCircle } from 'lucide-react';
import { applyB24Prefill } from '../utils/b24Bridge';
import { ProcessOscilloscope, TopologyCircuit } from './AnalyzerVisualizer';

const ICON_MAP = {
  FileText,
  Layers,
  Sparkles,
  CheckCircle2,
};

const ANALYSIS_STEPS = [
  // Блок 1: Сайт (Шаги 0, 1, 2) ~ 4.3 сек
  { text: 'Сбор информации о компании...', duration: 1500 },
  { text: 'Поиск публичных ресурсов и верификация адреса...', duration: 1400 },
  { text: 'Сбор данных сайта и анализ структуры каталога...', duration: 1400 },

  // Блок 2: Реестры (Шаги 3, 4, 5) ~ 4.2 сек
  { text: 'Определение отраслевого профиля и модели бизнеса...', duration: 1400 },
  { text: 'Проверка данных в публичных реестрах и классификаторах...', duration: 1400 },
  { text: 'Анализ каналов заявок и структуры продаж...', duration: 1400 },

  // Блок 3: 1С / CRM (Шаги 6, 7, 8) ~ 4.2 сек
  { text: 'Поиск маркеров интеграций с 1С, CRM и почтой...', duration: 1400 },
  { text: 'Оценка объема входящей первички и рутинных операций...', duration: 1400 },
  { text: 'Сопоставление узких мест и потерь времени менеджеров...', duration: 1400 },

  // Блок 4: Подбор решений (Шаги 9, 10, 11) ~ 4.8 сек (~28-30% времени)
  { text: 'Исключение нерелевантных сценариев автоматизации...', duration: 1400 },
  { text: 'Расчет прямой экономии рабочих часов сотрудников...', duration: 1600 },
  { text: 'Финализация персонального подбора решений...', duration: 1800 }
];

export default function HeroScenarioAnalyzer() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyInput, setCompanyInput] = useState('');
  const [userWish, setUserWish] = useState('');
  const [systems, setSystems] = useState({
    oneC: false,
    bitrix24: false,
    email: false,
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'analyzing' | 'done' | 'error'
  const [visualMode, setVisualMode] = useState('oscilloscope'); // 'oscilloscope' | 'topology'
  const [analysisStep, setAnalysisStep] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [formattedComment, setFormattedComment] = useState('');
  const [insufficientNotice, setInsufficientNotice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  const stepIntervalRef = useRef(null);

  // Форматирование структурированного подбора для копирования (строгий B2B)
  const generateReportText = () => {
    const company = companyProfile?.display_name || companyInput.trim() || 'Компания';
    const industry = companyProfile?.industry;

    const sysNames = [];
    if (systems.oneC) sysNames.push('1С');
    if (systems.bitrix24) sysNames.push('Битрикс24');
    if (systems.email) sysNames.push('Почта / Telegram');

    const scenariosBlock = scenarios
      .map((sc, i) => {
        const system = sc.system ? `[${sc.system}] ` : '';
        const benefit = sc.benefit ? `\nОжидаемый эффект: ${sc.benefit}` : '';
        return `${i + 1}. ${system}${sc.title}\n${sc.desc}${benefit}`;
      })
      .join('\n\n');

    const header = [
      `Подбор кейсов автоматизации - SoftGreat AI`,
      `Компания: ${company}`,
      industry ? `Отрасль: ${industry}` : null,
      sysNames.length > 0 ? `Текущие системы: ${sysNames.join(', ')}` : null,
      userWish.trim() ? `Пожелания: ${userWish.trim()}` : null,
    ].filter(Boolean).join('\n');

    const cleanScenariosBlock = scenariosBlock.replace(/УНП/g, 'реквизиты');

    return `${header}\n\nРекомендованные решения:\n\n${cleanScenariosBlock}\n\nСсылка на форму расчета: https://softgreat.by/#audit`;
  };

  const handleCopyReport = () => {
    const text = generateReportText();
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2400);
  };

  // Обработка прямой ссылки с хэшем (#audit, #express, #analyzer)
  useEffect(() => {
    const handleCheckHash = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.toLowerCase();
      if (hash === '#audit' || hash === '#express' || hash === '#analyzer') {
        setIsOpen(true);
        setTimeout(() => {
          const el = document.getElementById('hero-analyzer');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      }
    };

    handleCheckHash();
    window.addEventListener('hashchange', handleCheckHash);
    return () => window.removeEventListener('hashchange', handleCheckHash);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', '#audit');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#audit' && window.history?.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleCopyDirectLink = (e) => {
    e?.stopPropagation();
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}/#audit`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    if (window.history?.replaceState) {
      window.history.replaceState(null, '', '#audit');
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  useEffect(() => {
    return () => {
      if (stepIntervalRef.current) {
        clearInterval(stepIntervalRef.current);
      }
    };
  }, []);

  const toggleSystem = (key) => {
    setSystems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const generateLocalScenarios = (name, sys) => {
    const list = [];
    const displayName = name.trim() || 'вашей компании';

    if (sys.oneC) {
      list.push({
        icon: FileText,
        system: '1С:Предприятие',
        title: 'Распознавание входящей первички и авторазнесение в 1С',
        desc: 'Скан или PDF накладных (ТТН, акты) считывается за 10 секунд. Система сопоставляет номенклатуру со справочником в 1С и создает черновик документа без ручного ввода.',
        benefit: 'Экономия до 3 - 4 часов бухгалтера в день',
      });
    }

    if (sys.bitrix24) {
      list.push({
        icon: Layers,
        system: 'Битрикс24 CRM',
        title: 'Мгновенная квалификация заявок и автогенерация КП',
        desc: 'При поступлении запроса ИИ проверяет остатки товаров или загрузку специалистов, автоматически создает карточку сделки в Битрикс24 и готовит черновик спецификации.',
        benefit: 'Ответ клиенту за 1 минуту вместо 2 часов',
      });
    }

    if (sys.email) {
      list.push({
        icon: Sparkles,
        system: 'Почта и Telegram',
        title: 'Умная маршрутизация документов и карточки контрагентов',
        desc: 'Извлечение реквизитов компании, счетов и адресов из карточек контрагентов в мессенджерах или письмах с автозаполнением договора и проверкой по реестрам.',
        benefit: 'Исключение опечаток в договорах и счетах',
      });
    }

    // Если ни одна система не выбрана, показываем универсальный пакет для бизнеса
    if (list.length === 0) {
      list.push({
        icon: FileText,
        system: 'Документооборот',
        title: 'Авторазбор входящей первички и сопоставление номенклатуры',
        desc: 'Автоматическое считывание PDF, сканов и таблиц, извлечение строк спецификаций и перенос в учетную базу без ручной перебивки.',
        benefit: 'Исключение ручного ввода и ошибок в артикулах',
      });
      list.push({
        icon: Layers,
        system: 'Продажи и клиентский сервис',
        title: 'Мгновенная обработка входящих запросов и авторасчет',
        desc: 'Система анализирует запрос из почты или мессенджера, проверяет остатки и прайс-листы и подготавливает черновик ответа менеджеру.',
        benefit: 'Ответ клиенту за 1 минуту в любое время',
      });
    }

    // Резервный сквозной сценарий
    list.push({
      icon: CheckCircle2,
      system: 'Сквозной контроль',
      title: 'Контроль дебиторской задолженности и сверка актов',
      desc: 'Автоматический мониторинг отгрузок и оплат, сверка актов взаиморасчетов и аккуратные напоминания клиентам в Telegram за 3 дня до просрочки.',
      benefit: 'Сокращение кассовых разрывов и ручного созвона',
    });

    return list.slice(0, 3);
  };

  const handleRunAnalysis = async (e) => {
    e.preventDefault();
    setStatus('analyzing');
    setVisualMode(Math.random() > 0.5 ? 'oscilloscope' : 'topology');
    setAnalysisStep(0);
    setInsufficientNotice(null);
    setErrorMessage(null);

    // Очищаем предыдущую цепочку таймеров, если была
    if (stepIntervalRef.current) clearTimeout(stepIntervalRef.current);

    // Последовательная смена шагов с индивидуальным таймингом для каждого этапа
    let currentStep = 0;
    const scheduleNextStep = () => {
      if (currentStep < ANALYSIS_STEPS.length - 1) {
        currentStep += 1;
        setAnalysisStep(currentStep);
        stepIntervalRef.current = setTimeout(
          scheduleNextStep,
          ANALYSIS_STEPS[currentStep].duration
        );
      }
    };
    stepIntervalRef.current = setTimeout(
      scheduleNextStep,
      ANALYSIS_STEPS[0].duration
    );

    // Общая длительность анимации, чтобы человек успел прочитать первые важные шаги
    const totalAnimationTime = ANALYSIS_STEPS.reduce((sum, s) => sum + s.duration, 0);
    const animationPromise = new Promise((resolve) => setTimeout(resolve, totalAnimationTime));

    const endpoint = import.meta.env.VITE_AI_ANALYSIS_ENDPOINT || 'https://audit.apps.aipush.dev/api/v1/analyze';
    try {
      const fetchPromise = fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: companyInput,
          systems,
          userWish,
        }),
      });

      // Ждем и результат от бэкенда, и завершение анимации шагов
      const [response] = await Promise.all([fetchPromise, animationPromise]);

      if (stepIntervalRef.current) clearTimeout(stepIntervalRef.current);

      if (response.ok) {
        const data = await response.json();

        // Если сайт/компания не найдены — не показываем фейковые дефолтные сценарии
        if (data.status === 'insufficient_data' || !data.scenarios || data.scenarios.length === 0) {
          setErrorMessage({
            title: 'Компания или сайт не найдены',
            description: `Не удалось найти информацию по запросу «${companyInput.trim()}». Проверьте правильность написания сайта (например: alfasb.by) или оставьте заявку — мы подготовим персональный разбор до звонка.`,
            type: 'not_found',
          });
          setStatus('error');
          return;
        }

        setScenarios(data.scenarios);
        setCompanyProfile(data.company_profile || null);
        const rawComment = data.formatted_b24_comment || '';
        const cleanComment = rawComment.replace(/^УНП:.*$/gim, '').replace(/\n{3,}/g, '\n\n').trim();
        setFormattedComment(cleanComment);
        setStatus('done');
        return;
      }

      if (response.status === 429) {
        setErrorMessage({
          title: 'Превышен лимит запросов',
          description: 'Вы исчерпали лимит запросов для экспресс-подбора. Пожалуйста, подождите 1 минуту или отправьте заявку на аудит — мы свяжемся с вами напрямую.',
          type: 'rate_limit',
        });
        setStatus('error');
        return;
      }

      // 500, 502, 503 и прочие серверные сбои
      setErrorMessage({
        title: 'Сервис пока недоступен',
        description: 'Сервис онлайн-анализа временно недоступен. Вы можете оставить заявку — наш ведущий архитектор изучит ваш бизнес и подготовит персональный разбор до звонка.',
        type: 'service_unavailable',
      });
      setStatus('error');
    } catch (err) {
      if (stepIntervalRef.current) clearTimeout(stepIntervalRef.current);
      setErrorMessage({
        title: 'Сервис пока недоступен',
        description: 'Сервис онлайн-анализа временно недоступен. Вы можете оставить заявку — наш ведущий архитектор изучит ваш бизнес и подготовит персональный разбор до звонка.',
        type: 'network_error',
      });
      setStatus('error');
    }
  };

  const handleScrollToForm = () => {
    const sysNames = [];
    if (systems.oneC) sysNames.push('1С');
    if (systems.bitrix24) sysNames.push('Битрикс24');
    if (systems.email) sysNames.push('Почта/Telegram');

    // Если бэкенд отдал готовый комментарий — используем его
    let comment = formattedComment;
    if (comment) {
      comment = comment.replace(/^УНП:.*$/gim, '').replace(/\n{3,}/g, '\n\n').trim();
    } else {
      const scenariosText = scenarios.length > 0
        ? `\nПодобранные сценарии автоматизации:\n` + scenarios.map((sc, i) => `${i + 1}. ${sc.system}: ${sc.title}`).join('\n')
        : '';

      const wishText = userWish.trim();
      const wishSection = wishText
        ? `Пожелания и комментарии: ${wishText}\n`
        : '';

      comment = `Сайт / название: ${companyProfile?.display_name || companyInput.trim() || 'Указана на сайте'}
Используемые системы: ${sysNames.join(', ') || 'Не выбраны'}
${wishSection}${scenariosText}`.trim();
    }

    applyB24Prefill({
      company: companyProfile?.display_name || companyInput.trim(),
      comment,
      scenariosCount: scenarios.length,
      userWish: userWish.trim(),
    });

    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    if (stepIntervalRef.current) clearTimeout(stepIntervalRef.current);
    setStatus('idle');
    setAnalysisStep(0);
    setCompanyInput('');
    setUserWish('');
    setCompanyProfile(null);
    setFormattedComment('');
    setInsufficientNotice(null);
    setErrorMessage(null);
    setScenarios([]);
    setSystems({
      oneC: false,
      bitrix24: false,
      email: false,
    });
  };

  return (
    <div id="hero-analyzer" className="w-full max-w-xl text-left relative">
      {/* 1. Кнопка по умолчанию в Hero с синхронным мягким сворачиванием */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-400 ease-in-out ${isOpen
          ? 'grid-rows-[0fr] opacity-0 pointer-events-none'
          : 'grid-rows-[1fr] opacity-100'
          }`}
      >
        <div className="min-h-0 overflow-hidden pb-1">
          {/* Вопрос-подводка перед кнопкой подбора */}
          <div className="flex items-start gap-1.5 text-xs sm:text-sm text-sky-100/90 font-medium mb-3 select-none">
            <HelpCircle className="w-3.5 h-3.5 text-sky-200/80 shrink-0 mt-[3px]" />
            <span>Не знаете, что и как можно автоматизировать? Проведите экспресс-аудит вашего бизнеса.</span>
          </div>

          <button
            onClick={handleOpen}
            className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-sky-50 font-bold px-5 sm:px-6 py-3.5 rounded-xl shadow-lg shadow-sky-950/20 hover:shadow-xl hover:shadow-sky-950/30 transition-all active:scale-[0.98] text-sm sm:text-base group cursor-pointer"
          >
            {/* Пульсирующий индикатор в фирменном синем стиле */}
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                style={{ animationDuration: '2.5s' }}
              />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
            </span>

            <span>Подбор автоматизации для вашего бизнеса за 1 минуту</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-sky-600 shrink-0" />
          </button>
        </div>
      </div>

      {/* 2. Раскрытая интерактивная карточка с плавной анимацией выезда */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen
          ? 'grid-rows-[1fr] opacity-100'
          : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          }`}
      >
        <div className="min-h-0 overflow-hidden py-1">
          <div className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl text-slate-900 transition-opacity duration-500">

            {/* Шапка карточки */}
            <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Подбор кейсов автоматизации</span>
                  <button
                    type="button"
                    onClick={handleCopyDirectLink}
                    className="p-1 rounded-md text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer inline-flex items-center"
                    title={copiedLink ? "Прямая ссылка скопирована в буфер!" : "Скопировать прямую ссылку на эту форму"}
                  >
                    {copiedLink ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Link2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {copiedLink && (
                    <span className="text-[11px] font-semibold text-emerald-600 normal-case tracking-normal">
                      ссылка скопирована
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {status === 'done'
                    ? 'Рекомендованные сценарии'
                    : status === 'error'
                      ? (errorMessage?.title || 'Сервис пока недоступен')
                      : 'Укажите сайт и системы'}
                </h3>
              </div>
              <div className="flex items-center shrink-0">
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Свернуть"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Состояние: Ввод данных */}
            {status === 'idle' && (
              <form onSubmit={handleRunAnalysis} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Сайт компании или название *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="например: alfasb.by или Альфа СБ"
                    value={companyInput}
                    onInvalid={(e) => e.target.setCustomValidity('Пожалуйста, укажите сайт вашей компании или название')}
                    onInput={(e) => {
                      e.target.setCustomValidity('');
                      setCompanyInput(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Какие системы уже используются:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs sm:text-sm text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={systems.oneC}
                        onChange={() => toggleSystem('oneC')}
                        className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                      />
                      <span><strong>1С</strong> (Бухгалтерия, Торговля или Склад)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs sm:text-sm text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={systems.bitrix24}
                        onChange={() => toggleSystem('bitrix24')}
                        className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                      />
                      <span><strong>Битрикс24</strong> (CRM, сделки, задачи)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs sm:text-sm text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={systems.email}
                        onChange={() => toggleSystem('email')}
                        className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                      />
                      <span><strong>Корпоративная почта и мессенджеры</strong> (заявки и файлы)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Укажите дополнительную информацию, проблемы или пожелания (необязательно)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="например: автоматизировать ввод накладных в 1С или ускорить ответ на заявки"
                    value={userWish}
                    onChange={(e) => setUserWish(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-5 rounded-xl text-sm font-bold bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Провести экспресс-анализ и подобрать решения</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Состояние: Выполняется анализ */}
            {status === 'analyzing' && (
              <div className="py-6 px-3 flex flex-col items-center justify-center text-center gap-3">
                {visualMode === 'oscilloscope' ? (
                  <ProcessOscilloscope step={analysisStep} totalSteps={ANALYSIS_STEPS.length} />
                ) : (
                  <TopologyCircuit step={analysisStep} totalSteps={ANALYSIS_STEPS.length} />
                )}
                <p className="text-sm font-bold text-slate-900 transition-all duration-300 min-h-[40px] flex items-center justify-center">
                  {ANALYSIS_STEPS[analysisStep]?.text || ANALYSIS_STEPS[analysisStep]}
                </p>
              </div>
            )}

            {/* Состояние: Результат анализа */}
            {status === 'done' && (
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-slate-500">
                    Подобрано для: <strong className="text-slate-900">{companyProfile?.display_name || companyInput || 'вашей компании'}</strong>
                    {companyProfile?.industry && (
                      <span className="block text-[11px] text-slate-500 mt-0.5">
                        Отрасль: {companyProfile.industry}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyReport}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold transition-colors cursor-pointer shrink-0"
                    title="Скопировать подбор"
                  >
                    {copiedReport ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Скопировано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Скопировать подбор</span>
                      </>
                    )}
                  </button>
                </div>

                {insufficientNotice && (
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{insufficientNotice}</span>
                  </div>
                )}

                <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                  {scenarios.map((sc, idx) => {
                    const iconKey = typeof sc.icon === 'string' ? sc.icon : null;
                    const Icon = (iconKey && ICON_MAP[iconKey]) || sc.icon || Sparkles;
                    return (
                      <div
                        key={idx}
                        className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-left hover:border-sky-300 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                            {sc.system}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {sc.benefit}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                          {sc.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                          {sc.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Кнопка действия: Перейти к заявке + сброс */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={handleScrollToForm}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Отправить подбор и получить расширенный аудит</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                    title="Рассчитать заново"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Состояние: Ошибка или лимит */}
            {status === 'error' && (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {errorMessage?.title || 'Сервис пока недоступен'}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {errorMessage?.description || 'Не удалось выполнить автоматический анализ. Вы можете оставить заявку — наш ведущий архитектор изучит ваш бизнес и подготовит персональный разбор до звонка.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={handleScrollToForm}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Оставить заявку на персональный аудит</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Попробовать снова"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Попробовать снова</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
