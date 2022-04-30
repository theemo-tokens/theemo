import TokenCollection from '../../token-collection.js';
import ToolConfig from '../config.js';
import { WriterTool } from '../tool.js';
import { StyleDictionaryConfig } from './config.js';
import StyleDictionaryWriter from './writer.js';

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
