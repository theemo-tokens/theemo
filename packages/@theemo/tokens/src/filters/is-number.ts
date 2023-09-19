import type { Token } from '..';

export function isNumber(token: Token) {
  return token.type === 'number';
}
