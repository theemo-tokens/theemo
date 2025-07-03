import type { ConstrainedValue, TokenType, TokenValue } from '../token-types';

/**
 * Checks whether this token value has constraints
 *
 * @see [Constrained Values](https://theemo.io/design-tokens/internals#constrained-values)
 * @param value the token value
 * @returns `true` if constraints are present or `false` if not
 */
export function isConstrainedValue<T extends TokenType>(
  value: TokenValue<T>
): value is ConstrainedValue<T> {
  return (
    // check for an object
    (typeof value === 'object' &&
      (Object.hasOwn(value as object, 'features') || Object.hasOwn(value as object, 'scope'))) ||
    // or the array
    (Array.isArray(value) && value.every((element) => isConstrainedValue(element)))
  );
}
