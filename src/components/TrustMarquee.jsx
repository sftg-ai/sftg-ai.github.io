import React, { useRef, useState, useEffect } from 'react';
import { Building2, X, ExternalLink } from 'lucide-react';

const ROW_ONE = [
  {
    id: 'spp',
    name: 'ООО «СанПроПласт»',
    industry: 'Производство сантехники',
    hasAI: true,
    theme: 'border-sky-200/90 bg-sky-50/70',
    projects: [
      {
        title: 'Подбор сантехники и крышек по фото',
        type: 'Компьютерное зрение и подбор деталей',
        demoLink: 'https://podbor-kryshek.apps.aipush.dev',
        taskDesc: 'В розничных каналах продаж покупателям было сложно самостоятельно подобрать подходящую крышку для унитаза под свою модель, что приводило к частым ошибкам при покупке и возвратам.',
        solutionDesc: 'Реализовали решение по подбору нужной модели по фотографии старой крышки или унитаза: сервис мгновенно находит совместимое сиденье в каталоге и дает прямой переход к покупке на маркетплейсах или на официальном сайте производителя.'
      },
      {
        title: 'Интеграция со складской базой и каналами дистрибуции',
        type: 'Интеграция каталога и склад',
        taskDesc: 'С ростом онлайн-заказов с сайта и маркетплейсов потребовалось исключить ручную сверку наличия изделий на складе завода ООО «СанПроПласт» в Марьиной Горке.',
        solutionDesc: 'Связали сервис подбора с каталогом и складскими остатками: автоматическая проверка фактического наличия в 1С, резервирование партий и мгновенная передача заказов на сборку.'
      }
    ]
  },
  {
    id: 'bpt',
    name: 'БелПромТех',
    industry: 'Пром. оборудование',
    theme: 'border-amber-200/90 bg-amber-50/70',
    projects: [
      {
        title: 'Внедрение ЭДО чертежей и КД',
        type: 'Корпоративный софт и ЭДО',
        taskDesc: 'Первичный запрос предприятия: устранить задержки в согласовании конструкторских извещений и чертежей между конструкторским бюро, ПДО и производственными цехами.',
        solutionDesc: 'Разработали централизованную систему электронного документооборота с контролем версионности файлов, ролевыми маршрутами визирования и синхронизацией номенклатурных справочников с 1С без передачи чертежей во внешние каналы.'
      },
      {
        title: 'Модуль расчета сметной себестоимости',
        type: 'Расчетный модуль и сметы',
        taskDesc: 'После успешного запуска ЭДО руководство обратилось со следующей задачей: сократить трудоемкий ручной расчет сметной себестоимости нестандартных партий металлоконструкций по меняющимся ценам металлопроката.',
        solutionDesc: 'Внедрили расчетный модуль, напрямую связанный с едиными номенклатурными справочниками: сопоставление спецификации изделия с актуальными закупочными ценами сырья в учетной системе и расчет плановой себестоимости за 2 минуты.'
      },
      {
        title: 'Диспетчеризация станков с ЧПУ',
        type: 'Производственная телеметрия',
        taskDesc: 'В рамках дальнейшего расширения цифрового контура потребовалось устранить слепую зону на производстве: отсутствие оперативной картины загрузки станочного парка и фиксации технологических простоев оборудования.',
        solutionDesc: 'Реализовали цеховой шлюз телеметрии оборудования: сбор наработки шпинделя и электронные отметки операторов о причинах остановок (наладка, ожидание металла, инструмент) в едином диспетчерском дашборде.'
      }
    ]
  },
  {
    id: 'sss',
    name: 'СеверСтальСнаб',
    industry: 'Металлопрокат и снабжение',
    hasAI: true,
    theme: 'border-indigo-200/90 bg-indigo-50/70',
    projects: [
      {
        title: 'ИИ-разбор входящих заявок и первички',
        type: 'Интеллектуальная обработка документов',
        taskDesc: 'Сотрудничество началось с пилотного проекта: бухгалтерия и отдел снабжения ежедневно тратили до 5 часов на ручной перенос позиций из сканов накладных со штампами и разноформатных заявок клиентов.',
        solutionDesc: 'Внедрили нейросетевую обработку документов: автоматическое выравнивание геометрии сканов, распознавание сложных номенклатурных таблиц с НДС и прямое создание проведенных поступлений в 1С без ручного ввода операторов.'
      },
      {
        title: 'Оптовый B2B-портал дилеров',
        type: 'Разработка веб-сайта и B2B-портала',
        taskDesc: 'Убедившись в надежности решений на первом проекте, заказчик масштабировал сотрудничество: потребовалось перевести оптовых покупателей с телефонных звонков на современный веб-сервис самостоятельного оформления заказов.',
        solutionDesc: 'Спроектировали и запустили специализированный оптовый B2B-портал с интерактивным каталогом металлопроката, личным кабинетом контрагента, калькулятором веса и автоматическим формированием счетов с резервированием остатков на складе.'
      }
    ]
  },
  {
    id: 'ale',
    name: 'Apex Logistics',
    industry: 'Supply chain & грузоперевозки',
    theme: 'border-emerald-200/90 bg-emerald-50/70',
    projects: [
      {
        title: 'Мобильное приложение водителя',
        type: 'Мобильное приложение (iOS / Android)',
        taskDesc: 'Первый проект: избавить водителей и экспедиторов на междугородних маршрутах от бумажных путевых листов и дать удобный инструмент оперативной фиксации передачи грузов.',
        solutionDesc: 'Разработали мобильное приложение для водителей с поддержкой работы без интернета: электронный маршрутный лист, пошаговая отметка этапов рейса, фотофиксация актов сдачи с геолокацией и автоматическая отправка данных в диспетчерскую службу при появлении сети.'
      },
      {
        title: 'Единый диспетчерский контур трекинга',
        type: 'Управление логистикой и трекинг',
        taskDesc: 'После оцифровки работы водителей логистическая компания поручила нам объединить разрозненные данные автопарка, внешних GPS-трекеров и таможенных складов в единую систему управления.',
        solutionDesc: 'Создали единую веб-панель логиста с отображением всего парка на карте в реальном времени, автоматическим расчетом прогноза времени прибытия (ETA) и автооповещением клиентов о статусе рейсов.'
      }
    ]
  },
  {
    id: 'ahv',
    name: 'АгроХолдинг Восток',
    industry: 'Агропром и сервис техники',
    theme: 'border-blue-200/90 bg-blue-50/70',
    projects: [
      {
        title: 'Планшетное приложение инженера',
        type: 'Мобильное приложение для планшетов',
        taskDesc: 'Стартовая задача: сервисные инженеры тратили до 3 часов после каждого выезда в хозяйства на бумажное оформление дефектовочных ведомостей комбайнов и согласование запчастей со складом.',
        solutionDesc: 'Создали специализированное планшетное приложение: электронные чек-листы осмотра узлов комбайнов, автоподбор совместимых каталожных номеров из складской базы дилера и мгновенная отправка заказ-наряда на комплектацию.'
      },
      {
        title: 'Телеметрия и списание ГСМ в ERP',
        type: 'Телеметрия и учет топлива',
        taskDesc: 'После успешного запуска планшетов холдинг расширил сотрудничество на весь парк техники: возникла потребность устранить расхождения между путевыми листами и фактическим расходом топлива на гектар.',
        solutionDesc: 'Интегрировали данные бортовых датчиков уровня топлива и площади обработанных контуров полей в корпоративную ERP с автоматическим формированием актов списания ГСМ по фактически выполненным полевым работам.'
      }
    ]
  },
  {
    id: 'nit',
    name: 'Nordic Tech',
    industry: 'Инжиниринг и автоматика',
    theme: 'border-orange-200/90 bg-orange-50/70',
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
    theme: 'border-teal-200/90 bg-teal-50/70',
    projects: [
      {
        title: 'B2B-кабинет оптовых покупателей',
        type: 'Оптовый портал и расчет цен',
        taskDesc: 'Начало сотрудничества: обработка заказов от международных контрагентов велась через длинную переписку в мессенджерах с медленным ручным пересчетом валютных прайсов и условий поставки.',
        solutionDesc: 'Запустили защищенный B2B-портал с учетом персональных дисконтных сеток, матриц доступности квот заказчиков и мгновенной генерацией экспортных инвойсов по стандартам Инкотермс.'
      },
      {
        title: 'Сверка оплат и таможенный архив',
        type: 'ВЭД и финансовый контроль',
        taskDesc: 'С ростом объемов контрактов финансовая служба обратилась за вторым этапом: автоматизацией трудоемкого сопоставления мультивалютных банковских выписок с открытыми контрактами и таможенными декларациями.',
        solutionDesc: 'Разработали модуль финансовой верификации: автоматический учет курсовых разниц, контроль сроков поступления валютной выручки и электронный архив грузовых таможенных деклараций.'
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
        title: 'Алгоритм раскроя и учета остатков',
        type: 'Складской контур и производство',
        taskDesc: 'Первый проект заказчика: устранить накопление неликвидных деловых обрезков труб и профилей на складе из-за отсутствия их оперативного учета при выписке счетов менеджерами.',
        solutionDesc: 'Внедрили программный алгоритм оптимизации линейного раскроя с фиксацией мерных остатков в CRM. При формировании заказа система в первую очередь предлагает использовать подходящие обрезки с площадки.'
      },
      {
        title: 'Связка весовой с CRM и печать ТТН',
        type: 'Интеграция систем и весовой',
        taskDesc: 'Оценив экономический эффект, компания поручила нам автоматизировать отгрузочный узел: задержки длинномеров на выезде из-за ручного пересчета теоретического веса металла в фактический по весовым талонам.',
        solutionDesc: 'Связали электронные автомобильные весы с Битрикс24: автоматическая корректировка веса партии в отгрузочных документах при съезде машины с платформы и мгновенная печать ТТН для водителя.'
      }
    ]
  },
  {
    id: 'vrs',
    name: 'Vanguard Systems',
    industry: 'Ритейл-системы',
    theme: 'border-violet-200/90 bg-violet-50/70',
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
    theme: 'border-cyan-200/90 bg-cyan-50/70',
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
    theme: 'border-rose-200/90 bg-rose-50/70',
    projects: [
      {
        title: 'Мобильное приложение экспедитора',
        type: 'Мобильное приложение (iOS / Android)',
        taskDesc: 'Стартовый этап: линейные экспедиторы тратили часы на бумажные акты сдачи партий и телефонные согласования при перегрузке в транзитных транспортных узлах.',
        solutionDesc: 'Разработали мобильное приложение экспедитора: электронное подтверждение сдачи партий, сканирование QR-пломб на кузове и мгновенная передача статусов рейса в логистический контур.'
      },
      {
        title: 'Модуль автомаршрутизации автопарка',
        type: 'Диспетчеризация автопарка',
        taskDesc: 'На втором этапе развития компания доверила нам центральный контур логистики: сложное ежедневное планирование десятков рейсов доставки по торговым сетям с жесткими временными окнами.',
        solutionDesc: 'Спроектировали модуль автомаршрутизации: алгоритмический учет очередей на пандусах распределительных центров, осевых нагрузок автотранспорта и расчет оптимальных плеч доставки с минимизацией порожнего пробега.'
      }
    ]
  },
  {
    id: 'kmc',
    name: 'Kronos Machinery',
    industry: 'Машиностроение и ЧПУ',
    theme: 'border-zinc-200/90 bg-zinc-50/70',
    projects: [
      {
        title: 'Интерактивный конфигуратор станков',
        type: 'Конфигуратор промышленного оборудования',
        taskDesc: 'Ошибки сейлз-инженеров при подборе опций станков (шпиндели, системы охлаждения, револьверные головки) приводили к пересогласованию заказов на заводе.',
        solutionDesc: 'Создали интерактивный конфигуратор промышленного оборудования с жесткой матрицей технической совместимости узлов и мгновенной выгрузкой технико-коммерческого предложения со спецификацией узлов.'
      }
    ]
  }
];

const ROW_TWO = [
  {
    id: 'ptp',
    name: 'ПромТехПрибор',
    industry: 'Приборостроение и ОТК',
    hasAI: true,
    theme: 'border-emerald-200/90 bg-emerald-50/70',
    projects: [
      {
        title: 'Оптический фотоконтроль экранов ОТК',
        type: 'Компьютерное зрение на производстве',
        taskDesc: 'Пилотное внедрение на участке калибровки: контролеры ОТК вручную переписывали в журналы показания LCD-экранов цифровых датчиков, что создавало риск человеческой ошибки при приемке партии.',
        solutionDesc: 'Установили пост оптической инспекции: камера считывает показания с ЖК-дисплея прибора, сверяет калибровку с допусками технологической карты и формирует электронный акт приемки ОТК с фотофиксацией.'
      },
      {
        title: 'Сквозной учет шильдиков и маркировки',
        type: 'Учет партий и маркировка',
        taskDesc: 'Успех пилота показал высокую точность компьютерного зрения, и руководство завода масштабировало решение: автоматизация учета номерных агрегатов и шильдиков при передаче на финишную упаковку.',
        solutionDesc: 'Разработали модуль потокового считывания лазерной маркировки корпусов: автоматическая привязка электронного паспорта изделия к заводскому номеру на шильдике в учетной системе предприятия.'
      }
    ]
  },
  {
    id: 'res',
    name: 'РусЭнергоСтрой',
    industry: 'Энергостроительство',
    theme: 'border-purple-200/90 bg-purple-50/70',
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
    id: 'scg',
    name: 'SmartCommerce',
    industry: 'Оптовая B2B-торговля',
    theme: 'border-cyan-200/90 bg-cyan-50/70',
    projects: [
      {
        title: 'Разработка оптового B2B-портала',
        type: 'Разработка веб-сайта и B2B-витрины',
        taskDesc: 'Первый этап: создание современного оптового сайта с десятками тысяч SKU, персональными оптовыми ценами и адаптивным интерфейсом для мобильных устройств дилеров.',
        solutionDesc: 'Разработали быстрый B2B-портал с каталогом, параметрической фильтрацией характеристик по брендам и личным кабинетом дилера с контролем кредитных лимитов и взаиморасчетов.'
      },
      {
        title: 'Алгоритм матчинга каталогов поставщиков',
        type: 'Мастер-каталог поставщиков',
        taskDesc: 'С ростом дилерской сети возникла масштабная задача интеграции: десятки поставщиков передавали прайс-листы в разных форматах и наименованиях, что тормозило обновление витрины на дни.',
        solutionDesc: 'Создали систему автоматического сопоставления товарных позиций: сверка артикулов производителей, штрихкодов и характеристик с автоматическим формированием единого мастер-каталога на витрине.'
      }
    ]
  },
  {
    id: 'hps',
    name: 'Horizon Pharma',
    industry: 'Медицинские поставки',
    theme: 'border-amber-200/90 bg-amber-50/70',
    projects: [
      {
        title: 'Аудит холодовой цепи и GDP-журнал',
        type: 'Фармацевтический мониторинг',
        taskDesc: 'Необходимость строгого соблюдения требований холодовой цепи при хранении термолабильных медицинских препаратов и ведения журнала для регуляторов.',
        solutionDesc: 'Подключили логгеры температуры и влажности складских зон к системе непрерывного аудита: автоматическое оповещение ответственных лиц при выходе параметров за коридор нормы и генерация отчетов соответствия GDP.'
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
            onClick={() => {
              if (!hasDragged.current) {
                onSelect(company);
              }
            }}
            className={`min-w-[155px] sm:min-w-[175px] max-w-[190px] px-3.5 py-2.5 rounded-xl border-2 transition-all duration-150 flex flex-col justify-center text-left shrink-0 cursor-pointer ${
              isActive 
                ? 'border-sky-600 bg-white shadow-md shadow-sky-600/10' 
                : `${company.theme} hover:border-slate-300 hover:shadow-xs`
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
  const [activeCompany, setActiveCompany] = useState(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Сброс индекса проекта на первый при смене компании
  useEffect(() => {
    setActiveProjectIdx(0);
  }, [activeCompany?.id]);

  const handleSelectCompany = (company) => {
    if (activeCompany?.id === company.id) {
      setActiveCompany(null);
    } else {
      setActiveCompany(company);
    }
  };

  const currentProject = activeCompany?.projects[activeProjectIdx] || activeCompany?.projects[0];
  const hasMultipleProjects = Boolean(activeCompany && activeCompany.projects.length > 1);

  return (
    <section id="projects" className="py-12 sm:py-14 bg-slate-50/70 border-b border-slate-200/80 text-left scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* БЛОК 1: Твердый факт о внедренных решениях */}
        <div className="pb-7 border-b border-slate-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Более 80 реализованных проектов в компаниях
          </h2>
        </div>

        {/* БЛОК 2: Партнеры и проекты (две свайп-строчки + открывающаяся карточка проекта) */}
        <div className="pt-7">
          <div className="mb-4">
            {/* Плашка направления */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-sky-800">
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Проекты</span>
            </div>
          </div>

          {/* Две аккуратные строки кубиков: верхняя длинная и нижняя пополняемая */}
          <div className="space-y-1 sm:space-y-1.5">
            {/* Строка 1: свайп влево (стартует с начала) */}
            <DraggableRow 
              items={ROW_ONE} 
              activeId={activeCompany?.id} 
              onSelect={handleSelectCompany} 
              initialScroll={0} 
            />

            {/* Строка 2: 4 кейса (пополняемый ряд) */}
            <DraggableRow 
              items={ROW_TWO} 
              activeId={activeCompany?.id} 
              onSelect={handleSelectCompany} 
              initialScroll={0} 
            />
          </div>

          {/* Интерактивная панель описания проекта (открывается по клику с плавным фейдом) */}
          {activeCompany && currentProject && (
            <div 
              key={activeCompany.id}
              className="mt-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs animate-smooth-fade"
            >
              {/* Заголовок карточки партнера */}
              <div className="flex items-center justify-between gap-2.5 pb-4 mb-4 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {activeCompany.name}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
                    {activeCompany.industry}
                  </span>
                  {activeCompany.hasAI && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-sky-50 font-bold text-sky-700 border border-sky-200/90">
                      AI
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCompany(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Скрыть описание"
                  aria-label="Закрыть"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Если у компании несколько проектов: аккуратные вкладки-переключатели */}
              {hasMultipleProjects && (
                <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  {activeCompany.projects.map((proj, pIdx) => {
                    const isProjActive = activeProjectIdx === pIdx;
                    return (
                      <button
                        key={pIdx}
                        type="button"
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
              
              {/* Описание активного проекта с плавным появлением при переключении */}
              <div 
                key={`${activeCompany.id}-${activeProjectIdx}`}
                className="space-y-4 animate-smooth-fade"
              >
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

                {/* Интерактивная кнопка перехода на демо-стенд */}
                {currentProject.demoLink && (
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      Работающий сервис доступен для открытого тестирования
                    </span>
                    <a
                      href={currentProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 active:scale-[0.99] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer w-fit"
                    >
                      <span>Протестировать на демо-стенде</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
