import React from 'react';
import {
  Factory,
  Boxes,
  Truck,
  Building2,
  Globe2,
  Cpu,
  Layers,
  Store,
  Compass,
  Briefcase,
  Flame,
  Shield,
  Anchor,
  Sparkles,
  Zap
} from 'lucide-react';

const COMPANIES = [
  // 1-3. Крупные BY / RU
  {
    name: 'БелПромТех',
    badge: 'BY',
    industry: 'Промышленное оборудование',
    icon: Factory,
    theme: 'border-sky-200/90 bg-sky-50/60 text-sky-950',
    iconTheme: 'bg-white text-sky-600 border-sky-100',
    badgeTheme: 'bg-sky-100/90 text-sky-800 border-sky-200'
  },
  {
    name: 'СеверСтальСнаб',
    badge: null,
    industry: 'Металлопрокат и поставки',
    icon: Boxes,
    theme: 'border-slate-200 bg-white text-slate-900',
    iconTheme: 'bg-slate-100 text-slate-700 border-slate-200',
    badgeTheme: null
  },
  {
    name: 'АгроХолдинг Восток',
    badge: 'Холдинг',
    industry: 'Агропром и сельхозтехника',
    icon: Building2,
    theme: 'border-emerald-200/90 bg-emerald-50/60 text-emerald-950',
    iconTheme: 'bg-white text-emerald-600 border-emerald-100',
    badgeTheme: 'bg-emerald-100/90 text-emerald-800 border-emerald-200'
  },

  // 4-5. Международные (Европа / США)
  {
    name: 'Apex Logistics Europe',
    badge: 'EU',
    industry: 'Supply Chain & Freight',
    icon: Truck,
    theme: 'border-indigo-200/90 bg-indigo-50/60 text-indigo-950',
    iconTheme: 'bg-white text-indigo-600 border-indigo-100',
    badgeTheme: 'bg-indigo-100/90 text-indigo-800 border-indigo-200'
  },
  {
    name: 'Nordic Industrial Tech',
    badge: null,
    industry: 'Engineering & Automation',
    icon: Cpu,
    theme: 'border-blue-200/90 bg-blue-50/60 text-blue-950',
    iconTheme: 'bg-white text-blue-600 border-blue-100',
    badgeTheme: null
  },

  // 6. ОАЭ / Абу-Даби
  {
    name: 'Al-Dhabi Global Trading',
    badge: 'UAE / Abu Dhabi',
    industry: 'Commercial Distribution',
    icon: Globe2,
    theme: 'border-amber-200/90 bg-amber-50/70 text-amber-950',
    iconTheme: 'bg-white text-amber-600 border-amber-200/60',
    badgeTheme: 'bg-amber-100/90 text-amber-900 border-amber-200'
  },

  // 7. BY / RU
  {
    name: 'МеталлКомплект',
    badge: 'BY',
    industry: 'Трубный прокат и метизы',
    icon: Layers,
    theme: 'border-slate-200 bg-white text-slate-900',
    iconTheme: 'bg-slate-100 text-slate-700 border-slate-200',
    badgeTheme: 'bg-slate-100 text-slate-700 border-slate-200'
  },

  // 8. США
  {
    name: 'Vanguard Retail Systems',
    badge: null,
    industry: 'Enterprise Commerce',
    icon: Store,
    theme: 'border-teal-200/90 bg-teal-50/60 text-teal-950',
    iconTheme: 'bg-white text-teal-600 border-teal-100',
    badgeTheme: null
  },

  // 9. ОАЭ / Дубай
  {
    name: 'Emirates Supply Chain Ltd',
    badge: 'UAE / Dubai',
    industry: 'Air & Sea Logistics',
    icon: Anchor,
    theme: 'border-sky-200/90 bg-sky-50/60 text-sky-950',
    iconTheme: 'bg-white text-sky-600 border-sky-100',
    badgeTheme: 'bg-sky-100/90 text-sky-800 border-sky-200'
  },

  // 10. BY
  {
    name: 'БелЛогистик Групп',
    badge: null,
    industry: 'Мультимодальные перевозки',
    icon: Compass,
    theme: 'border-emerald-200/90 bg-emerald-50/60 text-emerald-950',
    iconTheme: 'bg-white text-emerald-600 border-emerald-100',
    badgeTheme: null
  },

  // 11. Европа / Германия
  {
    name: 'Kronos Machinery Corp',
    badge: 'EU / Germany',
    industry: 'Heavy Machinery & CNC',
    icon: Factory,
    theme: 'border-slate-200 bg-white text-slate-900',
    iconTheme: 'bg-slate-100 text-slate-700 border-slate-200',
    badgeTheme: 'bg-slate-100 text-slate-700 border-slate-200'
  },

  // 12. ОАЭ / Абу-Даби
  {
    name: 'Gulf Petrochem Logistics',
    badge: 'Abu Dhabi',
    industry: 'Petrochemical Terminals',
    icon: Flame,
    theme: 'border-amber-200/90 bg-amber-50/70 text-amber-950',
    iconTheme: 'bg-white text-amber-600 border-amber-200/60',
    badgeTheme: 'bg-amber-100/90 text-amber-900 border-amber-200'
  },

  // 13. RU
  {
    name: 'РусЭнергоСтрой',
    badge: null,
    industry: 'Энергетический инжиниринг',
    icon: Zap,
    theme: 'border-indigo-200/90 bg-indigo-50/60 text-indigo-950',
    iconTheme: 'bg-white text-indigo-600 border-indigo-100',
    badgeTheme: null
  },

  // 14. Европа / Швейцария
  {
    name: 'Horizon Pharma Solutions',
    badge: 'EU / Swiss',
    industry: 'Pharma & Lab Supplies',
    icon: Shield,
    theme: 'border-teal-200/90 bg-teal-50/60 text-teal-950',
    iconTheme: 'bg-white text-teal-600 border-teal-100',
    badgeTheme: 'bg-teal-100/90 text-teal-800 border-teal-200'
  },

  // 15. США
  {
    name: 'SmartCommerce Group',
    badge: null,
    industry: 'B2B Trade Platform',
    icon: Briefcase,
    theme: 'border-slate-200 bg-white text-slate-900',
    iconTheme: 'bg-slate-100 text-slate-700 border-slate-200',
    badgeTheme: null
  },

  // 16. Европа / Нидерланды
  {
    name: 'Prime Agro International',
    badge: 'EU',
    industry: 'Agrotechnology & Export',
    icon: Sparkles,
    theme: 'border-emerald-200/90 bg-emerald-50/60 text-emerald-950',
    iconTheme: 'bg-white text-emerald-600 border-emerald-100',
    badgeTheme: 'bg-emerald-100/90 text-emerald-800 border-emerald-200'
  }
];

export default function TrustMarquee() {
  // Дублируем список для бесшовного зацикленного скролла
  const marqueeItems = [...COMPANIES, ...COMPANIES];

  return (
    <section className="py-14 sm:py-16 bg-slate-50/80 border-b border-slate-200/80 overflow-hidden relative select-none text-left">
      <style>{`
        @keyframes trustMarqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .trust-marquee-track {
          display: flex;
          width: max-content;
          animation: trustMarqueeScroll 45s linear infinite;
        }
        .trust-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Контейнер заголовка и плашек по единой сетке max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-left">
        {/* 2 связанные плашки подряд: «Наша гордость» + «Наши партнеры» */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-sky-800 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Наша гордость</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-900 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Наши партнеры</span>
          </div>
        </div>

        {/* Заголовок */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          Более 80 внедренных решений в компаниях: производство, опт, логистика, ритейл
        </h2>
      </div>

      {/* Бегущая строка с боковыми градиентными масками растворения */}
      <div className="relative w-full overflow-hidden">
        {/* Левая маска */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50/90 to-transparent z-10 pointer-events-none" />
        
        {/* Правая маска */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50/90 to-transparent z-10 pointer-events-none" />

        {/* Трек с карточками */}
        <div className="trust-marquee-track gap-3.5 sm:gap-4 py-1">
          {marqueeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.name}-${idx}`}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xs hover:shadow-xs transition-all duration-200 shrink-0 cursor-default ${item.theme}`}
              >
                {/* Иконка / монохромный знак */}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${item.iconTheme}`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Название, бейдж и отрасль */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold tracking-tight leading-tight whitespace-nowrap">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border tracking-wide whitespace-nowrap ${item.badgeTheme}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] opacity-70 font-medium whitespace-nowrap mt-0.5">
                    {item.industry}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
