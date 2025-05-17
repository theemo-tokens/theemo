import { isConstrainedValue, matchesConstrainedValue } from '@theemo/tokens';

import type { Constraints } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';

/**
 * When you want to filter for any constraints (free from platform constraints),
 * you can make yourself a filter for that.
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { matchesConstraints } from '@theemo/style-dictionary';
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       files: [
 *         {
 *           format: 'css/variables',
 *           destination: 'raw-tokens.css',
 *           filter: (token) => matchesConstraints(token, {
 *             features: {
 *               'density': 'spacious'
 *             }
 *           })
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @param token the token in question
 * @param constraints the constraints you want to check against
 * @returns `true` when the token matches against the given constraints,
 * otherwise `false`
 */
export function matchesConstraints(token: TransformedToken, constraints: Constraints): boolean {
  return matchesConstrainedValue(token.original.value, constraints);
}

/**
 * Checks whether a token has containts.
 *
 * A constrained token:
 *
 * ```json
 * {
 *   "$value": {
 *     "value": "#ff0088",
 *     "features": {
 *       "color-scheme": "light"
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
 * import { isConstrainedToken } from '@theemo/style-dictionary';
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       files: [
 *         {
 *           format: 'css/variables',
 *           destination: 'constrained-tokens.css',
 *           filter: isConstrainedToken
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @param token the token in question
 * @returns @returns `true` when the token has constraints, otherwise `false`
 */
export function isConstrainedToken(token: TransformedToken): boolean {
  return isConstrainedValue(token.value);
}

/**
 * Checks whether a token has NO containts.
 *
 * A constrained token:
 *
 * ```json
 * {
 *   "$value": {
 *     "value": "#ff0088",
 *     "features": {
 *       "color-scheme": "light"
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
 * import { isNoConstrainedToken } from '@theemo/style-dictionary';
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       files: [
 *         {
 *           format: 'css/variables',
 *           destination: 'raw-tokens.css',
 *           filter: isNoConstrainedToken
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @param token the token in question
 * @returns `true` when the token has NO constraints, otherwise `false`
 */
export function isNoConstrainedToken(token: TransformedToken): boolean {
  return !isConstrainedToken(token);
}

/**
 * Matches the token against constraints given for the platform.
 *
 * When platform constraints are added to a token with `attribute/constraints`,
 * then you can use `isConstrainedByPlatform()` to filter for them.
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { isConstrainedByPlatform } from '@theemo/style-dictionary';
 *
 * export default {
 *   source: ['tokens/**\/*.json'],
 *   platforms: {
 *     css: {
 *       constraints: {
 *         features: {
 *           'color-scheme': 'light'
 *         }
 *       },
 *       files: [
 *         {
 *           format: 'css/variables',
 *           destination: 'constrained-tokens.css',
 *           filter: isConstrainedByPlatform
 *         }
 *       ]
 *     }
 *   }
 * };
 * ```
 *
 * @see attributeConstraintsTransform
 * @param token the token in question
 * @returns `true` when the token matches platform constraints, otherwise `false`
 */
export function isConstrainedByPlatform(token: TransformedToken): boolean {
  const constraints = token.attributes?.constraints;

  return Boolean(constraints && matchesConstraints(token, constraints));
}
