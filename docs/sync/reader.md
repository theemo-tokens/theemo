# Reader

**Reads tokens from your design tool** and parses them into a unified format.
Theemo can read from one to many `sources`, like so:

```js
import { figmaReader } from '@theemo/figma';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({ ... })
    }
  }
});
```

All these `sources` are reader plugins. Theemo provides some, but you can write
your own, too.

## Available Readers

- [Figma Reader](./figma/reader.md)

## Write your own Reader

The plugin should implement the `ReaderTool` interface, with only one `read()`
function to keep the API fairly minimal.

Here is the minimal starter code:

::: code-group

```ts [index.ts]
import YourReader from './reader';

import type { YourReaderConfig } from './config';
import type { ReaderTool } from '@theemo/sync';

export function yourReader(config: YourReaderConfig): ReaderTool {
  return {
    async read() {
      const reader = new YourReader(config);
      const tokens = await reader.read();

      return tokens;
    }
  };
}
```

```ts [reader.ts]
import { TokenCollection } from '@theemo/tokens';

import type { YourReaderConfig } from './config';

export default class YourReader {
  #config: YourReaderConfig;

  constructor(config: YourReaderConfig) {
    this.#config = config;
  }

  async read(): Promise<TokenCollection> {
    const tokens = new TokenCollection();

    // do your work here

    return tokens;
  }
}
```

```ts [config.ts]
export interface YourReaderConfig {
  // place your config options here
}
```

:::

Use your reader aside to the figma reader:

```js [theemo.config.js]
import { figmaReader } from '@theemo/figma';
import { yourReader } from '<see-above>';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    reader: {
      sources: [
        figmaReader({ /*...*/ }),
        yourReader({ /*...*/ })
      ]
    }
  }
});
```
