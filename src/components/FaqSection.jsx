import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';

export const FAQ_ITEMS = [
  {
    id: 'cost-and-start',
    question: 'Сколько стоит автоматизация и с чего начинается работа?',
    answer:
      'Работа начинается с бесплатного предразбора по вашему сайту или описанию задачи: до звонка мы присылаем 3 - 4 конкретных сценария автоматизации. Далее проводим аудит процесса и пилот на ваших реальных документах до заключения основного договора. После пилота фиксируем смету и сроки в договоре, все расчеты ведутся в BYN с резидентом ПВТ ООО «Инновационный Софт».'
  },
  {
    id: 'data-security',
    question: 'Где хранятся и обрабатываются данные компании - безопасно ли это?',
    answer:
      'Решение можно развернуть полностью локально на вашем сервере без доступа в интернет или в защищенном облаке. Данные компании не передаются на сторону, настраивается маскирование сведений, работа ведется по NDA и с соблюдением требований Закона Республики Беларусь № 99-З «О защите персональных данных».'
  },
  {
    id: 'systems-and-formats',
    question: 'Какие системы, чат-боты и форматы документов поддерживаются?',
    answer:
      'Подключаем Битрикс24, 1С и внутренние системы компании, а также каналы обращений: корпоративную почту, IP-телефонию, веб-сайт, Telegram и встроенный чат Битрикс24. Настраиваем бизнес-чат-боты и ассистентов для обработки счетов, договоров, накладных ТТН, актов, прайс-листов, таблиц Excel, PDF и фотографий.'
  },
  {
    id: 'it-team-needed',
    question: 'Нужна ли техническая подготовка или собственный ИТ-отдел с нашей стороны?',
    answer:
      'Нет, собственная команда разработки с вашей стороны не требуется. Достаточно короткой встречи с руководителем или владельцем процесса и примеров рабочих документов. Мы берем на себя проектирование, интеграцию с Битрикс24 и 1С, тестирование, запуск под ключ и обучение сотрудников.'
  },
  {
    id: 'difference-from-bots',
    question: 'Чем ваши решения отличаются от простого чат-бота или готовых модулей CRM?',
    answer:
      'Типовой чат-бот работает по жесткому сценарию и не решает учетные задачи. Наши ИИ-ассистенты связывают каналы заявок, Битрикс24, 1С, первичные документы и корпоративную базу знаний в единый рабочий контур: сверяют суммы и расхождения по балансам, контролируют дебиторскую задолженность и формируют управленческие отчеты для руководителя.'
  },
  {
    id: 'pilot-and-result',
    question: 'Как фиксируется результат и что будет, если пилот не даст эффекта?',
    answer:
      'Критерии успеха мы согласуем до старта работ. Сначала проверяем сценарий на реальной выборке ваших документов или заявок: вы наглядно видите качество сверки, скорость подготовки отчетов и экономию времени команды. Если пилот не подтверждает ожидаемый бизнес-эффект, вы не переходите к основному внедрению.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section
      id="faq"
      className="py-20 md:py-24 bg-slate-50 border-t border-slate-200/80 relative text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Левая колонка: заголовок и быстрый переход к разбору */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-sky-800 w-fit mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Частые вопросы</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Ответы на ключевые вопросы о внедрении
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Условия старта, расчеты в BYN с резидентом ПВТ, интеграция с Битрикс24 и 1С, безопасность данных по Закону РБ № 99-З и проверка эффекта на пилоте.
            </p>

            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 text-white text-xs sm:text-sm font-bold hover:bg-sky-700 shadow-sm shadow-sky-600/20 active:scale-[0.98] transition-all"
            >
              <span>Задать свой вопрос</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Правая колонка: доступный аккордеон вопросов-ответов */}
          <div className="lg:col-span-8 space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              const buttonId = `faq-button-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-colors duration-150 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-sky-200 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(idx)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {item.question}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-sky-50 border-sky-200 text-sky-600'
                            : 'bg-slate-50 border-slate-200 text-slate-500'
                        }`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className={
                      isOpen
                        ? 'px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed'
                        : 'hidden'
                    }
                  >
                    <p>{item.answer}</p>
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
