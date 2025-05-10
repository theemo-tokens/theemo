import { matchesConstrainedValue } from './filters/matches-constrained-value';

import type { ConstrainedValue, Constraints, TokenType, TokenValue } from './token-types';

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
): ConstrainedValue<TokenType> | undefined {
  if (Array.isArray(value)) {
    return value.find((val) => matchesConstrainedValue(val, constraints)) as
      | ConstrainedValue<TokenType>
      | undefined;
  }

  if (matchesConstrainedValue(value, constraints)) {
    return value as ConstrainedValue<TokenType>;
  }

  return void 0;
}
