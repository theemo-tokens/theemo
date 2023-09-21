import type { Token } from '..';

export function isTransition(token: Token) {
  return token.type === 'transition';
}
