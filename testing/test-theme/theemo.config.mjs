import { figmaReader, theemoPlugin } from '@theemo/figma';
import { styleDictionaryWriter } from '@theemo/style-dictionary';
import { defineConfig } from '@theemo/cli';

const { FIGMA_FILE, FIGMA_SECRET, JSONBIN_FILE, JSONBIN_SECRET } = process.env;

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

        files: [FIGMA_FILE],

        plugins: [
          theemoPlugin({
            jsonbinFile: JSONBIN_FILE,
            jsonbinSecret: JSONBIN_SECRET,
            formats: {
              color: 'hex',
              colorAlpha: 'rgb'
            }
          })
        ]
      })
    },

    lexer: {
      normalizeToken(token) {
        const normalized = { ...token };

        // normalize names
        normalized.name = normalizeName(normalized.name);
        if (normalized.reference) {
          normalized.reference = normalizeName(normalized.reference);
        }

        // normalize contexts
        const tokenContextIndex = normalized.name.indexOf('.$');
        if (tokenContextIndex !== -1) {
          normalized.colorScheme = normalized.name.slice(tokenContextIndex + 2);
          normalized.name = normalized.name.slice(0, tokenContextIndex);
        }

        return normalized;
      },

      classifyToken(token, tokens) {
        const t = { ...token };
        t.tier = token.name.startsWith('.')
          ? 'basic'
          : token.name.startsWith('hero')
          ? 'specific'
          : 'purpose';
        t.transient = isTransient(t, tokens.normalized);

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

          // individual treatment for text style tokens
          if (token.type === 'text') {
            fileName = 'typography';
          }

          // all others
          else {
            // 1) LOCATION
            const parts = token.name.split('.');

            // special location ifm
            if (parts[0] === 'ifm') {
              fileName = 'ifm';
            }

            // let's see for the others
            else if (parts.length > 3) {
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

          // add folder to which token set this one belongs
          const folder = token.name.startsWith('ifm') ? 'website' : 'theme';

          return `${folder}/${fileName}`;
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
