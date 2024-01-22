import type { GenerateConfig } from '@theemo/build';
import type { SyncConfig } from '@theemo/sync';

/**
 * The main config to control all commands for theemo:
 *
 * - `sync`
 * - `build`
 */
export interface TheemoConfig {
  /**
   * Config for the sync command
   *
   * @see [Sync Documentation](https://theemo.io/sync)
   */
  sync?: SyncConfig;

  /**
   * Config for the build command
   *
   * @see [Theming Documentation](https://theemo.io/theming)
   */
  build?: GenerateConfig;
}

/**
 * Theemo config with auto-completion support for your IDE
 *
 * @param config your config =)
 * @returns the config for `@theemo/cli`
 */
export function defineConfig(config: TheemoConfig) {
  return config;
}
