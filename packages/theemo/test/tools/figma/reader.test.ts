import FigmaReader from '../../../src/tools/figma/reader';
import {
  REFERENCES as MOANA_DEV_REFERENCES,
  TRANSFORMS as MOANA_DEV_TRANSFORMS,
  VALUES as MOANA_DEV_VALUES
} from '../../fixtures/hokulea/reader/moana-result-dev';
import {
  REFERENCES as MOANA_PROD_REFERENCES,
  VALUES as MOANA_PROD_VALUES
} from '../../fixtures/hokulea/reader/moana-result-prod';
import {
  READER_CONFIG_DEV as HOKULEA_READER_CONFIG_DEV,
  READER_CONFIG_PROD as HOKULEA_READER_CONFIG_PROD
} from '../../fixtures/hokulea/theemo-config';
import {
  REFERENCES as THEEMO_DEV_REFERENCES,
  TRANSFORMS as THEEMO_DEV_TRANSFORMS,
  VALUES as THEEMO_DEV_VALUES
} from '../../fixtures/theemo-plugin/reader/theemo-result-dev';
import {
  REFERENCES as THEEMO_PROD_REFERENCES,
  VALUES as THEEMO_PROD_VALUES
} from '../../fixtures/theemo-plugin/reader/theemo-result-prod';
import {
  READER_CONFIG_DEV as THEEMO_READER_CONFIG_DEV,
  READER_CONFIG_PROD as THEEMO_READER_CONFIG_PROD
} from '../../fixtures/theemo-plugin/theemo-config';
import { mockFigmaReaderWithMoana, mockFigmaReaderWithTheemo } from './utils';

import type TokenCollection from '../../../src/token-collection';
import type { Transforms } from '../../../src/tools/figma/referencers/theemo-plugin';

function testNames(tokens: TokenCollection, names: string[]) {
  for (const name of names) {
    const token = tokens.find((t) => t.name === name);

    expect(token, `Token ${name} exists`).toBeDefined();
  }

  expect(tokens.size > 0).toBeTruthy();
}

function testReferences(
  tokens: TokenCollection,
  references: Record<string, string>
) {
  for (const [name, reference] of Object.entries(references)) {
    const token = tokens.find((t) => t.name === name);

    expect(
      token.reference,
      `Reference for token '${token.name}'`
    ).toStrictEqual(reference);
  }

  expect(tokens.size > 0).toBeTruthy();
}

function testValues(tokens: TokenCollection, values: Record<string, string>) {
  for (const [tokenName, value] of Object.entries(values)) {
    const token = tokens.find((t) => t.name === tokenName);

    expect(token.value, `Value for token '${token.name}'`).toBe(value);
  }
}

function testTransforms(
  tokens: TokenCollection,
  transforms: Record<string, Transforms>
) {
  for (const [tokenName, value] of Object.entries(transforms)) {
    const token = tokens.find((t) => t.name === tokenName);

    expect(
      token.transforms,
      `Transforms for token '${token.name}'`
    ).toStrictEqual(value);
  }
}

function testProd(
  reader: FigmaReader,
  {
    names,
    values,
    references
  }: {
    names: string[];
    values: Record<string, string>;
    references: Record<string, string>;
  }
) {
  test('it contains all tokens', async () => {
    const tokens = await reader.read();

    testNames(tokens, names);
  });

  test('it has the proper references', async () => {
    const tokens = await reader.read();

    testReferences(tokens, references);
  });

  test('it has the proper values', async () => {
    const tokens = await reader.read();

    testValues(tokens, values);
  });
}

function testDev(
  reader: FigmaReader,
  {
    names,
    values,
    references,
    transforms
  }: {
    names: string[];
    values: Record<string, string>;
    references: Record<string, string>;
    transforms: Record<string, Transforms>;
  }
) {
  testProd(reader, {
    names,
    values,
    references
  });

  test('it has transforms', async () => {
    const tokens = await reader.read();

    testTransforms(tokens, transforms);
  });
}

describe('Tool: Figma > Reader', () => {
  describe('Source: Theemo Plugin (prod)', () => {
    const reader = new FigmaReader(THEEMO_READER_CONFIG_PROD);

    mockFigmaReaderWithTheemo(reader);

    testProd(reader, {
      names: Object.keys(THEEMO_PROD_VALUES),
      values: THEEMO_PROD_VALUES,
      references: THEEMO_PROD_REFERENCES
    });
  });

  describe('Source: Theemo Plugin (dev)', () => {
    const reader = new FigmaReader(THEEMO_READER_CONFIG_DEV);

    mockFigmaReaderWithTheemo(reader);

    testDev(reader, {
      names: Object.keys(THEEMO_DEV_VALUES),
      values: THEEMO_DEV_VALUES,
      references: THEEMO_DEV_REFERENCES,
      transforms: THEEMO_DEV_TRANSFORMS
    });
  });

  describe('Source: Moana Theme (prod)', () => {
    const reader = new FigmaReader(HOKULEA_READER_CONFIG_PROD);

    mockFigmaReaderWithMoana(reader);

    testProd(reader, {
      names: Object.keys(MOANA_PROD_VALUES),
      values: MOANA_PROD_VALUES,
      references: MOANA_PROD_REFERENCES
    });
  });

  describe('Source: Moana Theme (dev)', () => {
    const reader = new FigmaReader(HOKULEA_READER_CONFIG_DEV);

    mockFigmaReaderWithMoana(reader);

    testDev(reader, {
      names: Object.keys(MOANA_DEV_VALUES),
      values: MOANA_DEV_VALUES,
      references: MOANA_DEV_REFERENCES,
      transforms: MOANA_DEV_TRANSFORMS
    });
  });
});
