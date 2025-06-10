import { defineConfig } from 'vitepress';
import { figurePlugin } from './markdown/figure';
import { withMermaid } from 'vitepress-plugin-mermaid';
import markdownItDeflist from 'markdown-it-deflist';
import markdownItTable from 'markdown-it-multimd-table';
import typedocSidebar from '../api/typedoc-sidebar.json';
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

console.log(import.meta);


export default withMermaid(defineConfig({
  title: 'Theemo',
  description: 'Design Token Automations - Connecting Tools',

  head: [['link', { rel: 'icon', href: '/logo.svg' }]],

  cleanUrls: true,

  themeConfig: {
    logo: '/logo.svg',
    outline: [2, 3],

    search: {
      provider: 'local'
    },

    nav: [
      {
        text: 'Getting Started',
        link: '/getting-started',
        activeMatch: '^/getting-started|usage-scenarios|token-pipeline'
      },
      {
        text: 'Design Tokens',
        link: '/design-tokens',
        activeMatch: '^/design-tokens'
      },

      { text: 'Design', link: '/design', activeMatch: '^/design[^-]' },
      { text: 'Sync', link: '/sync', activeMatch: '^/sync' },
      { text: 'Theming', link: '/theming', activeMatch: '^/theming' },

      { text: 'Config', link: '/config', activeMatch: '^/config' },
      {
        text: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
        // link: '/api/',
        items: [
          {
            text: 'Packages',
            items: [
              { text: '@theemo/build', link: '/api/@theemo/build/' },
              { text: '@theemo/cli', link: '/api/@theemo/cli/' },
              { text: '@theemo/ember', link: '/api/@theemo/ember/' },
              { text: '@theemo/figma', link: '/api/@theemo/figma/' },
              {
                text: '@theemo/style-dictionary',
                link: '/api/@theemo/style-dictionary/'
              },
              { text: '@theemo/svelte', link: '/api/@theemo/svelte/' },
              { text: '@theemo/sync', link: '/api/@theemo/sync/' },
              { text: '@theemo/theme', link: '/api/@theemo/theme/' },
              {
                text: '@theemo/tokens',
                link: '/api/@theemo/tokens/'
              },
              {
                text: '@theemo/vite',
                link: '/api/@theemo/vite/'
              },
              {
                text: '@theemo/vue',
                link: '/api/@theemo/vue/'
              }
            ]
          }
        ]
      }
    ],
    sidebar: {
      '/design-tokens': [
        {
          items: [{ text: 'Introduction', link: '/design-tokens' }]
        },
        {
          text: 'Understanding Design Tokens',
          items: [
            { text: 'Traits', link: '/design-tokens/traits' },
            { text: 'Features', link: '/design-tokens/features' },
            { text: 'Internals', link: '/design-tokens/internals' }
          ]
        },
        {
          text: 'Using Design Tokens',
          items: [
            {
              text: 'Modeling & Communication',
              link: '/design-tokens/modeling'
            },
            {
              text: 'The Three Class Token Society',
              link: '/design-tokens/three-class-token-society'
            },
            {
              text: 'Token Specification',
              link: '/design-tokens/token-specification'
            },
            {
              text: 'Put Your Tokens on a Scale',
              link: '/design-tokens/scales'
            },
            { text: 'Naming', link: '/design-tokens/naming' },
            { text: 'Theming', link: '/design-tokens/theming' }
          ]
        },
        {
          text: 'Best Practices',
          items: [
            {
              text: 'Awful Design Tokens',
              link: '/design-tokens/awful-design-tokens'
            },
            {
              text: 'Awesome Design Tokens',
              link: '/design-tokens/awesome-design-tokens'
            }
          ]
        },
        {
          text: 'Appendix',
          items: [
            { text: 'Glossary', link: '/design-tokens/glossary' },
            { text: 'Literature', link: '/design-tokens/literature' }
          ]
        }
      ],
      '/design': [
        {
          text: 'Design',
          items: [{ text: 'Editors', link: '/design' }]
        },
        {
          text: 'Figma',
          items: [
            { text: 'Introduction', link: '/design/figma' },
            { text: 'Transforms', link: '/design/figma/transforms' },
            {
              text: 'Style References',
              link: '/design/figma/style-references'
            },
            {
              text: 'Variables Export',
              link: '/design/figma/variables-export'
            }
          ]
        }
      ],
      '/sync': [
        {
          text: 'Sync',
          items: [
            { text: 'Overview', link: '/sync' },
            { text: 'Reader', link: '/sync/reader' },
            { text: 'Lexer', link: '/sync/lexer' },
            { text: 'Writer', link: '/sync/writer' }
          ]
        },
        {
          text: 'Figma',
          items: [
            { text: 'Overview', link: '/sync/figma/overview' },
            { text: 'Reader', link: '/sync/figma/reader' },
            { text: 'Plugins', link: '/sync/figma/plugins' }
          ]
        },
        {
          text: 'Style Dictionary',
          items: [
            { text: 'Overview', link: '/sync/style-dictionary/overview' },
            { text: 'Writer', link: '/sync/style-dictionary/writer' }
          ]
        }
      ],
      '/theming': [
        {
          text: 'Theming',
          items: [
            { text: 'Introduction', link: '/theming' },
            { text: 'Theme Specification', link: '/theming/theme-spec' }
          ]
        },
        {
          text: 'Build CSS',
          items: [
            { 
              text: 'Style Dictionary', 
              link: '/theming/build/style-dictionary',
              collapsed: true,
              items: [
                { text: 'Filters', link: '/theming/build/style-dictionary/filters'},
                { text: 'Formats', link: '/theming/build/style-dictionary/formats'},
                { text: 'Parsers', link: '/theming/build/style-dictionary/parsers'},
                { text: 'Preprocessors', link: '/theming/build/style-dictionary/preprocessors'},
                { text: 'Transforms', link: '/theming/build/style-dictionary/transforms'},
                { text: 'Transform Groups', link: '/theming/build/style-dictionary/transform-groups'}
              ]
            },
            { text: 'CSS <code>@property</code>', link: '/theming/build/css-at-property' },
            { text: 'CSS Custom Properties &<br> CSS <code>light-dark()</code>', link: '/theming/build/css-custom-properties-light-dark' },
            { text: 'CSS <code>color()</code> Transforms', link: '/theming/build/css-color-transforms' },
            { text: 'Constraints', link: '/theming/build/constraints' },
            { text: 'Example', link: '/theming/build/example' },
          ],
        },
        {
          text: 'Build Theme',
          items: [
            { 
              text: 'Building a Theme Package', 
              link: '/theming/build/theme-package'
            }
          ]
        },
        {
          text: 'Integrations',
          items: [
            { text: 'Overview', link: '/theming/integrations' },
            { text: 'Vanilla', link: '/theming/integrations/vanilla' },
            { text: 'Ember', link: '/theming/integrations/ember' },
            { text: 'Svelte', link: '/theming/integrations/svelte' },
            { text: 'SvelteKit', link: '/theming/integrations/sveltekit' },
            { text: 'Vue', link: '/theming/integrations/vue' }
          ]
        }
      ],
      '/config': [
        {
          text: 'Config',
          items: [
            { text: 'Configuring Theemo', link: '/config' },
            { 
              text: 'Sync Options', 
              link: '/config/sync', 
              items: [
                { text: 'Figma Reader Options', link: '/config/sync/figma-reader' },
                { text: 'Style Dictionary Writer Options', link: '/config/sync/style-dictionary-writer' },
              ] 
            },
            { text: 'Build Options', link: '/config/build' }
          ]
        }
      ],
      '/api': [
        {
          text: 'API',
          items: typedocSidebar
        }
      ],
      '/': [
        {
          items: [
            { text: 'Getting Started', link: '/getting-started' },
            { text: 'Usage Scenarios', link: '/usage-scenarios' },
            { text: 'Token Pipeline', link: '/token-pipeline' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/theemo-tokens' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright:
        'Copyright © 2019-present <a href="https://gos.si" target="_blank">Thomas Gossmann</a>'
    }
  },

  sitemap: {
    hostname: 'https://theemo.io'
  },

  markdown: {
    codeTransformers: [
      transformerTwoslash() 
    ],
    config(md) {
      md.use(figurePlugin);
      md.use(markdownItDeflist);
      md.use(markdownItTable, {
        headerless: true
      });
      md.use(groupIconMdPlugin);
    }
  },
  vite: {
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
      Icons({
        scale: 1,
        compiler: 'web-components',
        webComponents: {
          autoDefine: true,
        },
        customCollections: {
          // 'custom': {
          //   theemo: () => fs.readFile(path.join(import.meta.dirname, '../assets/icons/theemo.svg'), 'utf-8'),
          //   sd: () => fs.readFile(path.join(import.meta.dirname, '../assets/icons/style-dictionary.svg'), 'utf-8'),
          // },
          custom: FileSystemIconLoader(
            path.join(import.meta.dirname, '../assets/icons/'), 
            svg => svg.replace(/^<svg /, '<svg class="custom-icon" ')
          )
        }
      }),
      // Components({
      //   resolvers: [
      //     IconsResolver({
      //       customCollections: [
      //         'custom'
      //       ]
      //     })
      //   ],
      // })
    ],
  }
}));