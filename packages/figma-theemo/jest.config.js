module.exports = {
  transform: {
    "^.+\\.ts$": "esbuild-jest"
  },
  setupFiles: ['./tests/setup.ts']
};