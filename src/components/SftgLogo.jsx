import React from 'react';

/**
 * Фирменный логотип SFTG AI с анимированной центральной звездой.
 * 
 * Механика анимации:
 * 1. Большую часть времени (0-70%) звезда неподвижна.
 * 2. Предвосхищение (76%): звезда сжимается к центру (anticipation) с микро-замахом.
 * 3. Быстрый перекрут по часовой стрелке (88%): звезда совершает оборот и выбрасывает кончики (overshoot scale 1.15).
 * 4. Пружинистый возврат в покой (94-100%).
 */
export default function SftgLogo({ className = "w-8 h-8", glow = false }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className} select-none group`}>
      <style>{`
        @keyframes sftgStarSpinPop {
          0%, 70% {
            transform: rotate(0deg) scale(1);
          }
          76% {
            transform: rotate(-15deg) scale(0.62);
          }
          88% {
            transform: rotate(375deg) scale(1.18);
          }
          94% {
            transform: rotate(358deg) scale(0.96);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        .sftg-star-animated {
          transform-origin: 50px 50px;
          animation: sftgStarSpinPop 6s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
      `}</style>

      {glow && (
        <div className="absolute inset-0 bg-sky-500/25 blur-[6px] rounded-xl -z-10 pointer-events-none group-hover:bg-sky-500/40 transition-all duration-300" />
      )}

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full rounded-[14px] shadow-sm border border-sky-300/40 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="SFTG AI Logo"
      >
        <defs>
          {/* Заливка фирменным синим #2997D8 */}
          <linearGradient id="sftgBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2997D8" />
            <stop offset="100%" stopColor="#2285C1" />
          </linearGradient>

          {/* Мягкое внутреннее свечение для звезды */}
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Фон — строгий скругленный квадрат как на оригинальной иконке */}
        <rect width="100" height="100" rx="14" fill="url(#sftgBg)" />

        {/* Буквы S F T G по квадрантам (строго статичны) */}
        <g
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="21"
          letterSpacing="-0.5"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <text x="27" y="27">S</text>
          <text x="73" y="27">F</text>
          <text x="27" y="75">T</text>
          <text x="73" y="75">G</text>
        </g>

        {/* Вращающаяся и вытягивающаяся звезда */}
        <g className="sftg-star-animated">
          {/* Свечение кончиков лучей при выстреливании */}
          <ellipse cx="50" cy="50" rx="35" ry="5" fill="#FFFFFF" opacity="0.3" filter="blur(1px)" />
          <ellipse cx="50" cy="50" rx="5" ry="35" fill="#FFFFFF" opacity="0.3" filter="blur(1px)" />

          {/* Основное 4-конечное тело звезды */}
          <path
            d="M 50 16 
               Q 50 50 84 50 
               Q 50 50 50 84 
               Q 50 50 16 50 
               Q 50 50 50 16 Z"
            fill="url(#starGlow)"
          />

          {/* Ядро звезды для глубины и мягкого блика */}
          <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
