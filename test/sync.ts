import Tool from '../src/tools/tool';
import { TheemoConfig } from '../src';
import StyleDictionary from '../src/tools/style-dictionary';
// @ts-ignore
import HokuleaConfig from './fixtures/hokulea-moana-theemo-config';
import SyncCommand from '../src/sync';

describe('SyncCommand', () => {

  let tool: Tool;
  let config: TheemoConfig = HokuleaConfig;

  beforeEach(() => {
    tool = new StyleDictionary(config);
  })
  
  test('read into groups', () => {
    const sync = new SyncCommand(tool, config.sync);
    // sync['read'] = jest.fn().mockReturnValue
  });
});