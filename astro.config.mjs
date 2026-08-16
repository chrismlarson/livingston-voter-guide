// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // The one place the canonical origin is defined. Everything else reads
  // `Astro.site`. See CLAUDE.md §10 / §16 for the domain decision.
  site: 'https://livingstonvoterguide.org',

  // Sitemap + canonical URLs are load-bearing for §11 (crawlability).
  integrations: [sitemap()],

  // Directory-style URLs keep /races/44th-circuit-court-judge/ stable and clean.
  build: { format: 'directory' },

  // §11: fast loads rank. Astro ships zero JS by default; keep it that way unless
  // a page genuinely needs interactivity.
  prefetch: true,
});
