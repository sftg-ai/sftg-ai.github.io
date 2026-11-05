# IMPLEMENTATION PLAN — Task 027: Интеграция живого сервиса экспресс-аудита

> **Статус:** Ожидание запуска реализации бэкенда  
> **Инкремент:** `027_integrate_live_audit_endpoint`

---

## Чек-лист шагов

- [x] **Шаг 27.1:** Фиксация бизнес-требований и контракта в `REQUIREMENTS.md`.
- [x] **Шаг 27.2:** Техническая спецификация интеграции в `SPECIFICATION.md`.
- [x] **Шаг 27.3:** Добавление переменной `VITE_AI_ANALYSIS_ENDPOINT=http://localhost:8001/api/v1/analyze` в `.env.local` (с возможностью переключения на `https://audit.apps.aipush.dev/api/v1/analyze`).
- [x] **Шаг 27.4:** Обновление `HeroScenarioAnalyzer.jsx`:
  - Расширение пула фаз анализа до 12 технологических этапов со сменяющимся таймером.
  - Обработка состояний `insufficient_data` и показ мягкого предупреждения.
  - Поддержка `formatted_b24_comment` при передаче в `b24Bridge`.
  - Привязка иконок `FileText`, `Layers`, `Sparkles`, `CheckCircle2`.
- [x] **Шаг 27.5:** Проверка сборки `npm run build` — код завершения 0, ошибок нет.
