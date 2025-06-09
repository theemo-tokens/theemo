import { defineConfig } from '@theemo/cli';
import { figmaReader, isTokenByVariable, theemoPlugin } from '@theemo/figma';
import { styleDictionaryWriter } from '@theemo/style-dictionary';

const { FIGMA_SECRET, DEV } = process.env;

const NESTED_TOPICS = ['intents', 'indicators'];

function fixNumberValue(value) {
  if (typeof value === 'number') {
    return parseFloat(parseFloat(value).toFixed(2));
  }

  if (Array.isArray(value)) {
    return value.map(fixNumberValue);
  }

  if (typeof value === 'object') {
    if (value.value) {
      return {
        ...value,
        value: fixNumberValue(value.value)
      };
    }

    return value;
  }

  return parseFloat(parseFloat(value).toFixed(2));
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
            return ['light', 'dark', 'comfortable', 'spacious', 'compact'].includes(mode);
          },

          getConstraints(mode) {
            if (['light', 'dark'].includes(mode)) {
              return { features: { 'color-scheme': mode } };
            }

            if (['comfortable', 'spacious', 'compact'].includes(mode)) {
              return { features: { density: mode } };
            }
          },

          isTokenByVariable(variable) {
            return DEV ? true : isTokenByVariable(variable);
          },

          isTokenByStyle(style) {
            return (
              !style.name.startsWith('.') &&
              style.styleType.toLowerCase() !== 'grid' &&
              style.styleType.toLowerCase() !== 'text'
            );
          },

          getNameFromStyle(style) {
            return style.name.replaceAll('/', '.');
          },

          getPropertiesForToken(token) {
            return {
              collection: token.figma.variable.collection.name.toLowerCase()
            };
          }
        }
      })
    },

    lexer: {
      normalizeToken(token) {
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
            value: fixNumberValue(token.value)
          };
        }

        return token;
      },

      classifyToken(token) {
        const t = { ...token };

        t.tier = token.name.startsWith('.')
          ? 'basic'
          : token.name.startsWith('hero')
            ? 'specific'
            : 'purpose';

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

        dataForToken(token) {
          return {
            transient: token.transient
          };
        }
      })
    }
  },
  build: {
    outDir: 'dist',
    files: ['build/properties.css', 'build/vars.css'],
    features: [
      {
        name: 'color-scheme',
        browserFeature: 'color-scheme',
        options: ['light', 'dark']
      },
      {
        name: 'density',
        options: {
          compact: 'build/density-compact.css',
          comfortable: 'build/density-comfortable.css',
          spacious: 'build/density-spacious.css'
        },
        defaultOption: 'comfortable'
      }
    ]
  }
});
