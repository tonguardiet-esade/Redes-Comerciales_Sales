import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seoPublicPlugin } from './plugins/seoPublicPlugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const geminiApiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  const siteUrl = env.VITE_SITE_URL?.trim() || 'http://localhost:3001';
  return {
    server: {
      port: 3001,
      strictPort: true,
      host: '0.0.0.0',
    },
    preview: {
      port: 3001,
      strictPort: true,
      host: '0.0.0.0',
    },
    plugins: [react(), tailwindcss(), seoPublicPlugin(siteUrl)],
    define: {
      'process.env.API_KEY': JSON.stringify(geminiApiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-gsap': ['gsap', '@gsap/react'],
            'vendor-motion': ['motion/react'],
            'vendor-three': ['three'],
          },
        },
      },
    },
  };
});
