import ToolConfig from '../config';
import { ReaderTool } from '../tool';
import { FigmaConfig } from './config';
import FigmaReader from './reader';

export default class Figma implements ReaderTool {
  private config: FigmaConfig;
  private reader: FigmaReader;

  constructor(config: ToolConfig) {
    this.config = config as FigmaConfig;
    this.reader = new FigmaReader(this.config.reader);
  }

  async read() {
    return this.reader.read();
  }
}
