import { isConstrainedValue } from '@theemo/tokens';

import type { Constraints } from '@theemo/tokens';
import type { PlatformConfig, TransformedToken } from 'style-dictionary';
import type { Transform } from 'style-dictionary/types';

export function copyAttributeConstraints(
  _token: TransformedToken,
  config: PlatformConfig & { constraints?: Constraints }
): object {
  if (config.constraints) {
    return {
      constraints: config.constraints
    };
  }

  return {};
}

/**
 * Copies constraints from platform to the token, so they are available for filtering
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const attributeConstraintsTransform: Transform = {
  name: 'attribute/constraints',
  type: 'attribute',
  filter: (token) => isConstrainedValue(token.value),
  // @ts-expect-error for backwards compatibility
  matcher: (token: TransformedToken) => isConstrainedValue(token.value),
  transformer: copyAttributeConstraints,
  transform: copyAttributeConstraints
};
