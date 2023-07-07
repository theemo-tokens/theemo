import Color from 'color';
import isEmpty from 'lodash.isempty';
import fetch from 'node-fetch';

import { colorToValue, getValue } from '../token.js';

import type { ColorConfig } from '../config.js';
import type { Plugin } from '../plugin.js';
import type { FigmaToken } from '../token.js';
import type { Token, TokenCollection } from '@theemo/core';
import type { Style } from 'figma-api';

export type Transforms = Partial<Record<'hue' | 'saturation' | 'lightness' | 'opacity', number>>;

interface Data {
  transforms?: Transforms;
}

interface StyleRef {
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
  transforms: Transforms;
}

interface RefNode {
  node: string;
  fill?: StyleRef;
  stroke?: StyleRef;
  effect?: StyleRef;
}

interface ReferenceDoc {
  document: {
    id: string;
    name: string;
  };
  nodes: RefNode[];
}

export interface FigmaTheemoPluginConfig {
  jsonbinFile: string;
  jsonbinSecret: string;
  formats: ColorConfig;
}

export class TheemoPlugin implements Plugin {
  private config: FigmaTheemoPluginConfig;
  private references!: ReferenceDoc;

  constructor(config: FigmaTheemoPluginConfig) {
    this.config = config;
  }

  async setup(): Promise<void> {
    if (!this.references) {
      this.references = (await this.load()) as ReferenceDoc;
    }
  }

  private async load() {
    // read references from jsonbin.io
    const response = await fetch(`https://api.jsonbin.io/v3/b/${this.config.jsonbinFile}`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'X-Access-Key': this.config.jsonbinSecret,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'X-Bin-Meta': 'false'
      }
    });

    return response.json();
  }

  parseStyle(token: FigmaToken, style: Style): void {
    const styleType = style.styleType.toLowerCase();

    token.data = this.findData(style.name, styleType);
    token.figmaReference = this.findReference(style.name, styleType);
  }

  resolve(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken {
    if (token.figmaReference) {
      const referenceToken = tokens.find((t) => t.figmaName === token.figmaReference);

      token.reference = referenceToken ? referenceToken.name : undefined;
      token.referenceToken = referenceToken;
    }

    return token;
  }

  private findReference(name: string, type: string): string | undefined {
    const nodeReference = this.references.nodes.find((node) => {
      return (
        node[type as keyof RefNode] && (node[type as keyof RefNode] as StyleRef)?.to.name === name
      );
    });

    if (nodeReference) {
      return (nodeReference[type as keyof RefNode] as StyleRef)?.from.name;
    }

    return undefined;
  }

  private findData(name: string, type: string): Data | undefined {
    const nodeReference = this.references.nodes.find((node) => {
      return (
        node[type as keyof RefNode] && (node[type as keyof RefNode] as StyleRef)?.to.name === name
      );
    });

    if (nodeReference) {
      const transforms = (nodeReference[type as keyof RefNode] as StyleRef)?.transforms;

      if (!isEmpty(transforms)) {
        return {
          transforms
        };
      }
    }

    return undefined;
  }

  getProperties(token: FigmaToken): Partial<Token> {
    const properties: Partial<Token> = {
      reference: token.reference,
      value: this.getValue(token)
    };

    if (token.data && (token.data as Data).transforms) {
      properties.transforms = (token.data as Data).transforms;
    }

    return properties;
  }

  private getValue(token: FigmaToken): string {
    let value = token.referenceToken
      ? this.getValue(token.referenceToken)
      : getValue(token, this.config.formats);

    if (token.data && (token.data as Data).transforms) {
      value = colorToValue(
        this.applyTransforms(value, (token.data as Data).transforms as Transforms),
        this.config.formats
      );
    }

    return value;
  }

  private applyTransforms(value: string, transforms: Transforms) {
    let c = Color(value);

    if (transforms.hue) {
      c = c.rotate(transforms.hue);
    }

    if (transforms.saturation) {
      c = c.saturationl(c.saturationl() + transforms.saturation);
    }

    if (transforms.lightness) {
      c = c.lightness(c.lightness() + transforms.lightness);
    }

    if (transforms.opacity) {
      c = c.alpha(c.alpha() + transforms.opacity / 100);
    }

    return c;
  }
}

export function theemoPlugin(config: FigmaTheemoPluginConfig): Plugin {
  return new TheemoPlugin(config);
}
