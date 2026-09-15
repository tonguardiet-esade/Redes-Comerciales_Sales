# Redes Comerciales.Sales

Aplicación Sales del ecosistema **Redes Comerciales**: landing con herramientas de IA para ventas y marketing.

## Ecosistema local

| Aplicación | Puerto | URL local |
|------------|--------|-----------|
| **Web** (este proyecto enlaza aquí) | 3000 | `http://localhost:3000` |
| **Sales** (este proyecto) | 3001 | `http://localhost:3001` |
| **Plataforma** | 5174 | `http://localhost:5174` |

## Características

- Diseño Mosaic alineado con RedesComerciales_Web
- Idiomas: español, catalán e inglés
- Modo claro/oscuro, cursor personalizado, fondo 3D
- 6 herramientas AI (Gemini): campañas, asistentes, webinars, automatizaciones, academy, data room
- Auth Supabase (SSO entre herramientas)

## Tech stack

- React 19 + TypeScript + Vite 6
- Tailwind CSS v4
- GSAP, Lenis, Three.js, Motion
- Supabase, Google Gemini

## Instalación

```bash
npm install
cp .env.example .env.local
# Edita .env.local y añade GEMINI_API_KEY (y Supabase si aplica)
npm run dev
```

La app arranca en **http://localhost:3001**.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (puerto 3001) |
| `npm run build` | Build de producción → `dist/` |
| `npm run preview` | Previsualizar build |
| `npm run lint` | Comprobación TypeScript |

## Variables de entorno

Ver `.env.example`. En producción (Hostinger), configura las mismas variables en el panel de despliegue.

## Despliegue

1. `npm run build`
2. Sube el contenido de `dist/` a Hostinger
3. Configura variables de entorno en el panel

No commitear `.env.local` ni claves API.
