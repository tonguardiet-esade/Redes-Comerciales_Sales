import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

function writeSeoPublicFiles(rootDir: string, siteUrl: string) {
  const publicDir = path.join(rootDir, 'public');
  const normalizedUrl = siteUrl.replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);

  fs.mkdirSync(publicDir, { recursive: true });

  fs.writeFileSync(
    path.join(publicDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${normalizedUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
    'utf-8'
  );

  fs.writeFileSync(
    path.join(publicDir, 'robots.txt'),
    `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${normalizedUrl}/sitemap.xml
`,
    'utf-8'
  );
}

/** Regenera robots.txt y sitemap.xml con VITE_SITE_URL en build/dev. */
export function seoPublicPlugin(siteUrl: string): Plugin {
  let rootDir = process.cwd();

  return {
    name: 'seo-public',
    configResolved(config) {
      rootDir = config.root;
    },
    buildStart() {
      writeSeoPublicFiles(rootDir, siteUrl);
    },
    configureServer() {
      writeSeoPublicFiles(rootDir, siteUrl);
    },
  };
}
