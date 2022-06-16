// declare module '@jest/globals' {
//   import type { expect } from '@jest/globals';

//   // interface Expect {
//   //   /**
//   //    * The `expect` function is used every time you want to test a value.
//   //    * You will rarely call `expect` by itself.
//   //    *
//   //    * @param actual The value to apply matchers against.
//   //    * @param message Clarification message
//   //    */
//   //   <T = unknown>(actual: T, message: string): JestMatchers<T>;
//   // }

//   export function expect<T = unknown>(
//     actual: T,
//     message: string
//   ): JestMatchers<void, T>;
// }

declare module '@jest/expect' {
  // import type { JestExpect } from '@jest/expect';
  // interface JestExpect {
  //   /**
  //    * The `expect` function is used every time you want to test a value.
  //    * You will rarely call `expect` by itself.
  //    *
  //    * @param actual The value to apply matchers against.
  //    * @param message Clarification message
  //    */
  //   <T = unknown>(actual: T, message: string): JestMatchers<T>;
  // }

  // type JestExpect = {
  //   <T = unknown>(actual: T, message: string): JestMatchers<void, T>;
  // };

  export declare type JestExpect = {
    <T = unknown>(actual: T, message: string): JestMatchers<void, T> &
      Inverse<JestMatchers<void, T>> &
      PromiseMatchers<T>;
    addSnapshotSerializer: typeof addSerializer;
  } & BaseExpect &
    AsymmetricMatchers &
    Inverse<Omit<AsymmetricMatchers, 'any' | 'anything'>>;
}
