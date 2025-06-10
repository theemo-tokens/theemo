# Writer

The writer takes your token collection and writes them to the disk.
Theemo can write to multiple `targets`, like so:

```ts
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    writer: {
      targets: styleDictionaryWriter({ ... })
    }
  }
});
```

All these `targets` are writer plugins. Theemo provides some, but you can write
your own, too.

## Available Writers

- [Style Dictionary Writer](./style-dictionary/writer.md)

## Write your own Writer

The plugin should implement the `WriterTool` interface, with only one `write()`
function to keep the API fairly minimal.

Here is the minimal starter code:

::: code-group

```ts [index.ts]
import YourWriter from './reader';

import type { YourWriterConfig } from './config';
import type { TokenCollection } from '@theemo/tokens';
import type { WriterTool } from '@theemo/sync';

export function yourWriter(config: YourWriterConfig): WriterTool {
  return {
    write(tokens: TokenCollection) {
      const writer = new YourWriter(config);
      const tokens = writer.write(tokens);
    }
  };
}
```

```ts [writer.ts]
import type { YourWriterConfig } from './config';
import type { TokenCollection } from '@theemo/tokens';

export default class YourWriter {
  #config: YourWriterConfig;

  constructor(config: YourWriterConfig) {
    this.#config = config;
  }

  write(tokens: TokenCollection): void {
    // do your work here
  }
}
```

```ts [config.ts]
export interface YourWriterConfig {
  // place your config options here
}
```

:::

Use your reader aside to the figma reader:

```js [theemo.config.js]
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { yourWriter } from '<see-above>';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    writer: {
      targets: [
        styleDictionaryWriter({ /*...*/ }),
        yourWriter({ /*...*/ })
      ]
    }
  }
});
```
