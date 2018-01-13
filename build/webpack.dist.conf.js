const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : config.dist.env

let rules = baseWebpackConfig.module.rules
// find vue-loader and disable css source map & extract
for (let i = 0; i < rules.length; i++) {
  if (rules[i].loader === 'vue-loader') {
    rules[i].options = {
      loaders: utils.cssLoaders({
        sourceMap: false,
        extract: false
      })
    }
    break
  }
}

let webpackConfig = {
  entry: {
    app: './src/index-browser.js'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  output: {
    path: config.dist.assetsRoot,
    filename: 'uiv.min.js',
    library: 'uiv',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: baseWebpackConfig.resolve,
  module: {
    rules: rules
  },
  devtool: config.dist.productionSourceMap ? '#source-map' : false,
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}

if (config.dist.productionGzip) {
  let CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
