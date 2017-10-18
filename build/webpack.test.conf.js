// This is the webpack config used for unit tests.

var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

// Markdown loader: Use HTML section tag for test and remove plugins
webpackConfig.module.rules.forEach(rule => {
  if (rule.loader === 'vue-markdown-loader') {
    rule.options.wrapper = 'section'
    rule.options.use = []
  }
})

module.exports = webpackConfig
