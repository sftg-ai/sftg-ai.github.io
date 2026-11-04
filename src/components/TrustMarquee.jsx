import React, { useRef, useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

const ROW_ONE = [
  {
    name: 'БелПромТех',
    industry: 'Пром. оборудование',
    theme: 'border-sky-200/90 bg-sky-50/60'
  },
  {
    name: 'СеверСтальСнаб',
    industry: 'Металлопрокат',
    theme: 'border-slate-200 bg-white'
  },
  {
    name: 'Apex Logistics',
    industry: 'Supply chain & freight',
    theme: 'border-indigo-200/90 bg-indigo-50/60'
  },
  {
    name: 'АгроХолдинг Восток',
    industry: 'Агропром и техника',
    theme: 'border-emerald-200/90 bg-emerald-50/60'
  },
  {
    name: 'Nordic Tech',
    industry: 'Инжиниринг',
    theme: 'border-blue-200/90 bg-blue-50/60'
  },
  {
    name: 'Al-Dhabi Trading',
    industry: 'Оптовая торговля',
    theme: 'border-amber-200/90 bg-amber-50/70'
  },
  {
    name: 'МеталлКомплект',
    industry: 'Трубный прокат',
    theme: 'border-slate-200 bg-white'
  },
  {
    name: 'Vanguard Systems',
    industry: 'Ритейл-системы',
    theme: 'border-teal-200/90 bg-teal-50/60'
  }
];

const ROW_TWO = [
  {
    name: 'Emirates Supply',
    industry: 'Авиа & морская логистика',
    theme: 'border-sky-200/90 bg-sky-50/60'
  },
  {
    name: 'БелЛогистик Групп',
    industry: 'Мультимодальный транспорт',
    theme: 'border-emerald-200/90 bg-emerald-50/60'
  },
  {
    name: 'Kronos Machinery',
    industry: 'Машиностроение и ЧПУ',
    theme: 'border-slate-200 bg-white'
  },
  {
    name: 'Gulf Petrochem',
    industry: 'Нефтехимия & терминалы',
    theme: 'border-amber-200/90 bg-amber-50/70'
  },
  {
    name: 'РусЭнергоСтрой',
    industry: 'Энергостроительство',
    theme: 'border-indigo-200/90 bg-indigo-50/60'
  },
  {
    name: 'Horizon Pharma',
    industry: 'Медицинские поставки',
    theme: 'border-teal-200/90 bg-teal-50/60'
  },
  {
    name: 'SmartCommerce',
    industry: 'Оптовая B2B-торговля',
    theme: 'border-slate-200 bg-white'
  },
  {
    name: 'Prime Agro',
    industry: 'Агроэкспорт и сырье',
    theme: 'border-emerald-200/90 bg-emerald-50/60'
  }
];

function DraggableRow({ items, initialScroll = 0 }) {
  const rowRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (rowRef.current && initialScroll > 0) {
      rowRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  const onMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
  };

  const onMouseLeave = () => setIsDown(false);
  const onMouseUp = () => setIsDown(false);
  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={rowRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className={`flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto pb-1 scrollbar-none select-none transition-colors ${
        isDown ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {items.map((company, idx) => (
        <div
          key={`${company.name}-${idx}`}
          className={`min-w-[150px] sm:min-w-[170px] max-w-[185px] px-3.5 py-2.5 rounded-xl border shadow-2xs hover:shadow-xs transition-all duration-150 flex flex-col justify-center text-left shrink-0 ${company.theme}`}
        >
          <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight truncate">
            {company.name}
          </div>
          <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
            {company.industry}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TrustMarquee() {
  return (
    <section className="py-12 sm:py-14 bg-slate-50/70 border-b border-slate-200/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* БЛОК 1: Твердый факт о внедренных решениях */}
        <div className="pb-7 border-b border-slate-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Более 80 внедренных решений в компаниях: производство, опт, логистика, ритейл
          </h2>
        </div>

        {/* БЛОК 2: Партнеры и проекты (две свайп-строчки) */}
        <div className="pt-7">
          <div className="mb-4">
            {/* Плашка направления */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-sky-800">
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Партнеры и проекты</span>
            </div>
          </div>

          {/* Две аккуратные строки кубиков: верхняя и нижняя */}
          <div className="space-y-2.5 sm:space-y-3">
            {/* Строка 1: свайп влево (стартует с начала) */}
            <DraggableRow items={ROW_ONE} initialScroll={0} />

            {/* Строка 2: сдвинута вправо (удобно свайпать вправо) */}
            <DraggableRow items={ROW_TWO} initialScroll={140} />
          </div>
        </div>

      </div>
    </section>
  );
}
