import React from 'react';
import { ArrowRight, TrendingDown, Zap, TrendingUp } from 'lucide-react';

export default function Hero({ onSelectCase, activeCaseIndex }) {
  return (
    <section className="relative bg-sky-600 text-white overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24">
      {/* Мягкие SVG-волны и изолинии фона */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg 
          className="absolute inset-0 w-full h-full object-cover opacity-20" 
          viewBox="0 0 1440 800" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <path 
            d="M-100 200 C300 120 600 280 1000 180 C1200 130 1400 220 1600 160" 
            stroke="#FFFFFF" 
            strokeWidth="1.5" 
            strokeDasharray="6 6" 
          />
          <path 
            d="M-100 450 C350 350 700 550 1100 400 C1300 320 1500 420 1600 380" 
            stroke="#FFFFFF" 
            strokeWidth="1.5" 
          />
          <path 
            d="M-100 650 C250 580 650 720 1050 620 C1300 560 1450 640 1600 600" 
            stroke="#FFFFFF" 
            strokeWidth="1" 
            strokeDasharray="4 4" 
          />
        </svg>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-sky-900/35 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-left">
        {/* 2 колонки: Текст слева, Иллюстрация справа */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Слева: Текстовый блок (7 колонок) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Плашка */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-200" />
              <span>AI-автоматизация для бизнеса</span>
            </div>

            {/* Главный заголовок H1 */}
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6">
              AI-автоматизация бизнес-процессов
            </h1>

            {/* Подзаголовок: 3 аккуратные строки/предложения */}
            <div className="space-y-1.5 text-sky-100 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              <p>Автоматизируем рутинные процессы в Битрикс24, 1С и внутренних системах компании.</p>
              <p>Проектируем заказную ИИ-автоматизацию любой сложности под ключ в вашем контуре.</p>
              <p className="font-semibold text-white">Опытная инженерная команда, быстрый запуск и гарантированная надежность решений.</p>
            </div>

            {/* Кнопка действия */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-900 hover:bg-sky-50 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-sky-950/15 transition-all active:scale-[0.98] text-sm sm:text-base group"
              >
                <span>Получить разбор вашего бизнеса</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Справа: Иллюстрация контроля процессов (5 колонок) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl shadow-2xl border border-white/20 overflow-hidden bg-white/10 backdrop-blur-sm p-2 sm:p-2.5">
              <img
                src="/images/hero-ai-control.png"
                alt="AI-контроль бизнес-процессов SFTG"
                className="w-full h-auto rounded-2xl object-cover block shadow-inner"
                loading="eager"
              />
            </div>
          </div>

        </div>

        {/* По низу голубого экрана: 3 крупные карточки экономической выгоды */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 md:mt-16">
          
          {/* Карточка 1 - Сокращение расходов (кристальный лазурно-бирюзовый оттенок точности и контроля затрат) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-sky-50/95 via-white to-cyan-50/90 text-slate-900 rounded-2xl p-6 shadow-xl border border-sky-200/90 flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-300/25 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-sky-300/25 blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-sky-600 text-white shadow-sm shadow-sky-600/25 mb-4">
                <TrendingDown className="w-5 h-5 text-cyan-100" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Сокращение расходов
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                Высвобождаются ресурсы команды и снижаются затраты на штат - рутинную нагрузку берут на себя программные ассистенты.
              </p>
            </div>
          </div>

          {/* Карточка 2 - Ускорение работы (энергичный сине-янтарный оттенок скорости и импульса) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50/95 via-white to-amber-50/85 text-slate-900 rounded-2xl p-6 shadow-xl border border-amber-200/80 flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-300/25 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-blue-300/20 blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500 text-white shadow-sm shadow-amber-500/25 mb-4">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Ускорение работы
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                Операционные процессы, расчеты и обработка обращений выполняются за секунды без задержек и человеческого фактора.
              </p>
            </div>
          </div>

          {/* Карточка 3 - Рост прибыли (нежный изумрудно-золотистый оттенок финансового роста) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/95 via-white to-amber-50/90 text-slate-900 rounded-2xl p-6 shadow-xl border border-emerald-200/90 flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-300/25 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-emerald-300/20 blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 mb-4">
                <TrendingUp className="w-5 h-5 text-amber-100" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Рост прибыли
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                Качественная и быстрая подготовка предложений для клиентов, контроль цен без потерь на ошибках и больший объем выполняемых заказов.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
