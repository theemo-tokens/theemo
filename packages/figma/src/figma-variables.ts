import { TokenCollection } from '@theemo/tokens';

import { parseColorValue } from './token-values.js';

import type {
  FigmaVariable,
  RGB,
  RGBA,
  Variable,
  VariableAlias,
  VariableCollection,
  VariableValue
} from './-figma-variable-types.js';
import type { FigmaParserConfigWithDefaults } from './defaults.js';
import type { FigmaToken } from './token.js';
import type { ComputedValue, TokenType, TokenValue } from '@theemo/tokens';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

export function isAlias(value: VariableValue): value is VariableAlias {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (value as VariableAlias).type !== undefined &&
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (value as VariableAlias).type === 'VARIABLE_ALIAS'
  );
}

export function findVariableFromAlias(
  alias: VariableAlias,
  variables: FigmaVariable[]
): FigmaVariable | undefined {
  return variables.find((variable) => variable.id === alias.id);
}

function isAliasPublished(
  alias: VariableAlias,
  variables: FigmaVariable[],
  config: FigmaParserConfigWithDefaults
) {
  const aliasedVariable = findVariableFromAlias(alias, variables);

  return aliasedVariable && config.isTokenByVariable(aliasedVariable);
}

export function getValue(variable: FigmaVariable, mode?: string): VariableValue {
  const usedMode =
    // eslint-disable-next-line unicorn/prefer-array-some
    mode && variable.collection.modes.find((collMode) => collMode.modeId === mode)
      ? mode
      : variable.collection.defaultModeId;

  return variable.valuesByMode[usedMode];
}

function resolveVariable(variable: FigmaVariable, variables: FigmaVariable[], mode?: string) {
  const value = getValue(variable, mode);

  if (isAlias(value)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return resolveVariable(findVariableFromAlias(value, variables)!, variables, mode);
  }

  return variable;
}

function parseValue(
  variable: FigmaVariable,
  mode: string,
  config: FigmaParserConfigWithDefaults
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
): TokenValue<TokenType> | undefined {
  const value = variable.valuesByMode[mode];

  switch (variable.resolvedType) {
    case 'COLOR': {
      return parseColorValue(value as string | RGB | RGBA, config.formats);
    }

    case 'FLOAT':
    case 'STRING': {
      return value;
    }

    default: {
      return value;
    }
  }
}

function parseValueOrReference(
  variable: FigmaVariable,
  modeId: string,
  variables: FigmaVariable[],
  config: FigmaParserConfigWithDefaults
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
): TokenValue<TokenType> | undefined {
  const aliasOrValue = variable.valuesByMode[modeId];

  const publishedAlias = isAlias(aliasOrValue) && isAliasPublished(aliasOrValue, variables, config);
  const unpublishedAlias =
    isAlias(aliasOrValue) && !isAliasPublished(aliasOrValue, variables, config);

  // return reference for published alias
  if (publishedAlias) {
    const alias = findVariableFromAlias(aliasOrValue, variables);

    if (alias) {
      return `{${config.getNameFromVariable(alias)}}`;
    }
  }

  // no alias, or unpublished alias - return raw value
  else {
    const valueHoldingVariable = unpublishedAlias
      ? resolveVariable(variable, variables, modeId)
      : variable;
    const mode =
      valueHoldingVariable.collection.id === variable.collection.id
        ? modeId
        : valueHoldingVariable.collection.defaultModeId;

    return parseValue(valueHoldingVariable, mode, config);
  }

  return void 0;
}

function needConstraints(variable: FigmaVariable) {
  return variable.collection.modes.length > 1;
}

function parseTokenValue(
  variable: FigmaVariable,
  variables: FigmaVariable[],
  config: FigmaParserConfigWithDefaults
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
): TokenValue<TokenType> | undefined {
  const tokenValues: TokenValue<TokenType>[] = [];

  // when constraints are needed and at least one of them is considered
  if (
    needConstraints(variable) &&
    variable.collection.modes.some((m) => config.considerMode(m.name))
  ) {
    for (const { name, modeId } of variable.collection.modes) {
      const value = parseValueOrReference(variable, modeId, variables, config);
      const constraints = config.getConstraints?.(name, variable) ?? {};

      if (Object.keys(constraints).length === 0) {
        console.log('No Constraints found for', variable.name, 'with mode:', name);
      } else {
        tokenValues.push({
          value,
          ...constraints
        } as TokenValue<TokenType>);
      }
    }
  }

  // ... if not, use default Mode
  else {
    tokenValues.push(
      parseValueOrReference(variable, variable.collection.defaultModeId, variables, config)
    );
  }

  return tokenValues.length === 1 ? tokenValues[0] : tokenValues;
}

function parseType(variable: Variable): TokenType {
  switch (variable.resolvedType) {
    case 'COLOR': {
      return 'color';
    }

    case 'FLOAT': {
      return 'number';
    }

    case 'STRING': {
      return 'content';
    }

    default: {
      return 'unknown';
    }
  }
}

function isReference(value: TokenValue<TokenType>): boolean {
  return (
    (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) ||
    (typeof value === 'object' && isReference((value as ComputedValue<TokenType>).value))
  );
}

function isValueOnlyReferences(value: TokenValue<TokenType>) {
  const values = Array.isArray(value) ? value : [value];

  return values.every((element) => isReference(element));
}

function createTokenFromVariable(
  variable: FigmaVariable,
  variables: FigmaVariable[],
  file: GetFileResult,
  config: FigmaParserConfigWithDefaults
): FigmaToken {
  const token: FigmaToken = {
    name: config.getNameFromVariable(variable),
    description: variable.description,
    figma: {
      file,
      variable
    }
  };

  const value = parseTokenValue(variable, variables, config);

  if (value !== undefined) {
    token.value = value;

    if (config.skipTypeForReferences ? !isValueOnlyReferences(value) : true) {
      token.type = parseType(variable);
    }
  }

  return token;
}

export function parseVariables(
  variables: FigmaVariable[],
  file: GetFileResult,
  config: FigmaParserConfigWithDefaults
): TokenCollection<FigmaToken> {
  const tokens = new TokenCollection<FigmaToken>();

  for (const variable of variables) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (variable.collection && config.isTokenByVariable(variable)) {
      tokens.add(createTokenFromVariable(variable, variables, file, config));
    }
  }

  return tokens;
}

export function mapVariablesWithCollection(
  variables: Variable[],
  collections: VariableCollection[]
): FigmaVariable[] {
  return variables.map((variable): FigmaVariable => {
    const collection = collections.find((coll) => variable.variableCollectionId === coll.id);

    if (collection) {
      return {
        ...variable,
        collection
      };
    }

    return variable as FigmaVariable;
  });
}
