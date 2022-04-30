import esbuild from 'rollup-plugin-esbuild';
import jsonPlugin from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import builtins from 'builtin-modules';
import pkg from './package.json';

const external = [
  ...builtins,
  ...Object.keys(pkg.dependencies || {})
];

const esbuildPlugin = (options = {}) => {
  return esbuild({
    // watch: process.argv.includes('--watch'),
    minify: false,
    // bundle: true,
    // write: true,
    target: 'es2017',
    sourcemap: true,
    // platform: 'node',
    ...options
  })
};

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/theemo.js',
      format: 'es',
      exports: 'auto'
    },
    external,
    plugins: [jsonPlugin(), nodeResolve(), esbuildPlugin()],
    watch: {
      include: 'src/**'
    }
  },
  // {
  //   input: 'src/index.ts',
  //   output: {
  //     file: 'dist/theemo.min.js',
  //     format: 'es',
  //     exports: 'auto'
  //   },
  //   external,
  //   plugins: [jsonPlugin(), nodeResolve(), esbuildPlugin({minify: true})],
  //   watch: {
  //     include: 'src/**'
  //   }
  // }
];