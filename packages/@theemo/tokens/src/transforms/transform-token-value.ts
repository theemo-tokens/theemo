import { isColor } from '../filters/is-color';
import { transformColorValue } from './transform-color-value';

import type { Token } from '../token';
import type { ComputedValue } from '../token-types';

export function transformTokenValue(token: Token) {
  if (isColor(token)) {
    token.value = transformColorValue(token.value as ComputedValue<'color'>);
  }

  return token;
}
