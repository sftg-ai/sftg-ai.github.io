# IMPLEMENTATION PLAN — Task 027: Интеграция живого сервиса экспресс-аудита

> **Статус:** Ожидание запуска реализации бэкенда  
> **Инкремент:** `027_integrate_live_audit_endpoint`

---

## Чек-лист шагов

- [x] **Шаг 27.1:** Фиксация бизнес-требований и контракта в `REQUIREMENTS.md`.
- [x] **Шаг 27.2:** Техническая спецификация интеграции в `SPECIFICATION.md`.
- [ ] **Шаг 27.3:** Добавление переменной `VITE_AI_ANALYSIS_ENDPOINT=https://audit.apps.aipush.dev/api/v1/analyze` в `.env`.
- [ ] **Шаг 27.4:** Обновление `HeroScenarioAnalyzer.jsx`:
  - Расширение пула фаз анализа до 13–16 этапов.
  - Обработка состояний `insufficient_data` и `rate_limited`.
  - Поддержка `formatted_b24_comment` при передаче в `b24Bridge`.
- [ ] **Шаг 27.5:** Проверка сборки `npm run build` и тест связки с работающим бэкендом.
