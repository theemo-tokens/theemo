import fs from 'fs';
import path from 'path';

import WriterConfig from '../../sync/writer/config';
import Token from '../../token';
import TokenCollection from '../../token-collection';
import { set } from '../../utils';

export default class StyleDictionaryWriter {
  private config: WriterConfig;

  constructor(config: WriterConfig) {
    this.config = config;
  }

  write(tokens: TokenCollection): void {
    const files = this.getFiles(tokens);
    this.writeFiles(files, tokens);
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

  private writeFiles(
    files: Map<string, TokenCollection>,
    allTokens: TokenCollection
  ) {
    for (const [file, tokenSet] of files.entries()) {
      const contents = {};
      for (const token of tokenSet) {
        const property = this.getPathFromToken(token);
        const attributes = token.type
          ? {
              category: token.type
            }
          : undefined;
        const data: Record<string, unknown> = {
          value: this.getValue(token, allTokens),
          comment: token.description,
          colorScheme: token.colorScheme,
          attributes,
          ...this.getTokenData(token)
        };
        set(contents, property, data);
      }

      // const fileName = path.join(this.getFolderForGroup(groupName), file);
      this.writeFile(file, contents);
    }
  }

  // private getFolderForGroup(groupName: string) {
  //   return this.config.folderForGroup?.(groupName) ?? groupName;
  // }

  private getPathFromToken(token: Token) {
    return this.config.pathForToken(token);
  }

  private getValue(token: Token, allTokens: TokenCollection) {
    return this.config.valueForToken?.(token, allTokens) ?? `${token.value}`;
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
