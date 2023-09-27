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
          },

          getPropertiesForToken(token) {
            // console.log(token.figma.variable);
            // return {
            //   collection: token.figms
            // }
            return {
              topic: token.figma.variable?.collection?.name?.toLowerCase() ?? ''
            };
          }
        }
      })
    },

    writer: {
      targets: styleDictionaryWriter({
        pathForToken(token) {
          return token.name.split('.');
        },

        fileForToken(token) {
          if (token.topic) {
            return token.topic;
          }

          let fileName = 'misc';

          const parts = token.name.split('.');

          if (parts.length > 1) {
            fileName = parts[0];
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
    input: 'dist',
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
        manual: true,
        // selector: 'html[data-theme="dark"]'
      }
    }
  }
});
