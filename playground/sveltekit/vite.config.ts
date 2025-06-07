import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { theemoPlugin } from '@theemo/svelte/kit';

export default defineConfig({
  plugins: [
    sveltekit(),
    theemoPlugin({
      defaultTheme: 'ocean'
    })
  ]
});
