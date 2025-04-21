import { isConstrainedValue } from '@theemo/tokens';

import type { TransformedToken } from 'style-dictionary';
import type { Filter } from 'style-dictionary/types';

function filter(token: TransformedToken) {
  return !isConstrainedValue(token.value);
}

export const theemoNonConstrainedTokensFilter: Filter = {
  name: 'theemo/non-constrained-tokens',
  // @ts-expect-error for backwards compatibility
  matcher: filter,
  filter
};
