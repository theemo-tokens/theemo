import { describe, expect, test } from 'vitest';

import { transformColor } from '../../src/transforms/color-transforms';
import { toTransformedToken } from '../-utils';

describe('HSL / CSS Transforms', () => {
  test('transformColor()', () => {
    expect(
      transformColor(
        toTransformedToken({
          value: {
            value: 'red',
            transforms: {
              hue: 180
            }
          }
        }),
        {
          options: {
            useCSSColorTransform: true
          }
        }
      )
    ).toBe('hsl(from red calc(h + 180) s l)');

    expect(
      transformColor(
        toTransformedToken({
          value: {
            value: 'red',
            transforms: {
              saturation: 20
            }
          }
        }),
        {
          options: {
            useCSSColorTransform: true
          }
        }
      )
    ).toBe('hsl(from red h calc(s + 20) l)');

    expect(
      transformColor(
        toTransformedToken({
          value: {
            value: 'red',
            transforms: {
              lightness: -20
            }
          }
        }),
        {
          options: {
            useCSSColorTransform: true
          }
        }
      )
    ).toBe('hsl(from red h s calc(l - 20))');

    expect(
      transformColor(
        toTransformedToken({
          value: {
            value: 'red',
            transforms: {
              alpha: -20
            }
          }
        }),
        {
          options: {
            useCSSColorTransform: true
          }
        }
      )
    ).toBe('hsl(from red h s l / 0.8)');
  });
});

describe('HSL / Calc', () => {
  test('transformColor()', () => {
    expect(
      transformColor(
        toTransformedToken({
          value: {
            value: '#f00',
            transforms: {
              hue: 180
            }
          }
        })
      )
    ).toBe('#ff0800');

    expect(
      transformColor(
        toTransformedToken({
          value: {
            value: '#f00',
            transforms: {
              saturation: -20
            }
          }
        })
      )
    ).toBe('#e61a1a');

    expect(
      transformColor(
        toTransformedToken({
          value: {
            value: '#f00',
            transforms: {
              lightness: -20
            }
          }
        })
      )
    ).toBe('#990000');

    expect(
      transformColor(
        toTransformedToken({
          value: {
            value: '#f00',
            transforms: {
              alpha: -20
            }
          }
        })
      )
    ).toBe('rgba(255, 0, 0, 0.8)');
  });
});
