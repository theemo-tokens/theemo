import {
  figmaReader,
  theemoPlugin,
  getNameFromVariable,
  isTokenByVariable
} from '@theemo/figma';
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

const { FIGMA_SECRET, DEV } = process.env;

const NESTED_TOPICS = ['intents', 'indicators'];

function normalizeName(name) {
  // lowercase all things
  let n = name.toLowerCase();

  // remove all clutter
  n = n.replace(/\s+/, '');

  // from folders to canonical name (if we haven't already)
  n = n.replace(/\//g, '.');

  // hand it back ;)
  return n;
}

function isTransient(token, tokens) {
  const hasColorSchemes = tokens.some(
    (t) => t.colorScheme && t.name === token.name
  );
  const isReference = !token.colorScheme && hasColorSchemes;

  return token.type !== 'basic' && isReference;
}

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        secret: FIGMA_SECRET,

        files: ['pMlW7D51c8aFTDtQ0czSZx'],

        plugins: [theemoPlugin()],

        parser: {
          considerMode(mode) {
            return ['light', 'dark'].includes(mode);
          },

          getConstraints(mode) {
            if (mode === 'light' || mode === 'dark') {
              return { features: { 'color-scheme': mode } };
            }
          },

          isTokenByVariable(variable) {
            return DEV ? true : isTokenByVariable(variable);
          },

          // getTypeFromToken(token)

          isTokenByStyle(style) {
            return !style.name.startsWith('.')
              && style.styleType.toLowerCase() !== 'grid'
              && style.styleType.toLowerCase() !== 'text';
          },

          getNameFromStyle(style) {
            return style.name.replaceAll('/', '.');
          },

          getPropertiesForToken(token) {
            console.log(token);
            
            return {
              collection: token.figma.variable.collection.name.toLowerCase()
            }
          }
        }

      })
      // tool: 'figma',
      // figmaFile: FIGMA_FILE,
      // figmaSecret: FIGMA_SECRET,

      // // referencer
      // referencer: {
      //   type: 'figma-plugin',
      //   plugin: 'theemo',
      //   pluginConfig: {
      //     jsonbinFile: JSONBIN_FILE,
      //     jsonbinSecret: JSONBIN_SECRET,
      //     formats: {
      //       color: 'hex',
      //       colorAlpha: 'rgb'
      //     }
      //   }
      // },
    },

    lexer: {
      normalizeToken(token) {
      //   const normalized = { ...token };

      //   // normalize names
      //   // normalized.name = normalizeName(normalized.name);
      //   // if (normalized.reference) {
      //   //   normalized.reference = normalizeName(normalized.reference);
      //   // }

      //   // normalize contexts
      //   const tokenContextIndex = normalized.name.indexOf('.$');
      //   if (tokenContextIndex !== -1) {
      //     normalized.colorScheme = normalized.name.slice(tokenContextIndex + 2);
      //     normalized.name = normalized.name.slice(0, tokenContextIndex);
      //   }

      //   return normalized;

        if (['sizing.base'].includes(token.name)) {
          return {
            ...token,
            value: `${token.value}em`,
            type: 'dimension'
          };
        }

        if (token.type === 'number') {
          return {
            ...token,
            value: parseFloat(parseFloat(token.value).toFixed(2))
          };
        }

        return token;
      },

      classifyToken(token, tokens) {
        const t = { ...token };
        t.tier = token.name.startsWith('.')
          ? 'basic'
          : token.name.startsWith('hero')
            ? 'specific'
            : 'purpose';
        // t.transient = isTransient(t, tokens.normalized);

        return t;
      }
    },

    writer: {
      targets: styleDictionaryWriter({
        pathForToken(token) {
          return token.name.split('.');
        },
  
        fileForToken(token) {
          let fileName = token.collection;

          if (NESTED_TOPICS.includes(token.collection)) {
            const parts = token.name.split('.');

            fileName += `/${parts[1]}`;
          }
  
          return fileName;
        },
  
        // valueForToken(token, tokens) {
        //   if (token.reference) {
        //     const reference = tokens.find(
        //       t => t.name === token.reference && t.colorScheme === undefined
        //     );
  
        //     if (reference && reference.name.startsWith('ifm') && token.name.startsWith('ifm') && token.transforms === undefined) {
        //       // const ref = reference.name.replaceAll('-', '.').split('.').join('.');
        //       return `{${reference.name}.value}`;
        //     }
        //   }
  
        //   return token.value;
        // },
  
        dataForToken(token) {
          return {
            transient: token.transient
          };
        }
      })
    }
  },
  build: {
    input: 'build/website',
    output: 'dist',
    auto: true,
    defaultColorScheme: 'light',
    colorSchemes: {
      // light: {
      //   auto: false,
      //   manual: true
      // },
      dark: {
        auto: false,
        manual: true,
        selector: 'html[data-theme="dark"]'
      }
    }
  }
});