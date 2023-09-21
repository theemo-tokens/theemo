import type { ConstrainedValue, TokenType, TokenValue } from '../token-types';

export function isConstrainedValue<T extends TokenType>(
  value: TokenValue<T>
): value is ConstrainedValue<T> {
  return (
    // check for an object
    (typeof value === 'object' &&
      (Object.hasOwn(value as object, 'features') || Object.hasOwn(value as object, 'scope'))) ||
    // or the array
    (Array.isArray(value) && value.every(isConstrainedValue))
  );
}
