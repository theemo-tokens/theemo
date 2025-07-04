import { TokenCollection } from '@theemo/tokens';

import {
  getTypefromStyle,
  parseColorFromStyle,
  parseShadowsFromStyle,
  parseTypographyFromStyle
} from '../figma-styles.js';

import type { FigmaParserConfigWithDefaults } from '../defaults.js';
import type { StyleColor } from '../figma-styles.js';
import type { Plugin } from '../plugin.js';
import type { FigmaToken } from '../token.js';
import type { TokenType } from '@theemo/tokens';
import type { Effect, Node, Paint, Style, StylesMap } from 'figma-api';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

type CompositeNode = Node & {
  children: Node[];
};

function isCompositeNode(node: Node): node is CompositeNode {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return node.children !== undefined;
}

export default class FigmaParser implements Plugin {
  private processedFiles = new WeakMap<GetFileResult, WeakSet<Style>>();

  declare private config: FigmaParserConfigWithDefaults;

  setup(config: FigmaParserConfigWithDefaults): void {
    this.config = config;
  }

  parse(file: GetFileResult): TokenCollection<FigmaToken> {
    return this.parseNode(file.document, file);
  }

  private parseNode(node: Node, file: GetFileResult): TokenCollection<FigmaToken> {
    let tokens = new TokenCollection<FigmaToken>();

    // parse text nodes
    if (node.type === 'TEXT') {
      const tokenFromText = this.parseTextNode(node as Node<'TEXT'>, file);

      if (tokenFromText) {
        tokens.add(tokenFromText);
      }
    }

    tokens = tokens.merge(this.parseStyles(node as Node<'TEXT'>, file));

    if (isCompositeNode(node)) {
      for (const child of node.children) {
        tokens = tokens.merge(this.parseNode(child, file));
      }
    }

    return tokens;
  }

  private parseTextNode(node: Node<'TEXT'>, file: GetFileResult) {
    if (!this.config.isTokenByText(node)) {
      return;
    }

    const token = this.createTokenFromNode(node, file);

    token.value = this.config.getValueFromText(node);
    token.type = 'content' as TokenType;

    return token;
  }

  private parseStyles(node: Node<'TEXT'>, file: GetFileResult): TokenCollection<FigmaToken> {
    const tokens = new TokenCollection<FigmaToken>();

    if (node.styles) {
      for (const type of Object.keys(node.styles)) {
        const token = this.parseStyle(node, type as keyof StylesMap, file);

        if (token) {
          tokens.add(token);
        }
      }
    }

    return tokens;
  }

  private parseStyle(
    node: Node<'TEXT'>,
    type: keyof StylesMap,
    file: GetFileResult
  ): FigmaToken | undefined {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = node.styles![type];
    const style = this.getStyle(id, file);

    if (!this.processedFiles.has(file)) {
      this.processedFiles.set(file, new WeakSet());
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const processedStyles = this.processedFiles.get(file)!;

    if (processedStyles.has(style) || !this.config.isTokenByStyle(style)) {
      return;
    }

    processedStyles.add(style);

    const token = this.createTokenFromStyle(style, node, file);

    token.figma.file = file;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    token.type = getTypefromStyle(style)!;
    token.description = style.description;

    // also look for the value
    // `type` can be for example: `stroke` _or_ `strokes`
    // add the `s` and replace a possible `ss` to `s`
    // that way ensure, this is the plural version of `type`
    // which is also the key in the node
    const key = `${type}s`.replace('ss', 's') as keyof Node<'TEXT'> & 'texts';

    // fill - color swatch
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (key === 'fills' && node[key]) {
      token.value = parseColorFromStyle(
        this.getColorFromPaint(node[key] as Paint[]),
        this.config.formats
      );
    }

    // stroke - somewhere used as border
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    else if (key === 'strokes' && node[key]) {
      token.value = parseColorFromStyle(
        this.getColorFromPaint(node[key] as Paint[]),
        this.config.formats
      );
    }

    // effect - shadows
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    else if (key === 'effects' && node[key]) {
      const shadows = parseShadowsFromStyle(node[key] as Effect[], this.config.formats);

      token.value = shadows;
    }

    // typography
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    else if (key === 'texts' && node.style) {
      const typo = parseTypographyFromStyle(node.style);

      token.value = typo;
    }

    return token;
  }

  private getColorFromPaint(paint: Paint[]): StyleColor {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {
      ...paint[0].color,
      visible: paint[0].visible ?? true
    };
  }

  private getStyle(id: string, file: GetFileResult) {
    return file.styles[id] as Style & { description: string };
  }

  private createTokenFromNode(node: Node<'TEXT'>, file: GetFileResult): FigmaToken {
    const token: FigmaToken = {
      name: this.config.getNameFromText(node),
      figma: {
        file,
        node
      }
    };

    return token;
  }

  private createTokenFromStyle(style: Style, node: Node, file: GetFileResult): FigmaToken {
    const token: FigmaToken = {
      name: this.config.getNameFromStyle(style),
      figma: {
        file,
        node,
        style
      }
    };

    return token;
  }
}
