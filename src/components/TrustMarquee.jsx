import React, { useRef, useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

const ROW_ONE = [
  {
    id: 'bpt',
    name: 'БелПромТех',
    industry: 'Пром. оборудование',
    projectType: 'Корпоративный софт и ЭДО',
    theme: 'border-sky-200/90 bg-sky-50/70',
    taskDesc: 'Предприятию требовалось устранить задержки в согласовании конструкторских извещений и чертежей между конструкторским бюро, ПДО и производственными цехами.',
    solutionDesc: 'Разработали централизованную систему электронного документооборота с контролем версионности файлов, ролевыми маршрутами визирования и синхронизацией номенклатурных справочников с 1С без передачи чертежей во внешние каналы.'
  },
  {
    id: 'sss',
    name: 'СеверСтальСнаб',
    industry: 'Металлопрокат',
    projectType: 'Интеграционный шлюз и автоматизация заказов',
    theme: 'border-slate-200 bg-white',
    taskDesc: 'Клиенты и региональные дилеры присылали спецификации сортового и фасонного металлопроката с разнобоем в написании марок стали, ГОСТов и типоразмеров.',
    solutionDesc: 'Спроектировали шлюз пакетной нормализации заявок: система сопоставляет позиции с заводскими артикулами, проверяет доступные объемы на складах ответственного хранения и автоматически резервирует партии в учетной системе компании.'
  },
  {
    id: 'ale',
    name: 'Apex Logistics',
    industry: 'Supply chain & freight',
    projectType: 'Телематика и управление сборными грузами',
    theme: 'border-indigo-200/90 bg-indigo-50/70',
    taskDesc: 'Необходимость консолидации данных от разнородных систем GPS-мониторинга автопарка, таможенных постов и промежуточных распределительных хабов.',
    solutionDesc: 'Создали единый диспетчерский контур: трекинг статусов рейсов в реальном времени, автоматический расчет прогнозного времени прибытия (ETA) и формирование сопроводительных транспортных пакетов для грузополучателей.'
  },
  {
    id: 'ahv',
    name: 'АгроХолдинг Восток',
    industry: 'Агропром и техника',
    projectType: 'Мобильное рабочее место и полевой сервис',
    theme: 'border-emerald-200/90 bg-emerald-50/70',
    taskDesc: 'Инженеры сервисной службы тратили до 3 часов после каждого выезда в хозяйства на бумажное оформление актов дефектовки комбайнов и согласование списка запчастей.',
    solutionDesc: 'Внедрили планшетный интерфейс выездного инженера: электронная карта осмотра узлов, автоподбор совместимых каталожных номеров из складской базы дилера и мгновенная отправка заказ-наряда на склад.'
  },
  {
    id: 'nit',
    name: 'Nordic Tech',
    industry: 'Инжиниринг',
    projectType: 'SCADA-шлюз и предиктивный регламент ТО',
    theme: 'border-blue-200/90 bg-blue-50/70',
    taskDesc: 'Высокая стоимость внеплановых остановок роботизированных линий сборки из-за запаздывания регламентных сервисных работ.',
    solutionDesc: 'Реализовали сбор телеметрии с контроллеров оборудования в производственную базу данных. Система автоматически рассчитывает наработку моточасов и формирует превентивные заявки на техобслуживание до наступления критического износа.'
  },
  {
    id: 'agt',
    name: 'Al-Dhabi Trading',
    industry: 'Оптовая торговля',
    projectType: 'B2B-кабинет оптовых дистрибьюторов',
    theme: 'border-amber-200/90 bg-amber-50/80',
    taskDesc: 'Обработка заказов от международных контрагентов велась через длинную переписку в мессенджерах с ручным пересчетом валютных прайсов и условий поставки.',
    solutionDesc: 'Запустили защищенный B2B-портал с учетом персональных дисконтных сеток, матриц доступности товаров под квоты заказчиков и мгновенной генерацией экспортных инвойсов по стандартам Инкотермс.'
  },
  {
    id: 'mk',
    name: 'МеталлКомплект',
    industry: 'Трубный прокат',
    projectType: 'Оптимизация раскроя и мерных остатков',
    theme: 'border-slate-200 bg-white',
    taskDesc: 'Скопление неликвидных деловых обрезков труб и профилей на складе из-за отсутствия оперативного учета остатков при выписке счетов менеджерами.',
    solutionDesc: 'Внедрили программный алгоритм оптимизации линейного раскроя с фиксацией мерных остатков в Битрикс24. При формировании заказа система в первую очередь предлагает использовать подходящие обрезки с площадки.'
  },
  {
    id: 'vrs',
    name: 'Vanguard Systems',
    industry: 'Ритейл-системы',
    projectType: 'Синхронизация омниканальных продаж',
    theme: 'border-teal-200/90 bg-teal-50/70',
    taskDesc: 'Рассинхронизация остатков между розничной сетью торговых точек и центральным распределительным складом приводила к отмене подтвержденных заказов.',
    solutionDesc: 'Разработали отказоустойчивую шину данных: обмен чеками, возвратами и перемещениями между POS-терминалами и центральной учетной системой без задержек и дублирования проводок.'
  }
];

const ROW_TWO = [
  {
    id: 'esc',
    name: 'Emirates Supply',
    industry: 'Авиа & морская логистика',
    projectType: 'Электронный документооборот авианакладных',
    theme: 'border-sky-200/90 bg-sky-50/70',
    taskDesc: 'Ручной ввод данных из сотен сканов международных грузовых накладных (AWB) и манифестов занимал значительную часть рабочего времени операторов.',
    solutionDesc: 'Внедрили сервис разбора и проверки авианакладных с кросс-валидацией кодов аэропортов, весогабаритных лимитов и тарифов, автоматически формирующий проводки в операционной системе экспедитора.'
  },
  {
    id: 'blg',
    name: 'БелЛогистик Групп',
    industry: 'Мультимодальный транспорт',
    projectType: 'Автоматизированная маршрутизация рейсов',
    theme: 'border-emerald-200/90 bg-emerald-50/70',
    taskDesc: 'Трудоемкое ручное планирование ежедневных рейсов доставки по торговым сетям с жесткими требованиями к временным окнам и температурным режимам.',
    solutionDesc: 'Спроектировали модуль автомаршрутизации: учет весовых ограничений по осям автотранспорта, очередей на пандусах гипермаркетов и расчет оптимальных плеч доставки с контролем себестоимости километра.'
  },
  {
    id: 'kmc',
    name: 'Kronos Machinery',
    industry: 'Машиностроение и ЧПУ',
    projectType: 'Конфигуратор промышленного оборудования',
    theme: 'border-slate-200 bg-white',
    taskDesc: 'Ошибки сейлз-инженеров при подборе опций станков (шпиндели, системы охлаждения, револьверные головки) приводили к пересогласованию заказов на заводе.',
    solutionDesc: 'Создали интерактивный конфигуратор промышленного оборудования с жесткой матрицей технической совместимости узлов и мгновенной выгрузкой технико-коммерческого предложения со спецификацией узлов.'
  },
  {
    id: 'gpl',
    name: 'Gulf Petrochem',
    industry: 'Нефтехимия & терминалы',
    projectType: 'Партионный учет и баланс сырья',
    theme: 'border-amber-200/90 bg-amber-50/80',
    taskDesc: 'Контроль баланса наливных продуктов в резервуарном парке с учетом температурных колебаний плотности и перемещений между емкостями.',
    solutionDesc: 'Внедрили модуль сведения материального баланса: сопоставление данных лабораторных паспортов качества, уровнемеров и актов налива с автоматическим выявлением расхождений сверх технологических норм.'
  },
  {
    id: 'res',
    name: 'РусЭнергоСтрой',
    industry: 'Энергостроительство',
    projectType: 'Учет строительных смет и форм КС-2/КС-3',
    theme: 'border-indigo-200/90 bg-indigo-50/70',
    taskDesc: 'Сложность сверки фактического выполнения электромонтажных работ подрядчиками с утвержденными локальными сметами и спецификациями проекта.',
    solutionDesc: 'Разработали программный модуль контроля сметных лимитов: автоматическая проверка актов КС-2 на непревышение объемов материалов и расценок по проекту до визирования финансовой службой.'
  },
  {
    id: 'hps',
    name: 'Horizon Pharma',
    industry: 'Медицинские поставки',
    projectType: 'Аудит условий хранения и валидация',
    theme: 'border-teal-200/90 bg-teal-50/70',
    taskDesc: 'Необходимость строгого соблюдения требований холодовой цепи при хранении термолабильных медицинских препаратов и ведения журнала для регуляторов.',
    solutionDesc: 'Подключили логгеры температуры и влажности складских зон к системе непрерывного аудита: автоматическое оповещение ответственных лиц при выходе параметров за коридор нормы и генерация отчетов соответствия GDP.'
  },
  {
    id: 'scg',
    name: 'SmartCommerce',
    industry: 'Оптовая B2B-торговля',
    projectType: 'Единый номенклатурный B2B-каталог',
    theme: 'border-slate-200 bg-white',
    taskDesc: 'Десятки поставщиков передавали прайс-листы в разных форматах и с произвольными наименованиями товаров, что тормозило обновление витрины на дни.',
    solutionDesc: 'Создали систему матчинга товарных позиций: автоматическое сопоставление артикулов производителей, штрихкодов и характеристик с созданием единого мастер-каталога для оптовых покупателей.'
  },
  {
    id: 'pai',
    name: 'Prime Agro',
    industry: 'Агроэкспорт и сырье',
    projectType: 'Контроль качества зерна и расчетов с поставщиками',
    theme: 'border-emerald-200/90 bg-emerald-50/70',
    taskDesc: 'Расхождения в расчетах зачетного веса партий зерна из-за ручного пересчета показателей влажности и сорности с лабораторных карточек приемки.',
    solutionDesc: 'Внедрили сквозную фиксацию приемки: передача данных экспресс-анализаторов в учетную систему, авторасчет зачетной массы по формулам Дюваля и мгновенная печать реестра ТТН для водителя.'
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
      className={`flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto py-2 px-1 scrollbar-none select-none transition-colors ${
        isDown ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {items.map((company) => {
        const isActive = activeId === company.id;
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
            <div className={`text-xs sm:text-sm font-bold tracking-tight leading-tight truncate ${
              isActive ? 'text-sky-950 font-extrabold' : 'text-slate-900'
            }`}>
              {company.name}
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
              <span>Партнеры и проекты (примеры)</span>
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

            {/* Строка 2: сдвинута вправо (удобно свайпать вправо) */}
            <DraggableRow 
              items={ROW_TWO} 
              activeId={activeCompany.id} 
              onSelect={setActiveCompany} 
              initialScroll={140} 
            />
          </div>

          {/* Интерактивная панель описания проекта при наведении */}
          <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs transition-all duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 mb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {activeCompany.name}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
                  {activeCompany.industry}
                </span>
              </div>
              <div className="text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-lg border border-sky-100/90 w-fit">
                {activeCompany.projectType}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div>
                <strong className="block text-slate-900 mb-1 font-semibold">
                  Задача и специфика:
                </strong>
                <p>{activeCompany.taskDesc}</p>
              </div>
              <div>
                <strong className="block text-slate-900 mb-1 font-semibold">
                  Реализованное решение и результат:
                </strong>
                <p>{activeCompany.solutionDesc}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
