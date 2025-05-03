import { isConstrainedValue } from '@theemo/tokens';

import type { TransformedToken } from 'style-dictionary';
import type { Filter } from 'style-dictionary/types';

export function isConstrainedToken(token: TransformedToken): boolean {
  return isConstrainedValue(token.value);
}

function filter(token: TransformedToken) {
  return !isConstrainedToken(token);
}

export const theemoNonConstrainedTokensFilter: Filter = {
  name: 'theemo/non-constrained-tokens',
  // @ts-expect-error for backwards compatibility
  matcher: filter,
  filter
};
