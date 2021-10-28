module.exports = {
  docs: ['getting-started', 'usage-scenarios'],
  design: [
    'design',
    {
      type: 'category',
      label: 'Figma',
      collapsed: false,
      items: [
        'design/figma',
        'design/figma/references',
        'design/figma/automatic-color-palette',
        'design/figma/contexts',
        'design/figma/sync',
        'design/figma/best-practices',
        'design/figma/faq'
      ]
    }
  ],
  toolchain: [
    'toolchain/introduction',
    'toolchain/getting-started',
    'toolchain/usage',
    {
      type: "category",
      label: "Features",
      items: [
        {
          type: 'category',
          label: 'Sync',
          items: [
            'toolchain/sync/overview',
            'toolchain/sync/reader',
            'toolchain/sync/lexer',
            'toolchain/sync/writer'
          ]
        },
        'toolchain/build',
        'toolchain/generate'
      ]
    },
    {
      type: "category",
      label: "Appendix",
      items: ['toolchain/glossary', 'toolchain/example-config'],
    },
    {
      type: "category",
      label: "API Reference",
      items: [
        'api/theemo',
        'api/theemo.theemo',
        {
          type: 'category',
          label: 'Token',
          items: [
            'api/theemo.token',
            'api/theemo.basetoken',
            'api/theemo.tokentier'
          ]
        },
        {
          type: 'category',
          label: 'Tools',
          items: [
            'api/theemo.tools',
            'api/theemo.readertool',
            'api/theemo.writertool'
          ]
        },
        {
          type: 'category',
          label: 'Config',
          items: [
            'api/theemo.theemoconfig',
            'api/theemo.syncconfig',
            'api/theemo.readerconfig',
            'api/theemo.lexerconfig',
            'api/theemo.writerconfig'
          ]
        },
        {
          type: 'category',
          label: 'Tool: Figma',
          items: [
            'api/theemo.figmareaderconfig',
            'api/theemo.figmareferencerconfig',
            'api/theemo.figmareferencerpluginconfig'
          ]
        },
        {
          type: 'category',
          label: 'Tool: Style Dictionary',
          items: [
            'api/theemo.styledictionaryconfig',
            'api/theemo.styledictionarywriterconfig'
          ]
        }
      ]
    }
  ],
  frameworks: {
    Frameworks: ['frameworks/overview', 'frameworks/ember']
  }
};
