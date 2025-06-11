# Style Dictionary Writer Options

- [`StyleDictionaryWriterConfig`](../../api/@theemo/style-dictionary/interfaces/StyleDictionaryWriterConfig.md)

## `directory`

- **Type**: [`string`](../../api/@theemo/style-dictionary/interfaces/StyleDictionaryWriterConfig.md#directory)
- **Default**: `tokens`

By default, the tokens will be placed in a `tokens` folder, you can customize
this with the `directory` option to put them in a place you wish:

```ts [theemo.config.js]
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    writer: {
      targets: styleDictionaryWriter({
        directory: 'this-is-where-they-should-go'
      })
    }
  }
});
```

## `fileForToken()`

- **Type**: [`StyleDictionaryWriterConfig.fileForToken`](../../api/@theemo/style-dictionary/interfaces/StyleDictionaryWriterConfig.md#filefortoken)
- **Required**

File for token is the interesting customization. For Style Dictionary, it
wouldn't matter in which file the tokens are. Giving them a nice location is for
human inspection later on.

For the example below, we assume that the reader attached a `topic` property on
the token, that helps to sort the token into a folder. If not get the first
segment of the dot-separated name and fallback to `misc` if nothing applies:

```ts [theemo.config.js]
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

import type { Token } from '@theemo/tokens';

interface CustomToken extends Token {
  topic?: string;
}

export default defineConfig({
  sync: {
    writer: {
      targets: styleDictionaryWriter({
        fileForToken(token: CustomToken) {
          if (token.topic) {
            return token.topic;
          }

          let fileName = 'misc';

          const parts = token.name.split('.');

          if (parts.length > 1) {
            fileName = parts[0];
          }

          return fileName;
        }
      })
    }
  }
});
```

## `pathForToken()`

- **Type**: [`(StyleDictionaryWriterConfig.pathForToken`](../../api/@theemo/style-dictionary/interfaces/StyleDictionaryWriterConfig.md#pathfortoken)
- **Required**

For Style Dictionary the `path` means the [object path for a design
token](https://styledictionary.com/info/tokens/#default-design-token-metadata).
`pathForToken()` expects an array of segments for that path, let's split by `.`
to segment the token name for that:

```ts [theemo.config.js]
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

import type { Token } from '@theemo/tokens';

export default defineConfig({
  sync: {
    writer: {
      targets: styleDictionaryWriter({
        pathForToken(token: Token) {
          return token.name.split('.');
        }
      })
    }
  }
});
```

## `dataForToken()`

- **Type**: [`StyleDictionaryWriterConfig.dataForToken`](../../api/@theemo/style-dictionary/interfaces/StyleDictionaryWriterConfig.md#datafortoken)
- **Default**: `{}`

By default, all required fields for Style Dictionary are exported + some fields
theemo requires. You may want to export more of your token information into
Style Dictionary, for which you can use `dataForToken()` configuration.

Let's say, you want to passthrough an earlier `figmaName` from the reader in
order to display it in you documentation:

```ts [theemo.config.js]
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

import type { Token } from '@theemo/tokens';

interface CustomToken extends Token {
  figmaName?: string;
}

export default defineConfig({
  sync: {
    writer: {
      targets: styleDictionaryWriter({
        dataFortoken(token: CustomToken) {
          return {
            figmaName: token.figmaName
          };
        }
      })
    }
  }
});
```

## `valueForToken()`

- **Type**: [`StyleDictionaryWriterConfig.valueForToken`](../../api/@theemo/style-dictionary/interfaces/StyleDictionaryWriterConfig.md#valuefortoken)
- **Default**: `token.value`

Tokens do transport a `value`, that is written by `styleDictionaryWriter()`.
When you feel in the situation, you need to transform such a value, there is
`valueForToken()` which you can use to customize that behavior:

```ts [theemo.config.js]
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

import type { Token } from '@theemo/tokens';

export default defineConfig({
  sync: {
    writer: {
      targets: styleDictionaryWriter({
        valueForToken(token: Token) {
          // forcing an integer an a particular token
          if (token.name === 'this.must.be.an.integer') {
            return Number.parseInt(token.value)
          }

          return token.value;
        }
      })
    }
  }
});
```
