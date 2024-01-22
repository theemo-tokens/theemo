import type { Token } from '..';

/**
 * Checks whether the token is a duration
 *
 * @param token the token
 * @returns `true` if the token is a duration or `false` if not
 */
export function isDuration(token: Token) {
  return token.type === 'duration';
}
