import { describe, expect, test } from '@jest/globals';

import FigmaReader from '../../../src/tools/figma/reader';
import {
  REFERENCES as MOANA_DEV_REFERENCES,
  TRANSFORMS as MOANA_DEV_TRANSFORMS,
  VALUES as MOANA_DEV_VALUES
} from '../../fixtures/hokulea/reader/moana-result-dev.js';
import {
  REFERENCES as MOANA_PROD_REFERENCES,
  STYLE_NAMES as MOANA_PROD_STYLE_NAMES,
  VALUES as MOANA_PROD_VALUES
} from '../../fixtures/hokulea/reader/moana-result-prod.js';
import {
  READER_CONFIG_DEV as HOKULEA_READER_CONFIG_DEV,
  READER_CONFIG_PROD as HOKULEA_READER_CONFIG_PROD
} from '../../fixtures/hokulea/theemo-config.js';
import {
  REFERENCES as THEEMO_DEV_REFERENCES,
  TRANSFORMS as THEEMO_DEV_TRANSFORMS,
  VALUES as THEEMO_DEV_VALUES
} from '../../fixtures/theemo-plugin/reader/theemo-result-dev.js';
import {
  REFERENCES as THEEMO_PROD_REFERENCES,
  VALUES as THEEMO_PROD_VALUES
} from '../../fixtures/theemo-plugin/reader/theemo-result-prod.js';
import {
  READER_CONFIG_DEV as THEEMO_READER_CONFIG_DEV,
  READER_CONFIG_PROD as THEEMO_READER_CONFIG_PROD
} from '../../fixtures/theemo-plugin/theemo-config.js';
import {
  mockFigmaReaderWithMoana,
  mockFigmaReaderWithTheemo
} from './utils.js';

import type { Token } from '../../../src';
import type TokenCollection from '../../../src/token-collection.js';
import type { Transforms } from '../../../src/tools/figma/referencers/theemo-plugin.js';

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

function testReferences(
  tokens: TokenCollection,
  references: Record<string, string | undefined>
) {
  const data: { name: string; expected?: string; actual?: string }[] = [];

  for (const [name, expected] of Object.entries(references)) {
    const token = tokens.find((t) => t.name === name);

    data.push({ name, expected, actual: token?.reference });
  }

  test.each(data)(
    'Reference for token "$name" to be "$expected"',
    ({ expected, actual }) => {
      expect(actual).toBe(expected);
    }
  );
}

function testValues(tokens: TokenCollection, values: Record<string, string>) {
  const data: { name: string; expected: string; actual?: string }[] = [];

  for (const [name, expected] of Object.entries(values)) {
    const token = tokens.find((t) => t.name === name);

    data.push({ name, expected, actual: token?.value });
  }

  test.each(data)(
    'Value for token "$name" to be "$expected"',
    ({ expected, actual }) => {
      expect(actual).toBe(expected);
    }
  );
}

function testTransforms(
  tokens: TokenCollection,
  transforms: Record<string, Transforms>
) {
  const data: { name: string; expected: Transforms; actual?: Transforms }[] =
    [];

  for (const [name, expected] of Object.entries(transforms)) {
    const token = tokens.find((t) => t.name === name);

    data.push({ name, expected, actual: token?.transforms });
  }

  test.each(data)('Transforms for token "$name"', ({ expected, actual }) => {
    expect(actual).toStrictEqual(expected);
  });
}

function testFigmaNames(
  tokens: TokenCollection,
  figmaNames: Record<string, string>
) {
  const data: { name: string; expected: string; actual?: string }[] = [];

  for (const [name, expected] of Object.entries(figmaNames)) {
    const token = tokens.find((t) => t.name === name);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.push({ name, expected, actual: token?.figmaName });
  }

  test.each(data)(
    'Figma Name for token "$name" to be "$expected"',
    ({ expected, actual }) => {
      expect(actual).toBe(expected);
    }
  );
}

function testSuite(
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
  return new Promise<TokenCollection>((next) => {
    new Promise<TokenCollection>((resolve) => {
      resolve(reader.read());
    }).then((tokens) => {
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

        next(tokens);
      });
    });
  });
}

// theemo plugin

describe('Theemo Plugin (prod)', () => {
  const reader = new FigmaReader(THEEMO_READER_CONFIG_PROD);

  mockFigmaReaderWithTheemo(reader);

  testSuite('Theemo Plugin (prod)', reader, {
    names: Object.keys(THEEMO_PROD_VALUES),
    values: THEEMO_PROD_VALUES,
    references: THEEMO_PROD_REFERENCES
  });
});

describe('Theemo Plugin (dev)', () => {
  const reader = new FigmaReader(THEEMO_READER_CONFIG_DEV);

  mockFigmaReaderWithTheemo(reader);

  testSuite('Theemo Plugin (dev)', reader, {
    names: Object.keys(THEEMO_DEV_VALUES),
    values: THEEMO_DEV_VALUES,
    references: THEEMO_DEV_REFERENCES,
    transforms: THEEMO_DEV_TRANSFORMS
  });
});

// moana theme

describe('Moana Theme (prod)', () => {
  const reader = new FigmaReader(HOKULEA_READER_CONFIG_PROD);

  mockFigmaReaderWithMoana(reader);

  testSuite('Moana Theme (prod)', reader, {
    names: Object.keys(MOANA_PROD_VALUES),
    values: MOANA_PROD_VALUES,
    references: MOANA_PROD_REFERENCES
  }).then((tokens) => {
    describe('contains figma names', () => {
      testFigmaNames(tokens, MOANA_PROD_STYLE_NAMES);
    });
  });
});

describe('Moana Theme (dev)', () => {
  const reader = new FigmaReader(HOKULEA_READER_CONFIG_DEV);

  mockFigmaReaderWithMoana(reader);

  testSuite('Moana Theme (dev)', reader, {
    names: Object.keys(MOANA_DEV_VALUES),
    values: MOANA_DEV_VALUES,
    references: MOANA_DEV_REFERENCES,
    transforms: MOANA_DEV_TRANSFORMS
  });
});
