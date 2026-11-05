import React from 'react';
import { Globe, Database, Layers, BarChart3 } from 'lucide-react';

/**
 * Режим 1: Осциллограф процессов (Mnemonic Continuous Circuit)
 * Единый непрерывный поток данных сквозь контур — как вода по трубам
 */
const MNEMONIC_CIRCUIT_PATH =
  "M 0 30 L 40 30 L 40 18 L 60 8 L 63 8 L 63 12 L 65 10 L 80 18 L 80 30 L 125 30 L 125 10 L 155 10 L 165 20 L 155 20 L 155 10 L 165 20 L 165 30 L 215 30 L 215 20 L 223 20 L 223 30 L 232 30 L 232 12 L 242 12 L 242 30 L 251 30 L 251 20 L 259 20 L 259 30 L 310 30 L 310 22 L 316 22 L 316 30 L 321 30 L 321 14 L 328 14 L 328 30 L 333 30 L 333 8 L 342 8 L 342 30 L 360 30";

// Полная длина единого векторного пути контура
const TOTAL_PATH_LEN = 629.5;

// Точки заполнения пути (как вода в трубах) строго по шагам пайплайна:
// Шаг 0..2: Здание компании (Сайт)
// Шаг 3..5: Документ накладной (Реестры)
// Шаг 6..8: Шестерня интеграций (1С / CRM)
// Шаг 9..11: Гистограмма отчета (Подбор решений)
// Шаг 12: Все 3 столбца гистограммы стоят, ожидаем ответа сервера (95%)
// isComplete: Выходной хвост простреливает до правого края (100%)
const FLUID_MILESTONES = {
  0: 40,      // вход к основанию здания
  1: 85,      // середина крыши здания
  2: 158.2,   // здание завершено, поток дошел до документа
  3: 158.2,   // вход в документ
  4: 215,     // документ наполовину нарисован
  5: 316.5,   // документ закрыт, поток дошел до шестерни
  6: 316.5,   // вход в шестерню
  7: 380,     // зубья шестерни рисуются
  8: 487.5,   // шестерня завершена, поток дошел до гистограммы
  9: 515,     // первый столбец гистограммы (80%)
  10: 555,    // второй столбец гистограммы (85%)
  11: 611.5,  // все 3 столбца гистограммы завершены (90%)
  12: 611.5,  // удерживаем 95% у основания завершенной гистограммы
};

export function ProcessOscilloscope({ step = 0, isComplete = false }) {
  const currentStage = Math.min(3, Math.floor(step / 3));
  const isFastPhase = currentStage >= 1;

  // Динамический расчет процентов: 25% -> 50% -> 75% -> 80% -> 85% -> 90% -> 95% (держим до готовности) -> 100%
  let progressPercent;
  if (isComplete) {
    progressPercent = 100;
  } else if (step >= 12) {
    progressPercent = 95;
  } else if (step === 11) {
    progressPercent = 90;
  } else if (step === 10) {
    progressPercent = 85;
  } else if (step === 9) {
    progressPercent = 80;
  } else if (step >= 6) {
    progressPercent = 75;
  } else if (step >= 3) {
    progressPercent = 50;
  } else {
    progressPercent = 25;
  }

  // Расчет текущей длины потока (как вода в трубе)
  const currentLen = isComplete
    ? TOTAL_PATH_LEN
    : (FLUID_MILESTONES[step] ?? (step >= 12 ? 611.5 : 40));
  const strokeOffset = Math.max(0, TOTAL_PATH_LEN - currentLen);

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
            {/* Мягкое технологическое свечение активного потока */}
            <filter id="circuit-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Базовая направляющая ось */}
          <line x1="0" y1="30" x2="360" y2="30" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

          {/* Фоновый чертеж всей трубы контура (светло-серый) */}
          <path
            d={MNEMONIC_CIRCUIT_PATH}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Мягкий неоновый ореол струи (свечение единого потока) */}
          <path
            d={MNEMONIC_CIRCUIT_PATH}
            pathLength={TOTAL_PATH_LEN}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            filter="url(#circuit-glow)"
            style={{
              strokeDasharray: TOTAL_PATH_LEN,
              strokeDashoffset: strokeOffset,
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Основная непрерывная струя — ни одного разрыва, 100% единый поток от начала до конца */}
          <path
            d={MNEMONIC_CIRCUIT_PATH}
            pathLength={TOTAL_PATH_LEN}
            fill="none"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={!isComplete ? "animate-pulse" : ""}
            style={{
              strokeDasharray: TOTAL_PATH_LEN,
              strokeDashoffset: strokeOffset,
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
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

  // Динамический расчет процентов: 25% -> 50% -> 75% -> 80% -> 85% -> 90% -> 95% (держим до готовности) -> 100%
  let nodeProgressPercent;
  if (isComplete) {
    nodeProgressPercent = 100;
  } else if (step >= 12) {
    nodeProgressPercent = 95;
  } else if (step === 11) {
    nodeProgressPercent = 90;
  } else if (step === 10) {
    nodeProgressPercent = 85;
  } else if (step === 9) {
    nodeProgressPercent = 80;
  } else if (step >= 6) {
    nodeProgressPercent = 75;
  } else if (step >= 3) {
    nodeProgressPercent = 50;
  } else {
    nodeProgressPercent = 25;
  }

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

