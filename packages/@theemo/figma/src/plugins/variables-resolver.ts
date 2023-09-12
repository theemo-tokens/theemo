import { isAlias } from '../figma-variables.js';

import type { FigmaVariable, VariableCollection } from '../-figma-variable-types.js';
import type { FigmaParserConfig } from '../config.js';
import type { Plugin } from '../plugin.js';
import type { FigmaToken } from '../token.js';
import type { TokenCollection } from '@theemo/core';

export class VariablesResolver implements Plugin {
  private declare config: Required<FigmaParserConfig>;

  setup(config: Required<FigmaParserConfig>): void {
    this.config = config;
  }

  resolve(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken {
    if (token.figma.variable) {
      return this.resolveVariable(token, tokens);
    }

    return token;
  }

  private resolveVariable(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken {
    const variable = token.figma.variable as FigmaVariable;
    const collection = token.figma.variable?.collection as VariableCollection;
    // @TODO using defaultModeId for now
    const variableValue = variable.valuesByMode[collection.defaultModeId];

    if (isAlias(variableValue)) {
      const referenceToken = tokens.find((t) => t.figma.variable?.id === variableValue.id);

      if (referenceToken) {
        return {
          ...token,
          value: `{${this.config.getNameFromVariable(
            referenceToken.figma.variable as FigmaVariable
          )}}`
        };
      }
    }

    return token;
  }
}
