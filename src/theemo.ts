import TheemoConfig from './config';
import GenerateConfig from './generate/config';
import GenerateCommand from './generate/index';
import SyncConfig from './sync/config';
import SyncCommand from './sync/index';
import { requireFile } from './utils';

export default class Theemo {
  private config: TheemoConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): TheemoConfig {
    return requireFile('theemo.js') as TheemoConfig;
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
