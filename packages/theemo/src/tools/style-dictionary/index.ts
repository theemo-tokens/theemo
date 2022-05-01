import StyleDictionaryWriter from './writer.js';

import type TokenCollection from '../../token-collection.js';
import type ToolConfig from '../config.js';
import type { WriterTool } from '../tool.js';
import type { StyleDictionaryConfig } from './config.js';

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
