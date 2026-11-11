# Task 030: Technical Specification — Analytics & Webmaster MCP Server

## 1. Архитектура

Локальный MCP-сервер (Python + FastMCP или Node.js `@modelcontextprotocol/sdk`) за пределами публичного репозитория (либо в `../sftg-operations/tools/` или `~/.config/sftg-analytics-mcp/`), подключённый к Antigravity через пользовательский MCP-конфиг:

```
Antigravity Agent
   │ (MCP stdio)
   ▼
sftg-analytics-mcp (локально на Mac)
   ├── Google Service Account JSON (~/.config/sftg-analytics-mcp/gcp-sa.json)
   │     ├── Tag Manager API v2      (GTM-TGH2T9G6)
   │     ├── GA4 Admin & Data API    (G-9W0R6VLBVT)
   │     └── Search Console API      (https://softgreat.by/)
   └── Yandex OAuth Token (.env / Keychain)
         ├── Yandex.Metrika API      (114182508)
         └── Yandex.Webmaster API    (softgreat.by)
```

---

## 2. Инструменты MCP (Tool Surface)

### 2.1. Google Tag Manager (`gtm_*`)
- `gtm_list_workspace_items` — теги, триггеры, переменные и текущая опубликованная версия.
- `gtm_upsert_variable`, `gtm_upsert_trigger`, `gtm_upsert_tag` — создание/обновление конфигурации.
- `gtm_publish_version` — публикация изменений после подтверждения.

### 2.2. Google Analytics 4 (`ga4_*`)
- `ga4_list_custom_dimensions` / `ga4_create_custom_dimension` — регистрация `channel`, `location`, `source`, `scenarios_count`.
- `ga4_list_key_events` / `ga4_set_key_event` — пометка `lead_form_submit` и `contact_click` как ключевых конверсий.
- `ga4_get_realtime_report` / `ga4_run_report` — живые события и отчёты по источникам за период.

### 2.3. Яндекс.Метрика (`ym_*`)
- `ym_list_goals` / `ym_create_goal` — управление JavaScript-целями счётчика `114182508`.
- `ym_get_report` — статистика по визитам, отказам, источникам и достижениям целей.

### 2.4. Поиск: Google Search Console (`gsc_*`) и Яндекс.Вебмастер (`yw_*`)
- `gsc_list_sitemaps`, `gsc_submit_sitemap`, `gsc_search_analytics` (топ-запросы, клики, показы, CTR, средняя позиция), `gsc_inspect_url`.
- `yw_get_host_summary`, `yw_submit_sitemap`, `yw_request_recrawl`.

---

## 3. Разовая подготовка доступов (при старте реализации)

1. **Google Cloud (через установленный `gcloud` CLI):**
   - Включить API: `tagmanager.googleapis.com`, `analyticsadmin.googleapis.com`, `analyticsdata.googleapis.com`, `searchconsole.googleapis.com`.
   - Выпустить Service Account + JSON-ключ в `~/.config/sftg-analytics-mcp/gcp-sa.json`.
   - Выдать права этому email в интерфейсах: GTM (Publish), GA4 (Editor), GSC (Full/Owner).
2. **Яндекс:**
   - Выпустить OAuth-токен на `oauth.yandex.ru` со скоупами `metrika:read`, `metrika:write`, `webmaster:hostinfo`, `webmaster:verify`.
