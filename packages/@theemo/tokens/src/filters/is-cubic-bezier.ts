import type { Token } from '..';

export function isCubicBezier(token: Token) {
  return token.type === 'cubicBezier';
}
