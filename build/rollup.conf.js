const fs = require('fs')
const path = require('path')
const vue = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

module.exports = {
  input: path.resolve(src, 'index.js'),
  external: ['vue'],
  plugins: [
    vue(),
    resolve({external: ['vue']}),
    babel({
      babelrc: false,
      "presets": [
        [
          "latest",
          {
            "es2015": {
              "modules": false
            }
          }
        ],
        "stage-2"
      ],
      plugins: [
        'transform-object-assign',
        'external-helpers'
      ]
    })
  ],
  output: [
    {
      format: 'es',
      file: path.resolve(dist, 'uiv.esm.js'),
      sourcemap: true
    }
  ]
}
