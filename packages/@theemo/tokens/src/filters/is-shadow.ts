import type { Token } from '..';

export function isShadow(token: Token) {
  return token.type === 'shadow';
}
