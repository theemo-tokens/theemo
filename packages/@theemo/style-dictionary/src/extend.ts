import { theemoComputedTokensFilter } from './filters/theemo-computed-tokens';
import { theemoConstrainedTokensFilter } from './filters/theemo-constrained-tokens';
import { theemoIsCssPropertyFilter } from './filters/theemo-is-css-property';
import { theemoNonConstrainedTokensFilter } from './filters/theemo-non-constrained-tokens';
import { cssPropertiesFormater } from './formats/css-property';
import { w3cTokenJsonParser } from './parsers/w3c-token-json-parser';
import { theemoTokenPreprocessor } from './preprocessors/theemo-token';
import { colorLightDarkCssTransform } from './transforms/color-light-dark-css';
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
export const registerTheemo = (styleDictionary: StyleDictionary): void => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (styleDictionary.registerPreprocessor) {
    styleDictionary.registerPreprocessor(theemoTokenPreprocessor);
  } else {
    styleDictionary.registerParser(w3cTokenJsonParser);
  }

  styleDictionary.registerFormat(cssPropertiesFormater);

  styleDictionary.registerFilter(theemoNonConstrainedTokensFilter);
  styleDictionary.registerFilter(theemoConstrainedTokensFilter);
  styleDictionary.registerFilter(theemoComputedTokensFilter);
  styleDictionary.registerFilter(theemoIsCssPropertyFilter);

  styleDictionary.registerTransform(theemoAttributesTransform);
  styleDictionary.registerTransform(theemoValueTransform);
  styleDictionary.registerTransform(theemoColorValueTransform);
  styleDictionary.registerTransform(namePathKebabTransform);
  styleDictionary.registerTransform(typographyCssTransform);
  styleDictionary.registerTransform(shadowCssTransform);
  styleDictionary.registerTransform(colorLightDarkCssTransform);

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
      'color/light-dark-css',
      'color/css'
    ]
  });
};
