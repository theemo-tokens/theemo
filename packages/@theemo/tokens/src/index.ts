/**
 * @packageDocumentation
 *
 * Packages contains types and utility functions to work with tokens and their values.
 *
 * ## Installation
 *
 * ```sh
 * pnpm add -D @theemo/tokens
 * ```
 */

// core
export type { Token } from './token';
export { TokenCollection } from './token-collection';
export type * from './token-types';

// filters
export { isColor } from './filters/is-color';
export { isComputedValue } from './filters/is-computed-value';
export { isConstrainedValue } from './filters/is-constrained-value';
export { isCubicBezier } from './filters/is-cubic-bezier';
export { isDuration } from './filters/is-duration';
export { isFontFamily } from './filters/is-font-family';
export { isFontWeight } from './filters/is-font-weight';
export { isGradient } from './filters/is-gradient';
export { isShadow } from './filters/is-shadow';
export { isStroke } from './filters/is-stroke';
export { isStrokeStyle } from './filters/is-stroke-style';
export { isTransition } from './filters/is-transition';
export { isTypography } from './filters/is-typography';
export { matchesConstrainedValue } from './filters/matches-constrained-value';

// transforms
export { findConstrainedValue } from './transforms/find-constrained-value';
export { transformColorValue } from './transforms/transform-color-value';
export { transformTokenValue } from './transforms/transform-token-value';
