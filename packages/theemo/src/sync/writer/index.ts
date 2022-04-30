import TokenCollection from '../../token-collection.js';
import { WriterTool } from '../../tools/tool.js';
import ToolFactory from '../../tools/tool-factory.js';
import WriterConfig from './config.js';

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
