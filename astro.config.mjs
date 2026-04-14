import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://trapsesoul.github.io',
  base: '/sutra-sutra',
  output: 'static',
  integrations: [sitemap()]
});
