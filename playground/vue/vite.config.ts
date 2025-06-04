import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { theemo } from '@theemo/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    theemo({
      defaultTheme: 'ocean'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
