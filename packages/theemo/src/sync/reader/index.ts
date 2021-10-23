import { ReaderTool } from '../../tools/tool';
import ToolFactory from '../../tools/tool-factory';
import ReaderConfig from './config';

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
