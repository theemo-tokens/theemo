import type { ComputedValue, TokenType, TokenValue } from '../token-types';

export function isComputedValue<T extends TokenType>(
  value: TokenValue<T>
): value is ComputedValue<T> {
  return (
    // check for an object
    (typeof value === 'object' && Object.hasOwn(value as object, 'transforms')) ||
    // or the array
    (Array.isArray(value) && value.every(isComputedValue))
  );
}
