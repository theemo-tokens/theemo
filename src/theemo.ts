import BuildConfig from './build/config';
import BuildCommand from './build/index';
import TheemoConfig from './config';
import GenerateConfig from './generate/config';
import GenerateCommand from './generate/index';
import SyncConfig from './sync/config';
import SyncCommand from './sync/index';
import { Tools } from './tools/tool';
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

  constructor() {
    this.config = this.loadConfig();
    this.package = this.loadPackage();
  }

  private loadConfig(): TheemoConfig {
    return requireFile('theemo.js') as TheemoConfig;
  }

  private loadPackage(): Package {
    return requireFile('package.json') as Package;
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

  /**
   * Executes the sync command
   *
   * @param config the config for sync
   */
  async sync(config?: SyncConfig): Promise<void> {
    const usedConfig = config ?? this.config.sync;
    if (usedConfig) {
      const command = new SyncCommand(usedConfig);
      command.execute();
    }
  }

  /**
   * Executes the build command
   *
   * @param config the config for build (if it cannot be auto-detected)
   */
  async build(config?: BuildConfig): Promise<void> {
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

  /**
   * Executes the generate command
   *
   * @param config the config for generation
   */
  generate(config?: GenerateConfig): void {
    const usedConfig = config ?? this.config.generate;
    if (usedConfig) {
      const command = new GenerateCommand(usedConfig);
      command.execute();
    }
  }
}
