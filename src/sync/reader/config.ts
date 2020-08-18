import { FigmaReaderConfig } from '../../tools/figma/config';
import { Tools } from '../../tools/tool';

// Reader Config
type ReaderConfig = FigmaReaderConfig & {
  tool: Tools;
};

export default ReaderConfig;
