import { build } from '@theemo/build';
import { SyncCommand, type SyncConfig } from '@theemo/sync';

import type { TheemoConfig } from './config.js';
import type { GenerateConfig } from '@theemo/build';

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

  build(config?: GenerateConfig): void {
    const usedConfig = config ?? this.config.build;

    if (usedConfig) {
      build(usedConfig);
    }
  }
}
