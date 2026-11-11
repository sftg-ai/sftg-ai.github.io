# Task 029: Technical Specification — SEO, Pre-rendering, Analytics & 99-З Compliance

## 1. Общая архитектура решения

Решение разделено на 4 независимых, слабо связанных слоя:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. Build-Time SEO Layer (Vite + SSR Prerender + Public Assets)          │
│    - index.html (meta, geo BY, OG ru_BY, JSON-LD Schema.org, GSC/YM)    │
│    - vite build + vite build --ssr + scripts/prerender.mjs              │
│    - public/robots.txt, public/sitemap.xml, public/llms.txt             │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 2. Configuration Layer (.env.* + src/config/analyticsConfig.js)         │
│    - VITE_GTM_ID, VITE_GA4_ID, VITE_YM_ID, VITE_FB_PIXEL_ID             │
│    - VITE_GSC_VERIFICATION, VITE_YANDEX_VERIFICATION                    │
│    - VITE_REQUIRE_COOKIE_CONSENT (default: true)                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 3. Privacy & Consent Layer (Закон РБ № 99-З / НЦЗПД)                    │
│    - Google Consent Mode v2 default: denied (до согласия)               │
│    - src/components/CookieConsent.jsx (мини-карточка справа внизу)      │
│    - src/components/PrivacyPolicyModal.jsx (Политика ПД и cookie)       │
│    - Ссылки в Footer.jsx («Политика данных и cookie», «Настройки cookie»)│
└─────────────────────────────────────────────────────────────────────────┘
                                    │ (при согласии / через GTM)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 4. Unified Event Bus & Tracking Layer (src/utils/analytics.js)          │
│    - GTM + window.dataLayer (основной транспорт)                        │
│    - Прямые опциональные загрузчики Яндекс.Метрики и Meta Pixel         │
│    - Защита от дублей целей и фильтрация PII                            │
│    - Интеграция в: b24Bridge.js, HeroScenarioAnalyzer.jsx, контакты     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Модуль конфигурации и переменные окружения

### 2.1. Переменные `.env.production` и `.env.example`
Все счётчики управляются через переменные Vite (`VITE_*`), чтобы смена ID не требовала правок логики:

```env
VITE_AI_ANALYSIS_ENDPOINT=https://audit.apps.aipush.dev/api/v1/analyze

# Идентификаторы аналитики и рекламы (пустое значение = отключено)
VITE_GTM_ID=
VITE_GA4_ID=
VITE_YM_ID=
VITE_FB_PIXEL_ID=

# Верификация прав на сайт в поисковиках
VITE_GSC_VERIFICATION=
VITE_YANDEX_VERIFICATION=

# Строгий режим согласия по Закону РБ № 99-З
VITE_REQUIRE_COOKIE_CONSENT=true
```

### 2.2. `src/config/analyticsConfig.js`
Экспортирует типизированный и очищенный от пробелов объект `analyticsConfig` с проверкой валидности ID (например, игнорирует пустые строки и заглушки вида `GTM-XXXXXXX`).

---

## 3. Модуль 1: Build-Time Pre-rendering и техническое SEO

### 3.1. Пайплайн сборки (`package.json`)
В `package.json` добавляется шаг пост-обработки при сборке:
- `"build": "vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node scripts/prerender.mjs"`
- Клиентский вход [`src/main.jsx`](../../../src/main.jsx):
  ```jsx
  const rootElement = document.getElementById('root');
  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, <React.StrictMode><App /></React.StrictMode>);
  } else {
    ReactDOM.createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
  }
  ```
- Серверный вход `src/entry-server.jsx`:
  ```jsx
  import React from 'react';
  import { renderToString } from 'react-dom/server';
  import App from './App';

  export function render() {
    return renderToString(<App />);
  }
  ```
- Скрипт `scripts/prerender.mjs`:
  1. Импортирует собранный бандл `dist-ssr/entry-server.js`.
  2. Вызывает `render()` и получает полный HTML-снимок всего дерева `<App />`.
  3. Вставляет HTML в `<div id="root"><!--app-html--></div>` (или заменяет `<div id="root"></div>`) в `dist/index.html`.
  4. Подставляет верификационные мета-теги Google/Яндекс (если заданы в `.env`), актуальный год/дату и при наличии `VITE_GTM_ID` — `<noscript>` iframe в `dist/index.html`.
  5. Удаляет временную директорию `dist-ssr`.

### 3.2. SSR-безопасность компонентов
При `renderToString` отсутствуют `window`, `document`, `localStorage`, `IntersectionObserver`, `requestAnimationFrame`.
Необходимо провести аудит и гарантировать, что в теле рендера (вне `useEffect`) нет прямых обращений к DOM/браузерным API в компонентах:
- `Header.jsx`, `Hero.jsx`, `HeroScenarioAnalyzer.jsx`, `ProcessExplorer.jsx`, `RealCases.jsx`, `TrustMarquee.jsx`, `WorkStages.jsx`, `ClosedContour.jsx`, `TeamAndExpertise.jsx`, `LeadForm.jsx`, `ContactsSection.jsx`, `Footer.jsx`, `MicroprocessorCanvas.jsx`, `useAnimatedFavicon.js`, `b24Bridge.js`.
- Во всех клиентских хуках (`useState` initializers и рендер) проверяется `typeof window !== 'undefined'`.
- Гидрация `CookieConsent`: компонент инициализирует видимость строго внутри `useEffect`, чтобы SSR HTML и первый клиентский рендер совпадали на 100% без React Hydration Mismatch Warning (#418/#425).

### 3.3. Индексация скрытых вкладок, новый блок FAQ и отраслевая SEO-семантика
1. **Раскрытие скрытых вкладок в DOM для поисковиков:**
   - В [`ProcessExplorer.jsx`](../../../src/components/ProcessExplorer.jsx): помимо интерактивной активной карточки, обеспечить присутствие ключевых заголовков и описаний всех 7 процессов в пререндеренном HTML (например, через скрытые от глаз семантические `role="tabpanel" hidden` или аккуратный компактный перечень направлений, чтобы робот при индексации видел все 7 кейсов: первичка/ТТН в 1С, КП с каналов, сведение прайсов, проверка договоров, смета с фактом, фотоотчёты с выезда).
   - В [`RealCases.jsx`](../../../src/components/RealCases.jsx): при рендере по умолчанию вкладка «Индивидуальная разработка» сейчас отсутствует в DOM — сделать её рендер с `hidden={activeCategory !== 'Индивидуальная разработка'}` (или аналогичным доступным паттерном вкладок), чтобы поисковые роботы индексировали все входящие каналы (аудиозаписи звонков, фото и чертежи, переписки и таблицы) и сценарии по отделам.
2. **Универсальное семантическое обогащение под рынок Беларуси:**
   Без узкоспециализированной отраслевой экзотики — обогатить тексты в `index.html`, [`Hero.jsx`](../../../src/components/Hero.jsx), [`RealCases.jsx`](../../../src/components/RealCases.jsx), `FaqSection.jsx` и `public/llms.txt` широкими B2B-формулировками, под которые подходит большинство компаний РБ:
   - *ИИ-автоматизация бизнес-процессов в Минске и Беларуси*, *внедрение ИИ-ассистентов в Битрикс24 и 1С*.
   - *Бизнес-чат-боты и Telegram-ассистенты* для продаж, заявок и внутренних сотрудников.
   - *Управленческие дашборды, контроль дебиторки и отчёты для руководителя* (контроль оплат в BYN, статусов сделок, сроков и просрочек, выявление несоответствий между Битрикс24 и 1С — например, когда сделка в CRM проведена, а оплата в 1С не получена, фиксация плюсов и минусов по расчётам).
   - *Автоматизация документооборота и расчётов*: обработка счетов, договоров, накладных, актов, прайс-листов, быстрая подготовка КП и контроль расхождений.
   - *Корпоративная база знаний* и быстрый поиск ответов по регламентам компании.
   - Все формулировки проверяются на соответствие запретам `AGENTS.md` (никаких `%`, длинных тире `—`, эмодзи и технического жаргона).
3. **Видимый компонент `src/components/FaqSection.jsx` (`id="faq"`):**
   - Компактный двухколоночный блок перед формой [`LeadForm.jsx`](../../../src/components/LeadForm.jsx) (единая сетка `max-w-7xl mx-auto px-4 sm:px-6 text-left`, стиль Light Business, без визуального шума).
   - 6 общих практических вопросов-ответов, сформированных на базе реальных FAQ с изученных B2B-сайтов рынка РБ/СНГ (`0018_2i_pro`, `0017_asimo_by`, `0020_olviton_com`, `0023_atsyhan_by` и наработок `task 014`):
     1. *Сколько стоит автоматизация и с чего начинается работа?* (бесплатный предразбор до звонка, пилот на ваших документах до договора, фиксированная смета и расчёты в BYN от резидента ПВТ ООО «Инновационный Софт»)
     2. *Где хранятся и обрабатываются данные компании - безопасно ли это?* (развёртывание локально на вашем сервере без интернета или в защищённом облаке, маскирование данных, соответствие Закону РБ № 99-З и NDA)
     3. *Какие системы, чат-боты и форматы документов поддерживаются?* (интеграция с Битрикс24, 1С, корпоративной почтой, телефонией, сайтом и Telegram; работа со счетами, договорами, накладными, прайсами, таблицами и фото)
     4. *Нужна ли техническая подготовка или собственный ИТ-отдел с нашей стороны?* (нет, достаточно короткого созвона с руководителем или владельцем процесса и примеров документов - всё внедряем под ключ)
     5. *Чем ваши решения отличаются от простого чат-бота или готовых модулей CRM?* (шаблонный бот отвечает только по жёсткому скрипту, а наша система связывает Битрикс24, 1С, документы и отчёты для руководителя в единый рабочий контур)
     6. *Как фиксируется результат и что будет, если пилот не даст эффекта?* (критерии оценки фиксируем заранее до старта: на пилотных документах вы видите точность и экономию времени ещё до перехода в постоянную работу)
   - Все 6 вопросов 1-в-1 дублируются в `FAQPage` JSON-LD (полное соответствие требованиям Google Rich Results).

### 3.4. Индексные файлы и подтверждение Search Console (`public/`)
1. **`public/google356b1dc362edd3db.html`**: файл подтверждения прав для Google Search Console (`https://softgreat.by/`) с точным содержимым `google-site-verification: google356b1dc362edd3db.html`.
2. **`public/robots.txt`**: разрешает индексацию всех разделов и статических ресурсов (`Allow: /`), указывает `Sitemap: https://softgreat.by/sitemap.xml` и `Host: https://softgreat.by` (полезно для Яндекса).
3. **`public/sitemap.xml`**: актуальный `lastmod`, `changefreq`, `priority`.
4. **`public/llms.txt`**: структурированный Markdown-файл стандарта `llmstxt.org` для краулеров ChatGPT / Perplexity / YandexGPT / Claude — описывает услуги ООО «Инновационный Софт» (ПВТ РБ), фокус на Битрикс24, 1С, чат-ботах, управленческих отчётах и документообороте, работу по Закону 99-З, контакты в Минске (`+375 (29) 124-5555`, `https://softgreat.by/`).

### 3.5. SEO-метатеги (`index.html`)
- Удаляется захардкоженный `GTM-XXXXXXX` из `<head>` и `<body>` (загрузка GTM переводится под управление модуля `analytics.js` / `CookieConsent`, либо условную инициализацию с Consent Mode v2).
- Уточняются мета-теги:
  - `title`: `SoftGreat AI - ИИ-автоматизация бизнес-процессов в Минске и Беларуси | Битрикс24 и 1С` (длина ~75–85 символов, чёткий ключ и регион).
  - `description`: деловой оффер без процентов и жаргона, упоминание Битрикс24, 1С, резидента ПВТ и бесплатного подбора сценариев до звонка (~155–165 символов).
  - `og:locale`: `ru_BY` (вместо `ru_RU`).
  - Гео-теги: `geo.region="BY-HM"`, `geo.placename="Minsk"`, `geo.position="53.8825;27.5142"`, `ICBM="53.8825, 27.5142"`.
  - `meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"`.

---

## 4. Модуль 2: Структурированные данные Schema.org (JSON-LD)

В `<head>` файла [`index.html`](../../../index.html) добавляется граф `@graph` в формате JSON-LD (`<script type="application/ld+json">`):

1. **`Organization` & `ProfessionalService` (`#organization`)**:
   - `name`: `SoftGreat AI (ООО «Инновационный Софт»)`
   - `legalName`: `ООО «Инновационный Софт»`
   - `url`: `https://softgreat.by/`
   - `logo`: `https://softgreat.by/favicon.png`
   - `image`: `https://softgreat.by/og-preview.png`
   - `telephone`: `+375291245555`
   - `address`: Минск, пр-т Дзержинского, 57, БЦ Omega Tower, страна `BY`
   - `areaServed`: `BY` (Республика Беларусь)
   - `openingHoursSpecification`: Mo–Fr `09:00`–`18:00`
   - `sameAs`: `https://t.me/yurasvidersky`
2. **`WebSite` (`#website`)**: привязка к `#organization`, язык `ru-BY`.
3. **`Service` / `OfferCatalog` (`#services`)**: бизнес-чат-боты и Telegram-ассистенты, управленческие отчёты и дашборды для руководителя, автоматизация документооборота и расчётов в Битрикс24 и 1С.
4. **`FAQPage` (`#faq`)**: 6 универсальных вопросов-ответов (полностью синхронизированных с `FaqSection.jsx`).

---

## 5. Модуль 3: Google Tag Manager, `dataLayer`, Метрика и Meta Pixel

### 5.1. Инициализация и Google Consent Mode v2 (`src/utils/analytics.js`)
При старте приложения (в `App.jsx` / `main.jsx` в `useEffect`, а базовый `dataLayer` + `consent default` в самом раннем клиентском блоке):
1. Создаётся `window.dataLayer = window.dataLayer || []`.
2. Вызывается `gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted', wait_for_update: 500 })` (если в `localStorage` уже есть сохранённое согласие — сразу выставляются сохранённые права).
3. **Загрузка GTM**: при наличии `analyticsConfig.gtmId` (и с учётом режима согласия/Consent Mode v2) инъектируется официальный скрипт `https://www.googletagmanager.com/gtm.js?id=<GTM_ID>`.
   - Примечание: в режиме Google Consent Mode v2 сам контейнер GTM может загружаться с дефолтным `denied` (не ставя рекламных cookie), а теги внутри GTM (GA4, Ads) соблюдают состояние Consent Mode.
   - **Прямые скрипты Яндекс.Метрики (`VITE_YM_ID`) и Meta Pixel (`VITE_FB_PIXEL_ID`)**, если заданы в `.env`, загружаются **строго только после согласия пользователя** на соответствующую категорию (`analytics` для Метрики, `marketing` для Meta Pixel), чтобы 100% соблюдать требования НЦЗПД РБ.

### 5.2. Карта событий (`dataLayer` + прямые вызовы с дедупликацией)

| Событие `dataLayer` | Когда срабатывает | Передаваемые параметры (без PII) | Маппинг в цели |
|---|---|---|---|
| `express_analysis_start` | Клик «Провести экспресс-анализ» | `has_1c`, `has_b24`, `has_email`, `has_wish` (boolean) | GTM → GA4 + YM goal `express_analysis_start` |
| `express_analysis_complete` | Успешно получены сценарии от бэкенда | `scenarios_count`, `visual_mode` (`oscilloscope` \| `topology`) | GTM → GA4 + YM goal `express_analysis_complete` |
| `express_analysis_to_form` | Клик «Отправить подбор и получить расширенный аудит» | `scenarios_count` | GTM → GA4 + YM goal `express_analysis_to_form` |
| `lead_form_submit` | Событие `b24:form:send:success` от виджета Битрикс24 | `source` (`express_analysis` \| `direct_form`) | **Главная конверсия:** GA4 `generate_lead`, Meta Pixel `Lead`, YM goal `lead_form_submit` |
| `contact_click` | Клик по телефону, Telegram или WhatsApp | `channel` (`phone` \| `telegram` \| `whatsapp`), `location` (`header` \| `header_mobile` \| `contacts` \| `footer` \| `lead_form`) | GA4 `contact_click`, Meta Pixel `Contact`, YM goal `contact_click` + конкретные цели по каналам при желании |
| `cookie_consent_updated` | Пользователь нажал «Принять», «Отклонить» или сохранил настройки | `analytics` (bool), `marketing` (bool), `action` (`accept_all` \| `reject_all` \| `custom`) | Служебный сигнал в GTM |

### 5.3. Дедупликация между GTM и прямыми ID
- Если задан **только `VITE_GTM_ID`**, все события уходят в `window.dataLayer`, откуда GTM сам вызывает теги GA4, Метрики и Meta Pixel.
- Если в `.env` дополнительно указаны прямые `VITE_YM_ID` или `VITE_FB_PIXEL_ID` (минуя GTM), `analytics.js` вызывает `window.ym(ymId, 'reachGoal', eventName, params)` и `window.fbq('track', fbEvent, ...)` напрямую. В инструкции по настройке GTM отдельно фиксируется правило: при прямом указании `VITE_YM_ID`/`VITE_FB_PIXEL_ID` не дублировать одноимённый тег внутри GTM.

---

## 6. Модуль 4: Минималистичный Cookie Consent (Закон РБ № 99-З)

### 6.1. Компонент `src/components/CookieConsent.jsx`
- **Позиционирование и габариты:**
  - `fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] sm:w-[360px]` — компактная белая карточка (`bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl shadow-slate-900/10 p-4`).
  - Не блокирует фон (без оверлея), не закрывает Hero, кнопки или форму заявки.
- **UI-структура (соответствует НЦЗПД РБ и Light Business стилю):**
  1. Короткий заголовок + 1–2 предложения текста простым языком:
     *«Мы используем файлы cookie: технические - для работы сайта, аналитические и рекламные - только с вашего согласия (Закон РБ № 99-З).»*
  2. Ссылка-триггер: `Политика обработки данных и cookie` (открывает `PrivacyPolicyModal`).
  3. **Равнозначные кнопки действий** (одинаковый визуальный вес/размер шрифта):
     - Кнопка **«Принять»** (`bg-sky-600 text-white hover:bg-sky-700`)
     - Кнопка **«Отклонить»** (`bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200`)
  4. Текстовая кнопка-переключатель **«Настроить»** — плавно раскрывает внутри той же мини-карточки 3 чекбокса:
     - *Технические cookie* (всегда включены, заблокирован для снятия)
     - *Аналитика (Google Analytics, Яндекс.Метрика)*
     - *Рекламные трекеры (Meta Pixel, персонализация)*
     и кнопку **«Сохранить выбор»**.
- **Сохранение выбора:** `localStorage` ключ `sftg_cookie_consent_v1` с объектом `{ version: 1, analytics: boolean, marketing: boolean, updatedAt: ISOString }`.

### 6.2. Компонент `src/components/PrivacyPolicyModal.jsx`
- Аккуратное модальное окно в стиле сайта с полной «Политикой в отношении обработки персональных данных и файлов cookie» для **ООО «Инновационный Софт»**:
  - Оператор, адрес (г. Минск, пр-т Дзержинского, 57, БЦ Omega Tower), контакты (`+375 (29) 124-5555`).
  - Цели обработки, перечень категорий cookie (технические, аналитические, рекламные), сроки хранения (сеансовые и до 12–24 месяцев), трансграничная передача данных при использовании Google/Яндекс/Meta (строго при наличии согласия).
  - Права субъекта ПД (отзыв согласия через «Настройки cookie» в футере, управление в браузере Chrome / Safari / Firefox / Яндекс.Браузер).
- В [`Footer.jsx`](../../../src/components/Footer.jsx) рядом со статусом 99-З добавляются ссылки-кнопки:
  - `Политика обработки данных и cookie` (открывает модалку)
  - `Настройки cookie` (повторно открывает панель выбора согласия)

---

## 7. Шпаргалка по настройке рекламных кабинетов (для Такта 3 / после внедрения)

В рамках реализации в `docs/tasks/029_seo_analytics_and_ads/` (или отдельным разделом инструкции) фиксируется чёткая схема подключения кабинетов:
1. **GTM:** Какие Custom Event триггеры создать (`lead_form_submit`, `express_analysis_start`, `express_analysis_complete`, `express_analysis_to_form`, `contact_click`) и как привязать Built-in Consent Checks.
2. **GA4:** Импорт события `lead_form_submit` как ключевого события (Conversion) и связь с Google Ads.
3. **Яндекс.Метрика:** Заведение JavaScript-событий (Целей) с точными идентификаторами + включение Вебвизора 2.0 + связь с Яндекс Директ.
4. **Meta Events Manager:** Сопоставление стандартных событий `Lead` и `Contact` для кампаний на конверсии.
5. **Поиск:** Добавление сайта `https://softgreat.by/` в Google Search Console и Яндекс.Вебмастер + отправка `sitemap.xml`.
   - **Для Domain-ресурса `softgreat.by` в Google Search Console (через DNS на hoster.by):**
     - В панели DNS на `hoster.by` для домена `softgreat.by` добавляется запись:
       - Тип: `TXT`
       - Имя (субдомен): `@` (или пусто — для корневого домена `softgreat.by`)
       - Значение: `google-site-verification=<актуальный токен именно для softgreat.by>`
       - TTL: `3600`
     - **Важно проверить перед добавлением:** в диалоге от 2026-11-11 в ссылке был указан `sc-domain:stethem.apps.aipush.dev` и токен `KFhzyC0vHlhfIr-N_dUz2ZLeOk3d-ckM91p1qbYJblU` — перед записью в DNS на hoster.by убедиться, что в левом верхнем селекторе Search Console выбран именно ресурс `softgreat.by` и скопирован токен для `softgreat.by`.
