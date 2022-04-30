import { FigmaReaderConfig } from '../../tools/figma/config.js';
import { Tools } from '../../tools/tool.js';

/**
 * The reader config describes the source from which tokens are read. This
 * is expressed through the `tool` property.
 *
 * See the respective tool configurations, what further properties will be used.
 */
type ReaderConfig = FigmaReaderConfig & {
  tool: Tools;
};

export default ReaderConfig;
