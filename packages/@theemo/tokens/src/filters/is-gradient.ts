import type { Token } from '..';

export function isGradient(token: Token) {
  return token.type === 'gradient';
}
