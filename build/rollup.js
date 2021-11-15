import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import strip from 'rollup-plugin-strip-code'
import path from 'path'
import { name } from '../package.json'
import esbuild from 'rollup-plugin-esbuild'
import filesize from 'rollup-plugin-filesize'

function genBaseConfig({ SSR = false, minify = false } = {}) {
  return {
    external: ['vue'],
    input: path.join(__dirname, '..', 'src', 'index.js'),
    plugins: [
      vue({ target: SSR ? 'node' : 'browser', exposeFilename: false }),
      nodeResolve(),
      strip({
        start_comment: 'START.TESTS_ONLY',
        end_comment: 'END.TESTS_ONLY',
      }),
      esbuild({
        // All options are optional
        sourceMap: true, // default
        minify: minify,
        target: 'es2015', // default, or 'es20XX', 'esnext'
        jsx: 'transform', // default, or 'preserve'
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        // Like @rollup/plugin-replace
        define: {
          // __VERSION__: '"x.y.z"',
        },
        tsconfig: 'tsconfig.json', // default
        // Add extra loaders
        loaders: {
          // Add .json files support
          // require @rollup/plugin-commonjs
          // '.json': 'json',
          // Enable JSX in .js files too
          // '.js': 'jsx',
        },
      }),
      filesize(),
    ],
  }
}

const files = [
  'services/notification/Notification.js',
  'services/messagebox/MessageBox.js',
  'directives/popover/popover.js',
  'directives/scrollspy/scrollspy.js',
  'directives/tooltip/tooltip.js',
  'components/affix/Affix.vue',
  'components/alert/Alert.vue',
  'components/breadcrumbs/BreadcrumbItem.vue',
  'components/breadcrumbs/Breadcrumbs.vue',
  'components/button/Btn.vue',
  'components/button/BtnGroup.vue',
  'components/button/BtnToolbar.vue',
  'components/carousel/Carousel.vue',
  'components/carousel/Slide.vue',
  'components/collapse/Collapse.js',
  'components/datepicker/DatePicker.vue',
  'components/dropdown/Dropdown.vue',
  'components/modal/Modal.vue',
  'components/navbar/Navbar.vue',
  'components/navbar/NavbarForm.vue',
  'components/navbar/NavbarNav.vue',
  'components/navbar/NavbarText.vue',
  'components/pagination/Pagination.vue',
  'components/popover/Popover.vue',
  'components/progressbar/ProgressBar.vue',
  'components/progressbar/ProgressBarStack.vue',
  'components/select/MultiSelect.vue',
  'components/tabs/Tab.vue',
  'components/tabs/Tabs.vue',
  'components/timepicker/TimePicker.vue',
  'components/tooltip/Tooltip.vue',
  'components/typeahead/Typeahead.vue',
]

export default [
  ...files.map((file) => {
    const prefix = file.startsWith('directives') ? 'v_' : ''
    return {
      ...genBaseConfig(),
      input: path.join(__dirname, '..', 'src', file),
      output: {
        format: 'es',
        file: path.join(
          __dirname,
          '..',
          'dist',
          `${prefix + file.split('/').pop().split('.')[0]}.js`
        ),
        sourcemap: true,
      },
    }
  }),
  {
    ...genBaseConfig(),
    output: {
      format: 'es',
      file: path.join(__dirname, '..', 'dist', `${name}.esm.js`),
      sourcemap: true,
    },
  },
  {
    ...genBaseConfig({ SSR: true }),
    output: {
      format: 'cjs',
      file: path.join(__dirname, '..', 'dist', `${name}.common.js`),
      sourcemap: true,
    },
  },
  {
    ...genBaseConfig({ minify: true }),
    output: {
      format: 'umd',
      name: 'uiv',
      file: path.join(__dirname, '..', 'dist', `${name}.min.js`),
      sourcemap: true,
      globals: {
        vue: 'Vue',
      },
    },
  },
]
