const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/imports.scss')],
    },
  },
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/variables.sass"',
      },
      scss: {
        prependData: '@import "~@/styles/variables.scss"; @import "~@/styles/_typography.scss"; @import "~@/styles/_layout.scss"; @import "~@/styles/_base.scss";',
      },
    },
  },
};
