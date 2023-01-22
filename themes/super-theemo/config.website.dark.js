module.exports = {
  include: [
    'tokens/website/ifm.json',
    // 'tokens/ifm.light.json'
  ],
  source: [
    `tokens/website/ifm.dark.json`
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
          destination: 'dark.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          }
        }
      ]
    }
  }
};