import TokenCollection from '../token-collection.js';

import type { ReaderTool, WriterTool } from './tool.js';

export default class UnknownTool implements ReaderTool, WriterTool {
  async read() {
    const tokens = await new TokenCollection();

    return tokens;
  }

  write(_tokens: TokenCollection) {
    // void implementation
  }
}
