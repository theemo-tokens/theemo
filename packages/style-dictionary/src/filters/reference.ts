import { usesReferences } from 'style-dictionary/utils';

import type { TransformedToken } from 'style-dictionary';

/**
 * Check whether a token references another token.
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { isReferenceToken } from '@theemo/style-dictionary';
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       files: [
 *         {
 *           format: 'css/variables',
 *           destination: 'references.css',
 *           filter: isReferenceToken
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @param token the token in question
 * @returns `true` when the token references another one, otherwise `false`
 */
export function isReferenceToken(token: TransformedToken): boolean {
  return usesReferences(token.original.value);
}

/**
 * Check whether a token has NO reference to another token.
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { isNoReferenceToken } from '@theemo/style-dictionary';
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       files: [
 *         {
 *           format: 'css/variables',
 *           destination: 'raw-tokens.css',
 *           filter: isNoReferenceToken
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @param token the token in question
 * @returns `true` when the token references NO other token, otherwise `false`
 */
export function isNoReferenceToken(token: TransformedToken): boolean {
  return !isReferenceToken(token);
}
