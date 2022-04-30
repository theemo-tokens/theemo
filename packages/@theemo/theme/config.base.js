const modes = ['light', 'dark'];

module.exports = {
  source: [
    // this is saying find any files in the tokens folder
    // that does not have .dark or .light, but ends in .json
    `tokens/theme/**/!(*.${modes.join(`|*.`)}|*.transient).json`
  ],
  include: ['tokens/**/*.transient.json'],
  platforms: {
    web: {
      transforms: [
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css'
      ],
      buildPath: 'build/theme/',
      files: [
        {
          format: 'css/variables',
          destination: 'base.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          filter(token) {
            return !token.colorScheme && token.transient !== true;
          }
        }
      ]
    }
  },
  modes
};