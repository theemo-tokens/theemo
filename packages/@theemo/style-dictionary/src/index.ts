/**
 * @packageDocumentation
 *
 * Packages contains a writer to sync tokens from another resources into style
 * dictionary, as well as extensions to build tokens for various platforms.
 *
 * ## Installation
 *
 * ```sh
 * pnpm add -D @theemo/style-dictionary
 * ```
 */

export type { StyleDictionaryWriterConfig } from './config';
export * from './extend';
export { w3cTokenJsonParser } from './parsers/w3c-token-json-parser';
export { styleDictionaryWriter } from './tool';
