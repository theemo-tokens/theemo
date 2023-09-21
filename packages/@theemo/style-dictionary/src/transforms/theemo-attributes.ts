import { findConstrainedValue, isConstrainedValue } from '@theemo/tokens';

import type StyleDictionary from 'style-dictionary';

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
