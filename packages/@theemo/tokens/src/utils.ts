import type { ConstrainedValue, NonConstrainedTokenValue, TokenType, TokenValue } from '.';

export function isConstrainedValue<T extends TokenType>(
  value: TokenValue<T>
): value is ConstrainedValue<T> {
  return (
    // check for an object
    (typeof value === 'object' &&
      (Object.hasOwn(value, 'features') || Object.hasOwn(value, 'scope'))) ||
    // or the array
    (Array.isArray(value) && value.every(isConstrainedValue))
  );
}

export function deconstrainValue<T extends TokenType>(
  value: TokenValue<T>
): NonConstrainedTokenValue<T> {
  if (typeof value === 'object') {
    const newValue: object = {};

    // filter out 'features' and 'scope'
    for (const key of Object.keys(value as object).filter(
      (k) => !['features', 'scope'].includes(k)
    )) {
      newValue[key] = value[key];
    }

    if (Object.keys(newValue).length === 1 && Object.keys(newValue).includes('value')) {
      return newValue['value'];
    }

    return newValue;
  }

  return value;
}
