// import * as path from 'path'
// import { buildSync } from 'esbuild'
// import { builtinModules } from 'module'

const path = require('path');
const { buildSync } = require('esbuild');
const { builtinModules } = require('module');
const fs = require('fs');

const pkg = require(path.resolve('package.json'))
const external = [ 
  ...builtinModules, 
  ...Object.keys(pkg.dependencies || {})
]

const build = (outfile, options) => {
  buildSync({
    entryPoints: ['src/index.ts'],
    outfile,
    minify: false,
    bundle: true,
    write: true,
    target: 'es2015',
    sourcemap: true,
    platform: 'node',
    external,
    ...options
  });
}

build('dist/theemo.esm-build.js', {
  format: 'esm'
});

build('dist/theemo.cjs.development.js', {
  format: 'cjs',
});

build('dist/theemo.cjs.production.min.js', {
  format: 'cjs',
  minify: true
});

fs.writeFileSync('dist/index.js', `
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./theemo.cjs.production.min.js')
} else {
  module.exports = require('./theemo.cjs.development.js')
}
`);