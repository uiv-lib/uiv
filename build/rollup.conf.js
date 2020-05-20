const fs = require('fs')
const path = require('path')
const vue = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')
const {name} = require('../package.json')

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

function generatePlugins () {
  return [
    vue(),
    resolve({external: ['vue']}),
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

const external = ['vue']
let bundles = []

const BUNDLE_FULL = {
  input: path.resolve(src, 'index.js'),
  external,
  plugins: generatePlugins(),
  output: [
    {
      format: 'cjs',
      file: path.resolve(dist, `${name}.common.js`),
      sourcemap: true
    },
    {
      format: 'es',
      file: path.resolve(dist, `${name}.esm.js`),
      sourcemap: true
    }
  ]
}

const files = [
  'services/notification/Notification.js',
  'services/messagebox/MessageBox.js',
  'directives/popover/popover.js',
  'directives/scrollspy/scrollspy.js',
  'directives/tooltip/tooltip.js',
  'components/affix/Affix.vue',
  'components/alert/Alert.vue',
  'components/breadcrumbs/BreadcrumbItem.js',
  'components/breadcrumbs/Breadcrumbs.js',
  'components/button/Btn.js',
  'components/button/BtnGroup.js',
  'components/button/BtnToolbar.js',
  'components/carousel/Carousel.vue',
  'components/carousel/Slide.vue',
  'components/collapse/Collapse.vue',
  'components/datepicker/DatePicker.vue',
  'components/dropdown/Dropdown.vue',
  'components/modal/Modal.vue',
  'components/navbar/Navbar.vue',
  'components/navbar/NavbarForm.js',
  'components/navbar/NavbarNav.js',
  'components/navbar/NavbarText.js',
  'components/pagination/Pagination.vue',
  'components/popover/Popover.vue',
  'components/progressbar/ProgressBar.js',
  'components/progressbar/ProgressBarStack.js',
  'components/select/MultiSelect.vue',
  'components/tabs/Tab.vue',
  'components/tabs/Tabs.vue',
  'components/timepicker/TimePicker.vue',
  'components/tooltip/Tooltip.vue',
  'components/typeahead/Typeahead.vue'
]

files.forEach(file => {
  const prefix = file.startsWith('directives') ? 'v_' : ''
  bundles.push({
    input: path.join(src, file),
    external,
    plugins: generatePlugins(),
    output: {
      format: 'es',
      file: path.resolve(dist, `${prefix + file.split('/').pop().split('.')[0]}.js`),
      sourcemap: true
    }
  })
})

bundles.push(BUNDLE_FULL)

module.exports = bundles
