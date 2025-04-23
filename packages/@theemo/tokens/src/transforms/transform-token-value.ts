import { isColor } from '../filters/is-color';
import { transformColorValue } from './transform-color-value';

import type { Token } from '../token';
import type { ComputedValue } from '../token-types';

/**
 * Applies transformations to the token value
 *
 * @param token Token
 * @returns the token with the transforms applied
 */
export function transformTokenValue(token: Token): Token {
  if (isColor(token)) {
    token.value = transformColorValue(token.value as ComputedValue<'color'>);
  }

  return token;
}
