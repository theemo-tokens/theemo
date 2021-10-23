---
id: reader
title: Reader
---

Reads the tokens read from your design tool and parses them into a unified format.
Connects to your `tool` (e.g. figma) and parses out tokens. Initial Config:

```js
{
  reader: {
    tool: 'figma';
  }
}
```

Depending on your source, you need to further merge in more properties.

## Figma

You are able to export tokens that are available in Figma itself, such as
colors, effects, texts and other named tokens, depending on your
organization. Let's go through each of those cases and how to configure
theemo for those.

### Colors

![Figma Color Styles](/img/figma-color-styles.png)

To make figma work, these are the essential configuration options:

- Connection parameters: `figmaFile` and `figmaSecret`
- Referencing:
  - Figma does not support referencing styles/tokens natively
  - You should not absue descriptions for that
  - Use the [theemo
    plugin](https://www.figma.com/community/plugin/791262205400516364/Theemo)
    instead ([Usage explained
    here](https://gos.si/blog/full-featured-themes-in-figma/))

Note: With theemo, you have access to values from a `.env` file.

Config looks like this:

```js
{
  reader: {
    source: 'figma',

    // figma credentials
    figmaFile: process.env.FIGMA_FILE,
    figmaSecret: process.env.FIGMA_SECRET

    // referencer
    referencer: {
      type: 'figma-plugin',
      plugin: 'theemo',
      pluginOptions: {
        jsonbinFile: process.env.JSONBIN_FILE,
        jsonbinSecret: process.env.JSONBIN_SECRET
      }
    },

    // parser
    isTokenByStyle(style) {
      return style.name.includes('.') && style.name.includes('/');
    }
  }
}
```

Reference: [ReaderConfig](../../api/theemo.readerconfig)
