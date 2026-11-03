import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  CheckCircle2,
  ShieldCheck,
  Users
} from 'lucide-react';
import teamSlide1Img from '../assets/images/team_slide_1.jpg';
import teamSlide2Img from '../assets/images/team_slide_2.jpg';
import teamSlide3Img from '../assets/images/team_slide_3.jpg';

export default function TeamAndExpertise() {
  const slides = [
    {
      image: teamSlide1Img,
      badge: 'Архитектура и надежность',
      title: 'Инженерная команда SFTG',
      desc: 'Проектирование и сопровождение корпоративных систем интеграции',
    },
    {
      image: teamSlide2Img,
      badge: 'Отказоустойчивость',
      title: 'Надежная работа и тестирование',
      desc: 'Защита от сбоев и строгий контроль сходимости результатов',
    },
    {
      image: teamSlide3Img,
      badge: 'Битрикс24 и 1С',
      title: 'Интеграция корпоративных баз',
      desc: 'Настройка взаимодействия Битрикс24 и 1С с программными ассистентами',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isInView, activeSlide, slides.length]);

  const advantages = [
    {
      icon: Database,
      title: 'Надежная работа без замедления ваших систем',
      desc: 'Проектируем решения с запасом прочности: стабильная обработка любого потока заявок, звонков и накладных без нагрузки на ваши рабочие базы Битрикс24 и 1С.',
      accent: 'border-sky-200 bg-sky-50 text-sky-700'
    },
    {
      icon: CheckCircle2,
      title: 'Прозрачная система без привязки к одному подрядчику',
      desc: 'Передаем понятную структуру и документацию: при необходимости ваши штатные специалисты по Битрикс24 и 1С смогут спокойно сопровождать систему самостоятельно.',
      accent: 'border-emerald-200 bg-emerald-50 text-emerald-700'
    },
    {
      icon: ShieldCheck,
      title: 'Соответствие законодательству Беларуси (Закон № 99-З)',
      desc: 'Все процессы проектируются с учетом требований защиты персональных данных и коммерческой тайны. Данные не покидают защищенный периметр компании.',
      accent: 'border-blue-200 bg-blue-50 text-blue-700'
    },
    {
      icon: Users,
      title: 'Прямой диалог с ведущими разработчиками',
      desc: 'Уже на первой встрече вы общаетесь с техническими специалистами, которые лично проектируют и внедряют решение в вашей компании.',
      accent: 'border-amber-200 bg-amber-50 text-amber-700'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-200/80 text-left">
      
      {/* Заголовок выровнен по левому краю (без ёлочки) */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4">
          О компании
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Опыт промышленной разработки и надежность решений
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
          Команда SFTG более 15 лет разрабатывает корпоративные платформы, надежные интеграции и высоконагруженные сервисы.
        </p>
      </div>

      {/* Интерактивная карусель команды */}
      <div 
        ref={carouselRef}
        className="mb-16 rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Слайдер с фото */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 overflow-hidden bg-slate-900">
            {slides.map((s, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-20 text-white">
                  <span className="text-[11px] font-bold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800 inline-block mb-2">
                    {s.badge}
                  </span>
                  <div className="text-lg sm:text-xl font-bold">
                    {s.title}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}

            {/* Точки-индикаторы слайдов поверх фото внизу справа */}
            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Слайд ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Панель переключения справа */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full bg-slate-50/70">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Инженерный фокус:
              </div>
              <div className="space-y-3">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      activeSlide === idx
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20'
                        : 'bg-transparent border-transparent hover:bg-white/60 text-slate-600'
                    }`}
                  >
                    <div className={`text-xs font-bold ${activeSlide === idx ? 'text-sky-100' : 'text-slate-500'}`}>{s.badge}</div>
                    <div className={`text-sm font-semibold mt-0.5 ${activeSlide === idx ? 'text-white' : 'text-slate-900'}`}>{s.title}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs text-slate-500">
              Работаем с компаниями по всей Беларуси и СНГ.
            </div>
          </div>

        </div>
      </div>

      {/* Сетка преимуществ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {advantages.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl border ${item.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
