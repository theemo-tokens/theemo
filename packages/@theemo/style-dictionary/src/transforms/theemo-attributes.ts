import { findConstrainedValue, isConstrainedValue } from '@theemo/tokens';

import type StyleDictionary from 'style-dictionary';

/**
 * Extract constraints under which the token is available to the attributes
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const theemoAttributesTransform: StyleDictionary.Transform = {
  type: 'attribute',
  matcher: (token) => isConstrainedValue(token.value),
  transformer: (token: StyleDictionary.TransformedToken, platform: StyleDictionary.Platform) => {
    if (platform.constraints && findConstrainedValue(token.value, platform.constraints)) {
      return {
        constraints: platform.constraints
      };
    }

    return {};
  }
};
