import ToolConfig from '../config';
import { Tools } from '../tool';
import Token from '../../token';

export interface StyleDictionaryConfig extends ToolConfig {
  writer: StyleDictionaryWriterConfig;
}

export interface StyleDictionaryWriterConfig {
  tool: Tools.StyleDictionary;
  fileForToken: (token: Token) => string;
  pathForToken: (token: Token) => string[];
  folderForGroup?: (group: string) => string;
}
