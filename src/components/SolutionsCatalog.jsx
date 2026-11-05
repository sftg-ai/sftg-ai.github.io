import React, { useState } from 'react';
import { solutionsData } from '../data/solutionsData';
import {
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  CheckCircle2,
  ScanLine,
  MessageSquare,
  Building2,
  Camera,
  Boxes,
  Cpu,
  Activity,
  ArrowRight,
  Truck
} from 'lucide-react';

export default function SolutionsCatalog() {
  const [activeTab, setActiveTab] = useState(0);

  const currentTab = solutionsData[activeTab];

  // Визуальные интерактивные мини-панели для каждого контура
  const renderContourVisual = () => {
    switch (currentTab.id) {
      case 'docs':
        return (
          <div className="mb-12 rounded-2xl bg-[#090B10] border border-white/10 p-5 sm:p-7 overflow-hidden relative shadow-xl">
            {/* Верхний статус-бар */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-2 text-sky-400">
                <FileCheck2 className="w-4 h-4" />
                <span className="font-semibold">Интеллектуальный контур первички: УПД / ТТН ➔ 1С:ERP</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OData 4.0: Поток активен (18 сек на документ)</span>
              </div>
            </div>

            {/* Двухколоночный интерфейс: Скан документа vs Проводка в 1С */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Левая часть: Входящий скан */}
              <div className="lg:col-span-5 p-4 rounded-xl bg-black/60 border border-white/[0.08] relative overflow-hidden">
                <div className="flex items-center justify-between mb-3 text-[11px] text-zinc-400 font-mono">
                  <span>Входящий скан: UPD_4821.pdf</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Штамп обнаружен</span>
                </div>
                
                <div className="space-y-2 text-xs font-mono text-zinc-300">
                  <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[10px] text-zinc-500">Поставщик:</div>
                    <div className="text-white font-semibold">ООО «ПромСнаб-Металл» (ИНН 7724819024)</div>
                  </div>
                  
                  <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[10px] text-zinc-500">Позиция 1:</div>
                    <div className="text-zinc-200">Болт М16х60 ГОСТ 7798-70 — 2 400 шт.</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">➔ Сопоставлено: Код 1С 00-004819 (100% совпадение)</div>
                  </div>

                  <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[10px] text-zinc-500">Позиция 2:</div>
                    <div className="text-zinc-200">Гайка М16 DIN 934 цинк — 2 400 шт.</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">➔ Сопоставлено: Код 1С 00-004820 (100% совпадение)</div>
                  </div>
                </div>

                {/* Синяя печать */}
                <div className="absolute bottom-2 right-2 border-2 border-blue-500/50 rounded-full px-2.5 py-1 text-[9px] font-mono text-blue-400 rotate-[-12deg] pointer-events-none uppercase tracking-wider font-semibold">
                  Печать
                </div>
              </div>

              {/* Разделитель / Стрелка */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center text-zinc-500 py-1">
                <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-full border border-sky-500/20">
                  <span>AI Parsing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-mono text-zinc-400 mt-1 hidden lg:block text-center">
                  0 ручного ввода
                </div>
              </div>

              {/* Правая часть: Запись в 1С */}
              <div className="lg:col-span-5 p-4 rounded-xl bg-[#0F141C] border border-sky-500/20 relative">
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                  <span className="text-sky-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    1С:ERP • Документ проведён
                  </span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Статус: Проведён
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Номер проводки:</span>
                    <span className="text-white">ПР-0004128 от 28.10</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Сумма документа:</span>
                    <span className="text-white font-semibold">184 200.00 ₽ (с НДС)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Склад приёмки:</span>
                    <span className="text-zinc-200">Центральный (Зона А)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">Время распознавания:</span>
                    <span className="text-emerald-400 font-semibold">18.4 секунды</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sales':
        return (
          <div className="mb-12 rounded-2xl bg-[#090B10] border border-white/10 p-5 sm:p-7 overflow-hidden relative shadow-xl">
            {/* Верхний статус-бар */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-2 text-sky-400">
                <MessageSquare className="w-4 h-4" />
                <span className="font-semibold">Ночной AI-ассистент: Telegram / MAX / WhatsApp ➔ Битрикс24 CRM</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ответ за 4 секунды (24/7)</span>
              </div>
            </div>

            {/* Двухколоночный интерфейс: Чат с клиентом vs Созданная сделка */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Левая часть: Диалог в мессенджере */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono border-b border-white/[0.05] pb-2">
                  <span>Telegram • Клиент @stroy_montazh</span>
                  <span className="text-zinc-500">23:42 (Суббота)</span>
                </div>

                {/* Сообщение клиента */}
                <div className="bg-[#181C24] p-3 rounded-xl rounded-tl-sm text-xs text-zinc-200 max-w-[85%]">
                  «Здравствуйте! Срочно нужна партия силового кабеля ВВГнг-LS 3х2.5 на 1 500 м. Есть ли в наличии и по какой цене отгрузите?»
                </div>

                {/* Ответ ИИ-агента */}
                <div className="bg-sky-950/40 border border-sky-500/20 p-3 rounded-xl rounded-tr-sm text-xs text-sky-100 max-w-[90%] ml-auto">
                  <div className="text-[10px] text-sky-400 font-mono mb-1">Softgreat AI Consultant (23:42:04)</div>
                  «Добрый вечер! Кабель ВВГнг-LS 3х2.5 в наличии на центральном складе (свободный остаток 4 200 м). При объеме от 500 м спеццена 84.50 ₽/м. Партия 1 500 м выйдет в 126 750 ₽. Забронировать партию на отгрузку на понедельник утро?»
                </div>
              </div>

              {/* Правая часть: Карточка сделки в Битрикс24 */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-[#0F141C] border border-sky-500/20">
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                  <span className="text-sky-300 font-semibold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    Битрикс24 • Авто-создание лида
                  </span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Стадия: Бронь подтверждена
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Сделка:</span>
                    <span className="text-white font-semibold">#98421 (Кабель ВВГнг-LS 1500м)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Сумма сделки:</span>
                    <span className="text-emerald-400 font-bold">126 750.00 ₽</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Квалификация лида:</span>
                    <span className="text-zinc-200">Горячий • Оплата по безналу</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">Действие:</span>
                    <span className="text-sky-400 font-semibold">Счет сформирован и отправлен в чат</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'warehouse':
        return (
          <div className="mb-12 rounded-2xl bg-[#090B10] border border-white/10 p-5 sm:p-7 overflow-hidden relative shadow-xl">
            {/* Верхний статус-бар */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-2 text-sky-400">
                <ScanLine className="w-4 h-4" />
                <span className="font-semibold">Vision AI & Склад: Компьютерное зрение и экспресс-закрытие ТТН</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Точность сопоставления артикулов: 99.4%</span>
              </div>
            </div>

            {/* Двухколоночный интерфейс: Компьютерное зрение vs Складская ячейка */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Левая часть: Видоискатель детали */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-black/60 border border-white/[0.08] relative">
                <div className="flex items-center justify-between mb-3 text-[11px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-sky-400" />
                    Захват геометрии по фото
                  </span>
                  <span className="text-emerald-400 font-semibold">Conf: 99.4%</span>
                </div>

                <div className="p-3 rounded-lg bg-[#141720] border border-sky-500/30 font-mono text-xs space-y-1.5 relative">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Определенный узел:</span>
                    <span className="text-white font-bold">Шпиндель Danfoss HVP-12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Кросс-номер:</span>
                    <span className="text-sky-300">DN-440-128X (ГОСТ 5274)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Параметры резьбы:</span>
                    <span className="text-zinc-300">М22х1.5 / Шаг 2 / Сталь 40Х</span>
                  </div>
                  {/* Рамка захвата */}
                  <div className="mt-2 py-1 px-2 rounded bg-sky-500/10 border border-dashed border-sky-400/40 text-[10px] text-sky-300">
                    [Vision BBox: X=142 Y=88 W=320 H=210] • Совпадение с каталогом 12 000 SKU
                  </div>
                </div>
              </div>

              {/* Правая часть: Наличие на складе и ТТН */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-[#0F141C] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                  <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                    <Boxes className="w-3.5 h-3.5 text-amber-400" />
                    Остатки и статус накладной
                  </span>
                  <span className="text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    Ячейка: B-14-02
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Доступный остаток:</span>
                    <span className="text-emerald-400 font-bold">3 шт. (Свободно)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Резерв под заявку:</span>
                    <span className="text-white">Заказ покупателя #3194</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Фотоконтроль ТТН водителя:</span>
                    <span className="text-emerald-400">Штамп проверен за 4 минуты</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">Эффект:</span>
                    <span className="text-white font-semibold">Отгрузка без ожидания 5 дней</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'operations':
        return (
          <div className="mb-12 rounded-2xl bg-[#090B10] border border-white/10 p-5 sm:p-7 overflow-hidden relative shadow-xl">
            {/* Верхний статус-бар */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-2 text-sky-400">
                <Cpu className="w-4 h-4" />
                <span className="font-semibold">Операционный контур: AI-аналитик директора и диспетчер цеха</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Загрузка оборудования: 92% • Риск простоя: 0%</span>
              </div>
            </div>

            {/* Двухколоночный интерфейс: Запрос директора vs Диспетчер цеха */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Левая часть: Сводка для руководителя */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono border-b border-white/[0.05] pb-2">
                  <span>Директор в Telegram / MAX: «Спроси компанию»</span>
                  <span className="text-emerald-400">Ответ за 3 сек</span>
                </div>

                <div className="text-xs text-zinc-300 font-mono">
                  <span className="text-zinc-500">Запрос:</span> «Покажи чистую маржу по отгрузкам за неделю и статус ТПА-03»
                </div>

                <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-500/20 text-xs font-mono space-y-1">
                  <div className="text-white font-semibold flex justify-between">
                    <span>Чистая маржинальность:</span>
                    <span className="text-emerald-400 font-bold">24.2% (+1.8%)</span>
                  </div>
                  <div className="text-zinc-300 flex justify-between">
                    <span>Выручка за 7 дней:</span>
                    <span className="text-white">18.4M ₽</span>
                  </div>
                  <div className="text-amber-300/90 text-[11px] pt-1">
                    ⚠️ Внимание: ТПА-03 наработал 980 моточасов. Через 20 ч требуется замена фильтра (заявка в 1С:ТОИР создана автоматически).
                  </div>
                </div>
              </div>

              {/* Правая часть: Состояние цеха */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-[#0F141C] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                  <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    Мониторинг линий и заказов
                  </span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Цех в графике
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Точность даты готовности:</span>
                    <span className="text-white font-semibold">97.8% (сокращение срывов на 70%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Предиктивное ТО станков:</span>
                    <span className="text-emerald-400">4 линии под автоматическим контролем</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Онбординг новичков:</span>
                    <span className="text-zinc-200">Корпоративный AI-мозг отвечает за 2 сек</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">Экономия времени директора:</span>
                    <span className="text-emerald-400 font-bold">10 часов в неделю</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'logistics':
        return (
          <div className="mb-12 rounded-2xl bg-[#090B10] border border-white/10 p-5 sm:p-7 overflow-hidden relative shadow-xl">
            {/* Верхний статус-бар */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-2 text-amber-400">
                <Truck className="w-4 h-4" />
                <span className="font-semibold">Логистический контур: 1C:TMS / Wialon ➔ Контроль рейсов и ТТН</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Телеметрия активна · 0 задержек на линии</span>
              </div>
            </div>

            {/* Двухколоночный интерфейс: Активный рейс vs Предиктивный контроль */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Левая часть: Мониторинг борта */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono border-b border-white/[0.05] pb-2">
                  <span>Рейс Р-4821 • Scania А742РХ 77</span>
                  <span className="text-emerald-400">В движении (76 км/ч)</span>
                </div>

                <div className="text-xs text-zinc-300 font-mono">
                  <span className="text-zinc-500">Маршрут:</span> Минск ➔ РЦ Подольск (трасса М-1, Сафоново)
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs font-mono space-y-1">
                  <div className="text-white font-semibold flex justify-between">
                    <span>Расчётное прибытие (ETA):</span>
                    <span className="text-emerald-400 font-bold">Сегодня, 19:45</span>
                  </div>
                  <div className="text-zinc-300 flex justify-between">
                    <span>Запас до закрытия окна РЦ:</span>
                    <span className="text-white">1 час 15 мин (Норма)</span>
                  </div>
                  <div className="text-zinc-400 flex justify-between text-[11px]">
                    <span>Температурный режим:</span>
                    <span className="text-sky-300">+4.1°C (Рефрижератор)</span>
                  </div>
                </div>
              </div>

              {/* Правая часть: Экономический эффект */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-[#0F141C] border border-amber-500/20 relative">
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                  <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    Результат авто-диспетчеризации
                  </span>
                  <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Авто-контроль
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Снижение звонков диспетчеру:</span>
                    <span className="text-white font-semibold">-70% типовых обращений</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Закрытие рейса водителем:</span>
                    <span className="text-emerald-400">5 минут (фото ТТН из кабины)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-zinc-500">Предотвращение штрафов за опоздание:</span>
                    <span className="text-zinc-200">Предиктивный перенос окон</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">Загрузка обратных рейсов:</span>
                    <span className="text-emerald-400 font-bold">+22% авто-догруз</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="solutions" className="py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Заголовок секции */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">
          Каталог решений
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          20 прикладных решений по 5 бизнес-контурам
        </h2>
        <p className="max-w-2xl text-base sm:text-lg text-zinc-400 font-normal text-pretty">
          Внедряем ИИ внутрь реальных отделов компании с доказанным экономическим эффектом.
        </p>
      </div>

      {/* Переключатели контуров */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {solutionsData.map((tab, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${
                isActive
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'bg-[#141414] text-zinc-400 border border-white/[0.06] hover:bg-[#1A1A1A] hover:text-white'
              }`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* Подзаголовок активного контура */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
          {currentTab.subtitle}
        </span>
      </div>

      {/* Графическая визуальная мини-панель активного контура */}
      {renderContourVisual()}

      {/* Сетка карточек кейсов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentTab.cases.map((item) => (
          <div
            key={item.id}
            className="group relative p-6 sm:p-8 rounded-2xl bg-[#0F0F0F] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Метрика */}
              <div className="flex items-baseline gap-2.5 mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {item.metric}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {item.metricDesc}
                </span>
              </div>

              {/* Название */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 group-hover:text-zinc-200 transition-colors">
                {item.title}
              </h3>

              {/* Проблема (Было) */}
              <div className="mb-4 p-3.5 rounded-xl bg-[#141414] border border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>Проблема бизнеса:</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.problem}
                </p>
              </div>

              {/* Решение (Стало) */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-zinc-400 mb-1">
                  Как решает Softgreat AI:
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>

            {/* Исход / Impact */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                {item.impact}
              </span>
              <a 
                href="#lead-form"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <span>Заказать консультацию</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
