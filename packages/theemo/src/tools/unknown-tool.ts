import TokenCollection from '../token-collection';
import { ReaderTool, WriterTool } from './tool';

export default class UnknownTool implements ReaderTool, WriterTool {
  async read() {
    const tokens = await new TokenCollection();
    return tokens;
  }

  write(_tokens: TokenCollection) {
    // void implementation
  }
}
