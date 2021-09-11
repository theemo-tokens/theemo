module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'esbuild-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/'],
  // see: https://github.com/mattphillips/jest-expect-message/issues/39
  setupFilesAfterEnv: ['@alex_neo/jest-expect-message']
};
