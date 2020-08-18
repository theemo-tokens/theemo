import BuildCommand from './build';
import TheemoConfig from './config';
import GenerateCommand from './generate';
import GenerateConfig from './generate/config';
import SyncCommand from './sync';
import SyncConfig from './sync/config';
import { Tools } from './tools/tool';
import { requireFile } from './utils';
import BuildConfig from './build/config';

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

  constructor() {
    this.config = this.loadConfig();
    this.package = this.loadPackage();
  }

  private loadConfig(): TheemoConfig {
    return requireFile('theemo.js');
  }

  private loadPackage(): Package {
    return requireFile('package.json');
  }

  private detectBuildTool(): Tools {
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
    if (usedConfig) {
      const command = new SyncCommand(usedConfig);
      command.execute();
    }
  }

  async build(config?: BuildConfig) {
    let usedConfig = config ?? this.config.build;

    if (!usedConfig) {
      const tool = this.detectBuildTool();
      if (tool !== Tools.Unknown) {
        usedConfig = {
          tool
        };
      }
    }

    if (usedConfig) {
      const command = new BuildCommand(usedConfig);
      command.execute();
    }
  }

  generate(config?: GenerateConfig) {
    const usedConfig = config ?? this.config.generate;
    if (usedConfig) {
      const command = new GenerateCommand(usedConfig);
      command.execute();
    }
  }
}
