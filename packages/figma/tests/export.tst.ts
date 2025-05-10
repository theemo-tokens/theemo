// import { writeFile } from 'node:fs/promises';

// import { describe, test } from 'vitest';

// import {
//   FIXTURES_HOME,
//   HOKULEA_FIGMA_READER_CONFIG_DEV,
//   HOKULEA_FIGMA_READER_CONFIG_PROD,
//   THEEMO_FIGMA_READER_CONFIG_DEV,
//   THEEMO_FIGMA_READER_CONFIG_PROD
// } from '@theemo/fixtures';

// import { createReaderMockWithMoana, createReaderMockWithTheemo } from './utils.js';

// import type { FigmaReaderConfig } from '../src/config.js';
// import type FigmaReader from '../src/reader.js';
// import type { TokenCollection } from '@theemo/tokens';

// type Factory = (config: FigmaReaderConfig) => FigmaReader;

// async function readTokens(factory: Factory, config: FigmaReaderConfig): Promise<TokenCollection> {
//   const reader = factory(config);

//   return await reader.read();
// }

// async function writeTokens(tokens: TokenCollection, path: string) {
//   const data = JSON.stringify([...tokens], null, '\t');

//   await writeFile(path, data, 'utf8');
// }

// type Scenario = [string, Factory, FigmaReaderConfig, string];

// const scenarios: Scenario[] = [
//   [
//     'Theemo (Prod)',
//     createReaderMockWithTheemo,
//     THEEMO_FIGMA_READER_CONFIG_PROD,
//     `${FIXTURES_HOME}/theemo-plugin/inputs/lexer/tokens-prod.json`
//   ],
//   [
//     'Theemo (Dev)',
//     createReaderMockWithTheemo,
//     THEEMO_FIGMA_READER_CONFIG_DEV,
//     `${FIXTURES_HOME}/theemo-plugin/inputs/lexer/tokens-dev.json`
//   ],
//   [
//     'Hokulea (Prod)',
//     createReaderMockWithMoana,
//     HOKULEA_FIGMA_READER_CONFIG_PROD,
//     `${FIXTURES_HOME}/hokulea/inputs/lexer/tokens-prod.json`
//   ],
//   [
//     'Hokulea (Dev)',
//     createReaderMockWithMoana,
//     HOKULEA_FIGMA_READER_CONFIG_DEV,
//     `${FIXTURES_HOME}/hokulea/inputs/lexer/tokens-dev.json`
//   ]
// ];

// describe('Export Tokens for Lexer', async () => {
//   for (const [name, factory, config, path] of scenarios) {
//     test.skip(name, async () => {
//       const tokens = await readTokens(factory, config);

//       await writeTokens(tokens, path);
//     });
//   }
// });
