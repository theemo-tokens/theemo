import { EffectType } from 'figma-api';

import { TokenCollection } from '@theemo/core';

import { getTypefromStyle } from './token.js';

import type { ColorNode, FigmaReaderConfig, ShadowNode } from './config.js';
import type { Plugin } from './plugin.js';
import type { FigmaToken } from './token.js';
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

// function isVectorNode(node: Node) {
//   return [
//     'VECTOR',
//     'FRAME',
//     'BOOLEAN',
//     'BOOLEAN_OPERATION',
//     'STAR',
//     'LINE',
//     'ELLIPSE',
//     'REGULAR_POLYGON',
//     'RECTANGLE',
//     'TEXT'
//   ].includes(node.type);
// }

export default class FigmaParser {
  private file: GetFileResult;
  private plugins: Plugin[];
  private config: Required<FigmaReaderConfig>;

  private tokens!: TokenCollection<FigmaToken>;
  private processedStyles: WeakSet<Style> = new WeakSet();

  constructor(file: GetFileResult, plugins: Plugin[], config: Required<FigmaReaderConfig>) {
    this.file = file;
    this.plugins = plugins;
    this.config = config;
  }

  parse(): TokenCollection<FigmaToken> {
    this.tokens = new TokenCollection();
    this.parseNode(this.file.document);

    return this.tokens;
  }

  private parseNode(node: Node) {
    // parse text nodes
    if (node.type === 'TEXT') {
      this.parseTextNode(node as Node<'TEXT'>);
    }

    this.parseStyles(node as Node<'VECTOR'>);

    if (isCompositeNode(node)) {
      for (const child of node.children) {
        this.parseNode(child);
      }
    }
  }

  private parseTextNode(node: Node<'TEXT'>) {
    if (!this.config.isTokenByText(node)) {
      return;
    }

    const token = this.createTokenFromNode(node);

    token.value = this.config.getValueFromText(node);
    token.type = 'content';

    this.tokens.add(token);
  }

  private parseStyles(node: Node<'VECTOR'>) {
    if (node.styles) {
      for (const type of Object.keys(node.styles)) {
        const token = this.parseStyle(node, type as keyof StylesMap);

        if (token) {
          this.tokens.add(token);
        }
      }
    }
  }

  private parseStyle(node: Node<'VECTOR'>, type: keyof StylesMap): FigmaToken | undefined {
    const id = (node.styles as StylesMap)[type];
    const style = this.getStyle(id);

    // styles don't match by type (because used somewhere else)
    // let's return
    // if (style.styleType.toLowerCase() !== type) {
    //   return;
    // }

    if (this.processedStyles.has(style) || !this.config.isTokenByStyle(style)) {
      return;
    }

    this.processedStyles.add(style);

    const token = this.createTokenFromStyle(style, node);

    token.type = getTypefromStyle(style);
    token.description = style.description;

    // run plugins parseStyle
    // @TODO this might not be enough for an API. Might require the the file id
    // to be present
    for (const plugin of this.plugins) {
      plugin.parseStyle?.(token, style);
    }

    // also look for the value
    // `type` can be for example: `stroke` _or_ `strokes`
    // add the `s` and replace a possible `ss` to `s`
    // that way ensure, this is the plural version of `type`
    // which is also the key in the node
    let key = `${type}s`.replace('ss', 's') as keyof Node<'VECTOR'>;

    // fill - color swatch
    if (key === 'fills' && node[key]) {
      token.color = this.getColorFromPaint(node[key] as Paint[]);
    }

    // stroke - somewhere used as border
    else if (key === 'strokes' && node[key]) {
      token.color = this.getColorFromPaint(node[key] as Paint[]);
    }

    // effect - shadows
    else if (key === 'effects' && node[key]) {
      const shadows = this.getShadowsFromEffect(node[key] as Effect[]);

      if (shadows.length > 0) {
        token.shadows = shadows;
      }
    }

    return token;
  }

  private getShadowsFromEffect(effects: Effect[]) {
    const shadows: ShadowNode[] = [];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const effect of effects) {
      if (
        effect.visible &&
        (effect.type === EffectType.DROP_SHADOW || effect.type === EffectType.INNER_SHADOW)
      ) {
        shadows.push({
          inner: effect.type === EffectType.INNER_SHADOW,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          color: { ...effect.color, visible: true },
          x: effect.offset?.x ?? 0,
          y: effect.offset?.y ?? 0,
          radius: effect.radius
        });
      }
    }

    return shadows;
  }

  private getColorFromPaint(paint: Paint[]): ColorNode {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {
      ...paint[0].color,
      visible: paint[0].visible ?? true
    };
  }

  private getStyle(id: string) {
    return this.file.styles[id] as Style & { description: string };
  }

  private createTokenFromNode(node: Node<'TEXT'>): FigmaToken {
    const token: FigmaToken = {
      figmaName: node.name,
      name: this.config.getNameFromText(node),
      node
    };

    return token;
  }

  private createTokenFromStyle(style: Style, node: Node): FigmaToken {
    const token: FigmaToken = {
      figmaName: style.name,
      name: this.config.getNameFromStyle(style),
      node,
      style
    };

    return token;
  }
}
