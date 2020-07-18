const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../public'),
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/global.scss";`,
      },
    },
  },
};
