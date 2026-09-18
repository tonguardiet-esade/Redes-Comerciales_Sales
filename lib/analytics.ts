declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GTM_ID = import.meta.env.VITE_GTM_ID?.trim();
const GA4_ID = import.meta.env.VITE_GA4_ID?.trim();

let analyticsReady = false;

export function initAnalytics() {
  if (analyticsReady || typeof window === 'undefined') return;
  analyticsReady = true;

  if (GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
    return;
  }

  if (GA4_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { send_page_view: false });
  }
}

export function trackPageView(path: string, title?: string) {
  if (!analyticsReady) return;
  if (window.gtag && GA4_ID) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title ?? document.title,
    });
    return;
  }
  window.dataLayer?.push({
    event: 'page_view',
    page_path: path,
    page_title: title ?? document.title,
  });
}

export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {}
) {
  if (!analyticsReady) return;
  if (window.gtag) {
    window.gtag('event', name, params);
    return;
  }
  window.dataLayer?.push({ event: name, ...params });
}

export const ANALYTICS_EVENTS = {
  ctaClick: 'cta_click',
  formSubmit: 'form_submit',
  formSuccess: 'form_success',
  formError: 'form_error',
} as const;
