import type { StyleDictionaryWriterConfig } from '../../tools/style-dictionary/config.js';
import type { Tools } from '../../tools/tool.js';

/**
 * The writer config describes the way tokens are written to your disk. This
 * is expressed through the `tool` property.
 *
 * See the respective tool configurations, what further properties will be used.
 */
type WriterConfig = StyleDictionaryWriterConfig & {
  tool: Tools;
};

export default WriterConfig;
