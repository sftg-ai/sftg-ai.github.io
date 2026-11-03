import React from 'react';
import { MapPin, Clock, Phone, Send, MessageSquare, Building2, CheckCircle2 } from 'lucide-react';

export default function ContactsSection() {
  const tgLink = "https://t.me/yurasvidersky?text=Здравствуйте!%20Хочу%20обсудить%20задачи%20автоматизации";
  const waLink = "https://wa.me/375447481051";

  return (
    <section id="contacts" className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-200/80 text-left">
      
      {/* Шапка блока */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 uppercase tracking-wider mb-4">
          Контакты и офис
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Офис в Минске и прямая связь
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
          Отвечаем в мессенджерах за несколько минут, консультируем по телефону, проводим рабочие встречи в бизнес-центре или выезжаем к вам на предприятие.
        </p>
      </div>

      {/* Сетка контактов: 2 респектабельные карточки */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Карточка 1: Офис в Минске и очные встречи (7 колонок) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Главный офис в Беларуси
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Минск · БЦ Omega Tower
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">
                    пр-т Дзержинского, 57, 15 этаж, офис 18
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Бизнес-центр Omega Tower (ст. м. Михалово), удобная гостевая парковка
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">
                    Понедельник - Пятница: 09:00 - 18:00
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Суббота и воскресенье - выходные дни (дежурный инженер на связи в Telegram)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Буллеты доверия */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Очные встречи в офисе</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Выезды инженеров на ваше производство</span>
            </div>
          </div>
        </div>

        {/* Карточка 2: Прямые каналы оперативной связи (5 колонок) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-7 sm:p-9 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 block">
              Быстрый ответ
            </span>
            <h3 className="text-xl font-bold text-white mb-2">
              На связи каждый день
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Напишите нам в удобный мессенджер или позвоните - сразу соединим с техническим специалистом по внедрению.
            </p>

            {/* Кнопки каналов */}
            <div className="space-y-3">
              {/* Телефон */}
              <a
                href="tel:+375296663734"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Телефон офиса</div>
                    <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      +375 (29) 666-37-34
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-sky-400 group-hover:translate-x-0.5 transition-transform">
                  Позвонить
                </span>
              </a>

              {/* Telegram */}
              <a
                href={tgLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-sky-600 hover:bg-sky-500 transition-all text-white shadow-lg shadow-sky-600/30 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-sky-100 font-medium">Telegram (Юрий Свидерский)</div>
                    <div className="text-sm font-bold text-white">
                      @yurasvidersky
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-white/90 group-hover:translate-x-0.5 transition-transform">
                  Написать
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-white group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">WhatsApp чат</div>
                    <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      +375 44 748-10-51
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  Открыть
                </span>
              </a>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 text-xs text-slate-400">
            Консультация и аудит процессов — бесплатно.
          </div>
        </div>

      </div>

    </section>
  );
}
