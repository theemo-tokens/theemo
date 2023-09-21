import type { Token } from '../token';

export function isColor(token: Token) {
  return token.type === 'color';
}
