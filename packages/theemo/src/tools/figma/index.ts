import FigmaReader from './reader.js';

import type Token from '../../token.js';
import type TokenCollection from '../../token-collection.js';
import type ToolConfig from '../config.js';
import type { ReaderTool } from '../tool.js';
import type { FigmaConfig } from './config.js';

export default class Figma implements ReaderTool {
  private config: FigmaConfig;
  private reader: FigmaReader;

  constructor(config: ToolConfig) {
    this.config = config as FigmaConfig;
    this.reader = new FigmaReader(this.config.reader);
  }

  async read(): Promise<TokenCollection<Token>> {
    return this.reader.read();
  }
}
