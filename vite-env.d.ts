/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB_URL?: string;
  readonly VITE_PLATAFORMA_URL?: string;
  readonly VITE_PLATFORM_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_OG_IMAGE_URL?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_GA4_ID?: string;
  readonly GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
