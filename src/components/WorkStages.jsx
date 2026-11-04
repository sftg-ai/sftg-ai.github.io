import React from 'react';
import { Layers, FileSearch, PhoneCall, Cpu, ShieldCheck, FileCheck, Wrench, Headphones } from 'lucide-react';

export default function WorkStages() {
  const stages = [
    {
      step: '01',
      icon: FileSearch,
      title: 'Предварительный аудит и варианты',
      desc: 'После вашей заявки мы изучаем специфику вашей компании, подбираем подходящие варианты автоматизации и направляем вам вместе с короткими уточняющими вопросами.'
    },
    {
      step: '02',
      icon: PhoneCall,
      title: 'Обсуждение процессов и план работ',
      desc: 'Проводим встречу, разбираем предложенные варианты, обсуждаем ваши процессы и вместе находим оптимальное решение, после чего фиксируем план, сроки и бюджет.'
    },
    {
      step: '03',
      icon: Cpu,
      title: 'Настройка решения и тест на ваших данных',
      desc: 'Адаптируем систему под ваши бизнес-правила, подключаем к рабочим базам и проверяем точность работы на реальной выборке ваших документов и заявок.'
    },
    {
      step: '04',
      icon: ShieldCheck,
      title: 'Запуск продукта, гарантия и поддержка',
      desc: 'Вводим готовое решение в работу, передаем понятные инструкции вашим сотрудникам, фиксируем официальную гарантию и обеспечиваем техническую поддержку.'
    }
  ];

  const commitments = [
    {
      icon: FileCheck,
      title: 'Прозрачные условия',
      desc: 'Фиксируем объем работ, сроки и бюджет до старта разработки.'
    },
    {
      icon: Wrench,
      title: 'Гарантийное сопровождение',
      desc: 'Бесплатно донастраиваем и калибруем систему после запуска в эксплуатацию.'
    },
    {
      icon: Headphones,
      title: 'Постоянная поддержка',
      desc: 'Остаемся на связи, следим за стабильной работой и развиваем продукт под новые задачи бизнеса.'
    }
  ];

  return (
    <section id="stages" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-left">
        {/* Шапка секции */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-sky-800 w-fit mb-3">
          <Layers className="w-3.5 h-3.5 text-sky-600" />
          <span>Этапы внедрения</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight my-4">
          Этапы внедрения: от заявки до запуска и поддержки
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Берем на себя весь цикл создания решения - от предварительного изучения вашего бизнеса до вывода готового продукта в работу и гарантийного сопровождения.
        </p>

        {/* 4 карточки этапов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-sky-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Нижняя полоса из 3 обязательств */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-6 rounded-2xl bg-white border border-sky-200/80 shadow-sm">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-sky-50 border border-sky-100 text-sky-700 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
