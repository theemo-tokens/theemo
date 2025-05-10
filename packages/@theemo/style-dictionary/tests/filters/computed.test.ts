import { expect, test } from 'vitest';

import { isComputedToken, isNoComputedToken } from '../../src';
import { toTransformedToken } from '../-utils';

test('isComputedToken()', () => {
  expect(
    isComputedToken(
      toTransformedToken({
        value: {
          value: '#ee00aa',
          transforms: {
            alpha: -10
          }
        }
      })
    )
  ).toBeTruthy();

  expect(
    isComputedToken(
      toTransformedToken({
        value: '#ee00aa'
      })
    )
  ).toBeFalsy();
});

test('isNoComputedToken()', () => {
  expect(
    isNoComputedToken(
      toTransformedToken({
        value: {
          value: '#ee00aa',
          transforms: {
            alpha: -10
          }
        }
      })
    )
  ).toBeFalsy();

  expect(
    isNoComputedToken(
      toTransformedToken({
        value: '#ee00aa'
      })
    )
  ).toBeTruthy();
});
