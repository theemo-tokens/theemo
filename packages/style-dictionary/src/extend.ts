import { cssPropertiesFormater } from './formats/css-properties';
import { w3cTokenJsonParser } from './parsers/w3c-token-json-parser';
import { theemoTokenPreprocessor } from './preprocessors/theemo-token';
import { attributeConstraintsTransform } from './transforms/attribute-constraints';
import { colorCssLightDarkTransform } from './transforms/color-css-light-dark';
import { colorTransform } from './transforms/color-transforms';
import { valueResolveConstraintTransform } from './transforms/value-resolve-constraint';

import type StyleDictionary from 'style-dictionary';

/**
 * Register all theemo extensions with style dictionary
 *
 * @example
 *
 * In your style dictionary config:
 *
 * ```js
 * const StyleDictionary = require('style-dictionary');
 * const { registerTheemo } = require('@theemo/style-dictionary');
 *
 * registerTheemo(StyleDictionary);
 *
 * // ...
 * ```
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 * @param styleDictionary
 */
export const registerTheemo = (styleDictionary: StyleDictionary): void => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (styleDictionary.registerPreprocessor) {
    styleDictionary.registerPreprocessor(theemoTokenPreprocessor);
  } else {
    styleDictionary.registerParser(w3cTokenJsonParser);
  }

  styleDictionary.registerFormat(cssPropertiesFormater);

  styleDictionary.registerTransform(attributeConstraintsTransform);
  styleDictionary.registerTransform(valueResolveConstraintTransform);
  styleDictionary.registerTransform(colorTransform);
  styleDictionary.registerTransform(colorCssLightDarkTransform);

  styleDictionary.registerTransformGroup({
    name: 'theemo',
    transforms: [
      'name/kebab',
      'attribute/constraints',
      'value/resolve-constraint',
      'color/transforms',
      'color/light-dark-css',
      'color/css',
      'fontFamily/css',
      'cubicBezier/css',
      'strokeStyle/css/shorthand',
      'border/css/shorthand',
      'typography/css/shorthand',
      'transition/css/shorthand',
      'shadow/css/shorthand',
      'time/seconds'
    ]
  });
};
