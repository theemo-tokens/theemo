import ToolFactory from '../../tools/tool-factory.js';

import type { ReaderTool } from '../../tools/tool.js';
import type ReaderConfig from './config.js';

export default class Reader {
  private config: ReaderConfig;
  private tool: ReaderTool;

  constructor(config: ReaderConfig) {
    this.config = config;
    this.tool = ToolFactory.createReader(this.config.tool, {
      reader: this.config
    });
  }

  async read() {
    return this.tool.read();
  }
}
