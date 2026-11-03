import React from 'react';

/**
 * Фирменный логотип SFTG AI в шапке сайта.
 * 
 * Точные параметры оригинала:
 * - Скругленный квадрат (строгий squircle rounded-lg с rx=8).
 * - Цикл 6 секунд как в исходной версии.
 * - Буквы S F T G остаются статичными.
 * - Центральная звезда делает мягкий замах (anticipation), поворот и вытягивание кончиков.
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
        <div className="absolute inset-0 bg-sky-500/20 blur-[6px] rounded-lg -z-10 pointer-events-none group-hover:bg-sky-500/30 transition-all duration-300" />
      )}

      {/* Квадратная форма с четкими аккуратными уголками (rounded-lg) */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full rounded-lg shadow-xs border border-sky-300/30 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="SFTG AI Logo"
      >
        <defs>
          <linearGradient id="sftgBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2997D8" />
            <stop offset="100%" stopColor="#2285C1" />
          </linearGradient>

          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Прямоугольник с аккуратным малым скруглением углов rx=8 (строгий квадрат) */}
        <rect width="100" height="100" rx="8" fill="url(#sftgBg)" />

        {/* Буквы S F T G по квадрантам */}
        <g
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="-0.5"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <text x="26" y="26">S</text>
          <text x="74" y="26">F</text>
          <text x="26" y="76">T</text>
          <text x="74" y="76">G</text>
        </g>

        {/* Вращающаяся звезда */}
        <g className="sftg-star-animated">
          {/* Свечение кончиков лучей */}
          <ellipse cx="50" cy="50" rx="35" ry="5" fill="#FFFFFF" opacity="0.3" filter="blur(1px)" />
          <ellipse cx="50" cy="50" rx="5" ry="35" fill="#FFFFFF" opacity="0.3" filter="blur(1px)" />

          {/* Тело 4-конечной звезды */}
          <path
            d="M 50 16 
               Q 50 50 84 50 
               Q 50 50 50 84 
               Q 50 50 16 50 
               Q 50 50 50 16 Z"
            fill="url(#starGlow)"
          />

          <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
