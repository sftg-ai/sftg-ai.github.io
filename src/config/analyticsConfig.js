/**
 * Конфигурация аналитики и верификации поисковых систем.
 * Читает переменные окружения Vite, очищает пробелы и игнорирует заглушки.
 */

const PLACEHOLDER_PATTERNS = [
  /^GTM-X+$/i,
  /^G-X+$/i,
  /^UA-X+/i,
  /^X+$/i,
  /^0+$/,
  /YOUR_/i,
  /PLACEHOLDER/i,
  /EXAMPLE/i,
];

function sanitizeEnvValue(rawValue) {
  if (typeof rawValue !== 'string') return '';
  const trimmed = rawValue.trim();
  if (!trimmed) return '';

  const isPlaceholder = PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(trimmed));
  if (isPlaceholder) return '';

  return trimmed;
}

function sanitizeNumericId(rawValue) {
  const cleaned = sanitizeEnvValue(rawValue);
  if (!cleaned) return '';
  return /^\d+$/.test(cleaned) ? cleaned : '';
}

function sanitizeGtmId(rawValue) {
  const cleaned = sanitizeEnvValue(rawValue);
  if (!cleaned) return '';
  return /^GTM-[A-Z0-9]+$/i.test(cleaned) ? cleaned.toUpperCase() : '';
}

function sanitizeGa4Id(rawValue) {
  const cleaned = sanitizeEnvValue(rawValue);
  if (!cleaned) return '';
  return /^G-[A-Z0-9]+$/i.test(cleaned) ? cleaned.toUpperCase() : '';
}

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

export const analyticsConfig = Object.freeze({
  gtmId: sanitizeGtmId(env.VITE_GTM_ID),
  ga4Id: sanitizeGa4Id(env.VITE_GA4_ID),
  ymId: sanitizeNumericId(env.VITE_YM_ID),
  fbPixelId: sanitizeNumericId(env.VITE_FB_PIXEL_ID),
  gscVerification: sanitizeEnvValue(env.VITE_GSC_VERIFICATION),
  yandexVerification: sanitizeEnvValue(env.VITE_YANDEX_VERIFICATION),
  requireCookieConsent: String(env.VITE_REQUIRE_COOKIE_CONSENT ?? 'true').trim().toLowerCase() !== 'false',
});

export default analyticsConfig;
