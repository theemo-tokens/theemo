---
id: sync
title: Sync
---

Sync from your design tool to your [token manager
tool](glossary.md#token-manager-tool) is split into three steps:

1. Reader
2. Lexer
3. Writer

At this step, you should familiarized yourself with [how theemo
works](how-theemo-works.md).

The options go into your `theemo.js` file under the `sync` key. These are the
parts of the [example config](example-config.md) split apart. The example config
page als describes the situation in which it is used.

```js
module.exports = {
  sync: {...}
}
```

Each section below desribes the respective configuration options, that go into `sync`.

## 1. Reader

Connects to your `source` (e.g. figma) and parses out tokens. Initial Config:

```js
{
  reader: {
    source: 'figma'
  }
}
```

Depending on your source, you need to further merge in more properties.

### Figma

To make figma work, these are the essential configuration options:

- Connection parameters: `figmaFile` and `figmaSecret`
- Referencing: Do you reference styles in figma? Tell it here how you do it
  - Currently only the plugin [Style
    References](https://www.figma.com/community/plugin/791262205400516364/Style-References)
    is supported ([Usage explained here](https://gos.si/blog/full-featured-themes-in-figma/))
  - You shall not abuse description for that!
- At the moment, only styles are parsed. Use `isTokenByStyle()` to parse name
  and tell theemo this is a style you want to process as token

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
      plugin: 'style-referencer',
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

Reference: [ReaderConfig](api/theemo.readerconfig)

## 2. Lexer

This step runs a lexical analysis based on your input to prepare tokens for the
writer. The lexer will return a **grouped token collection** that will be the
input to the writer. In order to get to a grouped token collection, these steps
are processed:

1. Normalize token
2. Classify token
3. Filter token
4. Group tokens

The output of one step is the input to the next step. If you classify a token,
you can use these information to filter them afterwards.

The normalization step has a _default_ behavior, which is why it is commented
out in the sample configuration:

```js
{
  lexer: {
    // /**
    //  * Default normalization strips white space from your token and reference name
    //  */
    // normalizeToken(token: Token): Token {
    //   const normalized = { ...token };

    //   normalized.name = normalized.name.replace(/\s/g, '');
    //   if (normalized.reference) {
    //     normalized.reference = normalized.reference.replace(/\s/g, '');
    //   }

    //   return normalized;
    // },

    /**
     * Describe your tokens:
     *
     * - What's the type?
     * - What's the color scheme?
     */
    classifyToken(token) {
      const t = {...token};
      t.type = t.name.startsWith('.') ? 'basic' : 'purpose';

      const contextIndex = t.name.indexOf('.$');
      if (contextIndex !== -1) {
        t.colorScheme = t.name.slice(contextIndex + 2);
        t.name = t.name.slice(0, contextIndex);
      }

      return t;
    },

    /**
     * Here we filter tokens to only keep the purpose tokens
     */
    filterToken(token) {
      return token.type === 'purpose';
    },

    /**
     * And finally we group them by color scheme
     * You will receive a token and return the group for it
     */
    groupForToken(token) {
      return token.colorScheme ? token.colorScheme : 'base';
    }
  }
}
```

Reference: [LexerConfig](api/theemo.lexerconfig)

## 3. Writer

The writer takes your grouped token collection and writes them to the disk. The
logic depends on your used [token manager tool](glossary.md#token-manager-tool),
with it there are three main instructions for configuration:

- The formats in which colors shall be written
- The file name for a token
- The property path for a token. The path is an array and will be used to create
  a POJO object

For easier understanding of the following snippt, the token has the following
name: `foo.bar/baz.bam`

```js
{
  writer: {
    formats: {
      color: 'hex',
      colorAlpha: 'rgb',
    },

    /**
     * The file in this case is the part before the first `/` in the token name.
     */
    fileForToken(token) {
      const slashIndex = token.name.indexOf('/')
      return token.name.slice(0, slashIndex).replace(/\./g, '/');
    },

    /**
     * The property path for a token is the part after the first `/`
     * with the category as prefix and a color scheme as suffix.
     */
    pathForToken(token) {
      const slashIndex = token.name.indexOf('/')
      let name = token.name.slice(slashIndex + 1);

      if (token.category) {
        name = `${token.category}.${name}`;
      }

      const path = name.split('.');

      if (token.colorScheme) {
        path.push(`.$${token.colorScheme}`);
      }

      return path;
    }
  }
}
```

Reference: [WriterConfig](api/theemo.writerconfig)
