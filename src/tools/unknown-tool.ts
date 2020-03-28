import Tool from './tool';
import TokenCollection from '../token-collection';

export default class UnknownTool implements Tool {
  build() {}

  write(_groupName: string, _tokens: TokenCollection) {}
}
