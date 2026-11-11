# Руководство по настройке аналитики, рекламы и вебмастеров (Task 029)

Пошаговая инструкция по подключению Google Tag Manager, Google Analytics 4, Яндекс.Метрики, Meta Pixel, Google Search Console и Яндекс.Вебмастера для сайта `softgreat.by` с соблюдением Закона РБ № 99-З «О защите персональных данных».

---

## 1. Переменные окружения и правило дедупликации

Все идентификаторы задаются через переменные окружения Vite в `.env.production` (или в Secrets / Variables GitHub Actions при автодеплое).

| Переменная | Назначение | Пример формата |
|---|---|---|
| `VITE_GTM_ID` | Основной контейнер Google Tag Manager | `GTM-ABC1234` |
| `VITE_GA4_ID` | Идентификатор потока GA4 (справочно или для прямой проверки) | `G-ABC1234567` |
| `VITE_YM_ID` | Прямой счётчик Яндекс.Метрики (загружается только после согласия `analytics`) | `98765432` |
| `VITE_FB_PIXEL_ID` | Прямой Meta Pixel (загружается только после согласия `marketing`) | `123456789012345` |
| `VITE_GSC_VERIFICATION` | Токен мета-тега Google Search Console | `KFhzy...` |
| `VITE_YANDEX_VERIFICATION` | Токен мета-тега Яндекс.Вебмастер | `1a2b3c4d5e6f` |
| `VITE_REQUIRE_COOKIE_CONSENT` | Строгий режим согласия по Закону РБ № 99-З (`true` по умолчанию) | `true` |

### Важное правило дедупликации (GTM против прямых ID)
В проекте реализованы два совместимых способа подключения Яндекс.Метрики и Meta Pixel:
1. **Вариант A (рекомендуемый - всё через GTM):** в `.env.production` заполняется только `VITE_GTM_ID`, а `VITE_YM_ID` и `VITE_FB_PIXEL_ID` остаются пустыми. Все теги (GA4, Яндекс.Метрика, Meta Pixel) управляются внутри контейнера GTM с проверкой Consent Mode v2.
2. **Вариант B (прямые счётчики в `.env`):** если заданы `VITE_YM_ID` или `VITE_FB_PIXEL_ID`, модуль `src/utils/analytics.js` сам загружает скрипты строго после согласия пользователя и напрямую вызывает `ym(..., 'reachGoal', ...)` и `fbq('track', ...)`. **В этом случае не добавляйте одноимённый тег внутрь GTM**, иначе конверсии будут засчитываться дважды.

---

## 2. Карта событий `window.dataLayer`

Все события передаются в `window.dataLayer` без персональных данных (email, телефон, имя, компания и тексты комментариев отфильтровываются автоматически).

| Событие `event` | Момент срабатывания | Параметры |
|---|---|---|
| `express_analysis_start` | Нажатие «Провести экспресс-анализ» | `has_1c`, `has_b24`, `has_email`, `has_wish` (boolean) |
| `express_analysis_complete` | Получение сценариев от сервиса анализа | `scenarios_count` (number), `visual_mode` (`oscilloscope` \| `topology`) |
| `express_analysis_to_form` | Переход к расширенному аудиту из результатов | `scenarios_count` (number) |
| `lead_form_submit` | Успешная отправка формы Битрикс24 (`b24:form:send:success`) | `source` (`express_analysis` \| `direct_form`) |
| `contact_click` | Клик по телефону, Telegram или WhatsApp | `channel` (`phone` \| `telegram` \| `whatsapp`), `location` (`header` \| `header_mobile` \| `contacts` \| `footer` \| `lead_form`) |
| `cookie_consent_updated` | Нажатие «Принять», «Отклонить» или «Сохранить выбор» | `analytics` (boolean), `marketing` (boolean), `action` (`accept_all` \| `reject_all` \| `custom`) |

---

## 3. Настройка Google Tag Manager (GTM)

### Шаг 1. Включите Google Consent Mode v2 (Consent Overview)
1. В GTM перейдите в **Admin -> Container Settings** (Администрирование -> Настройки контейнера).
2. Включите галочку **Enable consent overview** (Включить обзор настроек согласия) и сохраните.
3. Примечание: модуль `src/utils/analytics.js` при старте автоматически вызывает `gtag('consent', 'default', ...)` со статусом `denied` для `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` (и `granted` для `functionality_storage`, `security_storage`). Когда пользователь нажимает «Принять» или сохраняет выбор, вызывается `gtag('consent', 'update', ...)`.

### Шаг 2. Создайте переменные уровня данных (Data Layer Variables)
В разделе **Variables -> User-Defined Variables -> New -> Data Layer Variable** создайте переменные (Version 2):
- `dlv - source` -> Data Layer Variable Name: `source`
- `dlv - channel` -> Data Layer Variable Name: `channel`
- `dlv - location` -> Data Layer Variable Name: `location`
- `dlv - scenarios_count` -> Data Layer Variable Name: `scenarios_count`
- `dlv - visual_mode` -> Data Layer Variable Name: `visual_mode`

### Шаг 3. Создайте триггеры Custom Event
В разделе **Triggers -> New -> Custom Event** создайте 5 основных триггеров (поле **Event name** должно совпадать символ в символ):
1. `CE - express_analysis_start` -> Event name: `express_analysis_start`
2. `CE - express_analysis_complete` -> Event name: `express_analysis_complete`
3. `CE - express_analysis_to_form` -> Event name: `express_analysis_to_form`
4. `CE - lead_form_submit` -> Event name: `lead_form_submit`
5. `CE - contact_click` -> Event name: `contact_click`

Дополнительно для отложенных тегов можно создать триггер обновления согласия:
6. `CE - cookie_consent_updated` -> Event name: `cookie_consent_updated`

### Шаг 4. Привяжите встроенные проверки согласия (Built-in Consent Checks)
В настройках каждого тега раскройте **Advanced Settings -> Consent Settings**:
- Для тегов **GA4** и **Яндекс.Метрики**: выберите **Require additional consent for tag to fire** -> добавьте `analytics_storage`.
- Для тегов **Google Ads** и **Meta Pixel**: выберите **Require additional consent for tag to fire** -> добавьте `ad_storage`, `ad_user_data`, `ad_personalization`.

---

## 4. Настройка Google Analytics 4 (GA4) и Google Ads

### Шаг 1. Базовый тег GA4 в GTM
1. Создайте тег типа **Google Tag**.
2. В поле **Tag ID** вставьте ваш идентификатор `G-...`.
3. Триггер: **Initialization - All Pages**.

### Шаг 2. Теги событий GA4 в GTM
Создайте теги типа **Google Analytics: GA4 Event** с привязкой к созданному Google Tag:
1. **Главная конверсия заявки (`generate_lead`)**:
   - Event Name: `generate_lead` (рекомендуемое стандартное имя GA4) или `lead_form_submit`.
   - Event Parameters: `source` = `{{dlv - source}}`.
   - Trigger: `CE - lead_form_submit`.
2. **Клик по контактам (`contact_click`)**:
   - Event Name: `contact_click`.
   - Event Parameters: `channel` = `{{dlv - channel}}`, `location` = `{{dlv - location}}`.
   - Trigger: `CE - contact_click`.
3. **События экспресс-анализа** (`express_analysis_start`, `express_analysis_complete`, `express_analysis_to_form`):
   - Создайте одноимённые теги GA4 Event и привяжите к триггерам `CE - express_analysis_*`.

### Шаг 3. Конверсии (Key Events) и связь с Google Ads
1. В интерфейсе **GA4 -> Admin -> Data display -> Events** дождитесь появления события `generate_lead` (или добавьте его вручную через **Create event** / **Key events**).
2. Переключите тумблер **Mark as key event** (Отметить как ключевое событие) для `generate_lead` (и при необходимости для `contact_click`).
3. Свяжите GA4 с Google Ads: **GA4 -> Admin -> Product links -> Google Ads Links**.
4. В **Google Ads -> Goals -> Conversions -> New conversion action -> Import -> Google Analytics 4 properties** импортируйте ключевое событие `generate_lead` как основную цель кампаний.

---

## 5. Настройка Яндекс.Метрики и Яндекс Директ

### Шаг 1. Подключение счётчика и Вебвизор 2.0
1. Создайте счётчик в [metrika.yandex.ru](https://metrika.yandex.ru) для домена `softgreat.by`.
2. Включите опции: **Вебвизор, карта скроллинга, аналитика форм** (Вебвизор 2.0), **Карта кликов**, **Точный показатель отказов**.
3. Либо укажите ID счётчика в `VITE_YM_ID` в `.env.production`, либо добавьте код счётчика в GTM как Custom HTML с проверкой согласия `analytics_storage` (см. правило дедупликации в разделе 1).
   - При использовании `VITE_YM_ID` модуль `src/utils/analytics.js` автоматически включает `webvisor: true`, `clickmap: true`, `trackLinks: true`, `accurateTrackBounce: true` строго после согласия пользователя.

### Шаг 2. Заведение целей (JavaScript-события)
В настройках счётчика Метрики перейдите в **Цели -> Добавить цель -> JavaScript-событие** и создайте цели с точными идентификаторами:
1. `lead_form_submit` - Основная цель: отправка заявки в Битрикс24.
2. `contact_click` - Клик по телефону, Telegram или WhatsApp.
3. `express_analysis_start` - Запуск экспресс-анализа бизнеса.
4. `express_analysis_complete` - Получение сценариев от сервиса анализа.
5. `express_analysis_to_form` - Переход из результатов экспресс-анализа к форме аудита.

Примечание: при добавлении цели через GTM отправляйте вызов `ym(COUNTER_ID, 'reachGoal', 'lead_form_submit')` внутри Custom HTML тега на соответствующий триггер `CE - ...`.

### Шаг 3. Проверка и связка с Яндекс Директ
1. Откройте сайт с параметром `https://softgreat.by/?_ym_debug=1`, примите cookie и откройте консоль браузера - убедитесь, что вызовы `Reach goal` уходят без ошибок.
2. В Яндекс Директе подключите номер счётчика в настройках кампании и выберите ключевую цель `lead_form_submit` для оптимизации стратегии.

---

## 6. Настройка Meta Events Manager (Facebook / Instagram Ads)

### Шаг 1. Подключение Pixel
1. Создайте пиксель (Dataset) в **Meta Events Manager**.
2. Либо укажите числовой ID пикселя в `VITE_FB_PIXEL_ID` (код загрузится автоматически только после согласия `marketing`), либо добавьте базовый скрипт в GTM с требованием согласия `ad_storage`.

### Шаг 2. Маппинг стандартных событий
При прямом подключении через `VITE_FB_PIXEL_ID` модуль `src/utils/analytics.js` автоматически сопоставляет события:
- `lead_form_submit` -> стандартное событие Meta **`Lead`**
- `contact_click` -> стандартное событие Meta **`Contact`**

При настройке через GTM создайте два тега Custom HTML:
- На триггер `CE - lead_form_submit` (с согласием `ad_storage`): `fbq('track', 'Lead', { source: {{dlv - source}} });`
- На триггер `CE - contact_click` (с согласием `ad_storage`): `fbq('track', 'Contact', { channel: {{dlv - channel}}, location: {{dlv - location}} });`

### Шаг 3. Проверка событий
Используйте расширение **Meta Pixel Helper** или вкладку **Test Events** в Meta Events Manager, чтобы убедиться, что до клика «Принять» пиксель не загружается, а после согласия корректно отправляются `PageView`, `Lead` и `Contact`.

---

## 7. Подтверждение прав в Google Search Console и Яндекс.Вебмастер

### Google Search Console (`softgreat.by`)
1. В левом верхнем селекторе Search Console выберите (или добавьте) ресурс `softgreat.by`.
2. **Способ 1 (DNS TXT на `hoster.by`, рекомендуется для Domain-ресурса):**
   - В панели управления DNS на `hoster.by` для домена `softgreat.by` добавьте запись:
     - Тип: `TXT`
     - Имя (субдомен): `@` (или оставьте пустым для корневого домена `softgreat.by`)
     - Значение: `google-site-verification=<актуальный_токен_для_softgreat.by>`
     - TTL: `3600`
   - Перед сохранением убедитесь, что токен скопирован именно из ресурса `softgreat.by`, а не из другого домена.
3. **Способ 2 (HTML-файл или мета-тег):**
   - Файл подтверждения размещается в `public/google356b1dc362edd3db.html` (или актуальный файл из кабинета Search Console).
   - Либо токен мета-тега записывается в `VITE_GSC_VERIFICATION`.
4. После подтверждения откройте раздел **Sitemaps** и отправьте `https://softgreat.by/sitemap.xml`.

### Яндекс.Вебмастер (`softgreat.by`)
1. Добавьте сайт `https://softgreat.by` в [webmaster.yandex.ru](https://webmaster.yandex.ru).
2. Подтвердите права через мета-тег `yandex-verification` (переменная `VITE_YANDEX_VERIFICATION`) или DNS TXT-запись на `hoster.by`.
3. В разделе **Индексирование -> Файлы Sitemap** добавьте `https://softgreat.by/sitemap.xml`.
4. В разделе **Информация о сайте -> Региональность** укажите регион **Беларусь / Минск**.

---

## 8. Чек-лист проверки после деплоя

1. Откройте сайт в режиме **Инкогнито**:
   - В правой нижней части экрана отображается компактная карточка cookie (без перекрытия основного экрана и кнопок).
   - Во вкладке Network браузера **нет** запросов к `mc.yandex.ru` и `connect.facebook.net`.
   - В `window.dataLayer` присутствует вызов `['consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ... }]`.
2. Нажмите **«Отклонить»**:
   - Карточка закрывается, в `localStorage` сохраняется ключ `sftg_cookie_consent_v1` со значениями `analytics: false, marketing: false`.
   - Скрипты Метрики и Meta Pixel по-прежнему не загружаются.
3. Откройте настройки cookie из футера и нажмите **«Принять»** (или включите категории в разделе «Настроить»):
   - В `window.dataLayer` появляется `['consent', 'update', ...]` и событие `cookie_consent_updated`.
   - Подгружаются настроенные прямые счётчики и теги GTM.
4. Проверьте через **Google Tag Assistant** отправку формы Битрикс24, клик по Telegram/телефону и запуск экспресс-анализа: каждое событие уходит ровно 1 раз и не содержит email, телефона или имени клиента.
