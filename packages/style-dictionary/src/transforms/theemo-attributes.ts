import { isConstrainedValue } from '@theemo/tokens';

import type { Constraints } from '@theemo/tokens';
import type { PlatformConfig, TransformedToken } from 'style-dictionary';
import type { Transform } from 'style-dictionary/types';

export function transformTheemoAttributes(
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
 * Extract constraints under which the token is available to the attributes
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const theemoAttributesTransform: Transform = {
  name: 'theemo/attributes',
  type: 'attribute',
  filter: (token) => isConstrainedValue(token.value),
  // @ts-expect-error for backwards compatibility
  matcher: (token: TransformedToken) => isConstrainedValue(token.value),
  transformer: transformTheemoAttributes,
  transform: transformTheemoAttributes
};
