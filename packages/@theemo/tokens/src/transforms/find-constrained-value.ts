import { matchesConstrainedValue } from '../filters/matches-constrained-value';

import type { Constraints, TokenType, TokenValue } from '../token-types';

/**
 * Finds the value matching the provided constraints
 *
 * @param value the Token value
 * @param constraints the constraints for lookup
 * @returns the matched token value or nothing
 */
export function findConstrainedValue(
  value: TokenValue<TokenType>,
  constraints: Constraints
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
): TokenValue<TokenType> | undefined {
  if (Array.isArray(value)) {
    return value.find((val) => findConstrainedValue(val, constraints));
  }

  if (matchesConstrainedValue(value, constraints)) {
    return value;
  }

  return void 0;
}
