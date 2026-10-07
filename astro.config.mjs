// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://reisen-und-geschichten.ysmfall-befancy.workers.dev',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // Das CMS gehört nicht in die Sitemap
      filter: (page) => !page.includes('/admin/'),
    }),
  ],
});
