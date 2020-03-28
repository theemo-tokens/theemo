import Tool, { Tools } from './tool';
import StyleDictionary from './style-dictionary';
import UnknownTool from './unknown-tool';
import TheemoConfig from '../config';

export default class ToolFactory {
  static create(tool: Tools, config: TheemoConfig): Tool {
    switch (tool) {
      case Tools.StyleDictionary:
        return new StyleDictionary(config);

      case Tools.Unknown:
      default:
        return new UnknownTool();
    }
  }
}
