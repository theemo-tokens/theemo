import { Api as FigmaClient } from 'figma-api';
import merge from 'lodash.merge';

import { TokenCollection } from '@theemo/tokens';

import { DEFAULT_PARSER_CONFIG } from './config.js';
import FigmaParser from './plugins/figma-parser.js';

import type { FigmaParserConfig, FigmaReaderConfig } from './config.js';
import type { Plugin } from './plugin.js';
import type { FigmaToken } from './token.js';
import type { Token } from '@theemo/tokens';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

type FigmaReaderConfigWithParser = FigmaReaderConfig & {
  parser: Required<FigmaParserConfig>;
};

interface Parser extends Required<Pick<Plugin, 'parse'>> {}
interface Resolver extends Required<Pick<Plugin, 'resolve'>> {}

export default class FigmaReader {
  private config: FigmaReaderConfigWithParser;
  private transformed: Map<string, Token> = new Map();
  private plugins: Plugin[];

  constructor(config: FigmaReaderConfig) {
    this.config = {
      ...config,
      parser: {
        ...DEFAULT_PARSER_CONFIG,
        ...config.parser
      }
    } as unknown as FigmaReaderConfigWithParser;

    this.plugins = [new FigmaParser(), ...this.config.plugins];
  }

  async read(): Promise<TokenCollection> {
    // setup plugins
    await Promise.all(this.plugins.map((plugin) => plugin.setup?.(this.config.parser)));

    let figmaTokens = new TokenCollection<FigmaToken>();

    for (const fileId of this.config.files) {
      const file = await this.load(fileId);

      figmaTokens = figmaTokens.merge(this.parse(file, fileId));
    }

    const tokens = figmaTokens
      // step 1: resolve tokens
      .map((token: FigmaToken) => this.resolveToken(token, figmaTokens))
      // step 2: classify tokens
      .map(this.classifyToken.bind(this))
      // step 3: transform FigmaToken into Token
      .map(this.transformToken.bind(this));

    return tokens;
  }

  private parse(file: GetFileResult, fileId: string): TokenCollection<FigmaToken> {
    let tokens = new TokenCollection<FigmaToken>();

    const parsers = this.plugins.filter((plugin) => plugin.parse !== undefined) as Parser[];

    for (const parser of parsers) {
      tokens = tokens.merge(parser.parse(file, fileId));
    }

    // parse tokens from variables
    // enterprise plan only
    // tbd.

    return tokens;
  }

  private async load(file: string) {
    // read figma
    const figmaClient = new FigmaClient({
      personalAccessToken: this.config.secret
    });

    const pluginData = this.plugins
      .map((plugin) => plugin.getPluginData?.())
      .filter((data) => data !== undefined);

    return figmaClient.getFile(file, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      plugin_data: [...new Set(pluginData)].join(',')
    });
  }

  private resolveToken(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken {
    let t = { ...token };

    const resolvers = this.plugins.filter((plugin) => plugin.resolve !== undefined) as Resolver[];

    for (const resolver of resolvers) {
      t = resolver.resolve(token, tokens) ?? t;
    }

    return t;
  }

  private classifyToken(token: FigmaToken): FigmaToken {
    token.type = this.getTypeFromToken(token);

    // console.log(token);

    return token;
  }

  private transformToken(token: FigmaToken): Token {
    if (this.transformed.has(token.name)) {
      return this.transformed.get(token.name) as Token;
    }

    const pluginProperties = this.plugins
      .filter((plugin) => plugin.getProperties !== undefined)
      .map((plugin) => plugin.getProperties?.(token))
      .reduce((prev, actual) => {
        return merge(prev, actual);
      }, {});

    const transformed: Token = {
      name: token.name,
      description: token.description,
      type: token.type,
      value: token.value,
      ...pluginProperties,
      ...this.getPropertiesForToken(token)
    };

    this.transformed.set(token.name, transformed);

    return transformed;
  }

  private getPropertiesForToken(token: FigmaToken): Record<string, unknown> {
    return this.config.parser.getPropertiesForToken?.(token, token.figma.file) ?? {};
  }

  private getTypeFromToken(token: FigmaToken) {
    return this.config.parser.getTypeFromToken(token);
  }
}
