import React from 'react';
import { Globe, Database, Layers, BarChart3 } from 'lucide-react';

/**
 * Режим 1: Осциллограф процессов (Mnemonic Continuous Circuit)
 * Непрерывная контурная линия, вырисовывающая слева направо 4 узнаваемых силуэта:
 * [Здание компании] ➔ [Документ накладной] ➔ [Шестерня 1С/CRM] ➔ [Анализ и генерация отчёта]
 */
const MNEMONIC_CIRCUIT_PATH =
  "M 0 30 L 30 30 L 40 30 L 40 18 L 60 8 L 63 8 L 63 12 L 65 10 L 80 18 L 80 30 L 115 30 L 125 30 L 125 10 L 155 10 L 165 20 L 155 20 L 155 10 L 165 20 L 165 30 L 205 30 L 215 30 L 215 20 L 223 20 L 223 30 L 232 30 L 232 12 L 242 12 L 242 30 L 251 30 L 251 20 L 259 20 L 259 30 L 295 30 L 305 30 L 310 30 L 310 22 L 316 22 L 316 30 L 321 30 L 321 14 L 328 14 L 328 30 L 333 30 L 333 8 L 342 8 L 342 30 L 348 30 L 360 30";

export function ProcessOscilloscope({ step = 0, totalSteps = 12 }) {
  const isFastPhase = step >= 3;
  const progressRatio = Math.min(1, (step + 1) / totalSteps);

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
            {/* Мягкое свечение активного контура */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Базовая направляющая ось */}
          <line x1="0" y1="30" x2="360" y2="30" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

          {/* Фоновый контур чертежа (серый контур всех 4 фигур) */}
          <path
            d={MNEMONIC_CIRCUIT_PATH}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Активная сигнальная линия — рисуется СТРОГО слева направо без хвостов */}
          <g className="animate-pulse">
            <path
              d={MNEMONIC_CIRCUIT_PATH}
              pathLength="1"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: '1',
                strokeDashoffset: `${Math.max(0, 1 - progressRatio)}`,
                transition: 'stroke-dashoffset 0.35s ease-out',
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
  // Определяем активные и текущий узел:
  // Определяем активные и текущий узел (по 3 шага на каждый узел):
  // Node 0 (Сайт): активен с 0 шага, пульсирует пока step < 3
  // Node 1 (Реестры): активен с 3 шага, пульсирует пока 3 <= step < 6
  // Node 2 (1С / CRM): активен с 6 шага, пульсирует пока 6 <= step < 9
  // Node 3 (Подбор): активен с 9 шага, пульсирует пока step >= 9
  const isNode0Active = true;
  const isNode1Active = step >= 3;
  const isNode2Active = step >= 6;
  const isNode3Active = step >= 9;

  let currentNodeIndex = 0;
  if (step >= 9) currentNodeIndex = 3;
  else if (step >= 6) currentNodeIndex = 2;
  else if (step >= 3) currentNodeIndex = 1;
  else currentNodeIndex = 0;

  // Линия не зависает между кубиками, а всегда полностью соединена с активным кубиком:
  // Кубик 0 (Сайт): шины еще не включены
  // Кубик 1 (Реестры): шина 0 -> 1 полностью заполнена на 100%
  // Кубик 2 (1С / CRM): шины 0->1 и 1->2 полностью заполнены на 100%
  // Кубик 3 (Подбор): все 3 шины заполнены на 100%
  const seg0Progress = step >= 3 ? 100 : 0;
  const seg1Progress = step >= 6 ? 100 : 0;
  const seg2Progress = step >= 9 ? 100 : 0;

  // Округление процентов синхронизации узлов по кубикам: 25% -> 50% -> 75% -> 100%
  const nodeProgressPercent = Math.min(100, (currentNodeIndex + 1) * 25);

  const nodes = [
    { id: 0, label: 'Сайт', icon: Globe, active: isNode0Active },
    { id: 1, label: 'Реестры', icon: Database, active: isNode1Active },
    { id: 2, label: '1С / CRM', icon: Layers, active: isNode2Active },
    { id: 3, label: 'Подбор', icon: BarChart3, active: isNode3Active },
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center">
      <div className="w-full py-2">
        {/* Ряд кубиков и межблочных шин в единой аппаратной цепи */}
        <div className="flex items-center w-full px-1">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isCurrent = node.id === currentNodeIndex;
            const isCompleted = node.active && !isCurrent;

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
        <div className="flex justify-between w-full mt-2 px-1">
          {nodes.map((node) => {
            const isCurrent = node.id === currentNodeIndex;
            const isCompleted = node.active && !isCurrent;
            return (
              <div key={node.id} className="w-9 flex justify-center text-center">
                <span
                  className={`text-[10px] whitespace-nowrap transition-colors ${
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
        <span className="font-mono text-slate-500">{nodeProgressPercent}%</span>
      </div>
    </div>
  );
}

