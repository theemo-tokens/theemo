import { isColor, isComputedValue, transformColorValue } from '@theemo/tokens';

import type { ComputedValue, Token } from '@theemo/tokens';
import type { Transform, TransformedToken } from 'style-dictionary/types';

const isColorTransform = (token: TransformedToken): boolean => {
  console.log('isColorTransform', token, isComputedValue(token.value), isColor(token as Token));

  return isComputedValue(token.value) && isColor(token as Token);
};

function transform(token: TransformedToken) {
  return transformColorValue(token.value as ComputedValue<'color'>);
}

/**
 * Apply color transformations on color tokens
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const theemoColorValueTransform: Transform = {
  name: 'theemo/transform',
  type: 'value',
  transitive: true,
  filter: isColorTransform,
  // @ts-expect-error for backwards compatibility
  matcher: isColorTransform,
  transformer: transform,
  transform
};
