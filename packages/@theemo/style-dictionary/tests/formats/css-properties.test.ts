import { expect, test } from 'vitest';

import { formatTokenIntoCSSProperty } from '../../src/formats/css-properties';
import { toTransformedToken } from '../-utils';

test('color token', () => {
  expect(
    formatTokenIntoCSSProperty(
      toTransformedToken({
        name: 'color-blue',
        value: 'blue',
        type: 'color'
      })
    )
  ).toBe(
    '@property --color-blue {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: blue;\n}'
  );
});

test('number token', () => {
  expect(
    formatTokenIntoCSSProperty(
      toTransformedToken({
        name: 'sizing-ratio',
        value: 1.2,
        type: 'number'
      })
    )
  ).toBe(
    '@property --sizing-ratio {\n  syntax: "<number>";\n  inherits: true;\n  initial-value: 1.2;\n}'
  );
});

test('dimension token', () => {
  expect(
    formatTokenIntoCSSProperty(
      toTransformedToken({
        name: 's0',
        value: '16px',
        type: 'dimension'
      })
    )
  ).toBe('@property --s0 {\n  syntax: "<length>";\n  inherits: true;\n  initial-value: 16px;\n}');
});

test('duration token', () => {
  expect(
    formatTokenIntoCSSProperty(
      toTransformedToken({
        name: 'fade-in',
        value: '100ms',
        type: 'duration'
      })
    )
  ).toBe(
    '@property --fade-in {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 100ms;\n}'
  );
});
