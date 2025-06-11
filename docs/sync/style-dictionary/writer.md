# Style Dictionary Writer

The writer takes your token collection and writes them to disk.

To start use `styleDictionaryWriter()` from `@theemo/style-dictionary`. Here is
a basic config as template:

```ts [theemo.config.js]
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    writer: {
      targets: styleDictionaryWriter({
        // your config
      })
    }
  }
});
```

## Configuration

Style Dictionary needs to know where to put your files, the file for each token,
the path (canonical name) for the token, the value and optionally custom data
with it.

Customization options with examples:

- [`directory`](../../config/sync/style-dictionary-writer.md#directory)
- [`fileForToken()`](../../config/sync/style-dictionary-writer.md#filefortoken)
- [`pathForToken()`](../../config/sync/style-dictionary-writer.md#pathfortoken)
- [`dataForToken()`](../../config/sync/style-dictionary-writer.md#datafortoken)
- [`valueForToken()`](../../config/sync/style-dictionary-writer.md#valuefortoken)
