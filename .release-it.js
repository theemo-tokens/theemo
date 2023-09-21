module.exports = {
  plugins: {
    '@release-it-plugins/workspaces': {
      workspaces: [
        // glob still finds private repositories o_O
        // 'packages/@theemo/*',
        'packages/@theemo/build',
        'packages/@theemo/cli',
        'packages/@theemo/figma',
        'packages/@theemo/style-dictionary',
        'packages/@theemo/sync',
        'packages/@theemo/tokens'
      ]
    }
  },
  git: {
    tagName: 'v${version}',
    commitMessage: 'release v${version}',
    requireCleanWorkingDir: false,
    changelog: false
  },
  github: {
    release: true,
    tokenRef: "GITHUB_AUTH"
  },
  npm: false
}