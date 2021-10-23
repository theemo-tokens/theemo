import path from 'path';
import builtins from 'builtin-modules';
import pkg from './package.json';

const external = [
  ...builtins,
  ...Object.keys(pkg.dependencies || {})
];

export default {
  build: {
    target: 'es2017',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'theemo'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external,
    }
  }
}