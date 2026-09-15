export const COOKIE_CONSENT_KEY = 'gw_cookie_consent';
export const COOKIE_CONSENT_OPEN_EVENT = 'gw:cookie-consent:open';

export function openCookieConsent() {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
}
