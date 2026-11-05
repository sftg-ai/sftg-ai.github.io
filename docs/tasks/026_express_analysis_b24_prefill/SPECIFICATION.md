# Архитектурная спецификация задачи 026

## 1. Механизм передачи данных
Создаем централизованный модуль управления префиллом формы: `src/utils/b24Bridge.js`:
- Хранит экземпляр `window.__b24FormInstance`.
- Слушает глобальное событие `b24:form:init`.
- Экспортирует функции:
  - `applyB24Prefill({ company, comment })`: вызывает `form.setValues()` либо сохраняет данные в `window.__pendingB24Values` до инициализации формы.
  - `onPrefillApplied(callback)`: подписка на уведомление в UI `LeadForm.jsx`.

## 2. Формат генерируемого комментария
```text
[Экспресс-анализ SoftGreat AI]
Компания: {company}
Системы: {systemsText}

Подобранные сценарии автоматизации:
1. {scenarios[0].system}: {scenarios[0].title}
2. {scenarios[1].system}: {scenarios[1].title}
3. {scenarios[2].system}: {scenarios[2].title}

Дополнительный комментарий клиента:
```

## 3. Компоненты
1. `src/components/HeroScenarioAnalyzer.jsx`:
   - При нажатии «Внедрить эти сценарии (Перейти к заявке)» формирует текст комментария и вызывает `applyB24Prefill()`.
2. `src/components/LeadForm.jsx`:
   - Регистрирует слушатель `b24:form:init`.
   - При получении префилла показывает аккуратную плашку с подтверждением передачи данных.
