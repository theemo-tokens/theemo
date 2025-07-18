import fs from 'node:fs';
import path from 'node:path';

import { TokenCollection } from '@theemo/tokens';

import { set } from './utils';

import type { StyleDictionaryWriterConfig } from './config';
import type { Token } from '@theemo/tokens';

export default class StyleDictionaryWriter {
  private config: StyleDictionaryWriterConfig;

  constructor(config: StyleDictionaryWriterConfig) {
    this.config = config;
  }

  write(tokens: TokenCollection): void {
    const files = this.getFiles(tokens);

    this.writeFiles(files, tokens);
  }

  private getFiles(tokens: TokenCollection) {
    const files = new Map<string, TokenCollection>();

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

  private writeFiles(files: Map<string, TokenCollection>, allTokens: TokenCollection) {
    for (const [file, tokenSet] of files.entries()) {
      const contents = {};

      for (const token of tokenSet) {
        const property = this.getPathFromToken(token);
        const data = this.buildToken(token, allTokens);

        set(contents, property, data);
      }

      this.writeFile(file, contents);
    }
  }

  private buildToken(token: Token, allTokens: TokenCollection): Record<string, unknown> {
    const data: Record<string, unknown> = {
      $value: this.getValue(token, allTokens),
      $description: token.description,
      ...this.getTokenData(token)
    };

    if (token.type) {
      data.$type = token.type;
    }

    return data;
  }

  // private getFolderForGroup(groupName: string) {
  //   return this.config.folderForGroup?.(groupName) ?? groupName;
  // }

  private getPathFromToken(token: Token) {
    return this.config.pathForToken(token);
  }

  private getValue(token: Token, allTokens: TokenCollection) {
    return this.config.valueForToken?.(token, allTokens) ?? token.value;
  }

  private getTokenData(token: Token) {
    return this.config.dataForToken?.(token) ?? {};
  }

  private writeFile(file: string, data: Record<string, unknown>) {
    const target = `${path.join(this.getDirectory(), file)}.json`;
    const contents = JSON.stringify(data, undefined, '  ');
    const parent = path.dirname(target);

    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }

    fs.writeFileSync(target, contents);
  }

  private getDirectory() {
    return this.config.directory ?? 'tokens';
  }
}
