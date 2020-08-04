module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.ts$": 'esbuild-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/'],
}