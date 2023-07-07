import { describe, expect, test } from 'vitest';

import {
  HOKULEA_FIGMA_READER_CONFIG_DEV,
  HOKULEA_FIGMA_READER_CONFIG_PROD,
  THEEMO_FIGMA_READER_CONFIG_DEV,
  THEEMO_FIGMA_READER_CONFIG_PROD
} from '@theemo/fixtures';

import {
  REFERENCES as MOANA_DEV_REFERENCES,
  TRANSFORMS as MOANA_DEV_TRANSFORMS,
  VALUES as MOANA_DEV_VALUES
} from './samples/hokulea/moana-result-dev.js';
import {
  REFERENCES as MOANA_PROD_REFERENCES,
  STYLE_NAMES as MOANA_PROD_STYLE_NAMES,
  VALUES as MOANA_PROD_VALUES
} from './samples/hokulea/moana-result-prod.js';
import {
  REFERENCES as THEEMO_DEV_REFERENCES,
  TRANSFORMS as THEEMO_DEV_TRANSFORMS,
  VALUES as THEEMO_DEV_VALUES
} from './samples/theemo-plugin/theemo-result-dev.js';
import {
  REFERENCES as THEEMO_PROD_REFERENCES,
  VALUES as THEEMO_PROD_VALUES
} from './samples/theemo-plugin/theemo-result-prod.js';
import { createReaderMockWithMoana, createReaderMockWithTheemo } from './utils.js';

import type { Transforms } from '../src/plugins/theemo.js';
import type FigmaReader from '../src/reader.js';
import type { Token, TokenCollection } from '@theemo/core';

function testNames(tokens: TokenCollection, names: string[]) {
  const data: { name: string; token?: Token }[] = [];

  for (const name of names) {
    const token = tokens.find((t) => t.name === name);

    data.push({ name, token });
  }

  test.each(data)('Token "$name" exists', ({ token }) => {
    expect(token).toBeDefined();
  });
}

function testReferences(tokens: TokenCollection, references: Record<string, string | undefined>) {
  const data: { name: string; expected?: string; actual?: string }[] = [];

  for (const [name, expected] of Object.entries(references)) {
    const token = tokens.find((t) => t.name === name);

    data.push({ name, expected, actual: token?.reference });
  }

  test.each(data)('Reference for token "$name" to be "$expected"', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
}

function testValues(tokens: TokenCollection, values: Record<string, string>) {
  const data: { name: string; expected: string; actual?: string }[] = [];

  for (const [name, expected] of Object.entries(values)) {
    const token = tokens.find((t) => t.name === name);

    data.push({ name, expected, actual: token?.value });
  }

  test.each(data)('Value for token "$name" to be "$expected"', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
}

function testTransforms(tokens: TokenCollection, transforms: Record<string, Transforms>) {
  const data: { name: string; expected: Transforms; actual?: Transforms }[] = [];

  for (const [name, expected] of Object.entries(transforms)) {
    const token = tokens.find((t) => t.name === name);

    data.push({ name, expected, actual: token?.transforms });
  }

  test.each(data)('Transforms for token "$name"', ({ expected, actual }) => {
    expect(actual).toStrictEqual(expected);
  });
}

function testFigmaNames(tokens: TokenCollection, figmaNames: Record<string, string>) {
  const data: { name: string; expected: string; actual?: string }[] = [];

  for (const [name, expected] of Object.entries(figmaNames)) {
    const token = tokens.find((t) => t.name === name);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.push({ name, expected, actual: token?.figmaName });
  }

  test.each(data)('Figma Name for token "$name" to be "$expected"', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
}

async function testSuite(
  name: string,
  reader: FigmaReader,
  {
    names,
    values,
    references,
    transforms
  }: {
    names: string[];
    values: Record<string, string>;
    references: Record<string, string | undefined>;
    transforms?: Record<string, Transforms>;
  }
) {
  const tokens = await reader.read();

  describe(`Suite: ${name}`, () => {
    test('has tokens', () => {
      expect(tokens.size > 0).toBeTruthy();
    });

    describe('contains all tokens', () => {
      testNames(tokens, names);
    });

    describe('has references', () => {
      testReferences(tokens, references);
    });

    describe('has values', () => {
      testValues(tokens, values);
    });

    if (transforms) {
      describe('has transforms', () => {
        testTransforms(tokens, transforms);
      });
    }
  });

  return tokens;
}

// theemo plugin

describe('Theemo Plugin (prod)', async () => {
  const reader = createReaderMockWithTheemo(THEEMO_FIGMA_READER_CONFIG_PROD);

  await testSuite('Theemo Plugin (prod)', reader, {
    names: Object.keys(THEEMO_PROD_VALUES),
    values: THEEMO_PROD_VALUES,
    references: THEEMO_PROD_REFERENCES
  });
});

describe('Theemo Plugin (dev)', async () => {
  const reader = createReaderMockWithTheemo(THEEMO_FIGMA_READER_CONFIG_DEV);

  await testSuite('Theemo Plugin (dev)', reader, {
    names: Object.keys(THEEMO_DEV_VALUES),
    values: THEEMO_DEV_VALUES,
    references: THEEMO_DEV_REFERENCES,
    transforms: THEEMO_DEV_TRANSFORMS
  });
});

// moana theme

describe('Moana Theme (prod)', async () => {
  const reader = createReaderMockWithMoana(HOKULEA_FIGMA_READER_CONFIG_PROD);

  const tokens = await testSuite('Moana Theme (prod)', reader, {
    names: Object.keys(MOANA_PROD_VALUES),
    values: MOANA_PROD_VALUES,
    references: MOANA_PROD_REFERENCES
  });

  describe('contains figma names', () => {
    testFigmaNames(tokens, MOANA_PROD_STYLE_NAMES);
  });
});

describe('Moana Theme (dev)', async () => {
  const reader = createReaderMockWithMoana(HOKULEA_FIGMA_READER_CONFIG_DEV);

  await testSuite('Moana Theme (dev)', reader, {
    names: Object.keys(MOANA_DEV_VALUES),
    values: MOANA_DEV_VALUES,
    references: MOANA_DEV_REFERENCES,
    transforms: MOANA_DEV_TRANSFORMS
  });
});
