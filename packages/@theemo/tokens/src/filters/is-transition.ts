import type { Token } from '..';

/**
 * Checks whether the token is a transition
 *
 * @param token the token
 * @returns `true` if the token is a transition or `false` if not
 */
export function isTransition(token: Token) {
  return token.type === 'transition';
}
