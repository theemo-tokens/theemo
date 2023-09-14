import type { FigmaVariable } from './-figma-variable-types.js';
import type { Token, TokenType } from '@theemo/tokens';
import type { Node, Style } from 'figma-api';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

export interface FigmaToken<T extends TokenType = 'unknown'> extends Token<T> {
  data?: unknown;

  figma: {
    file: GetFileResult;
    node?: Node;
    style?: Style;
    variable?: FigmaVariable;
  };
}
