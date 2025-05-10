import { expect, test } from 'vitest';

import { transformShadowCss } from '../../src/transforms/shadow-css';
import { toTransformedToken } from '../-utils';

test('transformShadowCss()', () => {
  expect(
    transformShadowCss(
      toTransformedToken({
        value: {
          offsetX: '5px',
          offsetY: '4px',
          blur: '10px',
          spread: '2px',
          color: 'rebeccapurple'
        }
      })
    )
  ).toBe('5px 4px 10px 2px rebeccapurple');
});
