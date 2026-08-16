// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Troque pelo domínio final quando publicar (usado no sitemap e nas meta tags).
export default defineConfig({
  site: 'https://pequenafornalha.vercel.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
