module.exports = {
  docs: {
    Documentation: ['getting-started', 'libraries']
  },
  design: {
    Design: ['design/overview', 'design/figma']
  },
  toolchain: {
    Theemo: [
      'toolchain/overview',
      'toolchain/getting-started',
      'toolchain/how-theemo-works',
      'toolchain/usage'
    ],
    Features: [
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
    ],
    Appendix: ['toolchain/glossary', 'toolchain/example-config'],
    'API Reference': [
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
  },
  frameworks: {
    Frameworks: ['frameworks/overview', 'frameworks/ember']
  }
};
