import { isComputedValue } from '@theemo/tokens';

import type { TransformedToken } from 'style-dictionary';

/**
 * Checks whether a token contains a transform.
 *
 * A computed token:
 *
 * ```json
 * {
 *   "$value": {
 *     "value": "#ee00aa",
 *     "transforms": {
 *       "alpha": -10
 *     }
 *   },
 *   "$type": "color"
 * }
 * ```
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { isComputedToken } from '@theemo/style-dictionary';
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       files: [
 *         {
 *           format: 'css/variables',
 *           destination: 'computed-tokens.css',
 *           filter: isComputedToken
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @param token the token in question
 * @returns `true` when the token contains a transform, otherwise `false`
 */
export function isComputedToken(token: TransformedToken): boolean {
  return isComputedValue(token.value);
}

/**
 * Checks whether a token contains NO transforms.
 *
 * A computed token:
 *
 * ```json
 * {
 *   "$value": {
 *     "value": "#ee00aa",
 *     "transforms": {
 *       "alpha": -10
 *     }
 *   },
 *   "$type": "color"
 * }
 * ```
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { isNoComputedToken } from '@theemo/style-dictionary';
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       files: [
 *         {
 *           format: 'css/variables',
 *           destination: 'raw-tokens.css',
 *           filter: isNoComputedToken
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @param token the token in question
 * @returns `true` when the token contains NO transform, otherwise `false`
 */
export function isNoComputedToken(token: TransformedToken): boolean {
  return !isComputedToken(token);
}
