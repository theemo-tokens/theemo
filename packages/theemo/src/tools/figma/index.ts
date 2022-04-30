import Token from '../../token.js';
import TokenCollection from '../../token-collection.js';
import ToolConfig from '../config.js';
import { ReaderTool } from '../tool.js';
import { FigmaConfig } from './config.js';
import FigmaReader from './reader.js';

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
