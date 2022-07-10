import { swc } from 'rollup-plugin-swc3';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

/* Post CSS */
import postcss from 'rollup-plugin-postcss';
import postcssParcelCss from 'postcss-parcel-css';

/* Inline HTML */
import htmlBundle from 'rollup-plugin-html-bundle';

export default [
  {
    input: 'src/main.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      name: 'main'
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
          },
          target: 'es2017',
          // see: https://github.com/SukkaW/rollup-plugin-swc/issues/6
          // tried `rollup-plugin-tsconfig-path` ... but didn't help
          // ref: https://github.com/SukkaW/rollup-plugin-swc#usage
          paths: {
            "*": [
              "types/*"
            ]
          }
        },
        sourceMaps: true,
        inlineSourcesContent: true
      }),
    ],
  },
  {
    input: 'ui/ui.ts',
    output: {
      format: 'iife',
      name: 'ui',
      file: 'dist/ui.js'
    },
    plugins: [
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
          },
          target: 'es2018',
          // see: https://github.com/SukkaW/rollup-plugin-swc/issues/6
          // tried `rollup-plugin-tsconfig-path` ... but didn't help
          // ref: https://github.com/SukkaW/rollup-plugin-swc#usage
          paths: {
            "*": [
              "types/*"
            ]
          }
        },
      }),
      nodeResolve(),
      commonjs(),
      postcss({
        extensions: ['.css'],
        plugins: [postcssParcelCss()]
      }),
      htmlBundle({
        template: 'ui/ui.html',
        target: 'dist/ui.html',
        inline: true
      }),
    ]
  }
];