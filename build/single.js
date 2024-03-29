const { exec } = require('child_process');

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
  'components/collapse/Collapse.vue',
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
];

function e(command, options) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        process.exit(1);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      resolve();
    });
  });
}

(async function () {
  for (const file of files) {
    const prefix = file.startsWith('directives') ? 'v_' : '';

    await e('npx vite build -c build/vite.config.js', {
      env: {
        ...process.env,
        UIV_ENTRY: file,
        UIV_FILENAME: `${prefix + file.split('/').pop().split('.')[0]}.js`,
      },
    });
  }
})();
