import { defineConfig } from 'vite';

// Vite is used purely as a dev server with HMR.
// The actual build pipeline is Pug → HTML and SCSS → CSS, run by npm scripts.
// HTML pages link `css/theme.css` directly; the sass --watch process keeps
// that file in sync with `src/scss/`, and Vite picks up the change for HMR.
export default defineConfig({
  appType: 'mpa',
  server: {
    port: 3000,
    open: '/index.html',
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**']
    }
  }
});
