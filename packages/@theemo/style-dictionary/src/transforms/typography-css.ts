import { isTypography, type TypographyValue } from '@theemo/tokens';

import type StyleDictionary from 'style-dictionary';

/**
 * Convert a W3C `typography` token to a value that can be used with the css `font` property
 *
 * @see [Extending Style Dictionary](https://theemo.io/sync/style-dictionary/extensions)
 */
export const typographyCssTransform: StyleDictionary.Transform = {
  type: 'value',
  matcher: isTypography,
  transformer: ({ value }: { value: TypographyValue }) => {
    // font: (font-style) font-variant font-weight font-size/line-height font-family;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${value.fontWeight || ''} ${value.fontSize}${
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      value.lineHeight ? '/' + value.lineHeight : ''
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    } "${value.fontFamily}"`
      .trim()
      .replace(/\s\s+/g, ' ');
  }
};
