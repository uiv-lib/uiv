const path = require('path')
const uglify = require('rollup-plugin-uglify').uglify
const filesize = require('rollup-plugin-filesize')
const _ = require('lodash')

const baseConfig = require('./rollup.base')
const { name } = require('../package.json')

module.exports = _.merge({}, baseConfig, {
  input: path.join(__dirname, '..', 'src', 'index.browser.js'),
  plugins: [uglify(), filesize()],
  output: {
    format: 'umd',
    name: 'uiv',
    file: path.join(__dirname, '..', 'dist', `${name}.min.js`),
    sourcemap: true,
    globals: {
      vue: 'Vue',
    },
  },
})
