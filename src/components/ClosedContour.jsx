import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ClosedContour() {
  const bullets = [
    {
      title: 'Размещение в регионе в соответствии с законом',
      text: 'хранение и обработка информации настраиваются строго по требованиям законодательства о защите персональных данных в вашем регионе.'
    },
    {
      title: 'Решение внутри закрытого контура',
      text: 'если вы работаете с закрытыми финансовыми таблицами, договорами и базой клиентов, система работает внутри вашего защищенного периметра.'
    },
    {
      title: 'Экономия без риска для бизнеса',
      text: 'автоматизируем трудоемкую обработку документов, звонков и фотографий с сохранением полного контроля компании над своими данными.'
    },
    {
      title: 'Экономия на больших объемах задач',
      text: 'при ежедневной расшифровке сотен звонков, распознавании потока накладных и работе типовых ассистентов внутренний контур позволяет не переплачивать внешним сервисам за каждый запрос.'
    }
  ];

  return (
    <section id="contour" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Левая колонка */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-sky-800 w-fit mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Безопасность</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight my-4">
              Защита коммерческой тайны и работа в закрытом контуре
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed my-4">
              Все решения для сокращения расходов - анализ коммерческих данных, сверку счетов и прайсов, сборку КП и фотоконтроль - мы можем реализовать во внутреннем контуре компании без передачи данных на сторону.
            </p>

            {/* 3 буллета */}
            <div className="space-y-3.5 my-6">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-sky-100 text-sky-700 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {bullet.title}
                    </span>
                    <span className="text-slate-600 text-sm sm:text-base">
                      {' '}- {bullet.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              На этапе аудита подберем оптимальный вариант запуска: на защищенных мощностях в вашем регионе или полностью внутри закрытого контура предприятия.
            </p>

            {/* Кнопка действия */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#lead-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-sm shadow-sky-600/20 active:scale-[0.99] transition-all"
              >
                <span>Обсудить проект</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Правая колонка с изображением */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 shadow-md overflow-hidden bg-white p-2">
              <img
                src="/images/closed-contour-ai.png"
                alt="Защита коммерческой тайны и работа в закрытом контуре"
                className="w-full h-auto rounded-xl object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
