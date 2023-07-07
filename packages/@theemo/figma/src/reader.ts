import { Api as FigmaClient } from 'figma-api';
import merge from 'lodash.merge';

import { type Token, TokenCollection, TokenTier } from '@theemo/core';

import { DEFAULT_CONFIG } from './config.js';
import FigmaParser from './parser.js';

import type { FigmaReaderConfig } from './config.js';
import type { Plugin } from './plugin.js';
import type { FigmaToken } from './token.js';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

export default class FigmaReader {
  private config: Required<FigmaReaderConfig>;
  private transformed: Map<string, Token> = new Map();
  private file?: GetFileResult;
  private plugins: Plugin[];

  constructor(config: FigmaReaderConfig) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    } as unknown as Required<FigmaReaderConfig>;

    this.plugins = this.config.plugins;
  }

  async read(): Promise<TokenCollection> {
    // setup plugins
    await Promise.all(this.plugins.map((plugin) => plugin.setup()));

    let allTokens = new TokenCollection();

    for (const file of this.config.files) {
      this.file = await this.load(file);

      const parser = new FigmaParser(this.file, this.plugins, this.config);
      const tokens = parser.parse();

      const resolved = tokens
        .map((token) => this.classifyToken(token))
        .map((token) => this.resolve(token, tokens));
      const transformed = resolved.map((token) => this.transformToken(token));

      allTokens = allTokens.merge(transformed);
    }

    return allTokens;
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

  private classifyToken(token: FigmaToken): FigmaToken {
    token.type = this.getTypeFromToken(token);

    return token;
  }

  private resolve(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken {
    let t = token;

    for (const plugin of this.plugins) {
      t = plugin.resolve?.(token, tokens) ?? t;
    }

    return t;
  }

  private transformToken(token: FigmaToken): Token {
    if (this.transformed.has(token.name)) {
      return this.transformed.get(token.name) as Token;
    }

    const pluginProperties = this.plugins
      .map((plugin) => plugin.getProperties(token))
      .reduce((prev, actual) => {
        return merge(prev, actual);
      }, {});

    const transformed: Token = {
      name: token.name,
      description: token.description,
      tier: TokenTier.Unknown,
      type: token.type,
      colorScheme: token.colorScheme,
      ...pluginProperties,
      ...this.getPropertiesForToken(token)
    };

    this.transformed.set(token.name, transformed);

    return transformed;
  }

  private getPropertiesForToken(token: FigmaToken): Record<string, unknown> {
    return this.config.getPropertiesForToken?.(token, this.file as GetFileResult) ?? {};
  }

  private getTypeFromToken(token: FigmaToken): string | undefined {
    return this.config.getTypeFromToken(token);
  }
}
