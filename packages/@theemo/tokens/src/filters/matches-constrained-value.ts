import { isConstrainedValue } from './is-constrained-value';

import type {
  ConstrainedValue,
  Constraints,
  FeatureConstraints,
  Features,
  Scope,
  ScopeConstraint,
  TokenType,
  TokenValue
} from '../token-types';

function usesFeatureConstraints(constraints: Constraints): constraints is FeatureConstraints {
  return constraints.features !== undefined;
}

function usesScopeConstraint(constraints: Constraints): constraints is ScopeConstraint {
  return constraints.scope !== undefined;
}

function matchesFeatures(value: ConstrainedValue<TokenType>, features: Features) {
  return Object.entries(features).every(
    ([name, val]) =>
      value.features !== undefined &&
      (Array.isArray(val) ? val : [val]).some((v) => value.features?.[name].includes(v))
  );
}

function matchesScope(value: ConstrainedValue<TokenType>, scope: Scope) {
  return Boolean(value.scope && value.scope === scope);
}

/**
 * Checks whether a token value matches the given constraint
 *
 * @param value the token value
 * @param constraints the constraint
 * @returns `true` if the constraint matches or `false` if not
 */
export function matchesConstrainedValue(
  value: TokenValue<TokenType>,
  constraints: Constraints
): boolean {
  if (Array.isArray(value)) {
    return value.some((val) => matchesConstrainedValue(val, constraints));
  }

  if (!isConstrainedValue(value)) {
    return false;
  }

  let matching = false;

  if (usesFeatureConstraints(constraints)) {
    matching ||= matchesFeatures(value, constraints.features);
  }

  if (usesScopeConstraint(constraints)) {
    matching ||= matchesScope(value, constraints.scope);
  }

  return matching;
}
