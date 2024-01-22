import type { Token } from '..';

/**
 * Checks whether the token is a typography
 *
 * @param token the token
 * @returns `true` if the token is a typography or `false` if not
 */
export function isTypography(token: Token) {
  return token.type === 'typography';
}
