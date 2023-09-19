import type { Token } from '..';

export function isStrokeStyle(token: Token) {
  return token.type === 'strokeStyle';
}
