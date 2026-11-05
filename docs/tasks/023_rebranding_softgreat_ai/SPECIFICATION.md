# SPECIFICATION: Архитектура ребрендинга в Softgreat AI

## 1. Компонент логотипа и ассеты

### 1.1. Новый компонент `SoftgreatLogo.jsx`
Создается компонент `src/components/SoftgreatLogo.jsx` взамен `SftgLogo.jsx`:
- Отображает фирменный логотип **Softgreat**:
  - Точное векторное или оптимизированное SVG/PNG начертание материнского бренда `Softgreat` (с фирменной буквой `A` и внутренним циановым треугольником `#00C0EF`).
  - Справа от надписи: аккуратный текстовый постфикс `AI` (шрифт sans-serif / Geist / Manrope font-extrabold с акцентным цветом `text-sky-600` или фирменным градиентом бренда).
- Поддерживает варианты темы:
  - `dark` (для светлого фона Header/Footer — черное начертание слова Softgreat);
  - `white` (для темных подложек, если потребуется).

### 1.2. Фавикон вкладки браузера (буква «A»)
- Создается SVG-фавикон `public/favicon.svg` и растровый PNG `public/favicon.png`:
  - Геометрия: фирменная наклонная арка/шеврон буквы **A** с ровным основанием.
  - Внутренний контур: залитый яркий голубой треугольник вершины цвета `#00C0EF`.
- В `App.jsx`: вызов `useAnimatedFavicon()` удаляется или хук отключается, заменяясь на постоянный статический `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`.

## 2. Обновление мета-тегов и SEO

### 2.1. `index.html`
- `<title>Softgreat AI - AI-автоматизация бизнес-процессов в Беларуси</title>`
- `<link rel="canonical" href="https://softgreat.by/" />`
- `<meta property="og:url" content="https://softgreat.by/" />`
- `<meta property="og:title" content="Softgreat AI - AI-автоматизация бизнес-процессов в Беларуси" />`
- `<meta property="og:image" content="https://softgreat.by/og-preview.png" />`
- `<meta name="twitter:title" content="Softgreat AI - AI-автоматизация бизнес-процессов в Беларуси" />`
- `<meta name="twitter:image" content="https://softgreat.by/og-preview.png" />`
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`

### 2.2. `public/robots.txt` & `public/sitemap.xml`
- Привязка sitemap к `https://softgreat.by/sitemap.xml`.
- В `sitemap.xml`: `<loc>https://softgreat.by/</loc>`.

## 3. Обновление текстов в компонентах
1. **`src/components/Header.jsx`:**
   - Импорт `SoftgreatLogo` вместо `SftgLogo`.
2. **`src/components/Footer.jsx`:**
   - Импорт `SoftgreatLogo`.
   - Копирайт: `© 2026 Softgreat AI (ООО «Инновационный Софт»). Минск, Беларусь.`
3. **`src/components/TeamAndExpertise.jsx`:**
   - Заголовок: `Инженерная команда Softgreat`.
   - Текст: `Команда Softgreat (ООО «Инновационный Софт», резидент ПВТ) более 15 лет разрабатывает корпоративные платформы, надежные интеграции и высоконагруженные сервисы.`
   - Фокус: `Инженерный фокус Softgreat AI:`.
4. **`src/components/Hero.jsx`:**
   - Альтернативный текст: `AI-контроль бизнес-процессов Softgreat`.
5. **Интерактивные виджеты:**
   - `TelegramChatPreview.jsx`: `Softgreat Sales Bot (Интеграция с 1С:Склад)`.
   - `LogisticsTrackingPreview.jsx`: `Softgreat Logistics Agent`.
   - `SolutionsCatalog.jsx`: `Softgreat AI Consultant`.

