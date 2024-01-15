/**
 * @packageDocumentation
 *
 * Synchronizes tokens from one tool to another
 *
 * ## Installation
 *
 * ```sh
 * pnpm add -D @theemo/sync
 * ```
 */

export type { SyncConfig } from './config';
export { defineConfig } from './config';
export type { LexerConfig } from './lexer/config';
export type { ReaderConfig } from './reader/config';
export { sync } from './sync';
export type { ReaderTool, WriterTool } from './tool';
export type { WriterConfig } from './writer/config';
