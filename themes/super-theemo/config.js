import { isConstrainedByPlatform, isConstrainedToken, isCSSProperty, isNoCSSProperty, matchesConstraints, registerTheemo } from "@theemo/style-dictionary";
import { matchesConstrainedValue } from "@theemo/tokens";
import StyleDictionary from 'style-dictionary';

registerTheemo(StyleDictionary);

function makeDensityPlatform(density) {
  return {
    transformGroup: 'theemo',
    buildPath: 'dist/',
    constraints: {
      features: {
        'density': density
      }
    },
    options: {
      outputReferences: true,
      showFileHeader: false
    },
    files: [
      {
        format: 'css/variables',
        destination: `density-${density}.css`,
        filter: isConstrainedByPlatform
      }
    ]
  }
}

/** @type import("style-dictionary/types").Config */
const config = {
  source: ['tokens/**/*.json'],
  preprocessors: ["theemo/token"],
  platforms: {
    css: {
      transformGroup: 'theemo',
      buildPath: 'dist/',
      options: {
        outputReferences: true,
        showFileHeader: false,
        useCSSColorTransform: true
      },
      files: [
        {
          format: 'css/properties',
          destination: 'properties.css',
          filter: isCSSProperty
        },
        {
          format: 'css/variables',
          destination: 'vars.css',
          filter: (token) => (
            // when no CSS property
            !isCSSProperty(token) && 
            (
              // and matches color-scheme constraint
              matchesConstraints(token, {
                features: {
                  'color-scheme': 'light',
                  'color-scheme': 'dark'
                }
              }) ||
              // but no other constraint
              !isConstrainedToken(token)
            )
          )
        }
      ]
    },
    // constrained tokens (to combine them later under given selectors)
    'density-comfortable': makeDensityPlatform('comfortable'),
    'density-spacious': makeDensityPlatform('spacious'),
    'density-compact': makeDensityPlatform('compact'),
  }
};

export default config;