import type { Token } from '..';

export function isFontWeight(token: Token) {
  return token.type === 'fontWeight';
}
