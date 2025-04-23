import type { Token } from '../token';

/**
 * Checks whether the token is a color token
 *
 * @param token the Token
 * @returns `true` if the token is of type color or `false` if not
 */
export function isColor(token: Token): boolean {
  return token.type === 'color';
}
