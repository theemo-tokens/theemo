import type { Token } from '..';

export function isDuration(token: Token) {
  return token.type === 'duration';
}
