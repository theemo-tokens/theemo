module.exports = {
  // include: [
  //   'tokens/ifm.json',
  //   'tokens/ifm.light.json'
  // ],
  source: [
    `tokens/ifm.dark.json`
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