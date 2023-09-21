const StyleDictionary = require('style-dictionary');
const { registerTheemo, makeConstrainedFilter } = require('@theemo/style-dictionary');
const { isConstrainedValue, matchesConstrainedValue } = require('@theemo/tokens');

registerTheemo(StyleDictionary);

const platform = {
  transforms: [
    'theemo/attributes',
    'theemo/value',
    'theemo/transform',
    'name/path/kebab',
    'typography/css',
    'time/seconds',
    'color/css'
  ],
  buildPath: 'dist/'
};

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    base: {
      ...platform,
      files: [
        {
          format: 'css/variables',
          destination: 'base.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          filter: (token) => {
            return !isConstrainedValue(token.value);
          }
        }
      ]
    },
    dark: {
      ...platform,
      constraints: {
        features: {
          'color-scheme': 'dark'
        }
      },
      files: [
        {
          format: 'css/variables',
          destination: 'dark.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          filter: makeConstrainedFilter({
            features: {
              'color-scheme': 'dark'
            }
          })
        }
      ]
    },
    light: {
      ...platform,
      constraints: {
        features: {
          'color-scheme': 'light'
        }
      },
      files: [
        {
          format: 'css/variables',
          destination: 'light.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          filter: makeConstrainedFilter({
            features: {
              'color-scheme': 'light'
            }
          })
        }
      ]
    }
  }
};