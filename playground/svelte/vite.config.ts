import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { theemo } from '@theemo/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    theemo({defaultTheme: 'ocean'})
  ],
})
