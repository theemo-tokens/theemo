import { StyleDictionaryWriterConfig } from '../../tools/style-dictionary/config';
import { Tools } from '../../tools/tool';

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
