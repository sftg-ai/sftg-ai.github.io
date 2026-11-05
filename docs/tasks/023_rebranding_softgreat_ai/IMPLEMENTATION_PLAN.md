# IMPLEMENTATION PLAN: Ребрендинг лендинга в Softgreat AI

## План работ

- [x] **Шаг 1:** Подготовить графические ассеты бренда Softgreat:
  - Добавить логотипы Softgreat в `public/images/brand/softgreat-logo-black.png` и `softgreat-logo-white.png`.
  - Отрисовать векторную букву «A» с циановым треугольником для `public/favicon.svg` и сгенерировать `public/favicon.png`.
- [x] **Шаг 2:** Создать компонент `src/components/SoftgreatLogo.jsx`:
  - Официальный логотип `Softgreat` + акцентный постфикс `AI`.
- [x] **Шаг 3:** Отключить динамическое вращение в `src/hooks/useAnimatedFavicon.js` и настроить статический векторный фавикон в `index.html`.
- [x] **Шаг 4:** Обновить `index.html`, `public/robots.txt`, `public/sitemap.xml` на домен `https://softgreat.by/` и бренд `Softgreat AI`.
- [x] **Шаг 5:** Заменить логотип и текстовые упоминания бренда в `Header.jsx` и `Footer.jsx`.
- [x] **Шаг 6:** Заменить текстовые упоминания `SFTG` на `Softgreat` в `TeamAndExpertise.jsx`, `Hero.jsx`, `scenariosData.js` и демо-превью.
- [x] **Шаг 7:** Проверить сборку `npm run build` (код завершения 0).
- [x] **Шаг 8:** Зафиксировать результат в коммите и отправить в ветку `main`.
