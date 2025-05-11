import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { theemo } from '@theemo/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    theemo({
      defaultTheme: 'ocean'
    }),
  ],
})