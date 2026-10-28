import { defineConfig } from 'vite';
import { cpSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const pages = ['index', 'urunler', 'urun-detay', 'katalog', 'hakkimizda', 'iletisim'];

export default defineConfig({
  appType: 'mpa',
  publicDir: 'public',
  assetsInclude: ['**/*.pdf'],
  build: {
    rolldownOptions: {
      input: Object.fromEntries(pages.map(page => [page, resolve(import.meta.dirname, `${page}.html`)])),
    },
  },
  plugins: [{
    name: 'preserve-stylesheet-order',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/<link\b[^>]*href="css\/[^\"]+"[^>]*\/?\s*>/g,
          tag => `<!--preserved-css:${Buffer.from(tag).toString('base64')}-->`);
      },
    },
  }, {
    name: 'restore-stylesheets-and-runtime-assets',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(/<!--preserved-css:([A-Za-z0-9+/=]+)-->/g,
          (_, encoded) => Buffer.from(encoded, 'base64').toString());
      },
    },
    closeBundle() {
      // Keep the existing CSS cascade and runtime image/PDF URLs unchanged.
      // Publish an explicit allowlist, never the repository root or backups.
      for (const directory of ['css', 'images/catalog']) {
        cpSync(resolve(import.meta.dirname, directory), resolve(import.meta.dirname, 'dist', directory), { recursive: true });
      }
      for (const file of ['images/flamingo-transparent.png', 'images/uretim-poster.webp', 'media/flamingo-katalog.pdf']) {
        const destination = resolve(import.meta.dirname, 'dist', file);
        mkdirSync(resolve(destination, '..'), { recursive: true });
        cpSync(resolve(import.meta.dirname, file), destination);
      }
    },
  }],
});
