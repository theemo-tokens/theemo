import { build } from '@theemo/build';
import { sync } from '@theemo/sync';

import type { TheemoConfig } from './config';
import type { BuildConfig } from '@theemo/build';
import type { SyncConfig } from '@theemo/sync';

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
      await sync(usedConfig);
    }
  }

  build(config?: BuildConfig): void {
    const usedConfig = config ?? this.config.build;

    if (usedConfig) {
      build(usedConfig);
    }
  }
}
