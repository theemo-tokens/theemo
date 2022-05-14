---
id: example-config
title: Example Config
---

This example config [syncs](sync.md) from figma to Style Dictionary to run its
[build](build.md) and [generates](generate.md) a theme css file. To understand
the environment better, here are the constraints of the domain:

- Tokens in figma are in the format of `{section}/{name}` - where each `section`
  and `name` should have a `.` in their name.
- Tokens that _begins_ with a `.` are [_basic_](glossary.md#token-type) tokens
  (like a hidden folder in unix).
- Tokens can have a `$light` or `$dark` suffix to denote their color scheme
- We only want [_purpose_](glossary.md#token-type) tokens in Style Dictionary
  but need _basic_ tokens for reference
- References are handled using [Style
  References](https://www.figma.com/community/plugin/791262205400516364/Style-References)
  Figma plugin.
- Tokens are grouped by color scheme: `light`, `dark` or `base` (no color
  scheme)
- Tokens are written to `properties/{colorScheme}/*` on disk
- The output of the Style Dictionary build is `build/base.css`,
  `build/light.css` and `build/dark.css`
- The generated CSS theme file is at `dist/{themeName}.css`

There is a `.env` file containing four non-public parameters:

```text
FIGMA_FILE=...
FIGMA_SECRET=...
JSONBIM_FILE=...
JSONBIN_SECRET=...
```

## Theemo: `theemo.js`

```js
module.exports = {
  sync: {
    reader: {
      source: 'figma',
      figmaFile: process.env.FIGMA_FILE,
      figmaSecret: process.env.FIGMA_SECRET,

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
    },
  
    // lexer
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
    },

    // writer
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
  },

  generate: {
    input: 'build',
    output: 'dist',
    auto: true,
    defaultColorScheme: 'light',
    colorSchemes: {
      light: {
        auto: true,
        manual: true
      },
      dark: {
        auto: true,
        manual: true
      }
    }
  }
}
```

## Style Dictionary: `config.js`

```js
module.exports = {
  source: ['properties/**/*.json'],
  platforms: {
    web: {
      transformGroup: 'theemo/css',
      buildPath: 'build/',
      files: [
        {
          format: 'css/variables',
          destination: 'base.css',
          options: {
            showFileHeader: false
          },
          filter(token) {
            return !token.colorScheme;
          }
        },
        {
          format: 'css/variables',
          destination: 'light.css',
          options: {
            showFileHeader: false
          },
          filter(token) {
            return token.colorScheme === 'light';
          }
        },
        {
          format: 'css/variables',
          destination: 'dark.css',
          options: {
            showFileHeader: false
          },
          filter(token) {
            return token.colorScheme === 'dark';
          }
        }
      ]
    }
  },
  transforms: {
    name: {
      matcher(property) {
        return property.name.includes('.$');
      },
      transformer(property) {
        property.path.pop();

        const index = property.name.indexOf('.$')
        return property.name.slice(0, index);
      }
    }
  }
}
```
