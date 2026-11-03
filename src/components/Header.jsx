import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, Send } from 'lucide-react';
import SftgLogo from './SftgLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Возможности', href: '#processes' },
    { label: 'Примеры задач', href: '#cases' },
    { label: 'Этапы работы', href: '#stages' },
    { label: 'Безопасность данных', href: '#contour' },
    { label: 'О компании', href: '#about' },
    { label: 'Контакты', href: '#contacts' },
  ];

  const tgLink = "https://t.me/yurasvidersky";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 md:pt-4">
        <nav 
          className={`pointer-events-auto w-full flex items-center justify-between gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 ${
            scrolled 
              ? 'bg-white/95 border-slate-200/90 shadow-md shadow-slate-900/5 backdrop-blur-xl' 
              : 'bg-white/85 border-slate-200/70 shadow-sm backdrop-blur-md'
          }`}
        >
          {/* Логотип */}
          <a href="#" className="flex items-center gap-2.5 group">
            <SftgLogo className="w-8 h-8 transition-transform duration-300 group-hover:scale-105" glow={false} />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
                SFTG <span className="text-sky-600 font-semibold">AI</span>
              </span>
            </div>
          </a>

          {/* Десктоп навигация */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Контакты (Беларусь) + CTA кнопка */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Телефон и Telegram */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-medium text-slate-700 pr-2 border-r border-slate-200">
              <a 
                href="tel:+375296663734" 
                className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors"
                title="Отдел внедрения Минск"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span className="font-semibold text-slate-900">+375 (29) 666-37-34</span>
              </a>
              <a 
                href={tgLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-semibold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Связаться</span>
              </a>
            </div>

            {/* Главная кнопка */}
            <a
              href="#lead-form"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-sm shadow-sky-600/20 active:scale-[0.98] transition-all"
            >
              <span>Заказать аудит</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Мобильная кнопка меню */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Переключить меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Мобильное выпадающее меню */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto mt-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xl backdrop-blur-2xl flex flex-col gap-4 lg:hidden">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-sky-600 py-2 border-b border-slate-100"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <a 
                href="tel:+375296663734" 
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>+375 (29) 666-37-34</span>
              </a>
              <a 
                href={tgLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-sky-600"
              >
                <Send className="w-4 h-4" />
                <span>Связаться</span>
              </a>
            </div>
            <a
              href="#lead-form"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full py-3 rounded-xl bg-sky-600 text-white font-bold text-center text-sm shadow-md shadow-sky-600/20"
            >
              Заказать аудит
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
