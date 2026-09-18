import type { Language } from '../../../types';
import { caSeo } from './ca';
import { enSeo } from './en';
import { esSeo } from './es';
import type { PageSeoMeta, SeoRouteKey } from './types';

export const seoContentByLang = {
  es: esSeo,
  en: enSeo,
  ca: caSeo,
} satisfies Record<Language, Record<SeoRouteKey, PageSeoMeta>>;

export function getPageSeo(lang: Language, routeKey: SeoRouteKey = 'home'): PageSeoMeta {
  return seoContentByLang[lang]?.[routeKey] ?? seoContentByLang.es[routeKey];
}

export type { PageSeoMeta, SeoRouteKey };
