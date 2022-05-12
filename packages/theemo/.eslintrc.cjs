'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');
const prettierConfig = require('./.prettierrc.cjs');

// accommodates: JS, TS
const config = configs.nodeTS();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['**/*.js', '**/*.ts'],
      rules: {
        'prettier/prettier': ['error', prettierConfig],
      },
    },
  ],
};
