import { TheemoConfig } from '../src';
import Reader from '../src/sync/reader';
// @ts-ignore
import { HokuleaConfig } from './fixtures/hokulea-moana-theemo-config';
import { mockReader } from './helpers';

describe('Reader', () => {

  let config: TheemoConfig = HokuleaConfig as TheemoConfig;
  
  test('read into groups', async () => {
    const reader = new Reader(config.sync.reader);
    mockReader(reader);
    
    const tokens = await reader.read();

    expect(tokens.size > 0).toBeTruthy();
  });
});