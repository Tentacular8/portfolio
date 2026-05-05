// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://Tentacular8.github.io',
  base: '/portfolio',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});