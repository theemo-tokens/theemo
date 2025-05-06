import { expect, test } from 'vitest';

import { isNoReferenceToken, isReferenceToken } from '../../src';
import { toTransformedToken } from './-utils';

test('isComputedToken()', () => {
  expect(
    isReferenceToken(
      toTransformedToken({
        value: '{some.other.token}'
      })
    )
  ).toBeTruthy();

  expect(
    isReferenceToken(
      toTransformedToken({
        value: '#ee00aa'
      })
    )
  ).toBeFalsy();
});

test('isNoComputedToken()', () => {
  expect(
    isNoReferenceToken(
      toTransformedToken({
        value: '#ee00aa'
      })
    )
  ).toBeTruthy();

  expect(
    isNoReferenceToken(
      toTransformedToken({
        value: '{some.other.token}'
      })
    )
  ).toBeFalsy();
});
