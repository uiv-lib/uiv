const replace = require('@rollup/plugin-replace')
const buble = require('@rollup/plugin-buble')
const vue = require('rollup-plugin-vue')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const alias = require('@rollup/plugin-alias')
const istanbul = require('rollup-plugin-istanbul')
const path = require('path')

const { name } = require('../package.json')

module.exports = {
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('test')
    }),
    alias({
      entries: [
        { find: /^vue$/, replacement: 'vue/dist/vue.esm.js' }
      ]
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
    }),
    istanbul({
      exclude: [
        'test/**/*.js',
        'test/**/*.json',
        'node_modules/**/*.js',
        'node_modules/**/*.mjs',
        'src/**/*.vue'
      ]
    })
  ],
  output: {
    format: 'iife', // Helps prevent naming collisions.
    name: name, // Required for 'iife' format.
    sourcemap: 'inline' // Sensible for testing.
  }
  // input: 'test/index.js',
  // output: {
  //   format: 'es',
  //   file: path.join(__dirname, '..', 'dist', `${name}.test.js`),
  //   sourcemap: true
  // }
}
