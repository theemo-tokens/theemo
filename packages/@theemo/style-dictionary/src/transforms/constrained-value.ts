import { isConstrainedValue, type TokenType } from '@theemo/tokens';

import type StyleDictionary from 'style-dictionary';

export const deconstrainValue: StyleDictionary.Transform = {
  type: 'value',
  transitive: false,
  matcher: isConstrainedValue,
  transformer: ({ value }: { value: NonConstrainedTokenValue<TokenType> }) => {
    deconstrainValue(value);
  }
};
