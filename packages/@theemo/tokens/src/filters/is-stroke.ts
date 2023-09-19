import type { Token } from '..';

export function isStroke(token: Token) {
  return token.type === 'stroke';
}
