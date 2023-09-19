import { TokenCollection } from '@theemo/tokens';

import { mapVariablesWithCollection, parseVariables } from '../figma-variables.js';

import type { FigmaVariable, Variable, VariableCollection } from '../-figma-variable-types.js';
import type { FigmaParserConfigWithDefaults } from '../config.js';
import type { Plugin } from '../plugin.js';
import type { FigmaToken } from '../token.js';
import type { ColorTransform, ComputedValue, ConstrainedValue, TokenType } from '@theemo/tokens';
import type { GetFileResult } from 'figma-api/lib/api-types.js';

export type PaintTransforms = Partial<
  Record<'hue' | 'saturation' | 'lightness' | 'opacity', number>
>;

function paintToColorTransforms(paint: PaintTransforms): ColorTransform {
  const colorTransforms: ColorTransform = {
    ...paint
  };

  if (paint.opacity) {
    // @ts-expect-error opacity is invalidly copied over
    delete colorTransforms['opacity'];
    colorTransforms['alpha'] = paint['opacity'];
  }

  return colorTransforms;
}

function matches(haystack: Record<string, unknown>, needle: Record<string, unknown>) {
  Object.keys(needle).every(
    (key) =>
      Object.hasOwn(haystack, key) &&
      (typeof haystack[key] === 'object' && typeof needle[key] === 'object'
        ? matches(haystack[key] as Record<string, unknown>, needle[key] as Record<string, unknown>)
        : haystack[key] === needle[key])
  );
}

export type Transforms = PaintTransforms; // or NumericTransforms

export interface StyleConfig {
  styleId: string;
  /** Id of the referenced style */
  referenceId: string;
}

export interface VariableConfig {
  variableId: string;
  modeId: string;
  /** Id of the referenced variable */
  referenceId: string;
  transforms: Transforms;
}

export interface Config {
  styles: StyleConfig[];
  variables: VariableConfig[];
}

const CONFIG = '.theemo/config';

function getKeyFromStyleId(id: string) {
  return id.replace('S:', '').replace(',', '');
}

function getStyleIdFromKey(key: string) {
  return `S:${key},`;
}

interface PluginData {
  variables: string;
  variableCollections: string;
  version: string;
}

type Variables = Record<string, Variable>;
type VariableCollections = Record<string, VariableCollection>;

export class TheemoPlugin implements Plugin {
  // private declare file: GetFileResult;
  private declare parserConfig: FigmaParserConfigWithDefaults;

  // config found in `.theemo/config`
  private styleConfig: StyleConfig[] = [];
  private variableConfig: VariableConfig[] = [];

  setup(config: FigmaParserConfigWithDefaults): void {
    this.parserConfig = config;
  }

  getPluginData(): string {
    return '791262205400516364';
  }

  parse(file: GetFileResult) {
    const configStyle = Object.values(file.styles).find((style) => style.name === CONFIG);

    if (configStyle) {
      const theemoConfig = JSON.parse(configStyle.description ?? '{}') as Config;

      this.styleConfig = theemoConfig.styles;
      this.variableConfig = theemoConfig.variables;
    }

    return this.parseVariables(file);
  }

  private parseVariables(file: GetFileResult): TokenCollection<FigmaToken> {
    let tokens = new TokenCollection<FigmaToken>();
    const pluginData = file.document.pluginData[this.getPluginData()] as PluginData;

    if (pluginData) {
      const variables = (JSON.parse(pluginData.variables) ?? {}) as Variables;
      const collections = (JSON.parse(pluginData.variableCollections) ?? {}) as VariableCollections;
      const figmaVariables = mapVariablesWithCollection(
        Object.values(variables),
        Object.values(collections)
      );

      tokens = tokens.merge(parseVariables(figmaVariables, file, this.parserConfig));

      // add transforms
      for (const token of tokens) {
        const variable = token.figma.variable as FigmaVariable;
        const varConfig = this.variableConfig.find((varConf) => varConf.variableId === variable.id);

        // found a theemo variable config for this token
        if (varConfig) {
          const mode = variable.collection.modes.find(
            (modeObject) => modeObject.modeId === varConfig.modeId
          );

          // found the mode in question
          if (mode) {
            let foundIndex: number | boolean = false;
            let value: Partial<ComputedValue<TokenType>> | undefined = undefined;

            // value is a computed value
            if (typeof token.value === 'object') {
              value = token.value as ComputedValue<TokenType>;
            }

            // value is constrained, find by matching constraints
            else if (Array.isArray(token.value)) {
              const constraints = this.parserConfig.getConstraints?.(mode.name, variable) ?? {};

              if (!constraints || Object.keys(constraints).length === 0) {
                // eslint-disable-next-line no-console
                console.log('No Constraints found for ', variable.name, 'with mode: ', mode.name);
              } else {
                value = (token.value as ComputedValue<TokenType>[]).find(
                  (val) =>
                    typeof val === 'object' &&
                    matches(val as ConstrainedValue<TokenType>, constraints)
                ) as ComputedValue<TokenType>;

                foundIndex = token.value.indexOf(value);
              }
            }

            // anyway
            else {
              value = {
                value: token.value
              };
            }

            // found the matching value
            if (value) {
              // attach transforms
              if (varConfig.transforms) {
                (value as ComputedValue<TokenType>).transforms = paintToColorTransforms(
                  varConfig.transforms
                );
              }

              // set value to a reference
              if (varConfig.referenceId) {
                const ref = figmaVariables.find((refVar) => refVar.id === varConfig.referenceId);

                // ref found and matched token
                if (ref && this.parserConfig.isTokenByVariable(ref)) {
                  (
                    value as ComputedValue<TokenType>
                  ).value = `{${this.parserConfig.getNameFromVariable(ref)}}`;
                }
              }

              if (Array.isArray(token.value) && foundIndex !== false) {
                token.value[foundIndex] = value;
              } else {
                token.value = value;
              }
            }
          }
        }
      }
    }

    return tokens;
  }

  resolve(token: FigmaToken, tokens: TokenCollection<FigmaToken>): FigmaToken {
    if (!token.figma.style) {
      return token;
    }

    // find style in `.theemo/config`
    const styleId = getStyleIdFromKey(token.figma.style.key);
    const refConfig = this.styleConfig.find((style) => style.styleId === styleId);

    if (refConfig) {
      // find referenced style
      const refKey = getKeyFromStyleId(refConfig.referenceId);
      const refStyle = Object.values(token.figma.file.styles).find((style) => style.key === refKey);

      if (refStyle) {
        // find token for referenced style
        const referenceToken = tokens.find((t) => t.figma.style?.name === refStyle.name);

        if (referenceToken) {
          token.value = `{${referenceToken.name}}`;
        }
      }
    }

    return token;
  }
}

export function theemoPlugin(): Plugin {
  return new TheemoPlugin();
}
