# Task 030: Implementation Plan — Analytics & Webmaster MCP Automation

> **Статус:** Backlog (задача зафиксирована на будущее, 2026-11-11)

## Пошаговый план

- [ ] **Шаг 1 (Google Cloud):** Выбрать/создать проект в GCP через `gcloud`, включить 4 API (`tagmanager`, `analyticsadmin`, `analyticsdata`, `searchconsole`), создать Service Account и сохранить JSON-ключ локально в `~/.config/sftg-analytics-mcp/`.
- [ ] **Шаг 2 (Выдача прав Google):** Добавить email сервисного аккаунта в доступ GTM (`GTM-TGH2T9G6`), GA4 (`G-9W0R6VLBVT`) и Search Console (`softgreat.by`).
- [ ] **Шаг 3 (Яндекс OAuth):** Зарегистрировать приложение на `oauth.yandex.ru` (`metrika:read`, `metrika:write`, `webmaster:*`) и сохранить токен локально.
- [ ] **Шаг 4 (Разработка MCP-сервера):** Реализовать локальный MCP-сервер с инструментами `gtm_*`, `ga4_*`, `ym_*`, `gsc_*`, `yw_*`.
- [ ] **Шаг 5 (Интеграция в Antigravity):** Подключить MCP-сервер в конфигурацию Antigravity и проверить чтение/настройку (в том числе завести Custom Dimensions `channel`, `location`, `source` в GA4 и проверить живые отчёты Метрики/GSC).
