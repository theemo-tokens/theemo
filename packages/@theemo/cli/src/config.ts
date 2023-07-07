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
}

export function defineConfig(config: TheemoConfig) {
  return config;
}
