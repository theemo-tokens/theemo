import { expect, test } from 'vitest';

import { isCSSProperty, isNoComputedToken, isNoCSSProperty } from '../../src';
import { toTransformedToken } from '../-utils';

test('isCSSProperty()', () => {
  expect(
    isCSSProperty(
      toTransformedToken({
        value: '#ee00aa',
        type: 'color'
      })
    )
  ).toBeTruthy();

  expect(
    isCSSProperty(
      toTransformedToken({
        value: '#ee00aa'
      })
    )
  ).toBeFalsy();

  expect(
    isCSSProperty(
      toTransformedToken({
        value: '#ee00aa',
        type: 'typography'
      })
    )
  ).toBeFalsy();

  expect(
    isCSSProperty(
      toTransformedToken({
        type: 'color',
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
    isCSSProperty(
      toTransformedToken({
        type: 'color',
        value: {
          value: '#ee00aa',

          features: { 'color-scheme': 'light' }
        }
      })
    )
  ).toBeFalsy();

  expect(
    isCSSProperty(
      toTransformedToken({
        value: '{some.other.token}',
        type: 'color'
      })
    )
  ).toBeFalsy();
});

test('isNoCSSProperty()', () => {
  expect(
    isNoCSSProperty(
      toTransformedToken({
        value: '#ee00aa'
      })
    )
  ).toBeTruthy();

  expect(
    isNoComputedToken(
      toTransformedToken({
        value: '#ee00aa'
      })
    )
  ).toBeTruthy();
});
