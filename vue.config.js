// const fs = require('fs');
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
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       // data: `@import './src/assets/css/comm.scss'`
  //       data: fs.readFileSync('src/assets/css/comm.scss', 'utf-8')
  //     }
  //   }
  // },
  configureWebpack: config => {
    config.devtool = 'cheap-module-eval-source-map';
  }
  
};
