import React, { useRef, useState, useEffect } from 'react';
import { Building2, Layers } from 'lucide-react';

const ROW_ONE = [
  {
    id: 'bpt',
    name: 'БелПромТех',
    industry: 'Пром. оборудование',
    theme: 'border-sky-200/90 bg-sky-50/70',
    projects: [
      {
        title: 'Согласование КД и корпоративное ЭДО',
        type: 'Корпоративный софт и ЭДО',
        taskDesc: 'Предприятию требовалось устранить задержки в согласовании конструкторских извещений и чертежей между конструкторским бюро, ПДО и производственными цехами.',
        solutionDesc: 'Разработали централизованную систему электронного документооборота с контролем версионности файлов, ролевыми маршрутами визирования и синхронизацией номенклатурных справочников с 1С без передачи чертежей во внешние каналы.'
      },
      {
        title: 'Авторасчет себестоимости заказов',
        type: 'Расчетный модуль и сметы',
        taskDesc: 'Длительный ручной расчет сметной себестоимости нестандартных партий металлоконструкций по технологическим картам и меняющимся ценам металлопроката.',
        solutionDesc: 'Внедрили расчетный модуль: автоматическое сопоставление спецификации изделия с актуальными закупочными ценами сырья в учетной системе и расчет плановой себестоимости за 2 минуты.'
      },
      {
        title: 'Диспетчеризация станков с ЧПУ',
        type: 'Производственная телеметрия',
        taskDesc: 'Отсутствие оперативной картины загрузки станочного парка и фиксации причин технологических простоев оборудования в цехах.',
        solutionDesc: 'Реализовали шлюз сбора сигналов работы оборудования: фиксация наработки шпинделя и электронные отметки операторов о причинах остановок (наладка, ожидание металла, инструмент) в едином дашборде.'
      }
    ]
  },
  {
    id: 'sss',
    name: 'СеверСтальСнаб',
    industry: 'Металлопрокат и поставки',
    theme: 'border-slate-200 bg-white',
    projects: [
      {
        title: 'Оптовый B2B-портал и каталог продукции',
        type: 'Разработка веб-сайта и B2B-портала',
        taskDesc: 'Дилеры и региональные заказчики были вынуждены запрашивать остатки металлопроката по телефону и почте, ожидая ручного составления коммерческих предложений.',
        solutionDesc: 'Спроектировали и запустили специализированный оптовый веб-портал с интерактивным каталогом металлопроката, личным кабинетом контрагента, калькулятором веса и автоматическим формированием счетов с резервированием остатков на складе.'
      },
      {
        title: 'Интеграция с учетными системами и складом',
        type: 'Интеграция систем и складской контур',
        taskDesc: 'Необходимость оперативной синхронизации актуальных цен, партий и складских остатков металлобазы между сайтом и внутренними учетными базами компании.',
        solutionDesc: 'Настроили надежный двусторонний шлюз обмена данными: обновление складских остатков каждые 3 минуты и автоматическая выгрузка оформленных на сайте заказов в работу менеджерам.'
      }
    ]
  },
  {
    id: 'ale',
    name: 'Apex Logistics',
    industry: 'Supply chain & грузоперевозки',
    theme: 'border-indigo-200/90 bg-indigo-50/70',
    projects: [
      {
        title: 'Мобильное приложение водителя и экспедитора',
        type: 'Мобильное приложение (iOS / Android)',
        taskDesc: 'Водители и экспедиторы на междугородних маршрутах заполняли путевые листы на бумаге, а диспетчеры узнавали о задержках и передаче груза только по телефону.',
        solutionDesc: 'Разработали мобильное приложение для водителей с поддержкой работы без интернета: электронный маршрутный лист, пошаговая отметка этапов рейса, фотофиксация актов приема-передачи с геолокацией и мгновенная отправка данных в диспетчерскую службу при появлении сети.'
      },
      {
        title: 'Единый диспетчерский контур трекинга',
        type: 'Управление логистикой и трекинг',
        taskDesc: 'Данные о движении автопарка и статусах сборных грузов были разрознены между несколькими внешними трекерами и учетными таблицами.',
        solutionDesc: 'Создали единую веб-панель логиста с отображением всего парка на карте в реальном времени, автоматическим расчетом расчетного времени прибытия и оповещением клиентов о статусе доставки.'
      }
    ]
  },
  {
    id: 'ahv',
    name: 'АгроХолдинг Восток',
    industry: 'Агропром и сервис техники',
    theme: 'border-emerald-200/90 bg-emerald-50/70',
    projects: [
      {
        title: 'Планшетное приложение сервисного инженера',
        type: 'Мобильное приложение для планшетов',
        taskDesc: 'Инженеры сервисной службы тратили до 3 часов после каждого выезда в хозяйства на бумажное оформление актов дефектовки комбайнов и согласование запчастей.',
        solutionDesc: 'Создали специализированное планшетное приложение: электронные чек-листы осмотра узлов комбайнов, автоподбор совместимых каталожных номеров из складской базы дилера и мгновенная отправка заказ-наряда на склад.'
      },
      {
        title: 'Учет расхода ГСМ и наработки техники',
        type: 'Телеметрия и учет топлива',
        taskDesc: 'Расхождения между путевыми листами механизаторов и фактическим расходом топлива на гектар при проведении сезонных полевых работ.',
        solutionDesc: 'Интегрировали данные бортовых датчиков уровня топлива и площади обработанных контуров полей в корпоративную ERP с автоматическим формированием актов списания ГСМ.'
      }
    ]
  },
  {
    id: 'nit',
    name: 'Nordic Tech',
    industry: 'Инжиниринг',
    theme: 'border-blue-200/90 bg-blue-50/70',
    projects: [
      {
        title: 'SCADA-шлюз и регламент ТО',
        type: 'Промышленная диспетчеризация',
        taskDesc: 'Высокая стоимость внеплановых остановок роботизированных линий сборки из-за запаздывания регламентных сервисных работ.',
        solutionDesc: 'Реализовали сбор телеметрии с контроллеров оборудования в производственную базу данных. Система автоматически рассчитывает наработку моточасов и формирует превентивные заявки на техобслуживание до наступления критического износа.'
      }
    ]
  },
  {
    id: 'agt',
    name: 'Al-Dhabi Trading',
    industry: 'Оптовая торговля',
    theme: 'border-amber-200/90 bg-amber-50/80',
    projects: [
      {
        title: 'B2B-кабинет оптовых покупателей',
        type: 'Оптовый портал и расчет цен',
        taskDesc: 'Обработка заказов от международных контрагентов велась через длинную переписку в мессенджерах с ручным пересчетом валютных прайсов и условий поставки.',
        solutionDesc: 'Запустили защищенный B2B-портал с учетом персональных дисконтных сеток, матриц доступности товаров под квоты заказчиков и мгновенной генерацией экспортных инвойсов по стандартам Инкотермс.'
      },
      {
        title: 'Сверка валютных оплат и таможенный архив',
        type: 'ВЭД и финансовый контроль',
        taskDesc: 'Трудоемкое сопоставление мультивалютных банковских выписок с открытыми экспортными контрактами и грузовыми декларациями.',
        solutionDesc: 'Разработали модуль финансовой верификации: автоматический учет курсовых разниц, контроль сроков поступления валютной выручки и электронный архив ГТД.'
      }
    ]
  },
  {
    id: 'mk',
    name: 'МеталлКомплект',
    industry: 'Трубный прокат',
    theme: 'border-slate-200 bg-white',
    projects: [
      {
        title: 'Оптимизация раскроя и мерных остатков',
        type: 'Складской контур и производство',
        taskDesc: 'Скопление неликвидных деловых обрезков труб и профилей на складе из-за отсутствия оперативного учета остатков при выписке счетов менеджерами.',
        solutionDesc: 'Внедрили программный алгоритм оптимизации линейного раскроя с фиксацией мерных остатков в Битрикс24. При формировании заказа система в первую очередь предлагает использовать подходящие обрезки с площадки.'
      },
      {
        title: 'Автовыписка счетов со склада',
        type: 'Интеграция Битрикс24 и весовой',
        taskDesc: 'Задержки отгрузки длинномерного автотранспорта из-за ручного пересчета теоретического веса металла в фактический по весовым талонам.',
        solutionDesc: 'Связали электронные автомобильные весы с CRM-системой: автоматическая корректировка веса партии в отгрузочных документах и мгновенная печать ТТН.'
      }
    ]
  },
  {
    id: 'vrs',
    name: 'Vanguard Systems',
    industry: 'Ритейл-системы',
    theme: 'border-teal-200/90 bg-teal-50/70',
    projects: [
      {
        title: 'Синхронизация омниканальных продаж',
        type: 'Шина данных и учет остатков',
        taskDesc: 'Рассинхронизация остатков между розничной сетью торговых точек и центральным распределительным складом приводила к отмене подтвержденных заказов.',
        solutionDesc: 'Разработали отказоустойчивую шину данных: обмен чеками, возвратами и перемещениями между POS-терминалами и центральной учетной системой без задержек и дублирования проводок.'
      }
    ]
  },
  {
    id: 'esc',
    name: 'Emirates Supply',
    industry: 'Авиа & морская логистика',
    theme: 'border-sky-200/90 bg-sky-50/70',
    projects: [
      {
        title: 'Электронный документооборот AWB',
        type: 'Обработка международных накладных',
        taskDesc: 'Ручной ввод данных из сотен сканов международных грузовых накладных (AWB) и манифестов занимал значительную часть рабочего времени операторов.',
        solutionDesc: 'Внедрили сервис разбора и проверки авианакладных с кросс-валидацией кодов аэропортов, весогабаритных лимитов и тарифов, автоматически формирующий проводки в операционной системе экспедитора.'
      }
    ]
  },
  {
    id: 'blg',
    name: 'БелЛогистик Групп',
    industry: 'Мультимодальный транспорт',
    theme: 'border-emerald-200/90 bg-emerald-50/70',
    projects: [
      {
        title: 'Мобильное приложение для экспедиторов и водителей',
        type: 'Мобильное приложение (iOS / Android)',
        taskDesc: 'Операторы тратили часы на уточнение статусов погрузки, передачу сопроводительных документов и регистрацию актов перегрузки в транзитных узлах.',
        solutionDesc: 'Разработали кроссплатформенное мобильное приложение экспедитора: электронное подтверждение сдачи партий, сканирование QR-пломб и мгновенная отправка данных в логистический контур.'
      },
      {
        title: 'Автомаршрутизация и учет окон доставки',
        type: 'Диспетчеризация автопарка',
        taskDesc: 'Трудоемкое ручное планирование ежедневных рейсов доставки по торговым сетям с жесткими требованиями к временным окнам и температурным режимам.',
        solutionDesc: 'Спроектировали модуль автомаршрутизации: учет весовых ограничений по осям автотранспорта, очередей на пандусах гипермаркетов и расчет оптимальных плеч доставки с контролем себестоимости километра.'
      }
    ]
  },
  {
    id: 'kmc',
    name: 'Kronos Machinery',
    industry: 'Машиностроение и ЧПУ',
    theme: 'border-slate-200 bg-white',
    projects: [
      {
        title: 'Интерактивный конфигуратор станков',
        type: 'Конфигуратор промышленного оборудования',
        taskDesc: 'Ошибки сейлз-инженеров при подборе опций станков (шпиндели, системы охлаждения, револьверные головки) приводили к пересогласованию заказов на заводе.',
        solutionDesc: 'Создали интерактивный конфигуратор промышленного оборудования с жесткой матрицей технической совместимости узлов и мгновенной выгрузкой технико-коммерческого предложения со спецификацией узлов.'
      }
    ]
  },
  {
    id: 'gpl',
    name: 'Gulf Petrochem',
    industry: 'Нефтехимия & терминалы',
    theme: 'border-amber-200/90 bg-amber-50/80',
    projects: [
      {
        title: 'Партионный баланс сырья',
        type: 'Учет наливных резервуаров',
        taskDesc: 'Контроль баланса наливных продуктов в резервуарном парке с учетом температурных колебаний плотности и перемещений между емкостями.',
        solutionDesc: 'Внедрили модуль сведения материального баланса: сопоставление данных лабораторных паспортов качества, уровнемеров и актов налива с автоматическим выявлением расхождений сверх технологических норм.'
      }
    ]
  }
];

const ROW_TWO = [
  {
    id: 'res',
    name: 'РусЭнергоСтрой',
    industry: 'Энергостроительство',
    theme: 'border-indigo-200/90 bg-indigo-50/70',
    projects: [
      {
        title: 'Контроль сметных лимитов КС-2/КС-3',
        type: 'Строительный аудит и сметы',
        taskDesc: 'Сложность сверки фактического выполнения электромонтажных работ подрядчиками с утвержденными локальными сметами и спецификациями проекта.',
        solutionDesc: 'Разработали программный модуль контроля сметных лимитов: автоматическая проверка актов КС-2 на непревышение объемов материалов и расценок по проекту до визирования финансовой службой.'
      }
    ]
  },
  {
    id: 'hps',
    name: 'Horizon Pharma',
    industry: 'Медицинские поставки',
    theme: 'border-teal-200/90 bg-teal-50/70',
    projects: [
      {
        title: 'Аудит холодовой цепи и GDP-журнал',
        type: 'Фармацевтический мониторинг',
        taskDesc: 'Необходимость строгого соблюдения требований холодовой цепи при хранении термолабильных медицинских препаратов и ведения журнала для регуляторов.',
        solutionDesc: 'Подключили логгеры температуры и влажности складских зон к системе непрерывного аудита: автоматическое оповещение ответственных лиц при выходе параметров за коридор нормы и генерация отчетов соответствия GDP.'
      }
    ]
  },
  {
    id: 'scg',
    name: 'SmartCommerce',
    industry: 'Оптовая B2B-торговля',
    theme: 'border-slate-200 bg-white',
    projects: [
      {
        title: 'Разработка B2B-портала и оптовой витрины',
        type: 'Разработка веб-сайта и B2B-витрины',
        taskDesc: 'Необходимость создания единого оптового сайта с десятками тысяч SKU, персональными оптовыми ценами и адаптивным интерфейсом под мобильные устройства.',
        solutionDesc: 'Разработали современный B2B-портал с быстрым поиском, фильтрацией характеристик по ГОСТам/брендам и личным кабинетом дилера с контролем взаиморасчетов.'
      },
      {
        title: 'Матчинг номенклатурных справочников',
        type: 'Мастер-каталог поставщиков',
        taskDesc: 'Десятки поставщиков передавали прайс-листы в разных форматах и с произвольными наименованиями товаров, что тормозило обновление витрины на дни.',
        solutionDesc: 'Создали систему матчинга товарных позиций: автоматическое сопоставление артикулов производителей, штрихкодов и характеристик с созданием единого мастер-каталога для оптовых покупателей.'
      }
    ]
  },
  {
    id: 'pai',
    name: 'Prime Agro',
    industry: 'Агроэкспорт и сырье',
    theme: 'border-emerald-200/90 bg-emerald-50/70',
    projects: [
      {
        title: 'Сквозной учет приемки зерновых партий',
        type: 'Контроль лаборатории и ТТН',
        taskDesc: 'Расхождения в расчетах зачетного веса партий зерна из-за ручного пересчета показателей влажности и сорности с лабораторных карточек приемки.',
        solutionDesc: 'Внедрили сквозную фиксацию приемки: передача данных экспресс-анализаторов в учетную систему, авторасчет зачетной массы по формулам Дюваля и мгновенная печать реестра ТТН для водителя.'
      }
    ]
  }
];

function DraggableRow({ items, activeId, onSelect, initialScroll = 0 }) {
  const rowRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    if (rowRef.current && initialScroll > 0) {
      rowRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  const onMouseDown = (e) => {
    setIsDown(true);
    hasDragged.current = false;
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
  };

  const onMouseLeave = () => setIsDown(false);
  const onMouseUp = () => setIsDown(false);

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      hasDragged.current = true;
    }
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={rowRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className={`flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto py-2.5 px-1.5 scrollbar-none select-none transition-colors ${
        isDown ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {items.map((company) => {
        const isActive = activeId === company.id;
        const projectCount = company.projects.length;

        return (
          <div
            key={company.id}
            onMouseEnter={() => onSelect(company)}
            onClick={() => {
              if (!hasDragged.current) {
                onSelect(company);
              }
            }}
            className={`min-w-[155px] sm:min-w-[175px] max-w-[190px] px-3.5 py-2.5 rounded-xl border-2 transition-all duration-150 flex flex-col justify-center text-left shrink-0 cursor-pointer ${
              isActive 
                ? 'border-sky-600 bg-white shadow-md shadow-sky-600/10' 
                : `${company.theme} hover:border-slate-300`
            }`}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className={`text-xs sm:text-sm font-bold tracking-tight leading-tight truncate ${
                isActive ? 'text-sky-950 font-extrabold' : 'text-slate-900'
              }`}>
                {company.name}
              </span>
              {projectCount > 1 && (
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100/80 px-1.5 py-0.2 rounded border border-sky-200/80 shrink-0">
                  {projectCount}
                </span>
              )}
            </div>
            <div className={`text-[11px] font-medium truncate mt-0.5 ${
              isActive ? 'text-sky-700' : 'text-slate-500'
            }`}>
              {company.industry}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TrustMarquee() {
  const [activeCompany, setActiveCompany] = useState(ROW_ONE[0]);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Сброс индекса проекта на первый при смене компании
  useEffect(() => {
    setActiveProjectIdx(0);
  }, [activeCompany.id]);

  const currentProject = activeCompany.projects[activeProjectIdx] || activeCompany.projects[0];
  const hasMultipleProjects = activeCompany.projects.length > 1;

  return (
    <section className="py-12 sm:py-14 bg-slate-50/70 border-b border-slate-200/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* БЛОК 1: Твердый факт о внедренных решениях */}
        <div className="pb-7 border-b border-slate-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Более 80 реализованных проектов в компаниях
          </h2>
        </div>

        {/* БЛОК 2: Партнеры и проекты (две свайп-строчки + карточка проекта) */}
        <div className="pt-7">
          <div className="mb-4">
            {/* Плашка направления */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-sky-800">
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Партнеры и кейсы</span>
            </div>
          </div>

          {/* Две аккуратные строки кубиков: верхняя и нижняя */}
          <div className="space-y-1 sm:space-y-1.5">
            {/* Строка 1: свайп влево (стартует с начала) */}
            <DraggableRow 
              items={ROW_ONE} 
              activeId={activeCompany.id} 
              onSelect={setActiveCompany} 
              initialScroll={0} 
            />

            {/* Строка 2: 4 кейса (пополняемый ряд) */}
            <DraggableRow 
              items={ROW_TWO} 
              activeId={activeCompany.id} 
              onSelect={setActiveCompany} 
              initialScroll={0} 
            />
          </div>

          {/* Интерактивная панель описания проекта при наведении */}
          <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs transition-all duration-200">
            {/* Заголовок карточки партнера */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 mb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {activeCompany.name}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
                  {activeCompany.industry}
                </span>
                {hasMultipleProjects && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-sky-50 font-semibold text-sky-700 border border-sky-100">
                    Реализовано {activeCompany.projects.length} проекта в рамках развития
                  </span>
                )}
              </div>
              <div className="text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-lg border border-sky-100/90 w-fit">
                {currentProject.type}
              </div>
            </div>

            {/* Если у компании несколько проектов: аккуратные вкладки-переключатели */}
            {hasMultipleProjects && (
              <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  Этапы сотрудничества:
                </span>
                {activeCompany.projects.map((proj, pIdx) => {
                  const isProjActive = activeProjectIdx === pIdx;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onMouseEnter={() => setActiveProjectIdx(pIdx)}
                      onClick={() => setActiveProjectIdx(pIdx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isProjActive
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {proj.title}
                    </button>
                  );
                })}
              </div>
            )}
            
            {/* Описание активного проекта */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div>
                <strong className="block text-slate-900 mb-1 font-semibold">
                  Задача и специфика:
                </strong>
                <p>{currentProject.taskDesc}</p>
              </div>
              <div>
                <strong className="block text-slate-900 mb-1 font-semibold">
                  Реализованное решение и результат:
                </strong>
                <p>{currentProject.solutionDesc}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
