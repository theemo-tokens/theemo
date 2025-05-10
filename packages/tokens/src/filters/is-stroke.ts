import type { Token } from '..';

/**
 * Checks whether the token is a stroke
 *
 * @param token the token
 * @returns `true`if the token is a stroke style or `false` if not
 */
export function isStroke(token: Token): boolean {
  return token.type === 'stroke';
}
