import type { WriterTool } from '../tool.js';

/**
 * The writer config describes the way tokens are written to your disk. This
 * is expressed through the `tool` property.
 *
 * See the respective tool configurations, what further properties will be used.
 */
export interface WriterConfig {
  /** One or many targets to write tokens to */
  targets: WriterTool | WriterTool[];
}
