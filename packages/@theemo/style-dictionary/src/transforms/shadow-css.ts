import { isShadow } from '@theemo/tokens';

import type { ShadowValue, ShadowValueSingular } from '@theemo/tokens';
import type StyleDictionary from 'style-dictionary';

function transformShadow(value: ShadowValueSingular) {
  return `${value.offsetX} ${value.offsetY} ${value.blur} ${value.spread} ${value.color}`
    .trim()
    .replace(/\s\s+/g, ' ');
}

/**
 * Convert a `shadow` token to a value that can be used with the css `box-shadow` property
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const shadowCssTransform: StyleDictionary.Transform = {
  type: 'value',
  transitive: true,
  matcher: isShadow,
  transformer: ({ value }: { value: ShadowValue }) => {
    if (Array.isArray(value)) {
      return value.map(transformShadow).join(', ');
    }

    return transformShadow(value);
  }
};
