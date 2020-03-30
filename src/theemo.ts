import BuildCommand from './build';
import TheemoConfig from './config';
import GenerateCommand from './generate';
import GenerateConfig from './generate/config';
import SyncCommand from './sync';
import SyncConfig from './sync/config';
import Tool, { Tools } from './tools/tool';
import ToolFactory from './tools/tool-factory';
import { requireFile } from './utils';

interface Package {
  name: string;
  dependencies: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
}

export default class Theemo {
  private config: TheemoConfig;
  private package: Package;
  private tool: Tool;

  constructor() {
    this.config = this.loadConfig();
    this.package = this.loadPackage();

    const tool = this.detectTool();
    this.tool = ToolFactory.create(tool, this.config);
  }

  private loadConfig(): TheemoConfig {
    return requireFile('theemo.js');
  }

  private loadPackage(): Package {
    return requireFile('package.json');
  }

  private detectTool(): Tools {
    const deps = {
      ...this.package.dependencies,
      ...this.package.devDependencies
    };

    if (Object.keys(deps).includes('style-dictionary')) {
      return Tools.StyleDictionary;
    }

    return Tools.Unknown;
  }

  async sync(config?: SyncConfig) {
    const usedConfig = config ?? this.config.sync;
    const command = new SyncCommand(this.tool, usedConfig);
    command.execute();
  }

  async build() {
    const command = new BuildCommand(this.tool);
    command.execute();
  }

  generate(config?: GenerateConfig) {
    const usedConfig = config ?? this.config.generate;
    if (usedConfig) {
      const command = new GenerateCommand(usedConfig);
      command.execute();
    }
  }
}
