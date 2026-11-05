import React from 'react';
import { ShieldCheck, FileCheck, Award, Clock, ArrowRight, Check } from 'lucide-react';

export default function GuaranteesAndTerms() {
  const points = [
    {
      icon: Award,
      title: 'Индивидуальная оценка без лишних наценок',
      subtitle: 'Прозрачная смета',
      desc: 'Прямая инженерная разработка позволяет держать адекватную стоимость внедрения без раздутых бюджетов неповоротливых интеграторов. Вы платите только за реальную автоматизацию конкретного участка.',
      badge: 'Адекватный бюджет',
      accent: 'border-sky-200 bg-sky-50 text-sky-700'
    },
    {
      icon: FileCheck,
      title: 'Пилотный прототип до оплаты',
      subtitle: 'Гарантия окупаемости',
      desc: 'Проверяем точность на ваших реальных файлах и накладных до подписания основного договора. Вы оцениваете работу системы на своих документах и только после этого принимаете решение.',
      badge: 'Пилот до договора',
      accent: 'border-emerald-200 bg-emerald-50 text-emerald-700'
    },
    {
      icon: Clock,
      title: '2 месяца гарантийного сопровождения',
      subtitle: '60 дней поддержки',
      desc: '60 дней бесплатной калибровки правил, дообучения сценариев и поддержки после запуска в боевую эксплуатацию. Инженеры всегда на связи для оперативной донастройки.',
      badge: '60 дней гарантии',
      accent: 'border-blue-200 bg-blue-50 text-blue-700'
    }
  ];

  return (
    <section id="guarantees" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-200/80">
      
      {/* Заголовок */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Понятный B2B-формат сотрудничества
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Условия работы и гарантии
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          Внедрение без скрытых платежей, жестких подписок и риска для инфраструктуры.
        </p>
      </div>

      {/* 3 карточки гарантий */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {points.map((pt, idx) => {
          const Icon = pt.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${pt.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                    {pt.badge}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {pt.subtitle}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {pt.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {pt.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Фиксируется в официальном договоре</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Информационная плашка про аудит */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold text-slate-900">
            Хотите оценить окупаемость до заключения договора?
          </h4>
          <p className="text-sm text-slate-600">
            Проведем 30-минутный бесплатный экспресс-аудит одного вашего процесса и покажем расчет экономии.
          </p>
        </div>
        <a
          href="#lead-form"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-sm shrink-0 transition-all"
        >
          <span>Записаться на аудит</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </section>
  );
}
