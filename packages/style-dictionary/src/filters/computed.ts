import { isComputedValue } from '@theemo/tokens';

import type { TransformedToken } from 'style-dictionary';

export function isComputedToken(token: TransformedToken): boolean {
  return isComputedValue(token.value);
}

export function isNoComputedToken(token: TransformedToken): boolean {
  return !isComputedToken(token);
}
