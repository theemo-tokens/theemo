import type { Token } from '..';

/**
 * Checks whether the token is a stroke style
 *
 * @param token the token
 * @returns `true` if the token is a stroke style or `false` if not
 */
export function isStrokeStyle(token: Token): boolean {
  return token.type === 'strokeStyle';
}
