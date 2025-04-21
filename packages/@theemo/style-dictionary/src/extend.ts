import { theemoConstrainedTokensFilter } from './filters/theemo-constrained-tokens';
import { theemoNonConstrainedTokensFilter } from './filters/theemo-non-constrained-tokens';
import { w3cTokenJsonParser } from './parsers/w3c-token-json-parser';
import { theemoTokenPreprocessor } from './preprocessors/theemo-token';
import { namePathKebabTransform } from './transforms/name-path-kebab';
import { shadowCssTransform } from './transforms/shadow-css';
import { theemoAttributesTransform } from './transforms/theemo-attributes';
import { theemoColorValueTransform } from './transforms/theemo-color-value';
import { theemoValueTransform } from './transforms/theemo-value';
import { typographyCssTransform } from './transforms/typography-css';

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
export const registerTheemo = (styleDictionary: StyleDictionary) => {
  if (styleDictionary.registerPreprocessor) {
    styleDictionary.registerPreprocessor(theemoTokenPreprocessor);
  } else {
    styleDictionary.registerParser(w3cTokenJsonParser);
  }

  styleDictionary.registerFilter(theemoNonConstrainedTokensFilter);
  styleDictionary.registerFilter(theemoConstrainedTokensFilter);

  styleDictionary.registerTransform(theemoAttributesTransform);
  styleDictionary.registerTransform(theemoValueTransform);
  styleDictionary.registerTransform(theemoColorValueTransform);
  styleDictionary.registerTransform(namePathKebabTransform);
  styleDictionary.registerTransform(typographyCssTransform);
  styleDictionary.registerTransform(shadowCssTransform);

  styleDictionary.registerTransformGroup({
    name: 'theemo',
    transforms: [
      'theemo/attributes',
      'theemo/value',
      'theemo/transform',
      'name/path/kebab',
      'typography/css',
      'shadow/css',
      'time/seconds',
      'color/css'
    ]
  });
};
