const StyleDictionary = require('style-dictionary');
const { registerTheemo, makeConstrainedFilter } = require('@theemo/style-dictionary');
const { isConstrainedValue } = require('@theemo/tokens');

registerTheemo(StyleDictionary);


module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    base: {
      transformGroup: 'theemo',
      buildPath: 'dist/',
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
      transformGroup: 'theemo',
      buildPath: 'dist/',
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
      transformGroup: 'theemo',
      buildPath: 'dist/',
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