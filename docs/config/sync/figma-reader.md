# Figma Reader Options

- [`FigmaReaderConfig`](../../api/@theemo/figma/interfaces/FigmaReaderConfig.md)

## `files`

- **Type**: [`string[]`](../../api/@theemo/figma/interfaces/FigmaReaderConfig.md#files)
- **Required**

The IDs of files you want to read from.

## `parser`

- **Type**:
  [`FigmaParserConfig`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md)
- **Related**: [Parser Flowgraph](../../sync/figma/reader.md#parser)

### `parser.considerMode()`

- **Type**: [`FigmaParserConfig.considerMode`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#considermode)
- **Default**: `() => false`
- **Related**: [Variables Flowgraph](../../sync/figma/reader.md#variables)

Variables support different modes. Some are relevant for your design system,
others you can completely ignore for synching tokens. As theemo cannot predict
which ones you want to consider for exporting tokens, you can declare such.

::: info
It only applies to collections with more then _one_ mode.
:::

For considering your `light` and `dark` modes, here is how:

```ts [theemo.config.js]
import { figmaReader } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        parser: {
          considerMode: (mode: string) => {
            return ['light', 'dark'].includes(mode);
          },
        }
      })
    }
  }
});
```

### `parser.formats`

- **Type**: [`ColorConfig`](../../api/@theemo/figma/interfaces/ColorConfig.md)
- **Default**: `{ color: ColorFormat.Hex, colorAlpha: ColorAlphaFormat.Rgb }`

Color format options

### `parser.getConstraints()`

- **Type**:
  [`FigmaParserConfig.getConstraints`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#getconstraints)
- **Default**: `undefined`
- **Related**: [Variables Flowgraph](../../sync/figma/reader.md#variables), [`Constraints`](../../api/@theemo/tokens/type-aliases/Constraints.md)

As your modes can take arbitrary names, such as:

- `light`, `dark`
- `light-more`, `light-less`, `dark-more`, `dark-less`
- `sunrise`, `day`, `sunset`, `night`

For theemo it is impossible to guess the appropriate constraints. As such, you
need to provide and explain the behavior of your system. The example above
for [`considerMode()`](#parser-considermode), qualifies `light` and `dark` as
appropriate modes, let's continue assigning their constraints:

```ts [theemo.config.js]
import { figmaReader } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        parser: {
          getConstraints(mode: string/*, variable: FigmaVariable*/) {
            if (mode === 'light' || mode === 'dark') {
              return { features: { 'color-scheme': mode } };
            }
          }
        }
      })
    }
  }
});
```

### `parser.getNameFromStyle()`

- **Type**: [`FigmaParserConfig.getNameFromStyle`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#getnamefromstyle)
- **Default**:
  [`getNameFromStyle()`](../../api/@theemo/figma/functions/getNameFromStyle.md)
- **Related**: [Styles Flowgraph](../../sync/figma/reader.md#styles)

To actually get the name of a style. By default, it will pass through the
name of the token as in Figma, replacing `/` with `.`.

For customizations, such as prefixing text styles with `typography/`, see here:

```ts [theemo.config.js]
import { figmaReader, getNameFromStyle } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';
import type { Style } from 'figma-api';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        parser: {
          getNameFromStyle(style: Style) {
            if (style.styleType === 'TEXT') {
              return getNameFromStyle({
                ...style,
                name: `typography/${style.name}`
              });
            }

            return getNameFromStyle(style);
          },
        }
      })
    }
  }
});
```

### `parser.getNameFromText()`

- **Type**: [`FigmaParserConfig.getNameFromText`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#getnamefromtext)
- **Default**:
  [`getNameFromText()`](../../api/@theemo/figma/functions/getNameFromText.md)
- **Related**: [Text Nodes Flowgraph](../../sync/figma/reader.md#text-nodes)

Next up is to actually get the name from the node we let pass earlier. Here we
drop the `[token]` tag to get the _clean_ token name:

```ts [theemo.config.js]
import { figmaReader } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';
import type { Node } from 'figma-api';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        // ...
        parser: {
          getNameFromText(node: Node<'TEXT'>) {
            return node.name.replace('[token]', '').trim();
          }
        }
      })
    }
  }
});
```

### `parser.getNameFromVariable()`

- **Type**: [`FigmaParserConfig.getNameFromVariable`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#getnamefromvariable)
- **Default**:
  [`getNameFromVariable()`](../../api/@theemo/figma/functions/getNameFromVariable.md)
- **Related**: [Variables Flowgraph](../../sync/figma/reader.md#variables)

Even though Figma shows hierarchy for your styles and variables, internally
those are separated with a `/` character, hence Figma disallows the usage of `.`
as part of the variable name, to align with [DTCG
Format](https://tr.designtokens.org/format/#character-restrictions)  as the `.`
is used as group separator. The default implementation takes care of this
transformation. You may use this functions to apply name transformations,
according to your [token specification](../../design-tokens/token-specification.md).

```ts [theemo.config.js]
import { figmaReader, getNameFromVariable } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        // ...
        parser: {
          getNameFromVariable: (variable: FigmaVariable) => {
            // implement your custom logic here
            if (variable.name.includes('primary')) {
              return variable.name.replace('primary', 'ARE-YOU-SURE-WHAT-THAT-MEANS?');
            }

            // ... or else use default behavior
            return getNameFromVariable(variable);
          };
        }
      })
    }
  }
});
```

### `parser.getPropertiesForToken()`

- **Type**:
  [`FigmaParserConfig.getPropertiesForToken`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#getpropertiesfortoken)
- **Default**: `undefined`

You might find yourself in the need to add additional properties to the token
that is parsed from Figma. For example, you might want to include the Figma name
of the related style to be able to show them both on the generated token
documentation. Here is how:

```ts [theemo.config.js]
import { figmaReader } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        // ...
        parser: {
          getPropertiesForToken: (token: FigmaToken/*, document?: FigmaDocument*/) => {
            if (token.figmaName) {
              return {
                figmaName: token.figmaName
              };
            }
          };
        }
      })
    }
  }
});
```

You'll also receive the Figma `document` as second parameter. With that you can
perform your own lookups with the Figma document. Please refer to their
[REST API documention](https://www.figma.com/developers/api#get-files-endpoint).

### `parser.getValueFromText()`

- **Type**: [`FigmaParserConfig.getValueFromText`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#getvaluefromtext)
- **Default**:
  [`getValueFromText()`](../../api/@theemo/figma/functions/getValueFromText.md)
- **Related**: [Text Nodes Flowgraph](../../sync/figma/reader.md#text-nodes)

So far theemo is handling a `node` which it knows it is a token and what the
name is. Finally we need to get the actual _value_ from the node. Theemo
provides a default implementation by returning the `characters` property from
the `node` (= the contents), which should already do it. However, you are free
to overwrite this behavior at this point.

### `parser.isTokenByStyle()`

- **Type**: [`FigmaParserConfig.isTokenByStyle`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#istokenbystyle)
- **Default**:
  [`isTokenByStyle()`](../../api/@theemo/figma/functions/isTokenByStyle.md)
- **Related**: [Styles Flowgraph](../../sync/figma/reader.md#styles)

Each style found in the Figma file is passed into that function and being asked,
whether this is a token or not.

The default implementation is, if the name of the token starts with a `.`, it
will respond `false`. That is the default behavior of Figma, where you can't
publish styles that begin with a `.` (as it is like a hidden folder on a unix
system).

You can use this function to apply your own behavior. Here in this case, styles
are ignored, when they contain braces:

```ts [theemo.config.js]
import { figmaReader, isTokenByStyle } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';
import type { Style } from 'figma-api';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        parser: {
          isTokenByStyle: (style: Style) => {
            return !style.name.includes('(') && !style.name.includes(')') && isTokenByStyle(style);
          }
        }
      })
    }
  }
});
```

### `parser.isTokenByText()`

- **Type**: [`FigmaParserConfig.isTokenByText`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#istokenbytext)
- **Default**:
  [`isTokenByText()`](../../api/@theemo/figma/functions/isTokenByText.md)
- **Related**: [Text Nodes Flowgraph](../../sync/figma/reader.md#text-nodes)

By default no tokens are recognized, so we need to teach theemo to understand
text nodes who include the `[token]` tag:

```ts [theemo.config.js]
import { figmaReader } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';
import type { Node } from 'figma-api';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        // ...
        parser: {
          isTokenByText(node: Node<'TEXT'>) {
            return node.name.includes('[token]');
          }
        }
      })
    }
  }
});
```

### `parser.isTokenByVariable()`

- **Type**: [`FigmaParserConfig.isTokenByVariable`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#istokenbyvariable)
- **Default**:
  [`isTokenByVariable()`](../../api/@theemo/figma/functions/isTokenByVariable.md)
- **Related**: [Variables Flowgraph](../../sync/figma/reader.md#variables)

Tokens can be hidden from publishing within Figma. However, accessing through
the REST API is exposing _all_ variables. The default behavior mimics Figma's
behavior. You have the chance to add some additional logic, custom to your
system on checking which variables shall result in tokens or not.

```ts [theemo.config.js]
import { figmaReader, isTokenByVariable } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        // ...
        parser: {
          isTokenByVariable: (variable: FigmaVariable) => {
            // implement your custom logic here
            if (yourCustomLogic(variable)) {
              return false;
            }

            // ...or else use default behavior
            return isTokenByVariable(variable);
          };
        }
      })
    }
  }
});
```

### `parser.getTypeFromToken()`

- **Type**: [`FigmaParserConfig.getTypeFromToken`](../../api/@theemo/figma/interfaces/FigmaParserConfig.md#gettypefromtoken)
- **Default**:
  [`getTypeFromToken()`](../../api/@theemo/figma/functions/getTypeFromToken.md)

While handling the tokens from reading and parsing the source, theemo tries to
detect the _type_ of a token, based on the related Figma construct (ie. `Node`
or `Style`). You can provide your own customization to this:

```ts [theemo.config.js]
import { figmaReader } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        // ...
        parser: {
          getTypeFromToken: (token: FigmaToken) => {
            if (token.style) {
              return getTypefromStyle(token.style);
            }

            return '';
          };
        }
      })
    }
  }
});
```

### `parser.skipTypeForReferences`

- **Type**: `boolean`
- **Default**: `false`

Skip type for tokens that are references.

According to the spec, $type can be optional when certain criteria are met. One of them being references. If you wish, you can skip types here.

## `plugins`

- **Type**: [`Plugin[]`](../../api/@theemo/figma/interfaces/Plugin.md)
- **Default**: `[]`
- **Related**: [Configuring Plugins](../../sync/figma/reader.md#plugins),
  [Theemo Plugin](../../sync/figma/reader.md#theemo-plugin), [Write
  your own plugin](../../sync/figma/plugins.md)

Configure the plugins you want to use.

## `secrect`

- **Type**: `string[]`
- **Required**
- **Related**: [Connecting to
  Figma](../../sync/figma/reader.md#connecting-to-figma)

Your API key to connect to Figma.
