import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

const PROCESSES = [
  {
    id: 'docs-requests',
    tab: 'Документы и заявки',
    title: 'ИИ-агент сверяет документы, оплаты и заявки между Битрикс24 и 1С',
    subtitle: 'Счета, выписки в BYN и заявки из почты, телефона, сайта и чат-бота Telegram проверяются автоматически - руководитель и бухгалтер видят только расхождения.',
    badge: 'Сверка оплат и счетов',
    cardTitle: 'Сделка ЗК-2291 · ООО «БелСнабКомплект»',
    statusText: 'Сверка завершена',
    rows: [
      { label: 'Сверка систем', value: 'Битрикс24 и 1С:Бухгалтерия' },
      { label: 'Статус в CRM', value: 'Сделка закрыта (ЗК-2291)' },
      { label: 'Сумма по счету', value: '14 850,00 BYN' },
      { label: 'Баланс в 1С', value: 'Расхождение: оплата не поступила' }
    ],
    signalPlate: 'Сделка ЗК-2291 закрыта в Битрикс24, но оплата 14 850 BYN в 1С не поступила -> контроль дебиторской задолженности руководителю',
    resultPlate: 'Остальные 47 счетов и оплат в BYN сверены без расхождений в Битрикс24 и 1С'
  },
  {
    id: 'kp-sales',
    tab: 'КП и продажи',
    title: 'ИИ-агент принимает заявки со всех каналов и собирает КП за 1 минуту',
    subtitle: 'Запросы из IP-телефонии, почты, веб-сайта, бизнес-чат-бота Telegram и встроенного чата Битрикс24 превращаются в готовый расчет.',
    badge: 'Коммерческое предложение',
    cardTitle: 'Запрос № 104 · ООО «ТехноПром»',
    statusText: 'Расчет готов',
    rows: [
      { label: 'Канал поступления', value: 'Почта + запись звонка' },
      { label: 'Позиций в запросе', value: '34 наименования' },
      { label: 'Подобрано по складу', value: '33 из 34 позиций' },
      { label: 'Сумма КП', value: '28 400,00 BYN' }
    ],
    signalPlate: 'Позиция 19: нет на складе, согласовать аналог -> менеджеру',
    resultPlate: 'Готовый PDF-файл КП прикреплен к сделке в Битрикс24'
  },
  {
    id: 'procurement-prices',
    tab: 'Закупки и прайсы',
    title: 'ИИ-агент сводит прайсы поставщиков и находит отклонения в ценах',
    subtitle: 'Цены из разных таблиц, писем и кабинетов - в одной сводной матрице с подсветкой расхождений.',
    badge: 'Прайс-листы',
    cardTitle: '6 прайсов · 1 240 позиций',
    statusText: 'Сводка сформирована',
    rows: [
      { label: 'Поставщиков в сверке', value: '6 компаний' },
      { label: 'Форматы файлов', value: 'Excel, PDF, выгрузки' },
      { label: 'Новых артикулов', value: '42 позиции' },
      { label: 'Лучшие условия', value: 'Отсрочка 30 дней' }
    ],
    signalPlate: 'Позиция 318: цена выше прошлого прайса на 140 BYN -> закупщику',
    resultPlate: '1 239 позиций сведены в единую таблицу закупок'
  },
  {
    id: 'primary-docs',
    tab: 'Первичка в Битрикс24 и 1С',
    title: 'ИИ-агент распознает первичные документы и заносит их в Битрикс24 и 1С',
    subtitle: 'Счета, ТТН и акты сверяются с договором, заказом и балансом расчетов - бухгалтер и руководитель видят только расхождения.',
    badge: 'Накладная ТТН',
    cardTitle: 'ТТН № 0841922 от ООО «ПромРесурс»',
    statusText: 'Реквизиты сверены',
    rows: [
      { label: 'Тип документа', value: 'Товарно-транспортная накладная' },
      { label: 'Основание', value: 'Договор № 12/2026' },
      { label: 'Сумма документа', value: '9 640,00 BYN' },
      { label: 'Статус сверки', value: 'Реквизиты и УНП совпадают' }
    ],
    signalPlate: 'Строка 7: не совпала единица измерения -> бухгалтеру',
    resultPlate: 'Остальные 52 накладные проведены в Битрикс24 и 1С'
  },
  {
    id: 'contracts-tenders',
    tab: 'Договоры и тендеры',
    title: 'ИИ-агент проверяет договоры и тендерную документацию до подписания',
    subtitle: 'Отклонения от вашего шаблона, штрафы и сроки подачи видны до согласования, а не после подписания.',
    badge: 'Договор',
    cardTitle: 'Договор поставки № 47-2026',
    statusText: 'Юрконтроль пройден',
    rows: [
      { label: 'Контрагент', value: 'ООО «СтройИнвест»' },
      { label: 'Предмет договора', value: 'Поставка оборудования' },
      { label: 'Условия оплаты', value: 'Полная предоплата' },
      { label: 'Срок поставки', value: '14 рабочих дней' }
    ],
    signalPlate: 'Отклонение от шаблона: предоплата вместо отсрочки -> юристу',
    resultPlate: 'Остальные 14 пунктов соответствуют корпоративному шаблону'
  },
  {
    id: 'estimates-production',
    tab: 'Сметы и производство',
    title: 'ИИ-агент сверяет смету с фактом и заранее сигналит об отклонениях',
    subtitle: 'Перерасход материалов, загрузка узлов и история партий видны до сдачи заказа клиенту.',
    badge: 'Смета производства',
    cardTitle: 'Смета заказа № 19 · сборка партии',
    statusText: 'Техкарта проверена',
    rows: [
      { label: 'Технологических узлов', value: '18 участков' },
      { label: 'Комплектующих по норме', value: '2 470 единиц' },
      { label: 'Партия сырья', value: 'Сертификат № 884-А' },
      { label: 'Статус комплектации', value: 'Проверено по техкарте' }
    ],
    signalPlate: 'Участок 7: перерасход крепежа сверх нормы -> технологу',
    resultPlate: '17 участков уложились в плановую себестоимость'
  },
  {
    id: 'service-photo',
    tab: 'Сервис и фотоконтроль',
    title: 'ИИ-агент проверяет фотоотчеты и формирует акты выполненных работ с выезда',
    subtitle: 'Мастера и полевые сотрудники фиксируют работу на фото или по QR-коду - система сама готовит акт и счет.',
    badge: 'Выездной сервис',
    cardTitle: 'Наряд № 804 · Обслуживание по QR-коду',
    statusText: 'Фотоконтроль пройден',
    rows: [
      { label: 'Объект обслуживания', value: 'Аппарат ID-4092 (QR-паспорт)' },
      { label: 'Замененные детали', value: '3 позиции со склада мастера' },
      { label: 'Фотоконтроль работы', value: '4 снимка проверены по чек-листу' },
      { label: 'Сумма по наряду', value: '680,00 BYN' }
    ],
    signalPlate: 'Выявлен износ привода: назначить плановое ТО -> в Битрикс24',
    resultPlate: 'Акт выполненных работ и счет отправлены клиенту'
  }
];

export default function ProcessExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="processes" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80 relative">
      <style>{`
        @keyframes processDocCascade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-process-row {
          opacity: 0;
          animation: processDocCascade 550ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
          
          {/* Левая колонка: навигация, заголовки и доверительные буллеты */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            {/* Плашка направления */}
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-xs font-semibold px-3 py-1 rounded-full text-sky-800 w-fit mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Примеры</span>
            </div>

            {/* Динамический H2 и подзаголовок (все 7 вариантов присутствуют в DOM для индексации) */}
            <div>
              {PROCESSES.map((proc, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={proc.id + '-title'}
                    hidden={!isActive}
                    className={isActive ? 'space-y-3 transition-opacity duration-200' : 'hidden'}
                  >
                    <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-slate-900 tracking-tight leading-snug">
                      {proc.title}
                    </h2>
                    <p className="text-base text-slate-600 leading-relaxed">
                      {proc.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* 2 доверительных буллета */}
            <div className="flex flex-col gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Аудит процесса - бесплатно</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Пилот на ваших документах - этап до договора на внедрение</span>
              </div>
            </div>

            {/* 7 кнопок-таблеток выбора процесса */}
            <div className="flex flex-wrap gap-2 pt-2" role="tablist" aria-label="Выбор процесса для разбора">
              {PROCESSES.map((proc, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={proc.id}
                    id={`process-tab-${proc.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`process-panel-${proc.id}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm cursor-pointer text-left transition-colors duration-150 ${
                      isActive
                        ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-700 font-medium'
                    }`}
                  >
                    {proc.tab}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Правая колонка: интерактивная карточка со ступенчатой анимацией (все 7 панелей в DOM) */}
          <div className="lg:col-span-7">
            {PROCESSES.map((proc, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={proc.id}
                  id={`process-panel-${proc.id}`}
                  role="tabpanel"
                  aria-labelledby={`process-tab-${proc.id}`}
                  hidden={!isActive}
                  className={
                    isActive
                      ? 'bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden'
                      : 'hidden'
                  }
                >
                  {/* 0 мс: Шапка карточки */}
                  <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/60">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {proc.badge}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate mt-1">
                          {proc.cardTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Пульсирующий индикатор статуса */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold shrink-0">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>{proc.statusText}</span>
                    </div>
                  </div>

                  {/* Тело карточки: строки параметров и плашки сигналов */}
                  <div className="p-5 sm:p-6 flex flex-col gap-4">
                    
                    {/* 4 строки параметров со ступенчатой задержкой (250мс, 500мс, 750мс, 1000мс) */}
                    <div className="divide-y divide-slate-100">
                      {proc.rows.map((row, rIdx) => {
                        const delayMs = (rIdx + 1) * 250;
                        return (
                          <div
                            key={rIdx}
                            className={`py-3 flex items-center justify-between gap-4 text-xs sm:text-sm ${
                              isActive ? 'animate-process-row' : ''
                            }`}
                            style={isActive ? { animationDelay: `${delayMs}ms` } : undefined}
                          >
                            <span className="text-slate-500 font-normal shrink-0">{row.label}</span>
                            <div className="flex-1 border-b border-dotted border-slate-200 mx-2 hidden sm:block opacity-60" />
                            <span className="text-slate-900 font-semibold text-right">{row.value}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* 1300 мс: Темная плашка-сигнал отклонения */}
                    <div
                      className={`bg-slate-900 text-white p-4 rounded-xl flex items-start gap-3 shadow-md shadow-slate-950/5 ${
                        isActive ? 'animate-process-row' : ''
                      }`}
                      style={isActive ? { animationDelay: '1300ms' } : undefined}
                    >
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm leading-relaxed text-slate-100 font-medium">
                        {proc.signalPlate}
                      </div>
                    </div>

                    {/* 1600 мс: Светло-голубая плашка итога автоматической обработки */}
                    <div
                      className={`bg-sky-50 text-sky-950 border border-sky-200 p-4 rounded-xl flex items-start gap-3 ${
                        isActive ? 'animate-process-row' : ''
                      }`}
                      style={isActive ? { animationDelay: '1600ms' } : undefined}
                    >
                      <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm leading-relaxed font-semibold text-sky-950">
                        {proc.resultPlate}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
