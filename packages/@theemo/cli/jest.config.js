export default {
  // project setup
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': [
      '@swc-node/jest',
      {
        swc: {
          module: {
            type: 'es6'
          }
        }
      }
    ]
  }

  // coverage
  // coveragePathIgnorePatterns: ['/node_modules/', '/test/'],

  // when invoked from project root
  // but that doesn't display stats on the console
  // coverageReporters: [['lcov', { projectRoot: '../..' }]],

  // extensions
  // see: https://github.com/mattphillips/jest-expect-message/issues/39
  // setupFilesAfterEnv: ['@alex_neo/jest-expect-message']
};
