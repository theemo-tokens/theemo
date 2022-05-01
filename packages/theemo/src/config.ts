import type GenerateConfig from './generate/config.js';
import type SyncConfig from './sync/config.js';

/**
 * The main config to control all commands for theemo:
 *
 * - `sync`
 * - `build`
 * - `generate`
 */
export default interface TheemoConfig {
  /** Config for the sync command */
  sync?: SyncConfig;

  /** Config for the generate command */
  generate?: GenerateConfig;
}
