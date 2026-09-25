/*!
 * Wa-Nis — Vite Config (Optional Dev Tooling)
 * Only used if you run `npm run dev` / `npm run build`
 * The project works FINE without any build step — just open index.html via a local server.
 */

import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  resolve: {
    alias: {
      '@': '/'
    }
  }
});