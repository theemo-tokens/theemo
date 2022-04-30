const base = require('./config.base');

const config = {
  ...base,
  include: [`tokens/theme/**/!(*.${base.modes.join(`|*.`)}).json`],
  source: [`tokens/theme/**/*.light.json`]
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
