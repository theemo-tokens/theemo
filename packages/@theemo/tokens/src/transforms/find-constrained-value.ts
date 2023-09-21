import { matchesConstrainedValue } from '../filters/matches-constrained-value';

import type { Constraints, TokenType, TokenValue } from '../token-types';

export function findConstrainedValue(
  value: TokenValue<TokenType>,
  constraints: Constraints
): TokenValue<TokenType> | void {
  if (Array.isArray(value)) {
    return value.find((val) => findConstrainedValue(val, constraints));
  }

  if (matchesConstrainedValue(value, constraints)) {
    return value;
  }

  return void 0;
}
