/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB_URL?: string;
  readonly VITE_PLATAFORMA_URL?: string;
  readonly VITE_PLATFORM_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
