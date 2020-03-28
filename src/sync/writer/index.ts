import TokenCollection from '../../token-collection';
import Tool from '../../tools/tool';

export default class Writer {
  private tool: Tool;

  constructor(tool: Tool) {
    this.tool = tool;
  }

  /**
   * Writer delegates writing to respective tool
   */
  write(groupName: string, tokens: TokenCollection) {
    this.tool.write(groupName, tokens);
  }
}
