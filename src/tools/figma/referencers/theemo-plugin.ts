import Color from 'color';
import fetch from 'node-fetch';
import Token from '../../../token';
import { ColorConfig } from '../config';
import { FigmaToken, getValue, colorToValue } from '../token';
import Referencer from './referencer';

type Transforms = Partial<
  Record<'hue' | 'saturation' | 'lightness' | 'opacity', number>
>;

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

interface Options {
  jsonbinFile: string;
  jsonbinSecret: string;
  formats: ColorConfig;
}

export default class TheemoPluginReferencer implements Referencer {
  private options: Options;
  private references!: ReferenceDoc;
  private computed: WeakMap<FigmaToken, Token> = new WeakMap();

  constructor(options: object) {
    this.options = options as Options;
  }

  async setup() {
    if (!this.references) {
      this.references = await this.load();
    }
  }

  private async load() {
    // read references from jsonbin.io
    const response = await fetch(
      `https://api.jsonbin.io/b/${this.options.jsonbinFile}`,
      {
        headers: {
          'secret-key': this.options.jsonbinSecret
        }
      }
    );
    return response.json();
  }

  find(name: string, type: string): string | undefined {
    const nodeReference = this.references.nodes.find(node => {
      return (
        node[type as keyof RefNode] &&
        (node[type as keyof RefNode] as StyleRef)?.to.name === name
      );
    });

    if (nodeReference) {
      return (nodeReference[type as keyof RefNode] as StyleRef)?.from.name;
    }

    return undefined;
  }

  findData(name: string, type: string): Data {
    let transforms;
    const nodeReference = this.references.nodes.find(node => {
      return (
        node[type as keyof RefNode] &&
        (node[type as keyof RefNode] as StyleRef)?.to.name === name
      );
    });

    if (nodeReference) {
      transforms = (nodeReference[type as keyof RefNode] as StyleRef)
        ?.transforms;
    }

    return {
      transforms
    };
  }

  compileToken(token: FigmaToken) {
    if (this.computed.has(token)) {
      return this.computed.get(token) as Token;
    }

    const computed: Token = {
      name: token.name,
      description: token.description,
      type: token.type,
      category: token.category,
      colorScheme: token.colorScheme,
      reference: token.reference,
      value: this.getValue(token)
    };

    this.computed.set(token, computed);

    return computed;
  }

  private getValue(token: FigmaToken) {
    let value;
    if (token.referenceToken) {
      value = this.compileToken(token.referenceToken).value as string;
    } else {
      value = getValue(token, this.options.formats);
    }

    if (token.data && (token.data as Data).transforms) {
      value = colorToValue(
        this.applyTransforms(
          value,
          (token.data as Data).transforms as Transforms
        ),
        this.options.formats
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
