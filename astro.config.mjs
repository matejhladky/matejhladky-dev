import { defineConfig } from 'astro/config';

export default defineConfig({
  // Once you have a domain, set it here (used for canonical URLs, sitemaps, …):
  // site: 'https://matejhladky.dev',

  // Old and Czech URLs all land on the one library page, on the right tab.
  redirects: {
    '/knihovna': '/library',
    '/books': '/library#knihy',
    '/knihy': '/library#knihy',
    '/lps': '/library#desky',
    '/desky': '/library#desky',
  },
});
