import SyncConfig from './sync/config';
import BuildConfig from './build/config';

export default interface TheemoConfig {
  sync: SyncConfig;
  build: BuildConfig;
}

// export const DEFAULT_SYNC_CONFIG = {
//   referencer: undefined,
//   normalizeToken(token: Token): Token {
//     const normalizedToken = { ...token };

//     normalizedToken.name.replace(/\s/, '');
//     if (normalizedToken.reference) {
//       normalizedToken.reference.replace(/\s/, '');
//     }

//     return normalizedToken;
//   },

//   tool: Tool.StyleDictionary,
//   rootDir: 'properties'
// };

// /**
//  * From https://medium.com/terria/typescript-transforming-optional-properties-to-required-properties-that-may-be-undefined-7482cb4e1585
//  */
// type Complete<T> = {
//   [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
//     ? T[P]
//     : T[P] | undefined;
// };

// export type FigmaConfig = Complete<FigmaUserConfig>;

// export function getConfig(config: FigmaUserConfig): FigmaConfig {
//   return {
//     ...config,
//     ...DEFAULT_CONFIG
//   };
// }
