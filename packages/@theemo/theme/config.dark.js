const base = require('./config.base');

const config = {
  ...base,
  include: [`tokens/theme/**/!(*.${base.modes.join(`|*.`)}).json`],
  source: [`tokens/theme/**/*.dark.json`]
};
config.platforms.web.files = [
  {
    format: 'css/variables',
    destination: 'dark.css',
    options: {
      outputReferences: true,
      showFileHeader: false
    },
    filter(token) {
      return token.colorScheme === 'dark';
    }
  }
];

module.exports = config;
