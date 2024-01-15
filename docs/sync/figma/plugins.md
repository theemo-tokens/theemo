# Plugins

As much as Figma supports plugins, you can write the counterpart for the Figma
reader.

## Write your own Figma Reader Plugin

The plugin should implement the `Plugin` interface. It has a chance to request
`plugin_data` from the REST API, make an async setup and has access to all the
parser data as the reader itself (to share the same config).

Here are the methods that you _can_ use (all of the shown are optional), pick
whatever is relevant to you.

::: code-group

```ts [your-plugin.ts]
import type { YourPluginConfig } from './config';
import type { Plugin } from '@theemo/figma';

export default class YourPlugin {
  #config: YourPluginConfig;
  #parser: ParserConfig;

  constructor(#config: YourPluginConfig) {
  }

  /**
   * This plugin data will be added, when requesting a figma file with `?plugin_data`
   * 
   * @see https://www.figma.com/developers/api#get-files-endpoint
   */
  getPluginData() {
    return '1234'; // this is your plugin ID
  }

  async setup(config: ParserConfig) {
    this.#parser = config;

    // do some setup here
    // e.g. request information from a third-party endpoint?
  }

  parse(document, fileId) {
    // this is where you'll do the main chunk of your work to get the 
    // relevant data from your plugin, or elsewhere
  }

  resolve(token, tokens) {
    // resolve a token

    // in order to resolve some references/alias, this is where you have a 
    // chance to apply the logic of your plugin.
    // This step is run, after _all_ sources have been parsed - so you have
    // access to ALL `tokens`, from all sources.
  }

  getProperties(token) {
    // here is your chance to enrich information on the token
    // when you have aquired data from anywhere that you want to run along with
    // a token, do it here
  }
}

export function yourPlugin(config: YourPluginConfig): Plugin {
  return new YourPlugin(config);
}
```

```ts [config.ts]
export interface YourPluginConfig {
  // place your config options here
}
```

:::

Use your plugin in the figma reader:

```js
import { figmaReader } from '@theemo/figma';
import { yourPlugin } from '<see-above>';
import { defineConfig } from '@theemo/cli';

export default defineConfig({
  sync: {
    reader: {
      sources: [
        figmaReader({
          plugins: [
            yourPlugin({ ... })
          ]
        })
      ]
    }
  }
});
```
