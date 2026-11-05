import React from 'react';
import { Globe, Database, Layers, BarChart3 } from 'lucide-react';

/**
 * Режим 1: Осциллограф процессов (Mnemonic Continuous Circuit)
 * Быстрые прямые прострелы между фигурами и пульсация активного силуэта
 */
const MNEMONIC_CIRCUIT_PATH =
  "M 0 30 L 40 30 L 40 18 L 60 8 L 63 8 L 63 12 L 65 10 L 80 18 L 80 30 L 125 30 L 125 10 L 155 10 L 165 20 L 155 20 L 155 10 L 165 20 L 165 30 L 215 30 L 215 20 L 223 20 L 223 30 L 232 30 L 232 12 L 242 12 L 242 30 L 251 30 L 251 20 L 259 20 L 259 30 L 310 30 L 310 22 L 316 22 L 316 30 L 321 30 L 321 14 L 328 14 L 328 30 L 333 30 L 333 8 L 342 8 L 342 30 L 360 30";

const FIGURES = [
  // 0: Здание компании (Сайт, шаги 0..2)
  {
    id: 0,
    path: "M 40 30 L 40 18 L 60 8 L 63 8 L 63 12 L 65 10 L 80 18 L 80 30",
  },
  // 1: Документ накладной (Реестры, шаги 3..5)
  {
    id: 1,
    path: "M 125 30 L 125 10 L 155 10 L 165 20 L 155 20 L 155 10 L 165 20 L 165 30",
  },
  // 2: Шестерня интеграций (1С / CRM, шаги 6..8)
  {
    id: 2,
    path: "M 215 30 L 215 20 L 223 20 L 223 30 L 232 30 L 232 12 L 242 12 L 242 30 L 251 30 L 251 20 L 259 20 L 259 30",
  },
  // 3: Гистограмма отчёта (Подбор решений, шаги 9..11)
  {
    id: 3,
    path: "M 310 30 L 310 22 L 316 22 L 316 30 L 321 30 L 321 14 L 328 14 L 328 30 L 333 30 L 333 8 L 342 8 L 342 30",
  },
];

const BRIDGES = [
  // Прямой вход к Зданию (x: 0 -> 40)
  { id: 0, x1: 0, x2: 40, activeStage: 0 },
  // Прямой мостик Здание -> Документ (x: 80 -> 125)
  { id: 1, x1: 80, x2: 125, activeStage: 1 },
  // Прямой мостик Документ -> Шестерня (x: 165 -> 215)
  { id: 2, x1: 165, x2: 215, activeStage: 2 },
  // Прямой мостик Шестерня -> Гистограмма (x: 259 -> 310)
  { id: 3, x1: 259, x2: 310, activeStage: 3 },
  // Выходной хвостик (x: 342 -> 360)
  { id: 4, x1: 342, x2: 360, activeStage: 3 },
];

export function ProcessOscilloscope({ step = 0, isComplete = false }) {
  const currentStage = Math.min(3, Math.floor(step / 3));
  const isFastPhase = currentStage >= 1;
  // До завершения бэкенд-запроса держим максимум 95%. Ровно 100% только при подтверждении готовности!
  const progressPercent = isComplete
    ? 100
    : currentStage === 3
      ? 95
      : (currentStage + 1) * 25;

  // Внутри каждого этапа фигура прорисовывается строго от 0:
  // Шаг 0: линия только подошла к основанию фигуры (счет от 0, фигура еще не нарисована, линия пульсирует)
  // Шаг 1: фигура прорисовывается наполовину (~55%) и пульсирует
  // Шаг 2: фигура завершается полностью (100%)
  const stepInStage = step % 3;
  const subProgress = isComplete ? 1.0 : stepInStage === 0 ? 0.0 : stepInStage === 1 ? 0.55 : 1.0;

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
            {/* Мягкое технологическое свечение активной фигуры */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Базовая направляющая ось */}
          <line x1="0" y1="30" x2="360" y2="30" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

          {/* Фоновый чертеж всего контура (светло-серый) */}
          <path
            d={MNEMONIC_CIRCUIT_PATH}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Прямые участки-мостики — простреливают быстро и сразу к следующему блоку */}
          {BRIDGES.map((bridge) => {
            const isActive = isComplete || currentStage >= bridge.activeStage;
            const isCurrentBridge = !isComplete && currentStage === bridge.activeStage && stepInStage === 0;
            const len = bridge.x2 - bridge.x1;
            return (
              <line
                key={bridge.id}
                x1={bridge.x1}
                y1="30"
                x2={bridge.x2}
                y2="30"
                stroke="#0284C7"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter={isCurrentBridge ? "url(#glow)" : undefined}
                className={isCurrentBridge ? "animate-pulse" : ""}
                style={{
                  strokeDasharray: len,
                  strokeDashoffset: isActive ? 0 : len,
                  transition: 'stroke-dashoffset 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            );
          })}

          {/* Фигурки на линии: текущая активно рисуется и пульсирует, завершенные горят сплошным */}
          {FIGURES.map((fig) => {
            const isCurrent = !isComplete && fig.id === currentStage;
            const isCompleted = fig.id < currentStage || isComplete;

            if (!isCurrent && !isCompleted) return null;

            return (
              <path
                key={fig.id}
                d={fig.path}
                pathLength="1"
                fill="none"
                stroke="#0284C7"
                strokeWidth={isCurrent ? "2.5" : "2.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={isCurrent ? "url(#glow)" : undefined}
                className={isCurrent ? "animate-pulse" : ""}
                style={{
                  strokeDasharray: '1',
                  strokeDashoffset: isCurrent ? `${Math.max(0, 1 - subProgress)}` : '0',
                  transition: 'stroke-dashoffset 0.5s ease-out',
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Тонкий статус осциллографа */}
      <div className="w-full flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-1 px-1">
        <span className="text-sky-600 font-mono tracking-wider">
          {isComplete ? 'ВЫЧИСЛЕНИЯ ЗАВЕРШЕНЫ' : isFastPhase ? 'ПРОЦЕССИНГ ВЫЧИСЛЕНИЙ' : 'ТЕЛЕМЕТРИЯ СБОРА ДАННЫХ'}
        </span>
        <span className="font-mono text-slate-500">{progressPercent}%</span>
      </div>
    </div>
  );
}

/**
 * Режим 2: Сетевая топология (Circuit Topology Trace)
 * 4 ключевых микроузла, которые луч последовательно зажигает и соединяет
 */
export function TopologyCircuit({ step = 0, totalSteps = 12, isComplete = false }) {
  // Определяем активные и текущий узел:
  // Node 0 (Сайт): активен с 0 шага, пульсирует пока step < 3
  // Node 1 (Реестры): активен с 3 шага, пульсирует пока 3 <= step < 6
  // Node 2 (1С / CRM): активен с 6 шага, пульсирует пока 6 <= step < 9
  // Node 3 (Анализ и подбор): активен с 9 шага, пульсирует пока step >= 9 (при isComplete горит сплошным)
  const isNode0Active = true;
  const isNode1Active = isComplete || step >= 3;
  const isNode2Active = isComplete || step >= 6;
  const isNode3Active = isComplete || step >= 9;

  let currentNodeIndex = 0;
  if (isComplete || step >= 9) currentNodeIndex = 3;
  else if (step >= 6) currentNodeIndex = 2;
  else if (step >= 3) currentNodeIndex = 1;
  else currentNodeIndex = 0;

  // Линия не зависает между кубиками, а всегда полностью соединена с активным кубиком:
  const seg0Progress = (isComplete || step >= 3) ? 100 : 0;
  const seg1Progress = (isComplete || step >= 6) ? 100 : 0;
  const seg2Progress = (isComplete || step >= 9) ? 100 : 0;

  // Округление процентов: 25% -> 50% -> 75% -> 95% (пока идет вычисление). Ровно 100% только при isComplete!
  const nodeProgressPercent = isComplete
    ? 100
    : currentNodeIndex === 3
      ? 95
      : (currentNodeIndex + 1) * 25;

  const nodes = [
    { id: 0, label: 'Сайт', icon: Globe, active: isNode0Active },
    { id: 1, label: 'Реестры', icon: Database, active: isNode1Active },
    { id: 2, label: '1С / CRM', icon: Layers, active: isNode2Active },
    { id: 3, label: 'Анализ и подбор', icon: BarChart3, active: isNode3Active },
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center">
      <div className="w-full py-2">
        {/* Ряд кубиков и межблочных шин в единой аппаратной цепи */}
        <div className="flex items-center w-full px-1">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isCurrent = !isComplete && node.id === currentNodeIndex;
            const isCompleted = isComplete || (node.active && !isCurrent);

            return (
              <React.Fragment key={node.id}>
                {/* Кубик-узел: чистый, линия внутрь не заходит */}
                <div
                  className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center transition-all duration-300 select-none relative z-10 ${
                    isCurrent
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/40 scale-105 animate-pulse ring-2 ring-sky-400/50'
                      : isCompleted
                        ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20 scale-100'
                        : 'bg-white border border-slate-200 text-slate-400 scale-95'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Сегмент шины между кубиками (встык: начинается от правой грани, упирается в левую) */}
                {idx < nodes.length - 1 && (
                  <div className="flex-1 h-[2px] bg-slate-200 relative overflow-hidden">
                    <div
                      className="h-full bg-sky-500 transition-all duration-300 ease-out"
                      style={{
                        width: `${[seg0Progress, seg1Progress, seg2Progress][idx]}%`,
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Подписи узлов точно под кубиками */}
        <div className="flex justify-between w-full mt-2 px-1 min-h-[26px]">
          {nodes.map((node) => {
            const isCurrent = !isComplete && node.id === currentNodeIndex;
            const isCompleted = isComplete || (node.active && !isCurrent);
            return (
              <div
                key={node.id}
                className="w-9 relative flex justify-center text-center select-none"
              >
                <span
                  className={`text-[10px] leading-tight text-center transition-colors ${
                    node.id === 3
                      ? 'absolute top-0 left-1/2 -translate-x-1/2 w-20'
                      : 'whitespace-nowrap'
                  } ${
                    isCurrent
                      ? 'text-sky-700 font-bold'
                      : isCompleted
                        ? 'text-sky-800 font-semibold'
                        : 'text-slate-400 font-medium'
                  }`}
                >
                  {node.id === 3 ? (
                    <>
                      Анализ и<br />подбор
                    </>
                  ) : (
                    node.label
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Индикатор статуса топологии */}
      <div className="w-full flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-1 px-1">
        <span className="text-sky-600 font-mono tracking-wider">
          {isComplete ? 'СИНХРОНИЗАЦИЯ ЗАВЕРШЕНА' : 'СИНХРОНИЗАЦИЯ УЗЛОВ'}
        </span>
        <span className="font-mono text-slate-500">{nodeProgressPercent}%</span>
      </div>
    </div>
  );
}

