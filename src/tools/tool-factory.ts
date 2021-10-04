import ToolConfig from './config';
import Figma from './figma';
import StyleDictionary from './style-dictionary';
import { ReaderTool, Tools, WriterTool } from './tool';
import UnknownTool from './unknown-tool';

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
