import { defineConfig } from 'vitepress';
import { figurePlugin } from './markdown/figure';
import { withMermaid } from 'vitepress-plugin-mermaid';
import markdownItDeflist from 'markdown-it-deflist';
import markdownItTable from 'markdown-it-multimd-table';
import typedocSidebar from '../api/typedoc-sidebar.json';
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons';
import { withTwoslash } from 'vitepress-plugin-shiki-twoslash';

export default withTwoslash(withMermaid(defineConfig({
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
        activeMatch: '/getting-started|usage-scenarios'
      },
      {
        text: 'Design Tokens',
        link: '/design-tokens',
        activeMatch: '/design-tokens'
      },

      { text: 'Design', link: '/design', activeMatch: '/design[^-]' },
      { text: 'Sync', link: '/sync', activeMatch: '/sync' },
      { text: 'Theming', link: '/theming', activeMatch: '/theming' },

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
            { text: 'Writer', link: '/sync/style-dictionary/writer' },
            { text: 'Extensions', link: '/sync/style-dictionary/extensions' }
          ]
        }
      ],
      '/theming': [
        {
          text: 'Theming',
          items: [
            { text: 'Overview', link: '/theming' },
            { text: 'Theemo Theme', link: '/theming/theemo-theme' }
          ]
        },
        {
          text: 'Building',
          items: [
            { text: 'Overview', link: '/theming/build' },
            { 
              text: 'Style Dictionary', 
              link: '/theming/build/style-dictionary',
              items: [
                {
                  text: 'Extensions',
                  // collapsed: true,
                  items: [
                    { text: 'Filters', link: '/theming/build/style-dictionary/filters'},
                    { text: 'Formats', link: '/theming/build/style-dictionary/formats'},
                    { text: 'Parsers', link: '/theming/build/style-dictionary/parsers'},
                    { text: 'Preprocessors', link: '/theming/build/style-dictionary/preprocessors'},
                    { text: 'Transforms', link: '/theming/build/style-dictionary/transforms'}
                  ]
                }
              ]
            },
            { text: 'Theemo Package', link: '/theming/build/theemo-package' }
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
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          'tokens.json': localIconLoader(import.meta.url, '../assets/design-token.logo.svg'),
          'token': localIconLoader(import.meta.url, '../assets/design-token.logo.svg'),
          'config.js': localIconLoader(import.meta.url, '../assets/style-dictionary.logo.svg'),
          'theemo': localIconLoader(import.meta.url, '../assets/theemo.logo.svg'),
          'theemo.config.js': localIconLoader(import.meta.url, '../assets/theemo.logo.svg'),
        }
      })
    ],
  }
})));