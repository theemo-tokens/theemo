// const modes = ['light', 'dark'];

const StyleDictionary = require('style-dictionary');
const { registerTheemo } = require('@theemo/style-dictionary/extend');

registerTheemo(StyleDictionary);

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    web: {
      transforms: [
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css'
      ],
      buildPath: 'dist/',
      files: [
        {
          format: 'css/variables',
          destination: 'base.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          // filter(token) {
          //   return !token.colorScheme && token.transient !== true;
          // }
        }
      ]
    }
  }
};