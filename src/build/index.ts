import BuildConfig from './config';
import ToolFactory from '../tools/tool-factory';
import ToolConfig from '../tools/config';
import { BuilderTool } from '../tools/tool';

export default class BuildCommand {
  private tool: BuilderTool;

  constructor(config: BuildConfig) {
    this.tool = ToolFactory.createBuilder(config.tool, config as ToolConfig);
  }

  execute() {
    this.tool.build();
  }
}
