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
  // Node 0 (Сайт): активен с 0 шага, пульсирует пока step < 1
  // Node 1 (Реестры): активен с 1 шага, пульсирует пока 1 <= step < 5
  // Node 2 (1С / CRM): активен с 5 шага, пульсирует пока 5 <= step < 9
  // Node 3 (Финализация): активен с 9 шага, пульсирует пока step >= 9
  const isNode0Active = true;
  const isNode1Active = step >= 1;
  const isNode2Active = step >= 5;
  const isNode3Active = step >= 9;

  let currentNodeIndex = 0;
  if (step >= 9) currentNodeIndex = 3;
  else if (step >= 5) currentNodeIndex = 2;
  else if (step >= 1) currentNodeIndex = 1;
  else currentNodeIndex = 0;

  // Дискретный прогресс 3 межблочных коннекторных шин (встык между гранями кубиков)
  let seg0Progress = 0; // Шина 0 -> 1
  let seg1Progress = 0; // Шина 1 -> 2
  let seg2Progress = 0; // Шина 2 -> 3

  if (step === 0) {
    seg0Progress = 60;
  } else {
    seg0Progress = 100;
  }

  if (step < 1) {
    seg1Progress = 0;
  } else if (step >= 5) {
    seg1Progress = 100;
  } else {
    seg1Progress = Math.min(100, Math.round(((step - 0.5) / 4) * 100));
  }

  if (step < 5) {
    seg2Progress = 0;
  } else if (step >= 9) {
    seg2Progress = 100;
  } else {
    seg2Progress = Math.min(100, Math.round(((step - 4.5) / 4) * 100));
  }

  const progressRatio = Math.min(1, (step + 1) / totalSteps);

  const nodes = [
    { id: 0, label: 'Сайт', icon: Globe, active: isNode0Active },
    { id: 1, label: 'Реестры', icon: Database, active: isNode1Active },
    { id: 2, label: '1С / CRM', icon: Layers, active: isNode2Active },
    { id: 3, label: 'Финализация', icon: BarChart3, active: isNode3Active },
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
            const incomingFull =
              node.id === 0
                ? true
                : [seg0Progress, seg1Progress, seg2Progress][node.id - 1] >= 100;
            const outgoingActive =
              node.id === 3
                ? false
                : [seg0Progress, seg1Progress, seg2Progress][node.id] > 0;

            return (
              <React.Fragment key={node.id}>
                {/* Кубик-узел с точными контактными портами на гранях */}
                <div className="relative shrink-0 flex items-center justify-center">
                  {/* Левый порт-коннектор (вход в грань) */}
                  {node.id > 0 && (
                    <span
                      className={`absolute -left-[2px] top-1/2 -translate-y-1/2 w-[3px] h-2 rounded-l-xs z-20 transition-colors duration-300 ${
                        incomingFull ? 'bg-sky-500 shadow-sm shadow-sky-500/50' : 'bg-slate-300'
                      }`}
                    />
                  )}

                  {/* Правый порт-коннектор (выход из грани) */}
                  {node.id < 3 && (
                    <span
                      className={`absolute -right-[2px] top-1/2 -translate-y-1/2 w-[3px] h-2 rounded-r-xs z-20 transition-colors duration-300 ${
                        outgoingActive ? 'bg-sky-500 shadow-sm shadow-sky-500/50' : 'bg-slate-300'
                      }`}
                    />
                  )}

                  {/* Тело кубика с внутренней шиной коннектора */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
                      isCurrent
                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/40 scale-105 animate-pulse ring-2 ring-sky-400/50'
                        : isCompleted
                          ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20 scale-100'
                          : 'bg-white border border-slate-200 text-slate-400 scale-95'
                    }`}
                  >
                    {/* Внутренняя шина сквозного коннектора (видна внутри кубика) */}
                    <div
                      className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] transition-all duration-300 pointer-events-none ${
                        isCurrent
                          ? 'bg-sky-200/90 shadow-[0_0_8px_rgba(56,189,248,0.9)]'
                          : isCompleted
                            ? 'bg-sky-300/50'
                            : 'bg-slate-200/60'
                      }`}
                    />

                    {/* Иконка поверх внутренней шины */}
                    <Icon className="w-4 h-4 relative z-10" />
                  </div>
                </div>

                {/* Сегмент шины между кубиками (встык от грани к грани) */}
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
              <div
                key={node.id}
                className={`w-9 flex ${
                  node.id === 0
                    ? 'justify-start text-left'
                    : node.id === 3
                      ? 'justify-end text-right'
                      : 'justify-center text-center'
                }`}
              >
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
        <span className="font-mono text-slate-500">{Math.round(progressRatio * 100)}%</span>
      </div>
    </div>
  );
}

