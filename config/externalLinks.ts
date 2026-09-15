/** URLs del ecosistema Redes Comerciales (configurables vía .env.local / Hostinger) */
const trimEnv = (value: string | undefined) => value?.trim() || '';

export const EXTERNAL_LINKS = {
  /** RedesComerciales_Web — desarrollo: http://localhost:3000 */
  web:
    trimEnv(import.meta.env.VITE_WEB_URL) ||
    'http://localhost:3000',
  /** RedesComerciales_Plataforma — desarrollo: http://localhost:5174 */
  plataforma:
    trimEnv(import.meta.env.VITE_PLATAFORMA_URL) ||
    trimEnv(import.meta.env.VITE_PLATFORM_URL) ||
    'http://localhost:5174',
} as const;

export const webLegalUrl = (path: string) => {
  const base = EXTERNAL_LINKS.web.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}/#${normalized}`;
};
