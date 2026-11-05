import React from 'react';
import { Truck, CheckCheck, MapPin, Clock, ShieldCheck, Thermometer } from 'lucide-react';

export default function LogisticsTrackingPreview() {
  return (
    <div className="flex flex-col gap-3 font-sans text-xs">
      {/* 1. Шапка мессенджера Telegram / MAX */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-sky-600 flex items-center justify-center text-white font-bold text-xs">
            Т
          </div>
          <div>
            <div className="text-white font-medium text-xs">Евгений · Директор по логистике ООО «ТрансРегион»</div>
            <div className="text-[10px] text-zinc-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-sky-400" /> Запрос статуса рейса через Telegram / MAX
            </div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[11px] font-mono border border-amber-500/20">
          1C:TMS + Телематика
        </span>
      </div>

      {/* 2. Область диалога */}
      <div className="space-y-3 p-3 rounded-xl bg-[#0b0e14] border border-white/5 min-h-[220px] flex flex-col justify-end">
        {/* Запрос от клиента */}
        <div className="flex flex-col items-start max-w-[88%]">
          <div className="rounded-2xl rounded-tl-sm bg-[#1e2533] text-white/90 p-2.5 shadow-sm">
            <p className="text-[11px] leading-relaxed">
              Добрый день! Где сейчас фура по рейсу Р-4821 (Минск — Москва)? Заказчик волнуется, успеваем до 21:00 на РЦ Подольск?
            </p>
            <span className="block text-[9px] text-white/40 text-right mt-1 font-mono">14:18</span>
          </div>
        </div>

        {/* Ответ ИИ-агента в мессенджере */}
        <div className="flex flex-col items-end max-w-[94%] self-end">
          <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#0c1422] to-[#121c2e] border border-sky-500/30 text-white p-3 shadow-md">
            <div className="text-[10px] font-semibold text-sky-400 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-sky-400" />
                Softgreat Logistics Agent (Авто-трекинг рейса Р-4821)
              </span>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                В графике
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] text-zinc-300">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                <span>Трасса М-1, 384-й км (р-н Сафоново, Смоленская обл.)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono my-1.5">
                <div>
                  <span className="text-zinc-500 block">Борт / Водитель:</span>
                  <span className="text-white">Scania А742РХ / Сергей М.</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Скорость / Режим:</span>
                  <span className="text-emerald-400">76 км/ч · Движение</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Расчётное прибытие (ETA):</span>
                  <span className="text-white font-bold">Сегодня, 19:45</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Рефрижератор:</span>
                  <span className="text-sky-300 flex items-center gap-1">
                    <Thermometer className="w-2.5 h-2.5" /> +4.1°C (Норма)
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-zinc-300 leading-relaxed">
                До закрытия РЦ остаётся <strong>1 час 15 мин запаса</strong>. Подписанная накладная со штампом принята водителем в приложении. Задержек нет.
              </p>
            </div>

            <div className="flex items-center justify-between text-[9px] text-white/40 mt-2 pt-1.5 border-t border-white/5 font-mono">
              <span className="text-emerald-400/90 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Сверка 1C:TMS + GPS телематика
              </span>
              <div className="flex items-center gap-1">
                <span>14:18</span>
                <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Инженерный результат */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1 pt-1 font-mono">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          0 звонков логисту и диспетчеру
        </span>
        <span className="text-zinc-500">Экономия ~15 минут на обращение</span>
      </div>
    </div>
  );
}
