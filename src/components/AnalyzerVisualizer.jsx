import React from 'react';
import { Globe, Database, Layers, Sparkles } from 'lucide-react';

/**
 * Режим 1: Осциллограф процессов (Process Cardiogram)
 * Бегущая технологическая волна импульсов с ускорением на фазе вычислений
 */
export function ProcessOscilloscope({ step = 0, totalSteps = 12 }) {
  const isFastPhase = step >= 3;
  const progressRatio = Math.min(1, (step + 1) / totalSteps);

  // Динамическая амплитуда и плотность пиков в зависимости от фазы
  const waveSpeed = isFastPhase ? '0.75s' : '1.8s';

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center">
      <div className="w-full h-14 relative overflow-hidden flex items-center justify-center">
        {/* Фоновые технологические деления */}
        <div className="absolute inset-0 flex items-center justify-between opacity-30 pointer-events-none px-2">
          <div className="w-full border-b border-dashed border-slate-300" />
        </div>

        <svg
          viewBox="0 0 360 60"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Градиент затухания сигнального луча */}
            <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#0284C7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="1" />
            </linearGradient>

            {/* Мягкое свечение на острие луча */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Базовая ось */}
          <line x1="0" y1="30" x2="360" y2="30" stroke="#E2E8F0" strokeWidth="1.5" />

          {/* Кардиограмма / Волна процесса */}
          <g className="animate-pulse">
            <path
              d={
                isFastPhase
                  ? // Высокочастотный вычислительный пульс (много частых пиков)
                    "M 0 30 L 40 30 L 48 24 L 54 36 L 62 14 L 70 46 L 78 28 L 86 32 L 95 30 L 140 30 L 148 18 L 156 42 L 164 10 L 172 50 L 180 26 L 190 30 L 230 30 L 238 22 L 246 38 L 254 12 L 262 48 L 270 30 L 310 30 L 318 20 L 326 40 L 334 16 L 342 44 L 350 30 L 360 30"
                  : // Размеренный, спокойный пульс фазы сбора данных
                    "M 0 30 L 60 30 L 72 26 L 80 34 L 90 14 L 100 46 L 110 28 L 120 30 L 200 30 L 212 24 L 220 36 L 230 12 L 240 48 L 250 28 L 260 30 L 360 30"
              }
              fill="none"
              stroke="url(#signalGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: '360',
                strokeDashoffset: `${360 - 360 * progressRatio}`,
                transition: 'stroke-dashoffset 0.3s ease-out, d 0.4s ease',
              }}
            />
          </g>
        </svg>
      </div>

      {/* Тонкий статус осциллографа */}
      <div className="w-full flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-1 px-1">
        <span className="text-sky-600 font-mono tracking-wider">
          {isFastPhase ? 'ПРОЦЕССИНГ ВЫЧИСЛЕНИЙ' : 'ТЕЛЕМЕТРИЯ СБОРА ДАННЫХ'}
        </span>
        <span className="font-mono text-slate-500">{Math.round(progressRatio * 100)}%</span>
      </div>
    </div>
  );
}

/**
 * Режим 2: Сетевая топология (Circuit Topology Trace)
 * 4 ключевых микроузла, которые луч последовательно зажигает и соединяет
 */
export function TopologyCircuit({ step = 0, totalSteps = 12 }) {
  // Определяем статус каждого узла в зависимости от шага:
  // Узел 0: Компания/Сайт (активен с 0 шага)
  // Узел 1: Реестры и данные (активен с 1 шага)
  // Узел 2: Учет 1С и CRM (активен с 5 шага)
  // Узел 3: Контур решений (активен с 9 шага)
  // Определяем активные и текущий узел:
  // Node 0 (Сайт): активен с 0 шага, пульсирует пока step < 1
  // Node 1 (Реестры): активен с 1 шага, пульсирует пока 1 <= step < 5
  // Node 2 (1С / CRM): активен с 5 шага, пульсирует пока 5 <= step < 9
  // Node 3 (AI-контур): активен с 9 шага, пульсирует пока step >= 9
  const isNode0Active = true;
  const isNode1Active = step >= 1;
  const isNode2Active = step >= 5;
  const isNode3Active = step >= 9;

  let currentNodeIndex = 0;
  if (step >= 9) currentNodeIndex = 3;
  else if (step >= 5) currentNodeIndex = 2;
  else if (step >= 1) currentNodeIndex = 1;
  else currentNodeIndex = 0;

  const progressRatio = Math.min(1, (step + 1) / totalSteps);

  const nodes = [
    { id: 0, label: 'Сайт', icon: Globe, active: isNode0Active },
    { id: 1, label: 'Реестры', icon: Database, active: isNode1Active },
    { id: 2, label: '1С / CRM', icon: Layers, active: isNode2Active },
    { id: 3, label: 'AI-контур', icon: Sparkles, active: isNode3Active },
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center">
      <div className="w-full relative py-2">
        {/* Соединительная базовая шина */}
        <div className="absolute top-[26px] left-[12%] right-[12%] h-[2px] bg-slate-200 -z-0" />

        {/* Активная заполняющаяся шина прогресса */}
        <div
          className="absolute top-[26px] left-[12%] h-[2px] bg-sky-500 -z-0 transition-all duration-300 ease-out"
          style={{ width: `${progressRatio * 76}%` }}
        />

        {/* 4 узла топологии */}
        <div className="flex items-center justify-between relative z-10 px-2">
          {nodes.map((node) => {
            const Icon = node.icon;
            const isCurrent = node.id === currentNodeIndex;
            const isCompleted = node.active && !isCurrent;

            return (
              <div key={node.id} className="flex flex-col items-center gap-1.5 select-none">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/40 scale-105 animate-pulse ring-2 ring-sky-400/50'
                      : isCompleted
                        ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20 scale-100'
                        : 'bg-white border border-slate-200 text-slate-400 scale-95'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[10px] transition-colors ${
                    isCurrent
                      ? 'text-sky-700 font-bold'
                      : isCompleted
                        ? 'text-sky-800 font-semibold'
                        : 'text-slate-400 font-medium'
                  }`}
                >
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Индикатор статуса топологии */}
      <div className="w-full flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-1 px-1">
        <span className="text-sky-600 font-mono tracking-wider">СИНХРОНИЗАЦИЯ УЗЛОВ</span>
        <span className="font-mono text-slate-500">{Math.round(progressRatio * 100)}%</span>
      </div>
    </div>
  );
}

