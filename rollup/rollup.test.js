const replace = require('@rollup/plugin-replace')
const buble = require('@rollup/plugin-buble')
const vue = require('rollup-plugin-vue')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')

const { name } = require('../package.json')

module.exports = {
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('test')
    }),
    json(),
    vue(),
    resolve(),
    commonjs(),
    buble({
      objectAssign: 'Object.assign',
      transforms: {
        asyncAwait: false
      }
    })
  ],
  // input: 'test/specs/Typeahead.spec.js',
  output: {
    format: 'iife', // Helps prevent naming collisions.
    name: name, // Required for 'iife' format.
    sourcemap: 'inline' // Sensible for testing.
  }
}
