import type { GenerateConfig } from '@theemo/build';
import type { SyncConfig } from '@theemo/sync';

/**
 * The main config to control all commands for theemo:
 *
 * - `sync`
 * - `build`
 */
export interface TheemoConfig {
  /** Config for the sync command */
  sync?: SyncConfig;

  /** Config for the build command */
  build?: GenerateConfig;
}

export function defineConfig(config: TheemoConfig) {
  return config;
}
