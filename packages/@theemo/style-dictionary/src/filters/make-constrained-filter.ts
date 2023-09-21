import { matchesConstrainedValue } from '@theemo/tokens';

import type { Constraints } from '@theemo/tokens';
import type StyleDictionary from 'style-dictionary';

export const makeConstrainedFilter = (constraints: Constraints) => {
  return (token: StyleDictionary.TransformedToken) => {
    return (
      token.attributes?.constraints &&
      matchesConstrainedValue(token.attributes.constraints, constraints)
    );
  };
};
