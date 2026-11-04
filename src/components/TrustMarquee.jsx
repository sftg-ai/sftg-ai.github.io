import React, { useRef, useState } from 'react';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';

const COMPANIES = [
  {
    name: 'БелПромТех',
    industry: 'Промышленное оборудование',
    theme: 'border-sky-200/90 bg-sky-50/60'
  },
  {
    name: 'СеверСтальСнаб',
    industry: 'Металлопрокат и поставки',
    theme: 'border-slate-200 bg-white'
  },
  {
    name: 'АгроХолдинг Восток',
    industry: 'Агропром и сельхозтехника',
    theme: 'border-emerald-200/90 bg-emerald-50/60'
  },
  {
    name: 'Apex Logistics',
    industry: 'Supply chain & freight',
    theme: 'border-indigo-200/90 bg-indigo-50/60'
  },
  {
    name: 'Nordic Industrial Tech',
    industry: 'Инжиниринг и автоматизация',
    theme: 'border-blue-200/90 bg-blue-50/60'
  },
  {
    name: 'Al-Dhabi Global Trading',
    industry: 'Оптовая дистрибуция',
    theme: 'border-amber-200/90 bg-amber-50/70'
  },
  {
    name: 'МеталлКомплект',
    industry: 'Трубный прокат и метизы',
    theme: 'border-slate-200 bg-white'
  },
  {
    name: 'Vanguard Systems',
    industry: 'Торговые сети и ритейл',
    theme: 'border-teal-200/90 bg-teal-50/60'
  },
  {
    name: 'Emirates Supply Chain',
    industry: 'Международная логистика',
    theme: 'border-sky-200/90 bg-sky-50/60'
  },
  {
    name: 'БелЛогистик Групп',
    industry: 'Мультимодальные перевозки',
    theme: 'border-emerald-200/90 bg-emerald-50/60'
  },
  {
    name: 'Kronos Machinery',
    industry: 'Машиностроение и станки',
    theme: 'border-slate-200 bg-white'
  },
  {
    name: 'Gulf Petrochem',
    industry: 'Нефтехимия и терминалы',
    theme: 'border-amber-200/90 bg-amber-50/70'
  },
  {
    name: 'РусЭнергоСтрой',
    industry: 'Энергетический инжиниринг',
    theme: 'border-indigo-200/90 bg-indigo-50/60'
  },
  {
    name: 'Horizon Pharma',
    industry: 'Медицинские поставки',
    theme: 'border-teal-200/90 bg-teal-50/60'
  },
  {
    name: 'SmartCommerce Group',
    industry: 'Оптовая B2B-торговля',
    theme: 'border-slate-200 bg-white'
  },
  {
    name: 'Prime Agro International',
    industry: 'Агротехнологии и экспорт',
    theme: 'border-emerald-200/90 bg-emerald-50/60'
  }
];

export default function TrustMarquee() {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Ручной Drag-to-scroll зажатием мыши
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollByAmount = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 sm:py-16 bg-slate-50/70 border-b border-slate-200/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* БЛОК 1: Твердый факт о внедренных решениях */}
        <div className="pb-8 border-b border-slate-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Более 80 внедренных решений в компаниях: производство, опт, логистика, ритейл
          </h2>
        </div>

        {/* БЛОК 2: Наши партнеры и проекты (с ручным скроллом) */}
        <div className="pt-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            {/* Плашка направления */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-sky-800">
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Наши партнеры и проекты</span>
            </div>

            {/* Навигационные стрелочки для десктопа */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollByAmount(-280)}
                aria-label="Прокрутить назад"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(280)}
                aria-label="Прокрутить вперед"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Контейнер карточек: горизонтальный свайп / драг мышкой (без авто-скролла) */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto pb-2 scrollbar-none select-none transition-colors ${
              isDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {COMPANIES.map((company, idx) => (
              <div
                key={`${company.name}-${idx}`}
                className={`min-w-[210px] sm:min-w-[230px] p-4 sm:p-4.5 rounded-2xl border shadow-2xs hover:shadow-xs transition-all duration-150 flex flex-col justify-center text-left ${company.theme}`}
              >
                <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {company.name}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1 leading-snug">
                  {company.industry}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
