/** Configuración global SEO — dominio y assets configurables vía .env */
const viteEnv =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : ({} as ImportMetaEnv);

export const SITE_URL =
  viteEnv.VITE_SITE_URL?.trim() || 'http://localhost:3001';

export const SITE_NAME = 'Redes Comerciales.Sales';

export const ECOSYSTEM_URL =
  viteEnv.VITE_WEB_URL?.trim() || 'http://localhost:3000';

export const OG_IMAGE =
  viteEnv.VITE_OG_IMAGE_URL?.trim() || `${SITE_URL}/img/logo.svg`;

export const OG_IMAGE_ALT =
  'Redes Comerciales.Sales — herramientas comerciales con IA para equipos B2B';

export const OG_IMAGE_WIDTH = '1200';
export const OG_IMAGE_HEIGHT = '630';

export const THEME_COLOR = '#25D366';

export const SUPPORTED_LOCALES = ['es', 'en', 'ca'] as const;

export const OG_LOCALE: Record<string, string> = {
  es: 'es_ES',
  en: 'en_GB',
  ca: 'ca_ES',
};
