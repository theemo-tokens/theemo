import fs from 'node:fs';

import jp from 'jsonpath';
import mockFs from 'mock-fs';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import { type Token, TokenCollection } from '@theemo/core';
import {
  HOKULEA_INPUT_WRITER_TOKENS_DEV,
  HOKULEA_INPUT_WRITER_TOKENS_PROD,
  HOKULEA_WRITER_CONFIG,
  THEEMO_INPUT_WRITER_TOKENS_DEV,
  THEEMO_INPUT_WRITER_TOKENS_PROD,
  THEEMO_WRITER_CONFIG
} from '@theemo/fixtures';

import StyleDictionaryWriter from '../src/writer.js';
import {
  EXPECTED_FILES as HOKULEA_EXPECTED_FILES_DEV,
  TOKENS as HOKULEA_TOKENS_DEV
} from './samples/hokulea/result-dev.js';
import {
  EXPECTED_FILES as HOKULEA_EXPECTED_FILES_PROD,
  TOKENS as HOKULEA_TOKENS_PROD
} from './samples/hokulea/result-prod.js';
import {
  EXPECTED_FILES as THEEMO_EXPECTED_FILES_DEV,
  TOKENS as THEEMO_TOKENS_DEV
} from './samples/theemo-plugin/result-dev.js';
import {
  EXPECTED_FILES as THEEMO_EXPECTED_FILES_PROD,
  TOKENS as THEEMO_TOKENS_PROD
} from './samples/theemo-plugin/result-prod.js';

import type { StyleDictionaryWriterConfig } from '../src/config.js';

async function write(config: StyleDictionaryWriterConfig, tokens: Token[]) {
  const writer = new StyleDictionaryWriter(config);

  writer.write(new TokenCollection(tokens));
}

function testExistingFiles(files: string[]) {
  for (const file of files) {
    // console.log(`tokens/${file}`, fs.existsSync(`tokens/${file}`));
    expect(fs.existsSync(`tokens/${file}`)).toBeTruthy();
  }
}

interface TokenTest {
  file: string;
  path: string;
  properties: Record<string, unknown>;
}

function testSamples(samples: TokenTest[]) {
  for (const sample of samples) {
    const tokens = JSON.parse(fs.readFileSync(`tokens/${sample.file}`, { encoding: 'utf-8' }));
    const props = jp.query(tokens, `$.${sample.path}`);

    expect(props[0]).toEqual(expect.objectContaining(sample.properties));
  }
}

beforeEach(() => {
  mockFs();
});

afterEach(mockFs.restore);

describe('expected files and properties exist', () => {
  test('Source: Theemo (prod)', async () => {
    await write(THEEMO_WRITER_CONFIG, THEEMO_INPUT_WRITER_TOKENS_PROD as Token[]);

    testExistingFiles(THEEMO_EXPECTED_FILES_PROD);
    testSamples(THEEMO_TOKENS_PROD);
  });

  test('Source: Theemo (dev)', async () => {
    await write(THEEMO_WRITER_CONFIG, THEEMO_INPUT_WRITER_TOKENS_DEV as Token[]);

    testExistingFiles(THEEMO_EXPECTED_FILES_DEV);
    testSamples(THEEMO_TOKENS_DEV);
  });

  test('Hokulea (prod)', async () => {
    await write(HOKULEA_WRITER_CONFIG, HOKULEA_INPUT_WRITER_TOKENS_PROD as Token[]);

    testExistingFiles(HOKULEA_EXPECTED_FILES_PROD);
    testSamples(HOKULEA_TOKENS_PROD);
  });

  test('Hokulea (dev)', async () => {
    await write(HOKULEA_WRITER_CONFIG, HOKULEA_INPUT_WRITER_TOKENS_DEV as Token[]);

    testExistingFiles(HOKULEA_EXPECTED_FILES_DEV);
    testSamples(HOKULEA_TOKENS_DEV);
  });
});
