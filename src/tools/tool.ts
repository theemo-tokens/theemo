import TokenCollection from '../token-collection';

export enum Tools {
  Unknown = 'unknown',
  Figma = 'figma',
  StyleDictionary = 'style-dictionary'
}

/**
 * This is for tools used during the `sync` command to read tokens from most of
 * a the time a design tool.
 *
 * @example
 *
 * Figma may be your tool for reading tokens. This will call the API evalute
 * the response and returns a token collection
 */
export interface ReaderTool {
  /**
   * Reads a collection of tokens off the tool
   */
  read(): Promise<TokenCollection>;
}

/**
 * This is for tools used during the `sync` command and writes a named collection of
 * tokens onto the disk in the tools required format.
 *
 * @example
 *
 * Style Dictionary may be your writer tool and knows how to write the `properties/*` files
 */
export interface WriterTool {
  /**
   * Writes a named collection to the disk in the format of the tool
   *
   * @param name name of the collection
   * @param tokens collection of tokens to write
   */
  write(name: string, tokens: TokenCollection): void;
}

/**
 * This is for tools used during the `build` command and trigger the execution
 * of that tool.
 *
 * @example
 *
 * Style Dictionary may be your builder tool and executes the build process
 */
export interface BuilderTool {
  /**
   * Executes the build of the tool
   */
  build(): void;
}
