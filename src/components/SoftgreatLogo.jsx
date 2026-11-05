import React from 'react';

/**
 * Фирменный логотип Softgreat AI.
 * 
 * Включает официальное начертание логотипа Softgreat с фирменной буквой 'A'
 * и акцентный постфикс 'AI' в фирменном технологичном цианово-голубом цвете.
 */
export default function SoftgreatLogo({ className = "h-7", theme = "dark" }) {
  const isWhite = theme === "white";
  const logoSrc = isWhite 
    ? "/images/brand/softgreat-logo-white.png" 
    : "/images/brand/softgreat-logo-black.png";

  return (
    <div className={`inline-flex items-center gap-2 select-none group ${className}`}>
      {/* Официальное начертание Softgreat */}
      <img
        src={logoSrc}
        alt="Softgreat"
        className="h-6 w-auto object-contain block transition-transform duration-200 group-hover:opacity-95"
      />

      {/* Акцентный постфикс AI */}
      <span className="text-sm font-extrabold tracking-tight px-1.5 py-0.5 rounded-md bg-sky-50 border border-sky-200/90 text-sky-600 leading-none shadow-xs group-hover:border-sky-300 transition-colors">
        AI
      </span>
    </div>
  );
}
