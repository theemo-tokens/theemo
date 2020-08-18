import { EffectType, Node, Paint, Style, StylesMap } from 'figma-api';
import { GetFileResult } from 'figma-api/lib/api-types';
import { TokenType } from '../../token';
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
  private processedStyles: string[] = [];

  constructor(
    file: GetFileResult,
    referencer: Referencer,
    config: FigmaReaderConfig
  ) {
    this.file = file;
    this.referencer = referencer;
    this.config = config;
  }

  parse() {
    this.processedStyles = [];
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

    const token = this.createToken(this.getNameFromText(node));
    token.value = this.getValueFromText(node);
    token.category = 'content';

    this.tokens.add(token);
  }

  private parseVectorNode(node: Node<'VECTOR'>) {
    if (node.styles) {
      for (const type of Object.keys(node.styles)) {
        const id = node.styles[type as keyof StylesMap];
        const style = this.getStyle(id);

        if (
          this.isTokenByStyle(style) &&
          !this.processedStyles.includes(style.name)
        ) {
          this.processedStyles.push(style.name);
          const token = this.createToken(style.name);
          token.description = style.description;
          token.category = this.getCategoryFromType(type);
          token.data = this.referencer.findData(style.name, type.toLowerCase());
          const reference = this.referencer.find(
            style.name,
            type.toLowerCase()
          );

          // see if we have a reference
          if (reference) {
            token.reference = reference;
          }

          // anyway look for the value
          else {
            const key = `${type.toLowerCase()}s` as keyof Node<'VECTOR'>;

            // fill - color swatch
            if (key === 'fills' && node[key]) {
              token.color = this.getColorFromPaint(node[key] as Paint[]);
            }

            // stroke - somwhere used as border
            else if (key === 'strokes' && node[key]) {
              token.color = this.getColorFromPaint(node[key] as Paint[]);
            }

            // effect - shadows
            else if (key === 'effects' && node[key]) {
              const shadows: ShadowNode[] = [];

              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              for (const effect of node[key]) {
                if (!effect.visible) {
                  return;
                }

                if (
                  effect.type === EffectType.DROP_SHADOW ||
                  effect.type === EffectType.INNER_SHADOW
                ) {
                  shadows.push({
                    inner: effect.type === EffectType.INNER_SHADOW,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    color: { ...effect.color, visible: true },
                    x: effect.offset?.x ?? 0,
                    y: effect.offset?.y ?? 0,
                    radius: effect.radius
                  });
                }
              }

              if (shadows.length > 0) {
                token.shadows = shadows;
              }
            }
          }
          this.tokens.add(token);
        }
      }
    }
  }

  private getColorFromPaint(paint: Paint[]): ColorNode {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return {
      ...paint[0].color,
      visible: paint[0].visible ?? true
    };
  }

  private getStyle(id: string) {
    return this.file.styles[id] as Style & { description: string };
  }

  private createToken(name: string): FigmaToken {
    return {
      name,
      type: TokenType.Unknown
    };
  }

  private isTokenByText(node: Node<'TEXT'>) {
    return this.config.isTokenByText?.(node) ?? false;
  }

  private isTokenByStyle(style: Style) {
    return this.config.isTokenByStyle?.(style) ?? false;
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
