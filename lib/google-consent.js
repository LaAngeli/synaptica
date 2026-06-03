/** Cheie localStorage — același string folosit de CookieConsentBanner. */
export const CONSENT_STORAGE_KEY = "synaptica-cookie-consent";

/** ID container Meta Pixel — încărcat doar după consimțământ. */
const META_PIXEL_ID = "816358718204231";

/** Consent Mode v2 — toate tipurile acordate. */
export const CONSENT_GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};

/** Consent Mode v2 — toate tipurile refuzate. */
export const CONSENT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

/** @returns {boolean} true dacă utilizatorul a acceptat deja. */
export function hasStoredConsent() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

/**
 * Trimite update Consent Mode în dataLayer prin gtag.
 * @param {typeof CONSENT_GRANTED | typeof CONSENT_DENIED} state
 */
export function pushConsentUpdate(state) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
  window.gtag = gtag;
  gtag("consent", "update", state);
}

export function grantAllConsent() {
  pushConsentUpdate(CONSENT_GRANTED);
}

export function denyAllConsent() {
  pushConsentUpdate(CONSENT_DENIED);
}

/** Încarcă Meta Pixel o singură dată (doar după consimțământ pentru ad_storage). */
export function loadMetaPixel() {
  if (typeof window === "undefined" || window.fbq) return;
  const f = window;
  const b = document;
  const e = "script";
  const v = "https://connect.facebook.net/en_US/fbevents.js";
  let n;
  let t;
  let s;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = true;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
  f.fbq("init", META_PIXEL_ID);
  f.fbq("track", "PageView");
}

export function loadMetaPixelIfConsented() {
  if (hasStoredConsent()) loadMetaPixel();
}
