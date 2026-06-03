import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/qtl-homepage-animation-test/',
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});
