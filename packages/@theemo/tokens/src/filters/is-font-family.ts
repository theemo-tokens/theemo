import type { Token } from '..';

export function isFontFamily(token: Token) {
  return token.type === 'fontFamily';
}
