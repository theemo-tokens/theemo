import { describe, expect, test } from 'vitest';

import {
  HOKULEA_INPUT_LEXER_TOKENS_DEV,
  HOKULEA_INPUT_LEXER_TOKENS_PROD,
  HOKULEA_LEXER_CONFIG,
  THEEMO_INPUT_LEXER_TOKENS_DEV,
  THEEMO_INPUT_LEXER_TOKENS_PROD,
  THEEMO_LEXER_CONFIG
} from '@theemo/fixtures';
import { TokenCollection } from '@theemo/tokens';

import { Lexer } from '../src/lexer/index.js';
import { TOKENS as HOKULEA_TOKENS_DEV } from './samples/hokulea/lexer/moana-result-dev.js';
import { TOKENS as HOKULEA_TOKENS_PROD } from './samples/hokulea/lexer/moana-result-prod.js';
import { TOKENS as THEEMO_TOKENS_DEV } from './samples/theemo-plugin/lexer/theemo-result-dev.js';
import { TOKENS as THEEMO_TOKENS_PROD } from './samples/theemo-plugin/lexer/theemo-result-prod.js';

import type { Token } from '@theemo/tokens';

function testTokens(expected: { name: string }[], actual: TokenCollection) {
  for (const expectedToken of expected) {
    const token = actual.find((t) => {
      let found = true;

      for (const [prop, value] of Object.entries(expectedToken)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        found = found && t[prop] === value;
      }

      return found;
    });

    // expect(token, `Token ${expectedToken.name} to exist`).toBeDefined();
    expect(token).toBeDefined();
  }
}

describe('Lexing tokens into contexts', () => {
  test('Source: Theemo (prod)', async () => {
    const input = new TokenCollection<Token>(THEEMO_INPUT_LEXER_TOKENS_PROD as Token[]);
    const lexer = new Lexer(THEEMO_LEXER_CONFIG);
    const tokens = lexer.analyze(input);

    testTokens(THEEMO_TOKENS_PROD, tokens);
  });

  test('Source: Theemo (dev)', async () => {
    const input = new TokenCollection<Token>(THEEMO_INPUT_LEXER_TOKENS_DEV as Token[]);
    const lexer = new Lexer(THEEMO_LEXER_CONFIG);
    const tokens = lexer.analyze(input);

    testTokens(THEEMO_TOKENS_DEV, tokens);
  });

  test('Source: Moana Theme (prod)', async () => {
    const input = new TokenCollection<Token>(HOKULEA_INPUT_LEXER_TOKENS_PROD as Token[]);
    const lexer = new Lexer(HOKULEA_LEXER_CONFIG);
    const tokens = lexer.analyze(input);

    testTokens(HOKULEA_TOKENS_PROD, tokens);
  });

  test('Source: Moana Theme (dev)', async () => {
    const input = new TokenCollection<Token>(HOKULEA_INPUT_LEXER_TOKENS_DEV as Token[]);
    const lexer = new Lexer(HOKULEA_LEXER_CONFIG);
    const tokens = lexer.analyze(input);

    testTokens(HOKULEA_TOKENS_DEV, tokens);
  });
});
