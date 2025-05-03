import { matchesConstrainedValue } from '@theemo/tokens';

import type { Constraints } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';
import type { Filter } from 'style-dictionary/types';

export function matchesConstraints(token: TransformedToken, constraints?: Constraints): boolean {
  const constr = token.attributes?.constraints ?? constraints;

  return Boolean(constr && matchesConstrainedValue(token.value, constr));
}

export const theemoConstrainedTokensFilter: Filter = {
  name: 'theemo/constrained-tokens',
  // @ts-expect-error for backwards compatibility
  matcher: matchesConstraints,
  filter: (token) => matchesConstraints(token)
};
