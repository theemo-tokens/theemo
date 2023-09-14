import { writeFile } from 'node:fs/promises';

import { describe, test } from 'vitest';

import {
  FIXTURES_HOME,
  HOKULEA_INPUT_LEXER_TOKENS_DEV,
  HOKULEA_INPUT_LEXER_TOKENS_PROD,
  HOKULEA_LEXER_CONFIG,
  THEEMO_INPUT_LEXER_TOKENS_DEV,
  THEEMO_INPUT_LEXER_TOKENS_PROD,
  THEEMO_LEXER_CONFIG
} from '@theemo/fixtures';
import { TokenCollection } from '@theemo/tokens';

import { Lexer } from '../src/lexer/index.js';

import type { LexerConfig } from '../src/lexer/config.js';
import type { Token } from '@theemo/tokens';

async function writeTokens(tokens: TokenCollection, path: string) {
  const data = JSON.stringify([...tokens], null, '\t');

  await writeFile(path, data, 'utf8');
}

type Scenario = [string, Token[], LexerConfig, string];

const scenarios: Scenario[] = [
  [
    'Theemo (Prod)',
    THEEMO_INPUT_LEXER_TOKENS_PROD as Token[],
    THEEMO_LEXER_CONFIG,
    `${FIXTURES_HOME}/theemo-plugin/inputs/writer/tokens-prod.json`
  ],
  [
    'Theemo (Dev)',
    THEEMO_INPUT_LEXER_TOKENS_DEV as Token[],
    THEEMO_LEXER_CONFIG,
    `${FIXTURES_HOME}/theemo-plugin/inputs/writer/tokens-dev.json`
  ],
  [
    'Hokulea (Prod)',
    HOKULEA_INPUT_LEXER_TOKENS_PROD as Token[],
    HOKULEA_LEXER_CONFIG,
    `${FIXTURES_HOME}/hokulea/inputs/writer/tokens-prod.json`
  ],
  [
    'Hokulea (Dev)',
    HOKULEA_INPUT_LEXER_TOKENS_DEV as Token[],
    HOKULEA_LEXER_CONFIG,
    `${FIXTURES_HOME}/hokulea/inputs/writer/tokens-dev.json`
  ]
];

describe('Export Tokens for Writer', async () => {
  for (const [name, inputTokens, config, path] of scenarios) {
    test.skip(name, async () => {
      const input = new TokenCollection<Token>(inputTokens);
      const lexer = new Lexer(config);
      const tokens = lexer.analyze(input);

      await writeTokens(tokens, path);
    });
  }
});
