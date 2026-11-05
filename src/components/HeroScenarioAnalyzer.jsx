import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Loader2, X, RefreshCw, Layers, FileText, CheckCircle2 } from 'lucide-react';

export default function HeroScenarioAnalyzer() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyInput, setCompanyInput] = useState('');
  const [systems, setSystems] = useState({
    oneC: true,
    bitrix24: true,
    email: true,
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'analyzing' | 'done'
  const [analysisStep, setAnalysisStep] = useState(0);
  const [scenarios, setScenarios] = useState([]);

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

    const steps = [
      'Анализируем специфику бизнеса...',
      'Сопоставляем рутинные операции в 1С и Битрикс24...',
      'Формируем прикладные сценарии...',
    ];

    steps.forEach((_, idx) => {
      setTimeout(() => {
        setAnalysisStep(idx);
      }, idx * 600);
    });

    // Проверяем внешний эндпоинт (iPushDev), если настроен
    const endpoint = import.meta.env.VITE_AI_ANALYSIS_ENDPOINT;
    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company: companyInput, systems }),
        });
        if (response.ok) {
          const data = await response.json();
          setTimeout(() => {
            setScenarios(data.scenarios || generateLocalScenarios(companyInput, systems));
            setStatus('done');
          }, 1800);
          return;
        }
      } catch {
        // Fallback на локальный генератор
      }
    }

    // Локальная генерация
    setTimeout(() => {
      setScenarios(generateLocalScenarios(companyInput, systems));
      setStatus('done');
    }, 1800);
  };

  const handleScrollToForm = () => {
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setCompanyInput('');
  };

  return (
    <div className="w-full max-w-xl text-left">
      {/* 1. Кнопка по умолчанию в Hero */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-sky-50 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-sky-950/20 transition-all active:scale-[0.98] text-sm sm:text-base group cursor-pointer"
        >
          <span>Подобрать сценарии автоматизации</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-sky-600" />
        </button>
      ) : (
        /* 2. Раскрытая интерактивная карточка */
        <div className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl text-slate-900 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          
          {/* Шапка карточки */}
          <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Экспресс-подбор автоматизации</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                {status === 'done' ? 'Рекомендованные сценарии' : 'Укажите сайт и текущие системы'}
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
                  placeholder="например: alfasb.by или ЧП «Альфа-СБ»"
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
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

              <button
                type="submit"
                className="w-full mt-2 py-3 px-5 rounded-xl text-sm font-bold bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Рассчитать сценарии автоматизации</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Состояние: Выполняется анализ */}
          {status === 'analyzing' && (
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center gap-3">
              <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
              <p className="text-sm font-bold text-slate-900">
                {analysisStep === 0 && 'Изучаем специфику бизнеса...'}
                {analysisStep === 1 && 'Сопоставляем рутинные операции в 1С и Битрикс24...'}
                {analysisStep === 2 && 'Формируем прикладные сценарии окупаемости...'}
              </p>
              <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-sky-600 transition-all duration-500 rounded-full"
                  style={{ width: `${((analysisStep + 1) / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Состояние: Результат анализа */}
          {status === 'done' && (
            <div className="space-y-3.5">
              <div className="text-xs text-slate-500">
                Подобрано для: <strong className="text-slate-800">{companyInput || 'вашей компании'}</strong>
              </div>

              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                {scenarios.map((sc, idx) => {
                  const Icon = sc.icon || Sparkles;
                  return (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-left"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                          {sc.system}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700">
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

        </div>
      )}
    </div>
  );
}
