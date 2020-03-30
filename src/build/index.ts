import Tool from '../tools/tool';

export default class BuildCommand {
  private tool: Tool;

  constructor(tool: Tool) {
    this.tool = tool;
  }

  execute() {
    this.tool.build();
  }
}
