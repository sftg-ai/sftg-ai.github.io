import { analyticsConfig } from '../config/analyticsConfig.js';

export const CONSENT_STORAGE_KEY = 'sftg_cookie_consent_v1';

const CONSENT_VERSION = 1;
const DUPLICATE_EVENT_WINDOW_MS = 800;

const PII_KEY_BLOCKLIST = new Set([
  'email',
  'e_mail',
  'mail',
  'phone',
  'tel',
  'telephone',
  'mobile',
  'name',
  'fio',
  'fullname',
  'full_name',
  'firstname',
  'first_name',
  'lastname',
  'last_name',
  'username',
  'user_name',
  'contact',
  'telegram',
  'tg',
  'whatsapp',
  'wa',
  'address',
  'company',
  'company_name',
  'website',
  'site',
  'domain',
  'comment',
  'message',
  'wish',
  'text',
  'password',
  'token',
  'secret',
  'ip',
  'unp',
  'inn',
]);

let isInitialized = false;
let gtmInjected = false;
let ymInjected = false;
let fbInjected = false;
const recentEvents = new Map();

function hasWindow() {
  return typeof window !== 'undefined';
}

function hasDocument() {
  return typeof document !== 'undefined';
}

function hasLocalStorage() {
  return hasWindow() && typeof window.localStorage !== 'undefined';
}

function ensureDataLayer() {
  if (!hasWindow()) return null;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
  return window.dataLayer;
}

function gtag() {
  const dataLayer = ensureDataLayer();
  if (!dataLayer) return;
  dataLayer.push(arguments);
}

function buildConsentFlags(consent) {
  const analyticsGranted = Boolean(consent?.analytics);
  const marketingGranted = Boolean(consent?.marketing);

  return {
    ad_storage: marketingGranted ? 'granted' : 'denied',
    ad_user_data: marketingGranted ? 'granted' : 'denied',
    ad_personalization: marketingGranted ? 'granted' : 'denied',
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  };
}

function injectScriptOnce(id, src, existingSelector) {
  if (!hasDocument()) return false;
  if (document.querySelector(`script[data-sftg-analytics="${id}"]`)) {
    return false;
  }
  if (existingSelector && document.querySelector(existingSelector)) {
    return false;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.setAttribute('data-sftg-analytics', id);

  const target = document.head || document.body;
  if (!target) return false;
  target.appendChild(script);
  return true;
}

function loadGTM(gtmId) {
  if (!gtmId || gtmInjected || !hasWindow() || !hasDocument()) return;

  const dataLayer = ensureDataLayer();
  if (!dataLayer) return;

  const alreadyInDom = Boolean(
    document.querySelector('script[src*="googletagmanager.com/gtm.js"]')
  );
  if (alreadyInDom) {
    gtmInjected = true;
    return;
  }

  dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  const injected = injectScriptOnce(
    'gtm',
    `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`,
    'script[src*="googletagmanager.com/gtm.js"]'
  );
  if (injected) {
    gtmInjected = true;
  }
}

function loadYandexMetrika(ymId, consent) {
  if (!ymId || ymInjected || !hasWindow() || !hasDocument()) return;

  const allowed = !analyticsConfig.requireCookieConsent || Boolean(consent?.analytics);
  if (!allowed) return;

  const numericId = Number(ymId);
  if (!Number.isFinite(numericId) || numericId <= 0) return;

  if (typeof window.ym !== 'function') {
    window.ym = function ymStub() {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = 1 * new Date();
  }

  const injected = injectScriptOnce(
    'ym',
    `https://mc.yandex.ru/metrika/tag.js?id=${numericId}`,
    'script[src*="mc.yandex.ru/metrika/tag.js"]'
  );

  if (injected || typeof window.ym === 'function') {
    ymInjected = true;
    try {
      window.ym(numericId, 'init', {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: 'dataLayer',
        referrer: document.referrer || '',
        url: window.location.href,
        accurateTrackBounce: true,
        trackLinks: true,
      });
    } catch {
      // Ignore counter init errors in restricted environments
    }
  }
}

function loadMetaPixel(fbPixelId, consent) {
  if (!fbPixelId || fbInjected || !hasWindow() || !hasDocument()) return;

  const allowed = !analyticsConfig.requireCookieConsent || Boolean(consent?.marketing);
  if (!allowed) return;

  if (typeof window.fbq !== 'function') {
    const fbqStub = function fbqStub() {
      if (fbqStub.callMethod) {
        fbqStub.callMethod.apply(fbqStub, arguments);
      } else {
        fbqStub.queue.push(arguments);
      }
    };
    if (!window._fbq) window._fbq = fbqStub;
    fbqStub.push = fbqStub;
    fbqStub.loaded = true;
    fbqStub.version = '2.0';
    fbqStub.queue = [];
    window.fbq = fbqStub;
  }

  const injected = injectScriptOnce(
    'fbq',
    'https://connect.facebook.net/en_US/fbevents.js',
    'script[src*="connect.facebook.net/en_US/fbevents.js"]'
  );

  if (injected || typeof window.fbq === 'function') {
    fbInjected = true;
    try {
      window.fbq('init', fbPixelId);
      window.fbq('track', 'PageView');
    } catch {
      // Ignore pixel init errors in restricted environments
    }
  }
}

function looksLikePiiValue(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  // Email pattern
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.includes('@')) {
    return true;
  }
  // Phone-like pattern (7+ digits with separators)
  if (/^\+?[\d\s()-]{7,}$/.test(trimmed)) {
    return true;
  }
  return false;
}

function sanitizeEventParams(params) {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    return {};
  }

  const sanitized = {};
  const entries = Object.entries(params);

  for (const [rawKey, value] of entries) {
    const key = String(rawKey).trim();
    if (!key) continue;

    const normalizedKey = key.toLowerCase();
    if (PII_KEY_BLOCKLIST.has(normalizedKey)) continue;

    if (typeof value === 'boolean' || typeof value === 'number') {
      if (Number.isFinite(value) || typeof value === 'boolean') {
        sanitized[key] = value;
      }
      continue;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed || looksLikePiiValue(trimmed)) continue;
      sanitized[key] = trimmed.slice(0, 120);
    }
  }

  return sanitized;
}

function isDuplicateEvent(eventName, sanitizedParams) {
  const now = Date.now();
  const sortedKeys = Object.keys(sanitizedParams).sort();
  const signatureObj = {};
  for (const key of sortedKeys) {
    signatureObj[key] = sanitizedParams[key];
  }
  const signature = `${eventName}:${JSON.stringify(signatureObj)}`;

  const lastFiredAt = recentEvents.get(signature);
  if (typeof lastFiredAt === 'number' && now - lastFiredAt < DUPLICATE_EVENT_WINDOW_MS) {
    return true;
  }

  recentEvents.set(signature, now);

  if (recentEvents.size > 50) {
    for (const [key, timestamp] of recentEvents.entries()) {
      if (now - timestamp >= DUPLICATE_EVENT_WINDOW_MS) {
        recentEvents.delete(key);
      }
    }
  }

  return false;
}

/**
 * Возвращает сохранённое согласие пользователя на файлы cookie из localStorage.
 * Возвращает null в SSR или если пользователь ещё не сделал выбор.
 */
export function getConsentState() {
  if (!hasLocalStorage()) return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    return {
      version: CONSENT_VERSION,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
    };
  } catch {
    return null;
  }
}

/**
 * Сохраняет выбор пользователя в localStorage и возвращает нормализованный объект согласия.
 */
export function saveConsentState(consent) {
  const normalized = {
    version: CONSENT_VERSION,
    analytics: Boolean(consent?.analytics),
    marketing: Boolean(consent?.marketing),
    updatedAt: new Date().toISOString(),
  };

  if (hasLocalStorage()) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      // Ignore storage quota / private mode errors
    }
  }

  return normalized;
}

/**
 * Инициализирует Google Consent Mode v2 и подключает настроенные трекеры с учётом согласия.
 * Безопасно для SSR и повторных вызовов.
 */
export function initAnalytics() {
  if (!hasWindow()) return null;

  const savedConsent = getConsentState();
  const effectiveConsent = analyticsConfig.requireCookieConsent
    ? savedConsent
    : savedConsent || { version: CONSENT_VERSION, analytics: true, marketing: true, updatedAt: null };

  if (!isInitialized) {
    isInitialized = true;
    ensureDataLayer();

    // Базовое состояние Consent Mode v2 (пропускаем default, если он уже выставлен в <head>)
    if (!window.__sftgConsentDefaultInitialized) {
      if (analyticsConfig.requireCookieConsent) {
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500,
        });

        if (savedConsent) {
          gtag('consent', 'update', buildConsentFlags(savedConsent));
        }
      } else {
        gtag('consent', 'default', {
          ...buildConsentFlags(effectiveConsent),
          wait_for_update: 500,
        });
      }
      window.__sftgConsentDefaultInitialized = true;
    }
  }

  if (analyticsConfig.gtmId) {
    loadGTM(analyticsConfig.gtmId);
  }

  if (analyticsConfig.ymId) {
    loadYandexMetrika(analyticsConfig.ymId, effectiveConsent);
  }

  if (analyticsConfig.fbPixelId) {
    loadMetaPixel(analyticsConfig.fbPixelId, effectiveConsent);
  }

  return effectiveConsent;
}

/**
 * Применяет новый выбор согласия: сохраняет, обновляет Consent Mode v2,
 * при необходимости подгружает прямые трекеры и отправляет сигнал cookie_consent_updated.
 */
export function applyConsent(consent, action = 'custom') {
  const saved = saveConsentState(consent);
  if (!hasWindow()) return saved;

  const dataLayer = ensureDataLayer();
  gtag('consent', 'update', buildConsentFlags(saved));

  if (analyticsConfig.gtmId && !gtmInjected) {
    loadGTM(analyticsConfig.gtmId);
  }

  if (analyticsConfig.ymId && (saved.analytics || !analyticsConfig.requireCookieConsent)) {
    loadYandexMetrika(analyticsConfig.ymId, saved);
  }

  if (analyticsConfig.fbPixelId && (saved.marketing || !analyticsConfig.requireCookieConsent)) {
    loadMetaPixel(analyticsConfig.fbPixelId, saved);
  }

  if (dataLayer) {
    dataLayer.push({
      event: 'cookie_consent_updated',
      analytics: saved.analytics,
      marketing: saved.marketing,
      action: typeof action === 'string' && action ? action : 'custom',
    });
  }

  return saved;
}

/**
 * Единая шина событий: отправляет очищенное от PII событие в window.dataLayer,
 * а также в прямые счётчики Яндекс.Метрики (reachGoal) и Meta Pixel (Lead / Contact) при наличии согласия.
 */
export function trackEvent(eventName, params = {}) {
  if (!hasWindow() || typeof eventName !== 'string') return;
  const cleanEventName = eventName.trim();
  if (!cleanEventName) return;

  const sanitizedParams = sanitizeEventParams(params);

  if (isDuplicateEvent(cleanEventName, sanitizedParams)) {
    return;
  }

  const dataLayer = ensureDataLayer();
  if (dataLayer) {
    dataLayer.push({
      event: cleanEventName,
      sftg_track: true,
      ...sanitizedParams,
    });
  }

  const consent = getConsentState();
  const analyticsAllowed = !analyticsConfig.requireCookieConsent || Boolean(consent?.analytics);
  const marketingAllowed = !analyticsConfig.requireCookieConsent || Boolean(consent?.marketing);

  if (
    cleanEventName !== 'cookie_consent_updated' &&
    analyticsAllowed &&
    analyticsConfig.ymId &&
    typeof window.ym === 'function'
  ) {
    try {
      window.ym(Number(analyticsConfig.ymId), 'reachGoal', cleanEventName, sanitizedParams);
    } catch {
      // Ignore YM tracking errors
    }
  }

  if (marketingAllowed && analyticsConfig.fbPixelId && typeof window.fbq === 'function') {
    try {
      if (cleanEventName === 'lead_form_submit') {
        window.fbq('track', 'Lead', sanitizedParams);
      } else if (cleanEventName === 'contact_click') {
        window.fbq('track', 'Contact', sanitizedParams);
      }
    } catch {
      // Ignore Meta Pixel tracking errors
    }
  }
}
