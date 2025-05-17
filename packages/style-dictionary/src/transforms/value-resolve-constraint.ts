import { findConstrainedValue, isComputedValue, isConstrainedValue } from '@theemo/tokens';

import type { Constraints } from '@theemo/tokens';
import type { PlatformConfig, TransformedToken } from 'style-dictionary';
import type { Transform } from 'style-dictionary/types';

export function resolveValueConstraint(
  token: TransformedToken,
  config: PlatformConfig & { constraints?: Constraints } = {}
): unknown {
  const { value } = token as { value: unknown };

  if (Array.isArray(value) && value.length === 1) {
    return value[0] as unknown;
  }

  if (config.constraints) {
    const match = findConstrainedValue(value, config.constraints);

    if (match) {
      if (isComputedValue(match)) {
        return match;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return match.value;
    }
  }

  return value;
}

/**
 * Resolves the token value based on the provided constraints to make it
 * processable by Style Dictionary.
 *
 * @example
 *
 * Usage:
 *
 * ```js
 * import StyleDictionary from 'style-dictionary';
 * import { valueResolveConstraintTransform } from '@theemo/style-dictionary';
 *
 * StyleDictionary.registerTransform(valueResolveConstraintTransform);
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
 *       transforms: ['value/resolve-constraint']
 *     }
 *   }
 * };
 * ```
 *
 * @example
 *
 * Turning this:
 *
 * ```json
 * {
 *   "$value": [
 *     {
 *       "value": "#12544a",
 *       "features": {
 *         "color-scheme": "light"
 *       }
 *     },
 *     {
 *       "value": "#80e5d6",
 *       "features": {
 *         "color-scheme": "dark"
 *       }
 *     }
 *   ],
 *   "$type": "color"
 * }
 * ```
 *
 * Into:
 *
 * ```json
 * {
 *   "$value": "#12544a",
 *   "$type": "color"
 * }
 * ```
 */
export const valueResolveConstraintTransform: Transform = {
  name: 'value/resolve-constraint',
  type: 'value',
  transitive: true,
  filter: (token) => isConstrainedValue(token.value),
  // @ts-expect-error for backwards compatibility
  matcher: (token: TransformedToken) => isConstrainedValue(token.value),
  transformer: resolveValueConstraint,
  transform: resolveValueConstraint
};
