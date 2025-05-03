import { isComputedValue } from '@theemo/tokens';

import type { TransformedToken } from 'style-dictionary';
import type { Filter } from 'style-dictionary/types';

export function isComputedToken(token: TransformedToken): boolean {
  return isComputedValue(token.value);
}

export const theemoComputedTokensFilter: Filter = {
  name: 'theemo/computed-tokens',
  // @ts-expect-error for backwards compatibility
  matcher: isComputedToken,
  filter: isComputedToken
};
