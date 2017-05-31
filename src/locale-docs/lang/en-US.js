import uivLocale from './../../locale/lang/en-US'

const docLocale = {
  common: {
    basicExample: 'Basic Example',
    dynamicExample: 'Dynamic Example',
    sampleCode: 'Sample Code',
    demoSource: 'Demo Source',
    source: 'Source',
    note: 'Note',
    props: 'Props',
    slots: 'Slots',
    events: 'Events',
    name: 'Name',
    type: 'Type',
    default: 'Default',
    required: 'Required',
    description: 'Description',
    params: 'Params'
  },
  menu: {
    usage: 'Usage',
    gettingStarted: 'Getting Started',
    components: 'Components',
    alert: 'Alert',
    carousel: 'Carousel',
    collapse: 'Collapse',
    datePicker: 'Date Picker',
    dropdown: 'Dropdown',
    modal: 'Modal',
    pagination: 'Pagination',
    popover: 'popover',
    progressBar: 'Progress Bar',
    tabs: 'Tabs',
    timePicker: 'Time Picker',
    tooltip: 'Tooltip',
    typeahead: 'Typeahead'
  },
  home: {
    desc: '<b>Bootstrap 3</b> Components implemented by <b>Vue 2</b>.',
    codeOnGithub: 'Code on Github',
    gettingStarted: 'Getting Started',
    lightWeight: 'Light Weight',
    lightWeight1: '~ <b>14KB</b> Gziped',
    lightWeight2: 'Dependencies only',
    lightWeight3: '<b>Vue</b> & <b>Bootstrap CSS</b>',
    compatible: 'Compatible',
    compatible1: 'Tested with',
    compatible2: '<b>Modern Browsers</b>',
    compatible3: 'And <b>IE 9+</b>',
    openSource: 'Open Source',
    openSource1: '<b>MIT</b> License',
    openSource2: 'Easy and Free',
    openSource3: 'Welcome to contribute!'
  },
  gettingStarted: {
    dependencies: 'Dependencies',
    supportedBrowsers: 'Supported Browsers',
    supportedBrowsersDesc: 'Components and directives are tested with the following browsers:',
    install: 'Install',
    installDesc: 'uiv is using UMD exporter, which means you can use it in both ES6 / CommonJS / AMD / Browser.',
    es6Sample: 'ES6 Sample',
    browserSample: 'Browser Sample'
  },
  alert: {
    displayTime: 'display time',
    addAlertTime: 'Add Alert (Time)',
    addAlert: 'Alert',
    useWithCollapse: 'Use with Collapse',
    showAlert: 'Show Alert'
  },
  carousel: {
    toggleIndicators: 'Toggle Indicators',
    toggleControls: 'Toggle Controls',
    pushSlide: 'Push Slide',
    interval: 'Interval'
  }
}

const locale = Object.assign({}, docLocale, uivLocale)

export default locale
