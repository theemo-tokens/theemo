import { expect, test } from 'vitest';

import { copyAttributeConstraints } from '../../src/transforms/attribute-constraints';
import { toTransformedToken } from '../-utils';

test('copyAttributeConstraints()', () => {
  const constraints = {
    features: {
      'color-scheme': 'light'
    }
  };

  expect(
    copyAttributeConstraints(toTransformedToken({}), {
      constraints
    })
  ).toStrictEqual({ constraints });

  expect(copyAttributeConstraints(toTransformedToken({}), {})).toStrictEqual({});
});
