import { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { getPageSeo } from '../lib/i18n/seo';
import type { Language } from '../types';
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
} from '../lib/seo/site';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]:not([hreflang])`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageSeo() {
  const { lang } = useSettings();
  const contentLang = (['es', 'en', 'ca'].includes(lang) ? lang : 'es') as Language;

  useEffect(() => {
    const seo = getPageSeo(contentLang, 'home');
    const canonicalUrl = `${SITE_URL}${seo.path}`;
    const { title, description } = seo;

    document.documentElement.lang = contentLang;
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:image', OG_IMAGE);
    upsertMeta('property', 'og:image:width', OG_IMAGE_WIDTH);
    upsertMeta('property', 'og:image:height', OG_IMAGE_HEIGHT);
    upsertMeta('property', 'og:image:alt', OG_IMAGE_ALT);
    upsertMeta('property', 'og:locale', OG_LOCALE[contentLang] ?? 'es_ES');
    upsertMeta('name', 'theme-color', THEME_COLOR);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', OG_IMAGE);
    upsertMeta('name', 'robots', 'index, follow');
    upsertLink('canonical', canonicalUrl);
  }, [contentLang]);
}
