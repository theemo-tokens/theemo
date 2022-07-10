import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import watch from 'rollup-plugin-watch';

/* Post CSS */
import postcss from 'rollup-plugin-postcss';
import postcssParcelCss from 'postcss-parcel-css';

/* Inline HTML */
import htmlBundle from 'rollup-plugin-html-bundle';

const development = Boolean(process.env.ROLLUP_WATCH);
const production = !development;

const swcOptions = defineRollupSwcOption({
  minify: production,
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
  sourceMaps: development,
  inlineSourcesContent: development
});

export default [
  {
    input: 'src/main.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      name: 'main',
      sourcemap: development ?? 'inline'
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      swc(swcOptions),
    ],
  },
  {
    input: 'ui/ui.ts',
    output: {
      format: 'iife',
      name: 'ui',
      file: 'dist/ui.js',
      sourcemap: development ?? 'inline'
    },
    plugins: [
      swc(swcOptions),
      nodeResolve(),
      commonjs(),
      postcss({
        extensions: ['.css'],
        plugins: [postcssParcelCss({
          minify: production
        })]
      }),
      htmlBundle({
        template: 'ui/ui.html',
        target: 'dist/ui.html',
        inline: true
      }),
      watch({
        dir: 'ui',
        exclude: '*.ts'
      })
    ]
  }
];