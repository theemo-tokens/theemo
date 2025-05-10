import { expect, test } from 'vitest';

import { transformTheemoAttributes } from '../../src/transforms/theemo-attributes';
import { toTransformedToken } from '../-utils';

test('transformTheemoAttributes()', () => {
  const constraints = {
    features: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'color-scheme': 'light'
    }
  };

  expect(
    transformTheemoAttributes(toTransformedToken({}), {
      constraints
    })
  ).toStrictEqual({ constraints });

  expect(transformTheemoAttributes(toTransformedToken({}), {})).toStrictEqual({});
});
