import type { ComputedValue, TokenType, TokenValue } from '../token-types';

/**
 * Checks wether the token value is computed
 *
 * @see [Computed Values](https://theemo.io/design-tokens/internals#formulae-for-computed-tokens)
 * @param value the token value
 * @returns `true` if transforms are available or `false` if not
 */
export function isComputedValue<T extends TokenType>(
  value: TokenValue<T>
): value is ComputedValue<T> {
  return (
    // check for an object
    (typeof value === 'object' && Object.hasOwn(value as object, 'transforms')) ||
    // or the array
    (Array.isArray(value) && value.every((element) => isComputedValue(element)))
  );
}
