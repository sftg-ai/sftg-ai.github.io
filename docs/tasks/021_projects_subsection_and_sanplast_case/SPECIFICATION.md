# SPECIFICATION: Архитектура подраздела «Проекты» и карточки ООО «СанПроПласт»

## 1. Структура данных `ROW_ONE` (12 карточек, уникальные цвета)
1. **spp / СанПроПласт (ООО «СанПроПласт» / DUVIT)** — `border-sky-200/90 bg-sky-50/70`
   - *Проект 1:* `Подбор сантехники и крышек по фото` (`demoLink: 'https://podbor-kryshek.apps.aipush.dev'`)
   - *Проект 2:* `Интеграция со складской базой и 1С`
2. **bpt / БелПромТех** — `border-amber-200/90 bg-amber-50/70`
   - *Проекты:* `Внедрение ЭДО чертежей и КД`, `Модуль расчета сметной себестоимости`, `Диспетчеризация станков с ЧПУ`
3. **sss / СеверСтальСнаб** — `border-indigo-200/90 bg-indigo-50/70`
   - *Проекты:* `ИИ-разбор входящих заявок и первички`, `Оптовый B2B-портал дилеров`
4. **ale / Apex Logistics** — `border-emerald-200/90 bg-emerald-50/70`
   - *Проекты:* `Мобильное приложение водителя`, `Единый диспетчерский контур трекинга`
5. **ahv / АгроХолдинг Восток** — `border-blue-200/90 bg-blue-50/70`
   - *Проекты:* `Планшетное приложение инженера`, `Телеметрия и списание ГСМ в ERP`
6. **nit / Nordic Tech** — `border-orange-200/90 bg-orange-50/70`
   - *Проект:* `SCADA-шлюз и регламент ТО`
7. **agt / Al-Dhabi Trading** — `border-teal-200/90 bg-teal-50/70`
   - *Проекты:* `B2B-кабинет оптовых покупателей`, `Сверка оплат и таможенный архив`
8. **mk / МеталлКомплект** — `border-slate-200 bg-white`
   - *Проекты:* `Алгоритм раскроя и учета остатков`, `Связка весовой с CRM и печать ТТН`
9. **vrs / Vanguard Systems** — `border-violet-200/90 bg-violet-50/70`
   - *Проект:* `Синхронизация омниканальных продаж`
10. **esc / Emirates Supply** — `border-cyan-200/90 bg-cyan-50/70`
    - *Проект:* `Электронный документооборот AWB`
11. **blg / БелЛогистик Групп** — `border-rose-200/90 bg-rose-50/70`
    - *Проекты:* `Мобильное приложение экспедитора`, `Модуль автомаршрутизации автопарка`
12. **kmc / Kronos Machinery** — `border-zinc-200/90 bg-zinc-50/70`
    - *Проект:* `Интерактивный конфигуратор станков`

## 2. Структура `ROW_TWO` (4 карточки)
1. **ptp / ПромТехПрибор** — `border-emerald-200/90 bg-emerald-50/70`
   - `Оптический фотоконтроль экранов ОТК`, `Сквозной учет шильдиков и маркировки`
2. **res / РусЭнергоСтрой** — `border-purple-200/90 bg-purple-50/70`
   - `Контроль сметных лимитов КС-2/КС-3`
3. **scg / SmartCommerce** — `border-cyan-200/90 bg-cyan-50/70`
   - `Разработка оптового B2B-портала`, `Алгоритм матчинга каталогов поставщиков`
4. **hps / Horizon Pharma** — `border-amber-200/90 bg-amber-50/70`
   - `Аудит холодовой цепи и GDP-журнал`

## 3. Компонент кнопки демо-стенда
В `TrustMarquee.jsx` при наличии `currentProject.demoLink`:
```jsx
{currentProject.demoLink && (
  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
    <div className="text-xs text-slate-500">
      Работающий сервис доступен для открытого тестирования
    </div>
    <a
      href={currentProject.demoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
    >
      <span>Протестировать на демо-стенде</span>
      <ExternalLink className="w-3.5 h-3.5" />
    </a>
  </div>
)}
```
