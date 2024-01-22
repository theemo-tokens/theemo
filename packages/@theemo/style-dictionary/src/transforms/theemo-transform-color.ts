import { isColor, isComputedValue, transformColorValue } from '@theemo/tokens';

import type { ComputedValue } from '@theemo/tokens';
import type StyleDictionary from 'style-dictionary';

const isColorTransform = (token: StyleDictionary.TransformedToken): boolean => {
  return isComputedValue(token.value) && isColor(token);
};

/**
 * Apply color transformations on color tokens
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const theemoColorValueTransform: StyleDictionary.Transform = {
  type: 'value',
  transitive: true,
  matcher: isColorTransform,
  transformer: (token: StyleDictionary.TransformedToken) => {
    return transformColorValue(token.value as ComputedValue<'color'>);
  }
};
