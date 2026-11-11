# Task 029: Implementation Plan — SEO, Pre-rendering, Analytics & 99-З Compliance

## Статус этапов SDLC
- [x] **Такт 1 (Диалог):** Согласована архитектура GTM + `dataLayer` с поддержкой `.env`, build-time пререндеринг SPA, Schema.org и минималистичный Cookie Consent под Закон РБ № 99-З (2026-11-11).
- [x] **Такт 2 (Спецификация):** Подготовлены `REQUIREMENTS.md`, `SPECIFICATION.md`, `IMPLEMENTATION_PLAN.md` в `docs/tasks/029_seo_analytics_and_ads/` (2026-11-11).
- [x] **Такт 3 (Реализация):** Completed & Verified (2026-11-11).

---

## Пошаговый план реализации (Такт 3)

### Этап 1. Конфигурация и переменные окружения
- [x] **Шаг 1.1:** Добавить в `.env.production` и `.env.example` переменные `VITE_GTM_ID`, `VITE_GA4_ID`, `VITE_YM_ID`, `VITE_FB_PIXEL_ID`, `VITE_GSC_VERIFICATION`, `VITE_YANDEX_VERIFICATION`, `VITE_REQUIRE_COOKIE_CONSENT`. *(Completed & Verified, 2026-11-11)*
- [x] **Шаг 1.2:** Создать `src/config/analyticsConfig.js` для чтения и валидации переменных окружения (игнорирование пустых строк и `GTM-XXXXXXX`). *(Completed & Verified, 2026-11-11)*

### Этап 2. Единый модуль аналитики, `dataLayer` и Consent Mode v2
- [x] **Шаг 2.1:** Создать `src/utils/analytics.js`: *(Completed & Verified, 2026-11-11)*
  - Инициализация `window.dataLayer` и Google Consent Mode v2 (`default: denied` при отсутствии согласия).
  - Функции чтения/сохранения согласия в `localStorage` (`sftg_cookie_consent_v1`) и применения `gtag('consent', 'update', ...)`.
  - Условная/отложенная загрузка GTM, Яндекс.Метрики (`webvisor: true`, `clickmap: true`) и Meta Pixel без дублей.
  - Единая функция `trackEvent(eventName, params)` с фильтрацией PII.
- [x] **Шаг 2.2:** Интегрировать трекинг бизнес-конверсий в ключевых точках: *(Completed & Verified, 2026-11-11)*
  - [`src/utils/b24Bridge.js`](../../../src/utils/b24Bridge.js) — подписка на `b24:form:send:success` с отправкой главной конверсии `lead_form_submit` (`Lead`).
  - [`src/components/HeroScenarioAnalyzer.jsx`](../../../src/components/HeroScenarioAnalyzer.jsx) — события `express_analysis_start`, `express_analysis_complete`, `express_analysis_to_form`.
  - [`src/components/Header.jsx`](../../../src/components/Header.jsx), [`src/components/ContactsSection.jsx`](../../../src/components/ContactsSection.jsx), [`src/components/Footer.jsx`](../../../src/components/Footer.jsx), [`src/components/LeadForm.jsx`](../../../src/components/LeadForm.jsx) — события `contact_click` (`phone`, `telegram`, `whatsapp`).

### Этап 3. Соответствие Закону РБ № 99-З (Мини-баннер + Политика)
- [x] **Шаг 3.1:** Создать `src/components/PrivacyPolicyModal.jsx` с актуальным текстом Политики обработки персональных данных и файлов cookie для ООО «Инновационный Софт» (Минск, ПВТ, `+375 (29) 124-5555`). *(Completed & Verified, 2026-11-11)*
- [x] **Шаг 3.2:** Создать компактный плавающий компонент `src/components/CookieConsent.jsx` в правом нижнем углу (равнозначные кнопки «Принять» и «Отклонить», раскрывающиеся настройки категорий, ссылка на Политику). *(Completed & Verified, 2026-11-11)*
- [x] **Шаг 3.3:** Подключить `CookieConsent`, `PrivacyPolicyModal` и инициализацию аналитики в `src/App.jsx`, добавить в [`src/components/Footer.jsx`](../../../src/components/Footer.jsx) ссылки «Политика данных и cookie» и «Настройки cookie». *(Completed & Verified, 2026-11-11)*

### Этап 4. SEO-разметка, универсальная семантика, FAQ и Schema.org
- [x] **Шаг 4.1:** Обновить [`index.html`](../../../index.html): *(Completed & Verified, 2026-11-11)*
  - Удалить хардкодный `GTM-XXXXXXX` (управляется через `analytics.js` и build-инъекцию).
  - Обновить `title`, `description`, `keywords`, `og:locale="ru_BY"`, гео-метатеги Минска/РБ, `robots`.
  - Внедрить JSON-LD `@graph` (`Organization` / `ProfessionalService`, `WebSite`, `OfferCatalog`, `FAQPage`) с точными реквизитами и `+375 (29) 124-5555`.
- [x] **Шаг 4.2:** Обогатить видимые тексты и индексность вкладок широкими B2B-формулировками: *(Completed & Verified, 2026-11-11)*
  - Раскрыть контент всех 7 процессов в [`ProcessExplorer.jsx`](../../../src/components/ProcessExplorer.jsx) и блока «Индивидуальная разработка» в [`RealCases.jsx`](../../../src/components/RealCases.jsx) в DOM (семантически скрытые неактивные вкладки `hidden`).
  - Точечно усилить универсальные коммерческие B2B-ключи (ИИ-автоматизация в Минске и Беларуси, бизнес-чат-боты, управленческие дашборды и отчёты для руководителя, сверка 1С и Битрикс24 и контроль дебиторской задолженности).
- [x] **Шаг 4.3:** Создать компактный аккордеон `src/components/FaqSection.jsx` (6 универсальных вопросов, синхронизированных 1-в-1 с `FAQPage` JSON-LD) и подключить его в `src/App.jsx`. *(Completed & Verified, 2026-11-11)*
- [x] **Шаг 4.4:** Разместить `public/google356b1dc362edd3db.html`, обновить [`public/robots.txt`](../../../public/robots.txt), [`public/sitemap.xml`](../../../public/sitemap.xml) и создать `public/llms.txt`. *(Completed & Verified, 2026-11-11)*
- [x] **Шаг 4.5:** Проверить и дополнить `alt`-атрибуты и семантику заголовков. *(Completed & Verified, 2026-11-11)*

### Этап 5. Build-Time Pre-rendering SPA (SSR-снимок при сборке)
- [x] **Шаг 5.1:** Проверить все компоненты и хуки на SSR-совместимость (`typeof window !== 'undefined'`, `typeof document !== 'undefined'`). *(Completed & Verified, 2026-11-11)*
- [x] **Шаг 5.2:** Создать `src/entry-server.jsx` и перевести [`src/main.jsx`](../../../src/main.jsx) на безопасную гидрацию (`hydrateRoot` при наличии пререндеренного DOM, иначе `createRoot`). *(Completed & Verified, 2026-11-11)*
- [x] **Шаг 5.3:** Создать `scripts/prerender.mjs` и обновить скрипт `"build"` в [`package.json`](../../../package.json). *(Completed & Verified, 2026-11-11)*

### Этап 6. Верификация, документация по кабинетам и Clock-Check
- [x] **Шаг 6.1:** Написать пошаговую инструкцию `docs/tasks/029_seo_analytics_and_ads/ANALYTICS_SETUP_GUIDE.md` для настройки GTM, GA4, Яндекс.Метрики, Meta Events Manager, Search Console и Яндекс.Вебмастера. *(Completed & Verified, 2026-11-11)*
- [x] **Шаг 6.2:** Запустить `npm run build` (код завершения 0) и проверить итоговый `dist/index.html` (`185,751` символов, `173,595` символов пререндеренного HTML в `#root`, валидный JSON-LD `@graph` из 4 узлов). *(Completed & Verified, 2026-11-11)*
- [x] **Шаг 6.3:** Отметить чекбоксы в `IMPLEMENTATION_PLAN.md` и выполнить коммит `feat(task-029): ...`. *(Completed & Verified, 2026-11-11)*
