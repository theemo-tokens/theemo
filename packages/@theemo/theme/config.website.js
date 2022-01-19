module.exports = {
  source: [
    `tokens/ifm.json`, `tokens/ifm.light.json`
  ],
  platforms: {
    web: {
      transforms: [
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css'
      ],
      buildPath: 'build/website/',
      files: [
        {
          format: 'css/variables',
          destination: 'base.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          }
        }
      ]
    }
  }
};