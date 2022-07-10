module.exports = {
  // transform: {
  //   "^.+\\.ts$": "esbuild-jest"
  // },
  transform: {
    "^.+\\.ts$": ["@swc/jest"],
  },
  setupFiles: ['./tests/setup.ts']
};