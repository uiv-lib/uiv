const fs = require('fs')
const path = require('path')
const vue = require('rollup-plugin-vue')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const commonjs = require('@rollup/plugin-commonjs')
const buble = require('@rollup/plugin-buble')

const dist = path.join(__dirname, '..', 'dist')

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

module.exports = {
  external: ['vue'],
  plugins: [
    vue(),
    resolve(),
    commonjs(),
    buble()
  ]
}
