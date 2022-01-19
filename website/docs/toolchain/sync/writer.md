---
id: writer
title: Writer
---

The writer takes your token collection and writes them to the disk. The
logic depends on your used [token manager tool](glossary.md#token-manager-tool).
Initial Config:

```js
module.exports = {
  writer: {
    tool: 'style-dictionary'
  }
};
```

Depending on your used tool, there are more specific configuration options

## Style Dictionary

Style Dictionary needs to know where to put your files, the file for each token,
the path (canonical name) for the token, the value and optionally custom data
with it.

Let's take the output from the [lexer](./lexer.md) and instruct the writer to
put the files, so to use the [multi-file
method](https://dbanks.design/blog/dark-mode-with-style-dictionary) afterwards
for dark mode in style dictionary.

```js
[
  // pair of contextual tokens
  {
    name: 'layout.background',
    description: '',
    tier: 'purpose',
    type: 'color',
    colorScheme: 'light',
    reference: undefined,
    value: '#FFFFFF',
    transient: false
  },
  {
    name: 'layout.background',
    description: '',
    tier: 'purpose',
    type: 'color',
    colorScheme: 'light',
    reference: undefined,
    value: '#4D4D4D',
    transient: false
  },
  {
    name: 'layout.background',
    description: '',
    tier: 'purpose',
    type: 'color',
    colorScheme: undefined,
    reference: undefined,
    value: '#FFFFFF',
    transient: true
  }
];
```

These are the cases that must be given special treatment.

### `fileForToken()`

File for token is the interesting customization to implement that special
treatment. For Style Dictionary, it wouldn't matter in which file the tokens are. Giving
them a nice location is for human inspection later on. A special suffix will
help with color schemes but it also needs a file location for a given token.

Location rules:

- More than three segments: Join the first three segments
- Anyway: Take the first segment as filename

Suffix rules:

- tokens with a color scheme will be in a file with the color scheme as suffix
- transient tokens will be in a file with `.transient` as suffix

```js
module.exports = {
  sync: {
    writer: {
      tool: 'style-dictionary',

      fileForToken(token) {
        let fileName = '';

        // individual treatment for text style tokens
        if (token.type === 'text') {
          fileName = 'typography';
        }

        // all others
        else {
          // 1) LOCATION
          const parts = token.name.split('.');

          if (parts.length > 3) {
            fileName = parts.slice(0, 3).join('/');
          } else {
            fileName = parts[0];
          }

          // 2) ADD MODIFIERS

          if (token.colorScheme) {
            fileName += `.${token.colorScheme}`;
          }

          if (token.transient === true) {
            fileName += '.transient';
          }
        }

        return fileName;
      }
    }
  }
};
```

### `pathForToken()`

For Style Dictionary the `path` means the [object path for a design
token](https://amzn.github.io/style-dictionary/#/tokens?id=default-design-token-metadata).
`pathForToken()` expects an array of segments for that path, let's split by `.`
to segment the token name for that:

```js
module.exports = {
  writer: {
    tool: 'style-dictionary',

    pathForToken(token) {
      return token.name.split('.');
    }
  }
};
```

### `dataForToken()`

By default, all required fields for Style Dictionary are exported + some fields
theemo requires. You may want to export more of your token information into
Style Dictionary, for which you can use `dataForToken()` configuration. Here is
an example to export the `transient` flag:

```js
module.exports = {
  writer: {
    tool: 'style-dictionary',

    dataForToken(token) {
      return {
        transient: token.transient
      };
    }
  }
};
```

### Output

This is the intended output folder structure:

```sh
- tokens/
  - intent/
    - action/
      - active.json
      - base.json
      - disabled.json
      - hover.json
    - alternatve/
      - active.json
      - base.json
      - disabled.json
      - hover.json
  - brand.json
  - hero.json
  - layout.dark.json
  - layout.light.json
  - layout.transient.json
  - sizing.json
  - text.dark.json
  - text.light.json
  - text.transient.json
  - typography.json
```

You can proove the output by checking that tokens in `.dark` and `.light` files
are also present in `.transient` file. Each of these files has its purpose. See
in [build](../build.md) how to use them.

## References

Reference: [WriterConfig](api/theemo.writerconfig)
