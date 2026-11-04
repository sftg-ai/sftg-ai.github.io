import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Mic,
  Eye,
  FileText,
  Layers,
  Database,
  CheckCircle2,
  Workflow,
  FileCheck,
  BellRing
} from 'lucide-react';

export default function RealCases({ activeCase, setActiveCase } = {}) {
  const [activeCategory, setActiveCategory] = useState('Продажи и КП');

  const categories = [
    'Продажи и КП',
    'Бухгалтерия и закупки',
    'Сервис и производство',
    'Руководство и HR',
    'Индивидуальная разработка'
  ];

  const casesData = [
    // Отдел 1: Продажи и КП
    {
      id: '01',
      number: '01',
      department: 'Продажи и КП',
      badge: 'Продажи и КП',
      title: 'Прием заявок, общение в чатах и сборка КП',
      description: 'Принимает заказы из почты, звонков и мессенджеров (даже если клиент написал список своими словами или наговорил голосом), ведет диалог для уточнения деталей, проверяет остатки и собирает готовое КП или счет.',
      flow: {
        input: 'Заявка / Чат / Голос',
        action: 'Диалог и подбор из базы',
        output: 'Готовое КП в Битрикс24 и 1С'
      }
    },
    {
      id: '02',
      number: '02',
      department: 'Продажи и КП',
      badge: 'Продажи и КП',
      title: 'Подбор изделия и комплектующих по фотографии',
      description: 'Клиент или менеджер присылает обычное фото изделия со смартфона (например, подбор подходящей крышки-сиденья под форму сантехники или запчасти к оборудованию). Система по геометрии и крепежу находит совместимые модели в каталоге.',
      flow: {
        input: 'Фото изделия от клиента',
        action: 'Анализ формы и размеров',
        output: 'Точный артикул из каталога'
      },
      demoLink: 'https://podbor-kryshek.apps.aipush.dev'
    },
    {
      id: '03',
      number: '03',
      department: 'Продажи и КП',
      badge: 'Продажи и КП',
      title: 'Умные повторные продажи по истории базы',
      description: 'Анализирует историю отгрузок и старые комментарии менеджеров в CRM: вычисляет, у кого из клиентов заканчиваются расходники, кому пора предложить плановое ТО или дооснащение, и сразу готовит персональное предложение.',
      flow: {
        input: 'История сделок и отгрузок',
        action: 'Расчет повода для звонка',
        output: 'Задача и КП менеджеру'
      }
    },

    // Отдел 2: Бухгалтерия и закупки
    {
      id: '04',
      number: '01',
      department: 'Бухгалтерия и закупки',
      badge: 'Бухгалтерия и закупки',
      title: 'Ввод первички, ТТН и сверка счетов с договором',
      description: 'Распознает сканы и PDF счетов, накладных и актов аренды, сопоставляет заводские артикулы поставщиков с номенклатурой в 1С и проверяет цены по договору. Бухгалтер видит только расхождения.',
      flow: {
        input: 'Скан счета / ТТН / Акт',
        action: 'Сверка цен с договором',
        output: 'Проводка в Битрикс24 и 1С'
      }
    },
    {
      id: '05',
      number: '02',
      department: 'Бухгалтерия и закупки',
      badge: 'Бухгалтерия и закупки',
      title: 'Сведение прайсов поставщиков и контроль цен',
      description: 'Поставщики присылают прайс-листы и спецификации в разных форматах (Excel, PDF, таблицы). Система сводит их в единую матрицу закупок, находит лучшие условия и сигнализирует о скрытом удорожании позиций.',
      flow: {
        input: 'Прайсы разных поставщиков',
        action: 'Сводная матрица цен',
        output: 'Сигнал об отклонениях'
      }
    },
    {
      id: '06',
      number: '03',
      department: 'Бухгалтерия и закупки',
      badge: 'Бухгалтерия и закупки',
      title: 'Автодоговоры по фото реквизитов и проверка макетов',
      description: 'По фотографии или скану реквизитов клиента система за секунды извлекает УНП, расчетный счет и ФИО руководителя, проверяет контрагента по базе, заводит карточку в CRM и формирует готовый договор со счетом.',
      flow: {
        input: 'Фото / Скан реквизитов',
        action: 'Проверка УНП и шаблона',
        output: 'Готовый договор и счет'
      }
    },

    // Отдел 3: Сервис и производство
    {
      id: '07',
      number: '01',
      department: 'Сервис и производство',
      badge: 'Сервис и производство',
      title: 'Расчет точной даты готовности заказа в цеху',
      description: 'По нажатию кнопки в карточке заказа система анализирует текущую очередь изделий на всех участках цеха (резка, гибка, сборка), учитывает реальную статистику прошлых партий и сразу называет честный срок готовности для клиента.',
      flow: {
        input: 'Текущая очередь в цеху',
        action: 'Расчет загрузки участков',
        output: 'Точная дата готовности клиенту'
      }
    },
    {
      id: '08',
      number: '02',
      department: 'Сервис и производство',
      badge: 'Сервис и производство',
      title: 'Фотоконтроль LCD-панелей, выкладки и отгрузки',
      description: 'Техники, мерчандайзеры или рабочие цеха скидывают в бот фото рекламных LCD-экранов в бизнес-центрах, выкладки товара на полках или готового оборудования перед отгрузкой. Система проверяет кадры по чек-листу и сама верстает отчет.',
      flow: {
        input: 'Фото экрана / Полки / Груза',
        action: 'Проверка качества и макета',
        output: 'Готовый PDF-отчет клиенту'
      }
    },
    {
      id: '09',
      number: '03',
      department: 'Сервис и производство',
      badge: 'Сервис и производство',
      title: 'Сервисный бот по QR-коду и диагностика поломок',
      description: 'Сотрудник на объекте наводит телефон на QR-код оборудования и фотографирует ошибку на дисплее. Бот выдает пошаговую инструкцию для устранения мелкой проблемы на месте, а при сложной поломке вызывает инженера со списком нужных запчастей.',
      flow: {
        input: 'Скан QR и фото ошибки',
        action: 'Инструкция самодиагностики',
        output: 'Наряд инженеру и список ЗиП'
      }
    },

    // Отдел 4: Руководство и HR
    {
      id: '10',
      number: '01',
      department: 'Руководство и HR',
      badge: 'Руководство и HR',
      title: 'Утренние сводки директору и контроль просрочек',
      description: 'Каждое утро руководитель получает в мессенджер наглядную картину бизнеса: выручка и оплаты, статус каждого заказа в производстве и продажах, кто идет в графике, а на каком участке возникла задержка с указанием причины.',
      flow: {
        input: 'Данные Б24, 1С и цеха',
        action: 'Анализ плана и отклонений',
        output: 'Утренняя сводка директору'
      }
    },
    {
      id: '11',
      number: '02',
      department: 'Руководство и HR',
      badge: 'Руководство и HR',
      title: 'ИИ-рекрутер: разбор резюме и диалог с кандидатами',
      description: 'Агент за секунды отбирает подходящие резюме под требования вакансии, а бот самостоятельно пишет кандидату в мессенджер 24/7: ведет вежливую переписку, уточняет опыт, зарплатные ожидания и записывает лучших на интервью.',
      flow: {
        input: 'Отклик и резюме кандидата',
        action: 'Скрининг и переписка в боте',
        output: 'Готовая анкета и запись в CRM'
      }
    },
    {
      id: '12',
      number: '03',
      department: 'Руководство и HR',
      badge: 'Руководство и HR',
      title: 'Корпоративная база знаний и обучение новых сотрудников',
      description: 'Новый сотрудник задает рабочий вопрос обычным языком в чате: как провести возврат, какой регламент приемки или допуск по техкарте. Ассистент мгновенно отвечает по внутренним правилам компании.',
      flow: {
        input: 'Вопрос сотрудника в чате',
        action: 'Поиск по техкартам и правилам',
        output: 'Точная инструкция за секунды'
      }
    }
  ];

  const filteredCases = casesData.filter((c) => c.department === activeCategory);

  return (
    <section id="cases" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-left">
        
        {/* Верхняя часть секции: двухколоночная сетка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Левая колонка (7 колонок) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-sky-800 w-fit mb-3">
              <Briefcase className="w-3.5 h-3.5 text-sky-600" />
              <span>Примеры решений по отделам</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Примеры решений и сценарии автоматизации
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-2">
              Конкретные участки работы, где рутинные действия заменяются программными ассистентами с прямой передачей данных в Битрикс24, 1С и учетные базы компании.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Также реализуем индивидуальную разработку ИИ-ассистентов под нестандартные процессы, закрытые регламенты и оборудование вашего бизнеса.
            </p>
            
            {/* Фильтр по отделам под текстом */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Правая колонка (5 колонок) - компактный прямоугольник без обрезки */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-md bg-sky-600 p-1.5">
              <img
                src="/images/hero-ai-automation.png"
                alt="Сквозной конвейер автоматизации бизнес-процессов"
                className="w-full h-auto rounded-xl object-contain block"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Условный рендеринг: либо блок «Индивидуальная разработка», либо стандартная сетка карточек */}
        {activeCategory === 'Индивидуальная разработка' ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-left">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-sky-800 w-fit mb-3">
                <Workflow className="w-3.5 h-3.5 text-sky-600" />
                <span>Индивидуальный контур под ключ</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Проектирование персональных ИИ-ассистентов под ключ
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Создаем автономные программные контуры под уникальную специфику вашего предприятия, когда стандартных сценариев недостаточно.
              </p>
            </div>

            {/* Архитектурная схема процесса (3 уровня) */}
            <div className="space-y-4">
              {/* Уровень 1: Входные потоки */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs">
                      1
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Входной контур</div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">Входные потоки данных предприятия</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 hidden sm:inline">Любые каналы и форматы без ручной подготовки</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <Mic className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Аудиозаписи звонков и совещаний</div>
                      <div className="text-xs text-slate-500 mt-0.5">Записи IP-телефонии, очных планерок, аудиосообщения клиентов</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <Eye className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Видеопоток и фотоконтроль</div>
                      <div className="text-xs text-slate-500 mt-0.5">Снимки со смартфонов мастеров, кадры с камер цеха, QR-паспорта</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <FileText className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Документация и таблицы любого формата</div>
                      <div className="text-xs text-slate-500 mt-0.5">Сканы, PDF, Excel-прайсы, выгрузки, чертежи и бланки</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Соединительная стрелка вниз */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-sky-700 py-1">
                <ArrowDown className="w-4 h-4 text-sky-600" />
                <span>Потоковая передача в защищенное ядро обработки</span>
              </div>

              {/* Уровень 2: Ядро обработки и модули */}
              <div className="bg-sky-50/60 border border-sky-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      2
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-sky-700">Ядро системы</div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">Ядро обработки и специализированные модули</div>
                    </div>
                  </div>
                  <span className="text-xs text-sky-800 font-medium hidden sm:inline">Локально на вашем сервере или в защищенном облаке</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-white border border-sky-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-2.5">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-slate-900">Компьютерное зрение и фотоконтроль</div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Распознавание деталей, подбор по фото со смартфона, выявление брака и проверка фотоотчетов мастеров
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-sky-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-2.5">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-slate-900">Разбор первички и таблиц</div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Чтение любых PDF, сканов, накладных ТТН, актов и нестандартных Excel-прайсов с автоматической сверкой
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-sky-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-2.5">
                        <Mic className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-slate-900">Речевой анализ и транскрибация</div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Перевод разговоров и планерок в текст, фиксация договоренностей и автоматическое заполнение сделок в CRM
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-sky-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-2.5">
                        <Database className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-slate-900">Интеграция с системами компании</div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Бесшовное подключение к Битрикс24, 1С, складским программам, телефонии и внутренним базам без изменения их структуры
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Соединительная стрелка вниз */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 py-1">
                <ArrowDown className="w-4 h-4 text-emerald-600" />
                <span>Автоматическая запись проверенных результатов</span>
              </div>

              {/* Уровень 3: Итог работы (Благородный изумрудно-зеленый стиль) */}
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50 border border-emerald-200/90 rounded-2xl p-5 sm:p-6 shadow-sm text-emerald-950">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      3
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Результат работы</div>
                      <div className="text-sm sm:text-base font-bold text-slate-900">Действие в системах или моментальное уведомление</div>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-800/90 font-medium">
                    Автоматическая проводка либо алерт ответственным сотрудникам
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200/70 shadow-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 leading-snug">
                      <strong className="text-slate-900 block mb-0.5">Битрикс24 и CRM:</strong> Создание сделок, распределение лидов, автозадачи менеджерам и прикрепление готовых КП
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200/70 shadow-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 leading-snug">
                      <strong className="text-slate-900 block mb-0.5">1С, склад и ERP:</strong> Занесение номенклатуры, формирование ТТН, счетов и актов со сверкой цен по договору
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200/70 shadow-xs flex items-start gap-2.5">
                    <BellRing className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 leading-snug">
                      <strong className="text-slate-900 block mb-0.5">Контроль расхождений:</strong> Мгновенный алерт или задача сотруднику только при нестыковках, браке или отклонениях от норм
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Подвал карточки с CTA */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Нужен расчет сценария под ваши требования?
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Изучим регламенты вашей компании, предложим архитектуру и проведем пилот на ваших данных.
                </div>
              </div>
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 text-white text-xs sm:text-sm font-bold hover:bg-sky-700 shadow-sm shadow-sky-600/20 active:scale-[0.98] transition-all shrink-0"
              >
                <span>Обсудить индивидуальный проект</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          /* Сетка карточек конкретных сценариев */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Бейдж отдела */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">
                      {item.badge}
                    </span>
                  </div>

                  {/* Заголовок действия */}
                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Описание */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Статическая блок-схема процесса */}
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                    Схема процесса
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 shrink-0">Вход</span>
                      <span className="text-xs font-semibold text-slate-800 text-right">{item.flow.input}</span>
                    </div>

                    <div className="flex justify-center text-sky-500 py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-lg shadow-xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 shrink-0">ИИ-агент</span>
                      <span className="text-xs font-semibold text-sky-900 text-right">{item.flow.action}</span>
                    </div>

                    <div className="flex justify-center text-slate-400 py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-slate-900 border border-slate-900 px-3 py-1.5 rounded-lg shadow-xs text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 shrink-0">Итог</span>
                      <span className="text-xs font-semibold text-white text-right">{item.flow.output}</span>
                    </div>
                  </div>

                  {item.demoLink && (
                    <a
                      href={item.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700 hover:bg-sky-100 hover:text-sky-800 transition-colors"
                    >
                      <span>Открыть живое демо подбора по фото</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
