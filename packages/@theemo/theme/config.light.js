const base = require('./config.base');

const config = {
  ...base,
  include: [`tokens/**/!(*.${base.modes.join(`|*.`)}).json`],
  source: [`tokens/**/*.light.json`]
};
config.platforms.web.files = [
  {
    format: 'css/variables',
    destination: 'light.css',
    options: {
      outputReferences: true,
      showFileHeader: false
    },
    filter(token) {
      return token.colorScheme === 'light';
    }
  }
];

module.exports = config;
