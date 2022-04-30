import ToolConfig from './config.js';
import Figma from './figma/index.js';
import StyleDictionary from './style-dictionary/index.js';
import { ReaderTool, Tools, WriterTool } from './tool.js';
import UnknownTool from './unknown-tool.js';

export default class ToolFactory {
  static createReader(tool: Tools, config: ToolConfig): ReaderTool {
    switch (tool) {
      case Tools.Figma:
        return new Figma(config);

      case Tools.Unknown:
      default:
        return new UnknownTool();
    }
  }

  static createWriter(tool: Tools, config: ToolConfig): WriterTool {
    switch (tool) {
      case Tools.StyleDictionary:
        return new StyleDictionary(config);

      case Tools.Unknown:
      default:
        return new UnknownTool();
    }
  }
}
