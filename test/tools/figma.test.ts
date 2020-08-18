import { TheemoConfig } from '../../src';
import { FigmaReaderConfig } from '../../src/tools/figma/config';
import FigmaReader from '../../src/tools/figma/reader';
import { BASE_VALUES, REFERENCES } from '../fixtures/hokulea';
// @ts-ignore
import { HokuleaConfig } from '../fixtures/hokulea-moana-theemo-config';
import { mockFigmaReader } from '../helpers';

describe('Figma Reader', () => {

  let config: TheemoConfig = HokuleaConfig as TheemoConfig;
  
  test('verify references', async () => {
    const reader = new FigmaReader(config.sync.reader as FigmaReaderConfig);
    mockFigmaReader(reader);

    const tokens = await reader.read();

    for (const [name, reference] of Object.entries(REFERENCES)) {
      const token = tokens.find(token => token.name === name);
      expect(token.reference).toBe(reference);
    }

    expect(tokens.size > 0).toBeTruthy();
  });

  test('values are properly resolved', async () => {
    const reader = new FigmaReader(config.sync.reader as FigmaReaderConfig);
    mockFigmaReader(reader);
    
    const tokens = await reader.read();

    for (const [tokenName, value] of Object.entries(BASE_VALUES)) {
      const token = tokens.find(token => token.name === tokenName);
      expect(token.value).toBe(value);
    }
  });
});