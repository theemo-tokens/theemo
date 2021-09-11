import { TheemoConfig } from '../../src';
import Lexer from '../../src/sync/lexer';
import Reader from '../../src/sync/reader';
import TokenCollection from '../../src/token-collection';
import Figma from '../../src/tools/figma';
import FigmaReader from '../../src/tools/figma/reader';
import { TOKENS as MOANA_TOKENS_DEV } from '../fixtures/hokulea/lexer/moana-result-dev';
import { TOKENS as MOANA_TOKENS_PROD } from '../fixtures/hokulea/lexer/moana-result-prod';
import { makeHokuleaConfig } from '../fixtures/hokulea/theemo-config';
import { TOKENS as THEEMO_TOKENS_DEV } from '../fixtures/theemo-plugin/lexer/theemo-result-dev';
import { TOKENS as THEEMO_TOKENS_PROD } from '../fixtures/theemo-plugin/lexer/theemo-result-prod';
import { makeTheemoPluginConfig } from '../fixtures/theemo-plugin/theemo-config';
import {
  mockFigmaReaderWithMoana,
  mockFigmaReaderWithTheemo
} from '../tools/figma/utils';

function testTokens(expected: { name: string }[], actual: TokenCollection) {
  for (const expectedToken of expected) {
    const token = actual.find(t => {
      let found = true;

      for (const [prop, value] of Object.entries(expectedToken)) {
        found = found && t[prop] === value;
      }

      return found;
    });

    expect(token, `Token ${expectedToken.name} to exist`).toBeDefined();
  }
}

describe('Sync > Lexer', () => {
  describe('Source: Theemo (prod)', () => {
    test('lexing tokens into contexts', async () => {
      const config: TheemoConfig = makeTheemoPluginConfig();
      const reader = new Reader(config.sync.reader);
      // eslint-disable-next-line dot-notation
      const figma = reader['tool'] as Figma;
      // eslint-disable-next-line dot-notation
      const figmaReader = figma['reader'] as unknown as FigmaReader;

      mockFigmaReaderWithTheemo(figmaReader);

      const raw = await reader.read();
      const lexer = new Lexer(config.sync.lexer);
      const tokens = lexer.analyze(raw);

      testTokens(THEEMO_TOKENS_PROD, tokens);
    });
  });

  describe('Source: Theemo (dev)', () => {
    test('lexing tokens into contexts', async () => {
      const config: TheemoConfig = makeTheemoPluginConfig({ dev: true });
      const reader = new Reader(config.sync.reader);
      // eslint-disable-next-line dot-notation
      const figma = reader['tool'] as Figma;
      // eslint-disable-next-line dot-notation
      const figmaReader = figma['reader'] as unknown as FigmaReader;

      mockFigmaReaderWithTheemo(figmaReader);

      const raw = await reader.read();
      const lexer = new Lexer(config.sync.lexer);
      const tokens = lexer.analyze(raw);

      testTokens(THEEMO_TOKENS_DEV, tokens);
    });
  });

  describe('Source: Moana Theme (prod)', () => {
    test('lexing tokens into contexts', async () => {
      const config: TheemoConfig = makeHokuleaConfig();
      const reader = new Reader(config.sync.reader);
      // eslint-disable-next-line dot-notation
      const figma = reader['tool'] as Figma;
      // eslint-disable-next-line dot-notation
      const figmaReader = figma['reader'] as unknown as FigmaReader;

      mockFigmaReaderWithMoana(figmaReader);

      const raw = await reader.read();
      const lexer = new Lexer(config.sync.lexer);
      const tokens = lexer.analyze(raw);

      testTokens(MOANA_TOKENS_PROD, tokens);
    });
  });

  describe('Source: Moana Theme (dev)', () => {
    test('lexing tokens into contexts', async () => {
      const config: TheemoConfig = makeHokuleaConfig({ dev: true });
      const reader = new Reader(config.sync.reader);
      // eslint-disable-next-line dot-notation
      const figma = reader['tool'] as Figma;
      // eslint-disable-next-line dot-notation
      const figmaReader = figma['reader'] as unknown as FigmaReader;

      mockFigmaReaderWithMoana(figmaReader);

      const raw = await reader.read();
      const lexer = new Lexer(config.sync.lexer);
      const tokens = lexer.analyze(raw);

      testTokens(MOANA_TOKENS_DEV, tokens);
    });
  });
});
