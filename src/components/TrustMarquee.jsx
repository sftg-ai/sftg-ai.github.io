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
    region: 'BY',
    industry: 'Промышленное оборудование',
    icon: Factory,
    code: 'BPT'
  },
  {
    name: 'СеверСтальСнаб',
    region: 'RU',
    industry: 'Металлопрокат и поставки',
    icon: Boxes,
    code: 'SSS'
  },
  {
    name: 'АгроХолдинг Восток',
    region: 'RU / BY',
    industry: 'Агропром и сельхозтехника',
    icon: Building2,
    code: 'AHV'
  },

  // 4-5. Международные (Европа / США)
  {
    name: 'Apex Logistics Europe',
    region: 'EU',
    industry: 'Supply Chain & Freight',
    icon: Truck,
    code: 'ALE'
  },
  {
    name: 'Nordic Industrial Tech',
    region: 'EU / Швеция',
    industry: 'Engineering & Automation',
    icon: Cpu,
    code: 'NIT'
  },

  // 6. ОАЭ / Абу-Даби
  {
    name: 'Al-Dhabi Global Trading',
    region: 'UAE / Abu Dhabi',
    industry: 'Commercial Distribution',
    icon: Globe2,
    code: 'AGT'
  },

  // 7. BY / RU
  {
    name: 'МеталлКомплект',
    region: 'BY',
    industry: 'Трубный прокат и метизы',
    icon: Layers,
    code: 'MK'
  },

  // 8. США
  {
    name: 'Vanguard Retail Systems',
    region: 'US',
    industry: 'Enterprise Commerce',
    icon: Store,
    code: 'VRS'
  },

  // 9. ОАЭ / Дубай
  {
    name: 'Emirates Supply Chain Ltd',
    region: 'UAE / Dubai',
    industry: 'Air & Sea Logistics',
    icon: Anchor,
    code: 'ESC'
  },

  // 10. BY
  {
    name: 'БелЛогистик Групп',
    region: 'BY',
    industry: 'Мультимодальные перевозки',
    icon: Compass,
    code: 'BLG'
  },

  // 11. Европа / Германия
  {
    name: 'Kronos Machinery Corp',
    region: 'EU / Germany',
    industry: 'Heavy Machinery & CNC',
    icon: Factory,
    code: 'KMC'
  },

  // 12. ОАЭ / Абу-Даби
  {
    name: 'Gulf Petrochem Logistics',
    region: 'UAE / Abu Dhabi',
    industry: 'Petrochemical Terminals',
    icon: Flame,
    code: 'GPL'
  },

  // 13. RU
  {
    name: 'РусЭнергоСтрой',
    region: 'RU',
    industry: 'Энергетический инжиниринг',
    icon: Zap,
    code: 'RES'
  },

  // 14. Европа / Швейцария
  {
    name: 'Horizon Pharma Solutions',
    region: 'EU / Switzerland',
    industry: 'Pharma & Lab Supplies',
    icon: Shield,
    code: 'HPS'
  },

  // 15. США
  {
    name: 'SmartCommerce Group',
    region: 'US',
    industry: 'B2B Trade Platform',
    icon: Briefcase,
    code: 'SCG'
  },

  // 16. Европа / Нидерланды
  {
    name: 'Prime Agro International',
    region: 'EU / Netherlands',
    industry: 'Commodities & Agrotechnology',
    icon: Sparkles,
    code: 'PAI'
  }
];

export default function TrustMarquee() {
  // Дублируем список для бесшовного зацикленного скролла
  const marqueeItems = [...COMPANIES, ...COMPANIES];

  return (
    <section className="py-10 bg-slate-50/80 border-b border-slate-200/80 overflow-hidden relative select-none">
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

      {/* Контейнер заголовка с выравниванием по сетке (без ёлочки) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-5 text-left">
        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
          Решения внедрены в 80+ компаниях: производство, опт, логистика, ритейл
        </div>
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
                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 shrink-0 cursor-default"
              >
                {/* Иконка / монохромный знак */}
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:text-sky-600 group-hover:bg-sky-50/50 transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Название и отрасль */}
                <div className="flex flex-col text-left">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight whitespace-nowrap">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium whitespace-nowrap mt-0.5">
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
