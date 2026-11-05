import React from 'react';
import { Send, CheckCheck, Clock, User, PhoneCall, ExternalLink } from 'lucide-react';

export default function TelegramChatPreview() {
  return (
    <div className="flex flex-col gap-3 font-sans text-xs">
      {/* 1. Шапка мессенджера Telegram */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
            Д
          </div>
          <div>
            <div className="text-white font-medium text-xs">Дмитрий · Главный инженер ООО «СтройТех»</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> входящий запрос в 23:42 (вне рабочего времени)
            </div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[11px] font-mono">
          Telegram Bot API
        </span>
      </div>

      {/* 2. Область диалога */}
      <div className="space-y-3 p-3 rounded-xl bg-[#0b0e14] border border-white/5 min-h-[220px] flex flex-col justify-end">
        {/* Входящее сообщение от клиента */}
        <div className="flex flex-col items-start max-w-[88%]">
          <div className="rounded-2xl rounded-tl-sm bg-[#1e2533] text-white/90 p-2.5 shadow-sm">
            <p className="text-[11px] leading-relaxed">
              Добрый вечер. Срочно нужно 400 метров кабеля ВВГнг-LS 3х2.5 и 4 концевые муфты. Есть в наличии на складе в Минске и сколько доставка?
            </p>
            <span className="block text-[9px] text-white/40 text-right mt-1 font-mono">23:42</span>
          </div>
        </div>

        {/* Ответ ИИ-агента */}
        <div className="flex flex-col items-end max-w-[92%] self-end">
          <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-sky-950/70 to-indigo-950/80 border border-sky-500/30 text-white p-3 shadow-md">
            <div className="text-[10px] font-semibold text-sky-400 mb-1 flex items-center gap-1">
              <span>Softgreat Sales Bot (Интеграция с 1С:Склад)</span>
            </div>
            <p className="text-[11px] leading-relaxed text-white/90">
              Здравствуйте, Дмитрий.
            </p>
            <ul className="text-[11px] space-y-1 my-1.5 text-white/80 list-disc list-inside">
              <li>Кабель ВВГнг-LS 3х2.5 — <strong className="text-emerald-300">в наличии 1 200 м</strong> на складе в Минске. Поставили резерв на 400 м.</li>
              <li>Муфты 1ПКВТ (4 шт.) — в наличии, добавлены в спецификацию.</li>
              <li>Доставка по Минску — бесплатно (заказ от 50 тыс ₽). Отгрузка завтра в 10:30.</li>
            </ul>
            <p className="text-[11px] text-sky-200">
              Счёт №1042 на <strong>84 000 ₽</strong> отправлен вам на почту. Подтвердить отгрузку?
            </p>
            <div className="flex items-center justify-end gap-1 text-[9px] text-white/40 mt-1 font-mono">
              <span>23:42</span>
              <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Фиксация результата в CRM */}
      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-emerald-300 font-medium">Сделка #1042 в Битрикс24 создана</span>
        </div>
        <span className="text-white/60 font-mono">Сумма: 84 000 ₽ · РОП уведомлен</span>
      </div>
    </div>
  );
}
