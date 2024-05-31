import { matchesConstrainedValue } from '@theemo/tokens';

import type { Constraints } from '@theemo/tokens';
import type StyleDictionary from 'style-dictionary';

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
export function makeConstrainedFilter(constraints: Constraints) {
  return (token: StyleDictionary.TransformedToken) => {
    return (token.attributes?.constraints &&
      matchesConstrainedValue(token.attributes.constraints, constraints)) as boolean;
  };
}
