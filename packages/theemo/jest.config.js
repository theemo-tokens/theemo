export default {
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
  },
  // see: https://github.com/mattphillips/jest-expect-message/issues/39
  setupFilesAfterEnv: ['@alex_neo/jest-expect-message']
};
