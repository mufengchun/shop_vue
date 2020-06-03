module.exports = {
  lintOnSave: false,
  publicPath: '/dist',
  devServer: {
    port: 8082,
    proxy: {
      '/api': {
        target: 'https://springhua.top:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'https://springhua.top:3000/'
        }
      }
    }
  },
  configureWebpack: config => {
    config.devtool = 'cheap-module-eval-source-map';
  }
};
