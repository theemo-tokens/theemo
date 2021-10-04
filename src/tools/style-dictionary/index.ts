import TokenCollection from '../../token-collection';
import ToolConfig from '../config';
import { WriterTool } from '../tool';
import { StyleDictionaryConfig } from './config';
import StyleDictionaryWriter from './writer';

export default class StyleDictionary implements WriterTool {
  private config: StyleDictionaryConfig;

  constructor(config: ToolConfig) {
    this.config = config as StyleDictionaryConfig;
  }

  write(tokens: TokenCollection) {
    const writer = new StyleDictionaryWriter(this.config.writer);
    writer.write(tokens);
  }
}
