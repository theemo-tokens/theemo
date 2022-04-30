module.exports = {
  include: [
    'tokens/website/ifm.transient.json',
  ],
  source: [
    'tokens/website/ifm.json',
    'tokens/website/ifm.light.json'
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