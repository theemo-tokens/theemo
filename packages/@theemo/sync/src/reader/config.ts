import type { ReaderTool } from '../tool.js';

/**
 * The reader config describes the source from which tokens are read. This
 * is expressed through the `tool` property.
 *
 * See the respective tool configurations, what further properties will be used.
 */
export interface ReaderConfig {
  sources: ReaderTool | ReaderTool[];
}
