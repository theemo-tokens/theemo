import type { Token } from '..';

/**
 * Checks whether the token is a gradient
 *
 * @param token the token
 * @returns `true` if the token is a gradient or `false` if not
 */
export function isGradient(token: Token) {
  return token.type === 'gradient';
}
