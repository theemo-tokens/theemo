import { isTypography, type TypographyValue } from '@theemo/tokens';

import type StyleDictionary from 'style-dictionary';

/**
 * @description convert a w3c `typography` token to a value that can be used with the css `font` property
 */
export const typographyCssTransform: StyleDictionary.Transform = {
  type: 'value',
  transitive: true,
  matcher: isTypography,
  transformer: ({ value }: { value: TypographyValue }) => {
    // font: (font-style) font-variant font-weight font-size/line-height font-family;
    return `${value.fontWeight || ''} ${value.fontSize}${
      value.lineHeight ? '/' + value.lineHeight : ''
    } "${value.fontFamily}"`
      .trim()
      .replace(/\s\s+/g, ' ');
  }
};
