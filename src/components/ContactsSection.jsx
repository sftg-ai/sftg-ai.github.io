import React from 'react';
import { MapPin, Clock, Phone, Send, MessageSquare } from 'lucide-react';

/**
 * Лаконичный строгий блок контактов:
 * - Размещен ПОСЛЕ формы заявки (перед футером).
 * - Узкий, компактный, без лишнего пафоса — чистая констатация фактов для бизнеса.
 */
export default function ContactsSection() {
  const tgLink = "https://t.me/yurasvidersky?text=Здравствуйте!%20Хочу%20обсудить%20задачи%20автоматизации";
  const waLink = "https://wa.me/375447481051";

  return (
    <section id="contacts" className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-200 text-left">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        
        {/* Заголовок строгий и невысокий */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Контакты и офис в Минске
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ООО «РоялСиАрЭм» · Разработка и внедрение AI-ассистентов для бизнеса
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Встречи в офисе и выезды на предприятия по всей Беларуси
          </div>
        </div>

        {/* 3 строгих компактных столбца без пафоса */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs sm:text-sm">
          
          {/* Адрес */}
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Адрес офиса
              </div>
              <div className="font-bold text-slate-900">
                г. Минск, пр-т Дзержинского, 57
              </div>
              <div className="text-slate-600 text-xs mt-0.5">
                БЦ Omega Tower, 15 этаж, офис 18
              </div>
            </div>
          </div>

          {/* Режим работы */}
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Время работы
              </div>
              <div className="font-bold text-slate-900">
                пн - пт: 09:00 - 18:00
              </div>
              <div className="text-slate-600 text-xs mt-0.5">
                сб, вс - выходной (в мессенджерах отвечаем оперативно)
              </div>
            </div>
          </div>

          {/* Каналы связи */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Прямая связь
            </div>
            
            {/* Телефон */}
            <a
              href="tel:+375296663734"
              className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-sky-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>+375 (29) 666-37-34</span>
            </a>

            {/* Мессенджеры в одну строчку */}
            <div className="flex items-center gap-4 pt-1">
              <a
                href={tgLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-sky-600 hover:text-sky-700 transition-colors"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span>Telegram</span>
              </a>

              <span className="text-slate-300">·</span>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
