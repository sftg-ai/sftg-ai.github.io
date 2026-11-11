import React from 'react';
import { ShieldCheck, Send, Phone, MapPin, Clock, MessageSquare, Award } from 'lucide-react';
import SoftGreatLogo from './SoftGreatLogo';

export default function Footer() {
  const tgLink = "https://t.me/yurasvidersky?text=Здравствуйте!%20Хочу%20заказать%20бесплатный%20аудит%20процессов";
  const waLink = "https://wa.me/375447481051";

  const navLinks = [
    { label: 'Примеры', href: '#processes' },
    { label: 'Сценарии', href: '#cases' },
    { label: 'Этапы внедрения', href: '#stages' },
    { label: 'Безопасность', href: '#contour' },
    { label: 'О компании', href: '#about' },
    { label: 'Контакты', href: '#contacts' },
    { label: 'Бесплатный аудит', href: '#lead-form' }
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50/80 py-12 px-4 sm:px-6 relative z-10 text-slate-600 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Основная часть: бренд, ссылки и контакты */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          
          {/* Бренд и описание (5 колонок) */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <SoftGreatLogo className="h-7" theme="dark" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mt-1 max-w-sm">
              Белорусский разработчик и интегратор интеллектуальных систем автоматизации документов, заказов и B2B-процессов.
            </p>
            
            {/* Точный юридический адрес в Минске */}
            <div className="flex flex-col gap-1.5 text-xs text-slate-600 mt-3 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                <span>Беларусь, г. Минск, пр-т Дзержинского, 57, БЦ Omega Tower</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Режим работы: пн - пт 09:00 - 18:00 (сб, вс - выходной)</span>
              </div>
            </div>
          </div>

          {/* Якорные ссылки (4 колонки) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 text-xs font-semibold text-slate-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Разделы
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-sky-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Прямые контакты (3 колонки) */}
          <div className="lg:col-span-3 flex flex-col gap-3 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Связь с нами
            </span>

            {/* Телефон */}
            <a
              href="tel:+375291245555"
              className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-sky-600 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-sky-600 shrink-0" />
              <span>+375 (29) 124-5555</span>
            </a>

            {/* Telegram (Юрию) */}
            <a
              href={tgLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-bold transition-colors"
            >
              <Send className="w-3.5 h-3.5 shrink-0" />
              <span>Связаться в Telegram</span>
            </a>

            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>Написать в WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Нижняя часть: статус ПВТ, копирайт и Закон 99-З */}
        <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-600 shrink-0" />
              <span>ООО «Инновационный Софт» - резидент Парка высоких технологий Республики Беларусь.</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Закон РБ № 99-З «О защите персональных данных».</span>
            </div>
          </div>
          <div className="shrink-0 text-slate-600 font-medium">
            © 2026 SoftGreat AI (ООО «Инновационный Софт»). Минск, Беларусь.
          </div>
        </div>

      </div>
    </footer>
  );
}
