/**
 * Модуль интеграции и префилла CRM-формы Битрикс24.
 *
 * Точные идентификаторы полей из конфигурации формы #43 (royalcrm.bitrix24.by):
 * - CONTACT_NAME: Ваше имя (placeholder: Алексей)
 * - DEAL_UF_CRM_1793867685248: Телефон или Telegram (+375 ... или @username)
 * - DEAL_UF_CRM_1793867671481: Сайт компании или название
 * - DEAL_UF_CRM_1793867737921: Ваша задача или комментарий (необязательно, textarea)
 */

let formInstance = null;
let pendingPrefill = null;
const listeners = new Set();

// Слушаем инициализацию формы Битрикс24
if (typeof window !== 'undefined') {
  const handleB24Init = (event) => {
    formInstance = event.detail?.object || null;
    window.__b24FormInstance = formInstance;

    // Если данные уже подготовлены — применяем немедленно
    if (pendingPrefill) {
      applyValues(pendingPrefill);
    }
  };

  window.addEventListener('b24:form:init', handleB24Init);
  window.addEventListener('b24:form:show', () => {
    if (pendingPrefill) {
      applyValues(pendingPrefill);
    }
  });
}

/**
 * Устанавливает значение в нативный DOM-элемент с триггером событий Vue (v-model).
 */
function setNativeInputValue(element, value) {
  if (!element) return;
  try {
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set;

    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else if (valueSetter) {
      valueSetter.call(element, value);
    } else {
      element.value = value;
    }

    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  } catch (e) {
    element.value = value;
  }
}

/**
 * Находит инпуты в DOM формы Битрикс24 и заполняет их.
 */
function applyToDom(companyValue, commentValue) {
  if (typeof document === 'undefined') return;

  const tryFill = () => {
    let filledCount = 0;

    // Защита: очищаем поле телефона/telegram, если туда случайно попало значение компании
    const phoneInput =
      document.querySelector('input[name*="1793867685248"]') ||
      document.querySelector('input[placeholder*="+375"]') ||
      document.querySelectorAll('.b24-form-wrapper input[type="text"]')[1];
    if (phoneInput && companyValue && phoneInput.value === companyValue) {
      setNativeInputValue(phoneInput, '');
    }

    // 1. Поле сайта компании (input DEAL_UF_CRM_1793867671481) — индекс 2 среди инпутов
    const companyInput =
      document.querySelector('input[name*="1793867671481"]') ||
      document.querySelector('input[name*="CRM_1793867671481"]') ||
      document.querySelector('.b24-form-wrapper input[placeholder*="kompaniya.by"]') ||
      document.querySelectorAll('.b24-form-wrapper input[type="text"]')[2];

    if (companyInput && companyValue && companyInput.value !== companyValue) {
      setNativeInputValue(companyInput, companyValue);
      filledCount++;
    }

    // 2. Поле комментария / задачи (единственная textarea в форме)
    const commentInput =
      document.querySelector('textarea[name*="1793867737921"]') ||
      document.querySelector('.b24-form-wrapper textarea') ||
      document.querySelector('textarea.b24-form-control');

    if (commentInput && commentValue && commentInput.value !== commentValue) {
      setNativeInputValue(commentInput, commentValue);
      filledCount++;
    }

    return filledCount > 0;
  };

  // Выполняем сразу и несколько раз с небольшими интервалами, пока рендерится Vue
  tryFill();
  setTimeout(tryFill, 80);
  setTimeout(tryFill, 250);
  setTimeout(tryFill, 600);
  setTimeout(tryFill, 1200);
}

/**
 * Применяет значения через API формы и напрямую в DOM.
 */
function applyValues(data) {
  if (!data) return false;

  const companyValue = data.company || '';
  const commentValue = data.comment || '';

  // 1. Через официальный API Битрикс24 формы (строго по точным ID полей!)
  if (formInstance && typeof formInstance.setValues === 'function') {
    try {
      formInstance.setValues({
        // Точные ID полей формы #43
        DEAL_UF_CRM_1793867671481: companyValue, // Только «Сайт компании или название»
        DEAL_UF_CRM_1793867737921: commentValue, // Только «Ваша задача или комментарий»

        // Безопасные текстовые алиасы (БЕЗ 'string', иначе Битрикс заполнит телефон!)
        company: companyValue,
        COMPANY_TITLE: companyValue,
        comment: commentValue,
        comments: commentValue,
      });

      // Передаем скрытые свойства в инстанс формы (для трекинга источника заявки)
      if (typeof formInstance.setProperty === 'function') {
        try {
          formInstance.setProperty('express_analysis', 'Y');
          formInstance.setProperty('express_company', companyValue);
        } catch {
          // Игнорируем если setProperty не настроен
        }
      }
    } catch (err) {
      console.warn('Bitrix24 form.setValues error:', err);
    }
  }

  // 2. Прямое заполнение DOM-полей для гарантии визуального отображения
  applyToDom(companyValue, commentValue);

  return true;
}

/**
 * Передает данные компании и сгенерированных сценариев в форму Битрикс24.
 */
export function applyB24Prefill(data) {
  pendingPrefill = data;
  const applied = applyValues(data);

  // Уведомляем подписчиков (LeadForm.jsx) для показа информационного блока
  listeners.forEach((callback) => callback(data));

  return applied;
}

/**
 * Возвращает текущие отложенные данные префилла (если были созданы).
 */
export function getPendingPrefill() {
  return pendingPrefill;
}

/**
 * Подписка на событие применения префилла в форме.
 */
export function onB24PrefillApplied(callback) {
  listeners.add(callback);
  if (pendingPrefill) {
    callback(pendingPrefill);
  }
  return () => listeners.delete(callback);
}
