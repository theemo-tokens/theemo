import { matchesConstrainedValue } from '@theemo/tokens';

import type { TransformedToken } from 'style-dictionary';
import type { Filter } from 'style-dictionary/types';

function filter(token: TransformedToken) {
  return Boolean(
    token.attributes?.constraints &&
      matchesConstrainedValue(token.value, token.attributes.constraints)
  );
}

export const theemoConstrainedTokensFilter: Filter = {
  name: 'theemo/constrained-tokens',
  // @ts-expect-error for backwards compatibility
  matcher: filter,
  filter
};
