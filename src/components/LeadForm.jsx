import React, { useState } from 'react';
import { ArrowRight, Send, ShieldCheck, Search, MessageSquare, PhoneCall, Sparkles, MessageCircle } from 'lucide-react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    companyOrSphere: '',
    taskDesc: ''
  });
  const [noticeOpen, setNoticeOpen] = useState(false);

  // Формируем персональный текст для Telegram на основе того, что человек уже ввел в поля
  const getPersonalizedTgLink = () => {
    let msg = 'Здравствуйте! Хочу получить персональный разбор автоматизации для бизнеса.';
    const details = [];
    if (formData.name.trim()) details.push(`Имя: ${formData.name.trim()}`);
    if (formData.companyOrSphere.trim()) details.push(`Компания/сфера: ${formData.companyOrSphere.trim()}`);
    if (formData.contact.trim()) details.push(`Контакт: ${formData.contact.trim()}`);
    if (formData.taskDesc.trim()) details.push(`Задача: ${formData.taskDesc.trim()}`);
    
    if (details.length > 0) {
      msg += `\n\n${details.join('\n')}`;
    }
    return `https://t.me/yurasvidersky?text=${encodeURIComponent(msg)}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setNoticeOpen(true);
  };

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
        
        {/* Слева: 6 колонок - Описание предпроектного разбора */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 w-fit mb-4">
              Бесплатный предпроектный разбор
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Оставьте сайт вашей компании - подготовим варианты автоматизации до звонка
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
              Вам не нужно заранее писать техническое задание. Мы сами изучим ваш сайт и специфику бизнеса, подготовим 3 - 4 конкретных сценария автоматизации именно для вашей компании и пришлем короткий список перед созвоном.
            </p>
          </div>

          {/* 3 прозрачных шага */}
          <div className="space-y-4">
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

        {/* Справа: 6 колонок - Форма (растягивается точно вровень с шагами слева) */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="p-6 sm:p-8 md:p-9 rounded-3xl bg-white border border-slate-200 shadow-xl relative h-full flex flex-col justify-between">
            
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 h-full">
              
              {/* 1. Ваше имя */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Алексей"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                />
              </div>

              {/* 2. Телефон или Telegram */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Телефон или Telegram *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+375 (29) 000-00-00 или @username"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                />
              </div>

              {/* 3. Сайт компании или сфера бизнеса */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Сайт компании или сфера бизнеса *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например: kompaniya.by или оптовая поставка оборудования"
                  value={formData.companyOrSphere}
                  onChange={(e) => setFormData({ ...formData, companyOrSphere: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                />
              </div>

              {/* 4. Ваша задача или комментарий (необязательно) */}
              <div className="flex-1 flex flex-col">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ваша задача или комментарий (необязательно)
                </label>
                <textarea
                  rows={4}
                  placeholder="Если уже знаете, какой участок хотите автоматизировать - напишите пару слов"
                  value={formData.taskDesc}
                  onChange={(e) => setFormData({ ...formData, taskDesc: e.target.value })}
                  className="w-full flex-1 min-h-[90px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors resize-none"
                />
              </div>

              {/* Раздвигающаяся шторка с Telegram Юрия при нажатии на кнопку */}
              {noticeOpen && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/60 border border-sky-200/90 text-left transition-all duration-300 animate-in fade-in slide-in-from-top-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-600/30">
                      <Send className="w-4 h-4 ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          Отправка через форму пока недоступна
                        </span>
                        <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                          В разработке
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        Чтобы сразу получить варианты автоматизации и не ждать, отправьте запрос напрямую в Telegram:
                      </p>
                      <a
                        href={getPersonalizedTgLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-600/25 active:scale-[0.98] transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Написать в Telegram</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Кнопка отправки формы */}
              {!noticeOpen ? (
                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-xl text-sm font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Получить персональный разбор бизнеса -&gt;</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : null}

              {/* Подпись соответствия Закону 99-З */}
              <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Обработка данных в строгом соответствии с Законом Республики Беларусь № 99-З.</span>
              </div>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
