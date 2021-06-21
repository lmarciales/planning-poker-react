const CracoAlias = require('craco-alias');

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: './src',
        aliases: {
          '@applications': './src/application',
          '@infrastructure': './src/infrastructure',
          '@presentation': './src/presentation',
        },
      },
    },
  ],
};
