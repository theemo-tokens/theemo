export function definePackage(options = {}) {
  return {
    includeVersion: true,
    excludeInternal: true,
    excludeNotDocumented: true,
    disableSources: false,
    ...options
  };
}

export function defineWorkspace(options = {}) {
  return {
    name: 'Theemo',
    entryPointStrategy: 'packages',
    entryPoints: ['packages/*'],
    exclude: ['packages/core'],
    out: './docs/api',
    docsRoot: './docs',
    plugin: ['typedoc-plugin-markdown', 'typedoc-vitepress-theme'],
    useCodeBlocks: true,
    parametersFormat: 'table',
    typeDeclarationFormat: 'table',
    navigation: {
      includeCategories: false,
      includeGroups: false,
      includeFolders: false,
      excludeReferences: true
    },
    ...options
  };
}
