import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://toiletrepairct.us',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
