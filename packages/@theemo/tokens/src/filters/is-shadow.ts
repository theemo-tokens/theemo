import type { Token } from '..';

/**
 * Checks whether the token is a shadow
 *
 * @param token the token
 * @returns `true` if the token is a shadow or `false` if not
 */
export function isShadow(token: Token) {
  return token.type === 'shadow';
}
