import React from 'react';
import { FileText, ShieldAlert, Cpu, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BusinessBenefits() {
  const benefits = [
    {
      icon: FileText,
      badge: 'Скорость и точность',
      title: 'Оцифровка PDF, сканов и фото напрямую в 1С',
      desc: 'Распознавание любых накладных, ТТН, актов и счетов без ручного перепечатывания. Сопоставление с вашей номенклатурой за 15–20 секунд с проверкой реквизитов и НДС.',
      tag: '15–20 секунд на документ',
      accent: 'border-sky-200 bg-sky-50/50 text-sky-700',
    },
    {
      icon: ShieldAlert,
      badge: 'Защита от переплат',
      title: 'Контроль цен и договоров',
      desc: 'Система сверяет входящий счёт со спецификацией и договором. Если поставщик изменил цену или артикул — документ не уходит в оплату, а сразу подсвечивается ответственному сотруднику.',
      tag: '0 переплат поставщикам',
      accent: 'border-amber-200 bg-amber-50/50 text-amber-800',
    },
    {
      icon: Cpu,
      badge: 'Штатные механизмы',
      title: 'Интеграция с вашей 1С и Битрикс24',
      desc: 'Подключение к уже настроенным базам через официальные протоколы (OData, REST). Не нужно менять учетную систему, ломать типовую конфигурацию или переучивать персонал.',
      tag: 'Без изменения типовой 1С',
      accent: 'border-emerald-200 bg-emerald-50/50 text-emerald-800',
    },
    {
      icon: Lock,
      badge: 'Безопасность и закон',
      title: 'Закрытый контур (при необходимости)',
      desc: 'Возможность размещения на серверах компании либо полностью внутри локальной сети предприятия. Никакие данные не уходят во внешние облака.',
      tag: '100% On-Premise контур',
      accent: 'border-indigo-200 bg-indigo-50/50 text-indigo-800',
    },
  ];

  return (
    <section id="capabilities" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-200/80">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Фокус на оптимизации и контроле
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Что получает бизнес при внедрении
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          Спокойный перенос рутины на программных ассистентов. Избавьте бухгалтерию, снабжение и продажи от механического ввода данных.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`p-3 rounded-xl border ${item.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                  {item.tag}
                </span>
                <span className="text-slate-400 font-medium">Беларусь</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
