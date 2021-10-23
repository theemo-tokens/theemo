import TokenCollection from '../../token-collection';
import { WriterTool } from '../../tools/tool';
import ToolFactory from '../../tools/tool-factory';
import WriterConfig from './config';

export default class Writer {
  private tool: WriterTool;

  constructor(config: WriterConfig) {
    this.tool = ToolFactory.createWriter(config.tool, {
      writer: config
    });
  }

  /**
   * Writes a named set of tokens to disk
   */
  write(tokens: TokenCollection): void {
    this.tool.write(tokens);
  }
}
