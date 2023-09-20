import { figmaReader, getNameFromStyle, theemoPlugin } from '@theemo/figma';
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

const { FIGMA_FILE, FIGMA_SECRET } = process.env;

export default defineConfig({
  sync: {
    reader: {
      sources: figmaReader({
        secret: FIGMA_SECRET,

        files: [FIGMA_FILE],

        plugins: [
          theemoPlugin()
        ],

        parser: {
          considerMode(mode) {
            return ['light', 'dark'].includes(mode);
          },

          getConstraints(mode) {
            if (mode === 'light' || mode === 'dark') {
              return { features: { 'color-scheme': mode } };
            }
          },

          getNameFromStyle(style) {
            if (style.styleType === 'TEXT') {
              style.name = `typography/${style.name}`;
            }

            return getNameFromStyle(style);
          }
        }
      })
    },

    lexer: {
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
          let fileName = '';

          // 1) LOCATION
          const parts = token.name.split('.');

          // let's see for the others
          if (parts.length > 3) {
            fileName = parts.slice(0, 3).join('/');
          } else {
            fileName = parts[0];
          }

          return fileName;
        },

        valueForToken(token, tokens) {
          if (token.reference) {
            const reference = tokens.find(
              (t) => t.name === token.reference && t.colorScheme === undefined
            );

            if (
              reference &&
              reference.name.startsWith('ifm') &&
              token.name.startsWith('ifm') &&
              token.transforms === undefined
            ) {
              // const ref = reference.name.replaceAll('-', '.').split('.').join('.');
              return `{${reference.name}.value}`;
            }
          }

          return token.value;
        },

        dataForToken(token) {
          return {
            transient: token.transient
          };
        }
      })
    }
  }
});
