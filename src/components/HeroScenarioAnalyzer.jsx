import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, Sparkles, Loader2, X, RefreshCw, Layers, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { applyB24Prefill } from '../utils/b24Bridge';

const ICON_MAP = {
  FileText,
  Layers,
  Sparkles,
  CheckCircle2,
};

const ANALYSIS_STEPS = [
  'Подключаемся к сайту и проверяем доступность...',
  'Считываем структуру каталога и разделы услуг...',
  'Определяем отраслевой профиль и товарную номенклатуру...',
  'Анализируем модель продаж и каналы заявок...',
  'Ищем маркеры интеграций и используемого стека...',
  'Оцениваем объем входящей документации и первички...',
  'Выявляем рутинные операции в обработке заказов...',
  'Сопоставляем точки потерь времени менеджеров...',
  'Исключаем нерелевантные контуры автоматизации...',
  'Рассчитываем прямую экономию часов сотрудников...',
  'Формируем прикладные сценарии внедрения...',
  'Финализируем рекомендации...'
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
  const [analysisStep, setAnalysisStep] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [formattedComment, setFormattedComment] = useState('');
  const [insufficientNotice, setInsufficientNotice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const stepIntervalRef = useRef(null);

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
        desc: 'Извлечение реквизитов (УНП, IBAN, адрес) из карточек контрагентов в мессенджерах или письмах с автозаполнением договора и проверкой по реестрам.',
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
    setAnalysisStep(0);
    setInsufficientNotice(null);
    setErrorMessage(null);

    // Плавный цикл смены технологических фаз
    if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
    stepIntervalRef.current = setInterval(() => {
      setAnalysisStep((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 450);

    const endpoint = import.meta.env.VITE_AI_ANALYSIS_ENDPOINT || 'https://audit.apps.aipush.dev/api/v1/analyze';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: companyInput,
          systems,
          userWish,
        }),
      });

      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);

      if (response.ok) {
        const data = await response.json();

        if (data.status === 'insufficient_data') {
          setInsufficientNotice(data.message || 'Не удалось найти сайт компании. Показаны базовые сценарии.');
        }

        setScenarios(data.scenarios && data.scenarios.length > 0 ? data.scenarios : []);
        setCompanyProfile(data.company_profile || null);
        setFormattedComment(data.formatted_b24_comment || '');
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
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
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
    if (!comment) {
      const scenariosText = scenarios.length > 0
        ? `\nПодобранные сценарии автоматизации:\n` + scenarios.map((sc, i) => `${i + 1}. ${sc.system}: ${sc.title}`).join('\n')
        : '';

      const wishText = userWish.trim();
      const wishSection = wishText
        ? `Пожелания и комментарии: ${wishText}\n`
        : '';

      comment = `Сайт / сфера бизнеса: ${companyProfile?.display_name || companyInput.trim() || 'Указана на сайте'}
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
    setStatus('idle');
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
    <div className="w-full max-w-xl text-left">
      {/* 1. Кнопка по умолчанию в Hero с мягким затуханием */}
      <div
        className={`transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-0 -translate-y-2 pointer-events-none max-h-0 overflow-hidden'
            : 'opacity-100 translate-y-0 max-h-16'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-sky-50 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-sky-950/20 transition-all active:scale-[0.98] text-sm sm:text-base group cursor-pointer"
        >
          <span>Экспресс-подбор автоматизации</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-sky-600" />
        </button>
      </div>

      {/* 2. Раскрытая интерактивная карточка с плавной анимацией выезда */}
      <div
        className={`grid transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'grid-rows-[1fr] opacity-100 translate-y-0 mt-0'
            : 'grid-rows-[0fr] opacity-0 -translate-y-4 pointer-events-none mt-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl text-slate-900">
            
            {/* Шапка карточки */}
            <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Экспресс-подбор автоматизации</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {status === 'done'
                    ? 'Рекомендованные сценарии'
                    : status === 'error'
                    ? (errorMessage?.title || 'Сервис пока недоступен')
                    : 'Укажите сайт и текущие системы'}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                title="Свернуть"
              >
                <X className="w-4 h-4" />
              </button>
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
                    placeholder="например: alfasb.by или СП ВИ-МЕНС"
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
                    Укажите дополнительную информацию или пожелания (необязательно)
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
              <div className="py-8 px-4 flex flex-col items-center justify-center text-center gap-3">
                <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
                <p className="text-sm font-bold text-slate-900 transition-all duration-300 min-h-[40px] flex items-center justify-center">
                  {ANALYSIS_STEPS[analysisStep]}
                </p>
                <div className="w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-sky-600 transition-all duration-300 rounded-full"
                    style={{ width: `${Math.min(100, ((analysisStep + 1) / ANALYSIS_STEPS.length) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Состояние: Результат анализа */}
            {status === 'done' && (
              <div className="space-y-3.5">
                <div className="text-xs text-slate-500">
                  Подобрано для: <strong className="text-slate-900">{companyProfile?.display_name || companyInput || 'вашей компании'}</strong>
                  {companyProfile?.industry && (
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      Отрасль: {companyProfile.industry}
                    </span>
                  )}
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

                {/* Кнопка перехода к форме Битрикс24 */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={handleScrollToForm}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Внедрить эти сценарии (Перейти к заявке)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
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
