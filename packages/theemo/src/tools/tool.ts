import type TokenCollection from '../token-collection.js';

/**
 * An list of known tools
 *
 * Each tool can be a `ReaderTool`, `WriterTool` or `BuilderTool` (multiple of
 * that are allowed) and can be further parametrized through respective configs
 */
export enum Tools {
  Unknown = 'unknown',
  Figma = 'figma',
  StyleDictionary = 'style-dictionary',
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
   * Writes a named set to the disk in the format of the tool
   *
   * @param tokens tokens to write
   */
  write(tokens: TokenCollection): void;
}
