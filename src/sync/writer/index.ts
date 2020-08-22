import TokenCollection from '../../token-collection';
import { WriterTool } from '../../tools/tool';
import ToolFactory from '../../tools/tool-factory';
import WriterConfig from './config';

export default class Writer {
  private tool: WriterTool;

  constructor(config: WriterConfig) {
    // this.config = config;
    this.tool = ToolFactory.createWriter(config.tool, {
      writer: config
    });
  }

  /**
   * Writer delegates writing to respective tool
   */
  write(groupName: string, tokens: TokenCollection): void {
    this.tool.write(groupName, tokens);
  }
}
