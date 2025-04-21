import { registerTheemo } from "@theemo/style-dictionary";
import StyleDictionary from 'style-dictionary';

registerTheemo(StyleDictionary);

export default {
  source: ['tokens/**/*.json'],
  preprocessors: ["theemo/token"],
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
          filter: 'theemo/non-constrained-tokens'
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
          filter: 'theemo/constrained-tokens'
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
          filter: 'theemo/constrained-tokens'
        }
      ]
    }
  }
};