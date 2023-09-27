import { isShadow } from '@theemo/tokens';

import type { ShadowValue, ShadowValueSingular } from '@theemo/tokens';
import type StyleDictionary from 'style-dictionary';

function transformShadow(value: ShadowValueSingular) {
  return `${value.offsetX} ${value.offsetY} ${value.blur} ${value.spread} ${value.color}`
    .trim()
    .replace(/\s\s+/g, ' ');
}

/**
 * @description convert a w3c `shadow` token to a value that can be used with the css `font` property
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
