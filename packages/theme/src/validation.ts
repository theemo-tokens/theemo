/**
 * Result of a validation
 *
 * @example
 *
 * Check for valid:
 *
 * ```ts
 * const validation = validate(something);
 *
 * if (validation.success) {
 *   // proceed with valid theme
 * } else {
 *   console.log(validation.errors);
 * }
 * ```
 */
export interface ValidationResult {
  success: boolean;
  errors: string[];
}
