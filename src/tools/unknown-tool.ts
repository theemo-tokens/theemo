import TokenCollection from '../token-collection';
import { ReaderTool, WriterTool, BuilderTool } from './tool';

export default class UnknownTool
  implements ReaderTool, WriterTool, BuilderTool {
  async read() {
    const tokens = await new TokenCollection();
    return tokens;
  }

  build() {
    // void implementation
  }

  write(_name: string, _tokens: TokenCollection) {
    // void implementation
  }
}
