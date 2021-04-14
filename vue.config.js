
const path = require('path');
// const UglifyPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  lintOnSave: false,
  publicPath: '/dist',
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  // outputDir: "dist",
  // assetsDir: "static",
  filenameHashing: false,
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
  // chainWebpack: config => { // webpack-chain
  // },
  configureWebpack: config => { // webpack-merge
    // console.log(process.env.NODE_ENV, '---------');
    if (process.env.NODE_ENV.indexOf('production') > -1) {
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          automaticNameDelimiter: '~',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `${packageName.replace('@', '')}.${Math.random().toString(16).substr(2,)}`;
              }
            }
          }
        },
        minimizer: [
          // new UglifyPlugin({
          //   uglifyOptions: {
          //     compress: {
          //       warnings: false,
          //       drop_console: true, // console
          //       drop_debugger: false,
          //       pure_funcs: ["console.log"] // 移除console
          //     }
          //   }
          // })
        ]
      };
      Object.assign(config, {
        optimization
      });
    }
    // 别名配置
    Object.assign(config, {
      resolve: {
        extensions: ['.js', '.vue', '.json'],//请求本地json
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@components': path.resolve(__dirname, './src/components')
        }
      }
    });
  },
  css: {
    // extract: true,
    modules: false,
    sourceMap: false
  }
  
};