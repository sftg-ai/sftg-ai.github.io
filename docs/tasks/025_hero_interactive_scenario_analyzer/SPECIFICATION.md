# Архитектурная спецификация задачи 025

## 1. Компонентная структура
1. Новый компонент: `src/components/HeroScenarioAnalyzer.jsx`
   - Инкапсулирует состояние раскрытия формы (`isOpen`), статус анализа (`idle` | `loading` | `completed`), поля ввода (`companyInput`, `systems: { oneC, bitrix24, email }`), и результат (`scenarios`).
2. Интеграция в [Hero.jsx](file:///Users/alex/Projects/commercial/sftg/sftg-site/src/components/Hero.jsx):
   - Размещается в левой колонке Hero под текстом УТП вместо статической ссылки-кнопки.
   - При закрытом состоянии отображает аккуратную белую кнопку **«Подобрать сценарии автоматизации»**.
   - При клике плавно раскрывает карточку экспресс-калькулятора.

## 2. Модель данных и генератор сценариев (`src/utils/scenarioAnalyzer.js` или внутри компонента)
- Входные параметры:
  ```typescript
  interface AnalysisRequest {
    companyOrSite: string;
    systems: {
      oneC: boolean;
      bitrix24: boolean;
      email: boolean;
    };
  }
  ```
- Логика формирования сценариев:
  - Если выбрана **1С**: сценарий «Авторазнесение входящей первички (ТТН, акты, УПД) в 1С без ручного ввода».
  - Если выбран **Битрикс24**: сценарий «Мгновенная квалификация запросов, автосоздание сделок и проверка остатков».
  - Если выбрана **Почта/мессенджеры**: сценарий «Умная маршрутизация входящих заявок и документов из почты и Telegram».
  - Сквозной сценарий: «Контроль дебиторской задолженности, сверка взаиморасчетов и напоминания клиентам».

## 3. Интеграция с API (iPushDev)
```javascript
const analyzeScenarios = async (data) => {
  const endpoint = import.meta.env.VITE_AI_ANALYSIS_ENDPOINT;
  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Backend endpoint unavailable, falling back to local analysis engine', e);
    }
  }
  return generateLocalScenarios(data);
};
```

## 4. Стили и анимация
- Фон карточки в раскрытом виде: `bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-5 sm:p-6 text-slate-900`.
- Плавная анимация раскрытия через `transition-all duration-300`.
- Кнопка перехода к форме Битрикс24: плавный `document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' })`.

