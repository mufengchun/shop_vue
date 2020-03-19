module.exports = {
  lintOnSave: true,
  devServer: {
    port: 8082,
    proxy: {
      '/api': {
        target: 'https://datainfo.duapp.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'https://datainfo.duapp.com/'
        }
      }
    }
  }
};
