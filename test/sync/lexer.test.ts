import { TheemoConfig } from '../../src';
import Lexer from '../../src/sync/lexer';
import Reader from '../../src/sync/reader';
import FigmaReader from '../../src/tools/figma';
import { BASE_VALUES, GROUPS } from '../fixtures/hokulea';
// @ts-ignore
import { HokuleaConfig } from '../fixtures/hokulea-moana-theemo-config';
import { mockFigmaReader } from '../helpers';

describe('Lexer', () => {
  let config: TheemoConfig = HokuleaConfig as TheemoConfig;
  
  test('read into groups', async () => {
    const reader = new Reader(config.sync.reader);
    mockFigmaReader(reader['tool']['reader'] as FigmaReader);
    
    const tokens = await reader.read();
    const lexer = new Lexer(config.sync.lexer);
    const groups = lexer.analyze(tokens);

    expect([...groups.keys()]).toStrictEqual(['base', 'dark', 'light']);

    for (const [groupName, tokenNames] of Object.entries(GROUPS)) {
      const group = groups.get(groupName);

      for (const tokenName of tokenNames) {
        const token = group.find(token => token.name === tokenName);
        expect(token).toBeTruthy();
      }
    }
  });

  test('values are properly resolved', async () => {
    const reader = new Reader(config.sync.reader);
    mockFigmaReader(reader['tool']['reader'] as FigmaReader);
    
    const tokens = await reader.read();
    const lexer = new Lexer(config.sync.lexer);
    const groups = lexer.analyze(tokens);
    const base = groups.get('base');

    for (const [tokenName, value] of Object.entries(BASE_VALUES)) {
      const token = base.find(token => token.name === tokenName);
      expect(token.value).toBe(value);
    }
  });
});