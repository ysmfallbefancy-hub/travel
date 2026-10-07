// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: Nach dem Deployment (Cloudflare Pages) durch die echte Domain ersetzen.
export default defineConfig({
  site: 'https://reisen-und-geschichten.pages.dev',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
