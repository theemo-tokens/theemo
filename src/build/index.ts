import ToolConfig from '../tools/config';
import { BuilderTool } from '../tools/tool';
import ToolFactory from '../tools/tool-factory';
import BuildConfig from './config';

export default class BuildCommand {
  private tool: BuilderTool;

  constructor(config: BuildConfig) {
    this.tool = ToolFactory.createBuilder(config.tool, config as ToolConfig);
  }

  execute() {
    this.tool.build();
  }
}
