const path = require('path')
const _ = require('lodash')

const baseConfig = require('./rollup.base')

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

module.exports = files.map((file) => {
  const prefix = file.startsWith('directives') ? 'v_' : ''
  return _.merge({}, baseConfig, {
    input: path.join(__dirname, '..', 'src', file),
    output: [
      {
        format: 'es',
        file: path.join(
          __dirname,
          '..',
          'dist',
          `${prefix + file.split('/').pop().split('.')[0]}.js`
        ),
        sourcemap: true,
      },
    ],
  })
})
