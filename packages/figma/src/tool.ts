import FigmaReader from './reader.js';

import type { FigmaReaderConfig } from './config.js';
import type { ReaderTool } from '@theemo/sync';

/**
 * Reads tokens from Figma
 *
 * @param config the reader config
 * @returns Figma reader
 */
export function figmaReader(config: FigmaReaderConfig): ReaderTool {
  return {
    async read() {
      const reader = new FigmaReader(config);
      const tokens = await reader.read();

      return tokens;
    }
  };
}
