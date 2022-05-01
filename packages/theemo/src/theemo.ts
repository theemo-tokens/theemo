import GenerateCommand from './generate/index.js';
import SyncCommand from './sync/index.js';

import type TheemoConfig from './config.js';
import type GenerateConfig from './generate/config.js';
import type SyncConfig from './sync/config.js';

export default class Theemo {
  private config: TheemoConfig;

  constructor(config: TheemoConfig) {
    this.config = config;
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
