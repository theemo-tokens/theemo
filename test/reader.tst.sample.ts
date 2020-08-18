import { TheemoConfig } from '../src';
import Reader from '../src/sync/reader';
// @ts-ignore
import { HokuleaConfig } from './fixtures/hokulea-moana-theemo-config';
import { mockFigmaReader } from './helpers';
import FigmaReader from '../src/sync/reader/figma';

describe('Reader', () => {

  let config: TheemoConfig = HokuleaConfig as TheemoConfig;
  
  test('read into groups', async () => {
    const reader = new Reader(config.sync.reader);
    mockFigmaReader(reader['adapter'] as FigmaReader);
    
    const tokens = await reader.read();

    console.log(tokens);
    

    expect(tokens.size > 0).toBeTruthy();
  });
});