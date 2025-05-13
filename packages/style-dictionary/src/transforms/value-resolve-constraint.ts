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
 * Resolves the token value based on the provided constraints
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
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
