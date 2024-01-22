import { findConstrainedValue, isComputedValue, isConstrainedValue } from '@theemo/tokens';

import type StyleDictionary from 'style-dictionary';

/**
 * Resolves the token value based on the provided constraints
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const theemoValueTransform: StyleDictionary.Transform = {
  type: 'value',
  transitive: true,
  matcher: (token) => isConstrainedValue(token.value),
  transformer: (token: StyleDictionary.TransformedToken, platform: StyleDictionary.Platform) => {
    const { value } = token;

    if (Array.isArray(value) && value.length === 1) {
      return value[0];
    }

    if (platform.constraints) {
      const match = findConstrainedValue(value, platform.constraints);

      if (match) {
        if (isComputedValue(match)) {
          return match;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return match.value;
      }
    }

    return value;
  }
};
