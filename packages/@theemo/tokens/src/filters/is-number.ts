import type { Token } from '..';

/**
 * Checks whether the token is a number
 *
 * @param token the token
 * @returns `true` if the token is a number or `false` if not
 */
export function isNumber(token: Token) {
  return token.type === 'number';
}
