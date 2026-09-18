import type { Language } from '../../../types';

export type SeoRouteKey = 'home';

export interface PageSeoMeta {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

export type SeoContentByLang = Record<Language, Record<SeoRouteKey, PageSeoMeta>>;
