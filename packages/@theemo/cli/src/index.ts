/**
 * @packageDocumentation
 *
 * Runs the theemo CLI.
 *
 * ## Installation
 *
 * ```sh
 * pnpm add -D @theemo/cli
 * ```
 *
 * ## Usage
 *
 * ```sh
 * Usage: @theemo/cli command
 *
 * Options:
 *   -V, --version   output the version number
 *   -h, --help      display help for command
 *
 * Commands:
 *   sync            sync from your source into your token manager tool
 *   build           builds an adaptive CSS theme file
 *   help [command]  display help for command
 * ```
 */

export type { TheemoConfig } from './config.js';
export { defineConfig } from './config.js';
