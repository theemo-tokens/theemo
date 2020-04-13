// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import cc from 'color-converter';
import fs from 'fs';
import path from 'path';
import WriterConfig, {
  ColorFormat,
  ColorAlphaFormat
} from '../../sync/writer/config';
import Token, { TokenColor } from '../../token';
import TokenCollection from '../../token-collection';
import { set } from '../../utils';

export default class StyleDictionaryWriter {
  private config: WriterConfig;

  constructor(config: WriterConfig) {
    this.config = config;
  }

  write(groupName: string, tokens: TokenCollection) {
    const files = this.getFiles(tokens);
    this.writeGroup(groupName, files);
  }

  private getFiles(tokens: TokenCollection) {
    const files: Map<string, TokenCollection> = new Map();

    for (const token of tokens) {
      const file = this.getFileFromToken(token);
      if (!files.has(file)) {
        files.set(file, new TokenCollection());
      }

      files.get(file)?.add(token);
    }

    return files;
  }

  private getFileFromToken(token: Token) {
    return this.config.fileForToken(token);
  }

  private writeGroup(groupName: string, files: Map<string, TokenCollection>) {
    for (const [file, tokens] of files.entries()) {
      const contents = {};
      for (const token of tokens) {
        const property = this.getPathFromToken(token);
        set(contents, property, {
          value: this.getValue(token),
          comment: token.description,
          colorScheme: token.colorScheme
        });
      }

      const fileName = path.join(this.getFolderForGroup(groupName), file);
      this.writeFile(fileName, contents);
    }
  }

  private getFolderForGroup(groupName: string) {
    return this.config.folderForGroup?.(groupName) ?? groupName;
  }

  private getPathFromToken(token: Token) {
    return this.config.pathForToken(token);
  }

  private getValue(token: Token): string {
    if (token.color) {
      return this.getColor(token.color);
    }

    if (token.shadows) {
      const shadows = [];
      for (const shadow of token.shadows) {
        shadows.push(
          `${shadow.inner ? 'inset ' : ''}${shadow.x} ${shadow.y} ${
            shadow.radius
          } ${this.getColor(shadow.color)}`
        );
      }

      return shadows.join(', ');
    }

    return token.value ?? '';
  }

  private getColor(color: TokenColor): string {
    if (color.visible === false) {
      return 'transparent';
    }

    const c = cc.fromRGBA(color.r * 255, color.g * 255, color.b * 255, color.a);

    if (c.alpha === 1) {
      switch (this.config.formats.color) {
        case ColorFormat.Rgb: {
          const { r, g, b } = c.toRGB();
          return `rgb(${r}, ${g}, ${b})`;
        }

        case ColorFormat.Hsl: {
          const { h, s, l } = c.toHSL();
          return `hsl(${h}, ${s}, ${l})`;
        }

        case ColorFormat.Hex:
        default:
          return c.toHex();
      }
    }

    switch (this.config.formats.colorAlpha) {
      case ColorAlphaFormat.Hsl: {
        const { h, s, l, a } = c.toHSLA();
        return `hsla(${h}, ${s}, ${l}, ${a})`;
      }

      case ColorAlphaFormat.Rgb:
      default: {
        const { r, g, b, a } = c.toRGBA();
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }
    }
  }

  private writeFile(file: string, data: object) {
    const target = `${path.join(
      this.getDirectory(),
      file.replace(/\./g, '/')
    )}.json`;
    const contents = JSON.stringify(data, null, '  ');
    const parent = path.dirname(target);

    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }

    fs.writeFileSync(target, contents);
  }

  private getDirectory() {
    return 'properties';
  }
}
