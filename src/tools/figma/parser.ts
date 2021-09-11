import { Effect, EffectType, Node, Paint, Style, StylesMap } from 'figma-api';
import { GetFileResult } from 'figma-api/lib/api-types';

import TokenCollection from '../../token-collection';
import { ColorNode, FigmaReaderConfig, ShadowNode } from './config';
import Referencer from './referencers/referencer';
import { FigmaToken } from './token';

type CompositeNode = Node & {
  children: Node[];
};

function isCompositeNode(node: Node) {
  return [
    'DOCUMENT',
    'FRAME',
    'GROUP',
    'CANVAS',
    'BOOLEAN',
    'BOOLEAN_OPERATION',
    'COMPONENT'
  ].includes(node.type);
}

function isVectorNode(node: Node) {
  return [
    'VECTOR',
    'BOOLEAN',
    'BOOLEAN_OPERATION',
    'STAR',
    'LINE',
    'ELLIPSE',
    'REGULAR_POLYGON',
    'RECTANGLE',
    'TEXT'
  ].includes(node.type);
}

export default class FigmaParser {
  private file: GetFileResult;
  private referencer: Referencer;
  private config: FigmaReaderConfig;

  private tokens!: TokenCollection<FigmaToken>;
  private processedStyles: WeakSet<Style> = new WeakSet();

  constructor(
    file: GetFileResult,
    referencer: Referencer,
    config: FigmaReaderConfig
  ) {
    this.file = file;
    this.referencer = referencer;
    this.config = config;
  }

  parse(): TokenCollection<FigmaToken> {
    this.tokens = new TokenCollection();
    this.parseNode(this.file.document);

    return this.tokens;
  }

  private parseNode(node: Node) {
    if (node.type === 'TEXT') {
      this.parseTextNode(node as Node<'TEXT'>);
    }

    if (isVectorNode(node)) {
      this.parseVectorNode(node as Node<'VECTOR'>);
    }

    if (isCompositeNode(node)) {
      for (const child of (node as CompositeNode).children) {
        this.parseNode(child);
      }
    }
  }

  private parseTextNode(node: Node<'TEXT'>) {
    if (!this.isTokenByText(node)) {
      return;
    }

    const token = this.createTokenFromNode(node);
    token.value = this.getValueFromText(node);
    token.category = 'content';

    this.tokens.add(token);
  }

  private parseVectorNode(node: Node<'VECTOR'>) {
    if (node.styles) {
      for (const type of Object.keys(node.styles)) {
        const token = this.parseStyle(node, type as keyof StylesMap);

        if (token) {
          this.tokens.add(token);
        }
      }
    }
  }

  private parseStyle(
    node: Node<'VECTOR'>,
    type: keyof StylesMap
  ): FigmaToken | undefined {
    const id = (node.styles as StylesMap)[type];
    const style = this.getStyle(id);

    // styles don't match by type (because used somewhere else)
    // let's return
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (style.styleType.toLowerCase() !== type) {
      return;
    }

    if (!this.processedStyles.has(style)) {
      this.processedStyles.add(style);
      const token = this.createTokenFromStyle(style, node);
      token.description = style.description;
      token.category = this.getCategoryFromType(type);
      token.data = this.referencer.findData(style.name, type.toLowerCase());

      // see if we have a reference
      token.figmaReference = this.referencer.find(
        // eslint-disable-next-line unicorn/no-array-callback-reference
        style.name,
        type.toLowerCase()
      );

      // also look for the value
      const key = `${type.toLowerCase()}s` as keyof Node<'VECTOR'>;

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
  }

  private getShadowsFromEffect(effects: Effect[]) {
    const shadows: ShadowNode[] = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const effect of effects) {
      if (
        effect.visible &&
        (effect.type === EffectType.DROP_SHADOW ||
          effect.type === EffectType.INNER_SHADOW)
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
    return {
      figmaName: node.name,
      name: this.getNameFromText(node),
      node
    };
  }

  private createTokenFromStyle(style: Style, node: Node): FigmaToken {
    return {
      figmaName: style.name,
      name: this.getNameFromStyle(style),
      node,
      style
    };
  }

  private getNameFromStyle(style: Style) {
    return this.config.getNameFromStyle?.(style) ?? style.name;
  }

  private isTokenByText(node: Node<'TEXT'>) {
    return this.config.isTokenByText?.(node) ?? false;
  }

  private getNameFromText(node: Node<'TEXT'>) {
    return this.config.getNameFromText?.(node) ?? node.name;
  }

  private getValueFromText(node: Node<'TEXT'>) {
    return this.config.getValueFromText?.(node) ?? node.characters;
  }

  private getCategoryFromType(type: string) {
    // 'FILL' | 'STROKE' | 'TEXT' | 'EFFECT' | 'GRID'
    switch (type.toLowerCase()) {
      case 'fill':
      case 'stroke':
        return 'color';

      case 'effects':
        return 'shadow';

      // case 'TEXT':
      //   return 'typography';

      default:
        return type.toLowerCase();
    }
  }
}
