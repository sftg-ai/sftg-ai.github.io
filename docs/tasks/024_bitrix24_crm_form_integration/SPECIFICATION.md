# Архитектурная спецификация задачи 024

## 1. Компонент LeadForm.jsx
Обновление компонента [LeadForm.jsx](file:///Users/alex/Projects/commercial/sftg/sftg-site/src/components/LeadForm.jsx):
- Создание хука / механизма монтирования официального скрипта Битрикс24 в DOM.
- Контейнер формы:
  ```html
  <div id="b24-form-container" className="w-full min-h-[420px]">
    <script
      data-b24-form="inline/43/jps6a7"
      data-b24-form-telemetry-sign="v1:43:site.423e8e2979092b628b864e7b9f98f9f489e3d6b866abe3289cfba0e03246c715"
      data-skip-moving="true"
    />
  </div>
  ```
- Для надежной инициализации в React:
  Динамическое внедрение скрипта:
  ```javascript
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://cdn-ru.bitrix24.by/b33075640/crm/form/loader_43.js?${(Date.now() / 180000) | 0}`;
  script.setAttribute('data-b24-form', 'inline/43/jps6a7');
  script.setAttribute('data-b24-form-telemetry-sign', 'v1:43:site.423e8e2979092b628b864e7b9f98f9f489e3d6b866abe3289cfba0e03246c715');
  script.setAttribute('data-skip-moving', 'true');
  ```
  И монтирование в специальный ref-контейнер с индикатором загрузки (анимированные пульсирующие полоски в палитре slate-100 / sky-50), который плавно скрывается после рендера фрейма Битрикс24.

## 2. Безопасность и fallback
- Если скрипт блокируется корпоративными AdBlock / firewall клиента:
  Отображать аккуратную строчку fallback:
  *«Если форма не загружается, напишите нам напрямую в [Telegram](https://t.me/yurasvidersky) или [откройте форму в новом окне](https://b24-xxbdwe.b24site.online/crm_form_gg1ic/).»*

## 3. Критерии приемки
- Форма корректно отображается в блоке `#lead-form`.
- Поля формы работают и отправляют лиды в CRM Битрикс24.
- Нет предупреждений в консоли.
- Сборка `npm run build` завершается с кодом 0.
