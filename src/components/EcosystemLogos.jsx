import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, Layers } from 'lucide-react';

export default function EcosystemLogos() {
  const ecosystems = [
    {
      name: '1С:Предприятие 8.3',
      role: 'УТ, ERP, Бухгалтерия, КА, УНФ',
      note: 'Без изменения типовой базы',
      svg: (
        <svg viewBox="0 0 48 32" className="h-6 w-auto text-amber-600" fill="currentColor">
          <ellipse cx="24" cy="16" rx="22" ry="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path
            d="M17.5 10v12h3V10h-3zm6.5 0v3.5c1.2-1.2 2.8-1.8 4.5-1.8 3.5 0 6 2.4 6 6.3 0 4-2.5 6.3-6 6.3-1.8 0-3.3-.6-4.5-1.8V22h-3V10h3zm0 8c0 2.2 1.5 3.8 3.5 3.8s3.5-1.6 3.5-3.8-1.5-3.8-3.5-3.8-3.5 1.6-3.5 3.8z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: 'Битрикс24 CRM',
      role: 'Лиды, сделки, счета и задачи',
      note: 'Автозаполнение карточек',
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-auto text-sky-500" fill="currentColor">
          <circle cx="12" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="24" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="18" cy="23" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.85" />
        </svg>
      ),
    },
    {
      name: 'Telegram для бизнеса',
      role: 'Прием заказов и сводки директору',
      note: 'Голосом и кнопками 24/7',
      svg: (
        <svg viewBox="0 0 24 24" className="h-6 w-auto text-sky-600" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.2.14.28-.01.07-.01.21-.03.47z" />
        </svg>
      ),
    },
    {
      name: 'МойСклад и Excel',
      role: 'Прайс-листы, остатки и резервы',
      note: 'Сведение таблиц поставщиков',
      svg: (
        <svg viewBox="0 0 32 32" className="h-6 w-auto text-blue-500" fill="currentColor">
          <path d="M16 2l12 7v14l-12 7-12-7V9l12-7z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M16 2v14l12 7M16 16L4 23" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'beCloud / Hoster.by',
      role: 'Защищенный закрытый контур',
      note: 'Локальный сервер или облако',
      svg: (
        <svg viewBox="0 0 24 24" className="h-6 w-auto text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ];

  const trustHighlights = [
    {
      icon: Layers,
      text: 'Работаем поверх вашей действующей 1С - обновления и гарантия вендора сохраняются',
    },
    {
      icon: Lock,
      text: 'Закрытый контур на ваших серверах или в защищенном облаке компании',
    },
    {
      icon: CheckCircle2,
      text: 'Показываем рабочий пилот на ваших накладных и прайсах до подписания договора',
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto border-y border-slate-200/80 bg-slate-50/50 rounded-3xl">
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Штатная работа с корпоративными учетными системами и инфраструктурой
        </span>
      </div>

      {/* 5 карточек систем */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {ecosystems.map((eco, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-slate-300 transition-all"
          >
            <div className="mb-2">
              {eco.svg}
            </div>
            <div className="text-xs font-bold text-slate-900">
              {eco.name}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {eco.role}
            </div>
            <div className="mt-2 px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-600">
              {eco.note}
            </div>
          </div>
        ))}
      </div>

      {/* 3 кратких тезиса спокойствия для директора и главбуха */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-200/70">
        {trustHighlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/80 border border-slate-200/60 text-xs text-slate-700 font-medium">
              <Icon className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
