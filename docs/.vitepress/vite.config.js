import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Components from 'unplugin-vue-components/vite'
import { groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons';
import { defineConfig } from 'vite'
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      "mermaid": "mermaid/dist/mermaid.esm.mjs"
    }
  },
  plugins: [
    groupIconVitePlugin({
      customIcon: {
        'tokens.json': localIconLoader(import.meta.url, '../assets/icons/design-token.svg'),
        'token': localIconLoader(import.meta.url, '../assets/icons/design-token.svg'),
        'tokens/**/*': localIconLoader(import.meta.url, '../assets/icons/design-token.svg'),
        'config.js': localIconLoader(import.meta.url, '../assets/icons/style-dictionary.svg'),
        'theemo': localIconLoader(import.meta.url, '../assets/icons/theemo.svg'),
        'theemo.config.js': localIconLoader(import.meta.url, '../assets/icons/theemo.svg'),
      }
    }),

    // vue + unplugin-icons
    Components({
      resolvers: [
        IconsResolver({
          customCollections: [
            'custom'
          ]
        }),
      ],
      dts: false
    }),
    Icons({
      scale: 1,
      compiler: 'vue3',
      // defaultStyle: 'display: inline-block',
      customCollections: {
        custom: FileSystemIconLoader(
          path.join(import.meta.dirname, '../assets/icons/'), 
          svg => svg.replace(/^<svg /, '<svg class="custom-icon" ')
        )
      },

    })
  ],
});