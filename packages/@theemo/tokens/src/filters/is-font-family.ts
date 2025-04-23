import type { Token } from '..';

/**
 * Checks whether the token is a font family
 *
 * @param token the token
 * @returns `true` if the token is a font family or `false` it not
 */
export function isFontFamily(token: Token): boolean {
  return token.type === 'fontFamily';
}
