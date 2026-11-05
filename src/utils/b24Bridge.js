/**
 * Модуль интеграции и префилла CRM-формы Битрикс24.
 * Взаимодействует через официальное событие b24:form:init и метод setValues().
 */

let formInstance = null;
let pendingPrefill = null;
const listeners = new Set();

// Слушаем инициализацию формы Битрикс24
if (typeof window !== 'undefined') {
  window.addEventListener('b24:form:init', (event) => {
    formInstance = event.detail?.object || null;
    window.__b24FormInstance = formInstance;

    // Если есть отложенный префилл — применяем немедленно
    if (pendingPrefill && formInstance) {
      applyValues(pendingPrefill);
    }
  });
}

function applyValues(data) {
  if (!formInstance || typeof formInstance.setValues !== 'function') {
    return false;
  }

  try {
    formInstance.setValues({
      // Варианты ключей для поля «Сайт компании или сфера бизнеса»
      company: data.company,
      COMPANY_TITLE: data.company,
      company_title: data.company,
      
      // Варианты ключей для поля «Ваша задача или комментарий»
      comment: data.comment,
      comments: data.comment,
      COMMENTS: data.comment,
      message: data.comment,
    });
    return true;
  } catch (err) {
    console.warn('Bitrix24 form.setValues error:', err);
    return false;
  }
}

/**
 * Передает данные компании и сгенерированных сценариев в форму Битрикс24.
 */
export function applyB24Prefill(data) {
  pendingPrefill = data;
  const applied = applyValues(data);

  // Уведомляем подписчиков (LeadForm.jsx) для показа плашки подтверждения
  listeners.forEach((callback) => callback(data));

  return applied;
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
