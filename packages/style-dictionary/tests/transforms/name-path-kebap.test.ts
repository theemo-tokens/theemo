import { expect, test } from 'vitest';

import { transformPathToKebapName } from '../../src/transforms/name-path-kebab';
import { toTransformedToken } from '../-utils';

test('transformPathToKebapName()', () => {
  expect(
    transformPathToKebapName(
      toTransformedToken({
        path: ['hello', 'there']
      })
    )
  ).toBe('hello-there');

  expect(
    transformPathToKebapName(
      toTransformedToken({
        path: ['hello', 'there']
      }),
      { prefix: 'kenobi' }
    )
  ).toBe('kenobi-hello-there');
});
