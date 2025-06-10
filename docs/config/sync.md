# Sync Options

- **Type**: [`SyncConfig`](../api/@theemo/sync/interfaces/SyncConfig.md)
- **Related**: [Sync](../sync.md)

Confiure the `sync` in your `theemo.config.js`.

```js [theemo.config.js]
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    // ...
  }
});
```

## `sync.reader`

- **Type**: [`ReaderConfig`](../api/@theemo/sync/interfaces/ReaderConfig.md)
- **Related**: [Reader](../sync/reader.md)

### `sync.reader.sources`

- **Type**: [`ReaderTool |
  ReaderTool[]`](../api/@theemo/sync/interfaces/ReaderTool.md)
- **Required**
- **Related**: [Figma Reader](../sync/figma/reader.md), [Write your own Reader](../sync/reader.md#write-your-own-reader),

One or many sources to read tokens from.

## `sync.lexer`

- **Type**: [`LexerConfig`](../api/@theemo/sync/interfaces/LexerConfig.md)
- **Related**: [Lexer](../sync/lexer.md)

### `sync.lexer.classifyToken()`

- **Type**:
  [`LexerConfig.classifyToken`](../api/@theemo/sync/interfaces/LexerConfig.md#classifytoken)

Classifying tokens is to give them a meaning. Here you'll want to set
[token internals](../design-tokens/internals.md). What's the token tier or its visibility?

Here is a way to set visibility:

```ts [theemo.config.js]
import { defineConfig } from '@theemo/cli';

import type { Token } from '@theemo/tokens';

export default defineConfig({
  sync: {
    lexer: {
      classifyToken(token: Token) {
        // assuming you have set `figmaName` before
        return {
          ...token,
          visibility: token.figmaName.startsWith('.') ? 'internal' : 'public'
        }
      }
    }
  }
});
```

### `sync.lexer.filterToken()`

- **Type**:
  [`LexerConfig.filterToken`](../api/@theemo/sync/interfaces/LexerConfig.md#filtertoken)

Finally, with structured information available on tokens, it's time to finally
filter the output from Figma to our needs.

For example, you are not interested in `internal` tokens - but all others, this
is what your filter can look like:

```ts [theemo.config.js]
import { defineConfig } from '@theemo/cli';

import type { Token } from '@theemo/tokens';

export default defineConfig({
  sync: {
    lexer: {
      filterToken(token: Token) {
        return token.visibility !== 'internal';
      }
    }
  }
});
```

### `sync.lexer.normalizeToken()`

- **Type**:
  [`LexerConfig.normalizeToken`](../api/@theemo/sync/interfaces/LexerConfig.md#normalizetoken)

The purpose of normalization is to "tidy" up your token (names), such as
cleaning up possible whitespace or when you are using contexts to extract
that part into a structured property.

```ts [theemo.config.js]
import { defineConfig } from '@theemo/cli';

import type { Token } from '@theemo/tokens';

export default defineConfig({
  sync: {
    lexer: {
      normalizeToken(token: Token) {
        return {
          ...token,
          name: token.name.trim()
        };
      }
    }
  }
});
```

## `sync.writer`

- **Type**: [`WriterConfig`](../api/@theemo/sync/interfaces/WriterConfig.md)
- **Related**: [Writer](../sync/writer.md)

### `sync.writer.targets`

- **Type**: [`WriterTool |
  WriterTool[]`](../api/@theemo/sync/interfaces/WriterTool.md)
- **Required**
- **Related**: [Style Dictionary Writer](../sync/style-dictionary/writer.md), [Write your own Writer](../sync/writer.md#write-your-own-writer)

One or many targets to write tokens to.
