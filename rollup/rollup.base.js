const fs = require('fs')
const path = require('path')
const vue = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')

const dist = path.join(__dirname, '..', 'dist')

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

module.exports = {
  external: ['vue'],
  plugins: [
    vue(),
    resolve({ external: ['vue'] }),
    babel({
      babelrc: false,
      'presets': [
        [
          'env',
          {
            'modules': false,
            'targets': {
              'browsers': [
                '> 1%',
                'last 2 versions',
                'not ie <= 8'
              ]
            }
          }
        ],
        'stage-2'
      ],
      plugins: [
        'transform-object-assign',
        'external-helpers'
      ]
    })
  ]
}
