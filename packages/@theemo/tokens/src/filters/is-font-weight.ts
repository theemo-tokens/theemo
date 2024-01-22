import type { Token } from '..';

/**
 * Checks whether the token is a font weight
 *
 * @param token the token
 * @returns `true` if the token is a font weight or `false` if not
 */
export function isFontWeight(token: Token) {
  return token.type === 'fontWeight';
}
