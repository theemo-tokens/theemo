import { defineConfig } from 'tsdown';
import IsolatedDecl from 'unplugin-isolated-decl/rolldown';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  format: ['cjs', 'esm'],
  plugins: [
    IsolatedDecl({
      sourceMap: true
    })
  ]
});
