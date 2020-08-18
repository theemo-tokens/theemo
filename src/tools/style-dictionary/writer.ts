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

  write(groupName: string, tokens: TokenCollection) {
    const files = this.getFiles(tokens);
    this.writeGroup(groupName, files);
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

  private writeGroup(groupName: string, files: Map<string, TokenCollection>) {
    for (const [file, tokens] of files.entries()) {
      const contents = {};
      for (const token of tokens) {
        const property = this.getPathFromToken(token);
        set(contents, property, {
          value: this.getValue(token),
          comment: token.description,
          colorScheme: token.colorScheme
        });
      }

      const fileName = path.join(this.getFolderForGroup(groupName), file);
      this.writeFile(fileName, contents);
    }
  }

  private getFolderForGroup(groupName: string) {
    return this.config.folderForGroup?.(groupName) ?? groupName;
  }

  private getPathFromToken(token: Token) {
    return this.config.pathForToken(token);
  }

  private getValue(token: Token) {
    if (token.expression) {
      return token.expression;
    }

    if (token.value) {
      return `'${token.value}'`;
    }

    return '';
  }

  private writeFile(file: string, data: object) {
    const target = `${path.join(
      this.getDirectory(),
      file.replace(/\./g, '/')
    )}.json`;
    const contents = JSON.stringify(data, null, '  ');
    const parent = path.dirname(target);

    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }

    fs.writeFileSync(target, contents);
  }

  private getDirectory() {
    return 'properties';
  }
}
