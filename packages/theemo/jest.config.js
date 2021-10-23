module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': '@swc/jest'
  },
  extensionsToTreatAsEsm: ['.ts'],
  // see: https://github.com/mattphillips/jest-expect-message/issues/39
  setupFilesAfterEnv: ['@alex_neo/jest-expect-message']
};
