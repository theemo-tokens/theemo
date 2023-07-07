'use strict';

const { configs } = require('@gossi/config-eslint');

const config = configs.nodeESM();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['**/*.ts'],
      rules: {
        'n/no-missing-import': 0
      }
    }
  ]
};
