import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import packageJson from './package.json';

const watch = process.argv.includes('--watch') || process.argv.includes('-w');

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: './src/index.ts',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: Object.keys(packageJson.dependencies)
    }
  },
  plugins: [
    dts({
      tsconfigPath: 'tsconfig.declarations.json',
      outDir: './dist',
      rollupTypes: !watch
    })
  ]
  // ssr: true
});
