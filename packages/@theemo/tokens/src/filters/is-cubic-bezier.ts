import type { Token } from '..';

/**
 * Checks whether the token is a cubic bezier
 *
 * @param token the token
 * @returns `true` if the token is a cubic bezier or `false` if not
 */
export function isCubicBezier(token: Token) {
  return token.type === 'cubicBezier';
}
