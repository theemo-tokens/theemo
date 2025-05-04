import { isConstrainedValue, matchesConstrainedValue } from '@theemo/tokens';

import type { Constraints } from '@theemo/tokens';
import type { TransformedToken } from 'style-dictionary';
import type { Filter } from 'style-dictionary';

export function matchesConstraints(token: TransformedToken, constraints?: Constraints): boolean {
  const constr = token.attributes?.constraints ?? constraints;

  return Boolean(constr && matchesConstrainedValue(token.original.value, constr));
}

/**
 * Creates a function to filter tokens on the given constraints.
 *
 * @example
 *
 * Use as {@link https://amzn.github.io/style-dictionary/#/config?id=file | `filter`} property in style dictionary config.
 *
 * ```js
 * const { makeConstrainedFilter } = require('@theemo/style-dictionary');
 *
 * module.exports = {
 *   platforms: {
 *     '[your-platforn]': {
 *       filter: makeConstrainedFilter({
 *         features: {
 *           'color-scheme': 'dark'
 *         }
 *       })
 *     }
 *   }
 * }
 * ```
 *
 * @param constraints the constraints
 * @returns a filter function
 */
export function makeConstrainedFilter(constraints: Constraints): Filter['filter'] {
  return (token: TransformedToken) => matchesConstraints(token, constraints);
}

export function isConstrainedToken(token: TransformedToken): boolean {
  return isConstrainedValue(token.value);
}

export function isNoConstrainedToken(token: TransformedToken): boolean {
  return !isConstrainedToken(token);
}

/**
 * Matchs the token against constraints given for the platform.
 *
 * It's using the constraints provided by the `theemo/attribute` transform
 *
 * @see theemoAttributesTransform
 * @param token
 * @returns
 */
export function isConstrainedByPlatform(token: TransformedToken): boolean {
  return matchesConstraints(token);
}
