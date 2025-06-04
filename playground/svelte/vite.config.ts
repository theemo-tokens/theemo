import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { theemo } from '@theemo/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		theemo({
      defaultTheme: 'ocean'
    })
	]
});
