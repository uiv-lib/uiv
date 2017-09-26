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
    install: 'Install',
    i18n: 'I18n',
    gettingStarted: 'Getting Started',
    components: 'Components',
    alert: 'Alert',
    carousel: 'Carousel',
    collapse: 'Collapse',
    datePicker: 'Date Picker',
    dropdown: 'Dropdown',
    modal: 'Modal',
    pagination: 'Pagination',
    popover: 'Popover',
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
    usage: 'Usage',
    usageDesc: 'uiv is using UMD exporter, which means you can use it in both ES6 / CommonJS / AMD / Browser.',
    es6Sample: 'ES6 Sample',
    browserSample: 'Browser Sample'
  },
  install: {
    viaCdn: 'Via CDN',
    viaNpm: 'Via NPM',
    viaNpmDesc: 'It is recommended to use NPM as package manager and ES6 / Webpack to develop Vue projects.'
  },
  i18n: {
    basic: 'Basic Usage',
    basicDesc: 'All uiv components use English as default language, you can config them to others, for Example:',
    basicDesc2: 'As you see, we can also create custom wordings if not satisfied with the defaults, simply create your own <code>locale</code> object and replace with the one in example code will do.',
    vueI18n: 'Use with Vue I18n',
    vueI18nDesc: 'uiv is compatible with <a href="https://github.com/kazupon/vue-i18n">vue-i18n</a> as well.',
    vueI18nDesc2: '<b>Note</b>: You need to merge uiv language packs into your app\'s. For example:',
    supported: 'Supported Languages',
    supportedSortBy: '(Sorted by alphabet)',
    supportedContribute: 'Welcome to contribute more languages!'
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
  },
  collapse: {
    accordion: 'Accordion',
    navbar: 'Navbar',
    navbarNote: 'Note:',
    navbarNote1: 'Change viewport to mobile size to view the collapse part.',
    navbarNote2: 'Remember to add <code>class="navbar-collapse"</code> to the collapse component. View demo source for details.'
  },
  datePicker: {
    inlineExample: 'Inline Example',
    withDropdown: 'With Dropdown',
    showTodayBtn: 'Show Today Btn',
    showClearBtn: 'Show Clear Btn',
    closeOnSelected: 'Close on Selected',
    limitFrom: 'Limit From',
    limitTo: 'Limit To',
    weekStartsWith: 'Week Starts With',
    format: 'Format (For Example)',
    formatNote: 'Some browser (e.g. IE) might not support all of these formats'
  },
  dropdown: {
    dropdown1: 'Dropdown 1',
    dropdown2: 'Dropdown 2',
    splitButton: 'Split Button',
    dropdownAppendToBody: 'Dropdown Append to Body',
    dropup: 'Dropup',
    menuOnRight: 'Menu on Right'
  },
  modal: {
    simple: 'Simple Modal with Callback',
    sizes: 'Different Sizes',
    customize: 'Customize Header / Footer',
    others: 'Others'
  },
  pagination: {
    currentPage: 'Current Page',
    size: 'Size',
    totalPage: 'Total Page',
    maxSize: 'Max Size',
    boundaryLinks: 'Boundary Links',
    directionLinks: 'Direction Links'
  },
  popover: {
    dynamicPopover: 'Dynamic Popover',
    functionalPopover: 'Functional Popover',
    enableOrDisable: 'Enable / Disable Popover',
    autoAdjust: 'Auto Adjust Placement',
    title: 'Title',
    placement: 'Placement',
    trigger: 'Trigger'
  },
  progressBar: {
    label: 'Label',
    customLabel: 'Custom Label',
    minimumWidth: 'Minimum Width',
    differentStyles: 'Different Styles',
    striped: 'Striped',
    activeStriped: 'Active Striped',
    stacked: 'Stacked'
  },
  tabs: {
    activeTab: 'Active Tab',
    enableOrDisable: 'Enable / Disable Tab',
    justifiedStyle: 'Justified Style',
    withSlot: 'With nav-right Slot'
  },
  timePicker: {
    setTo: 'Set to',
    toggleReadonly: 'Toggle Readonly',
    hourStep: 'Hour Step',
    minuteStep: 'Minute Step',
    minTime: 'Max Time',
    maxTime: 'Max Time'
  },
  tooltip: {
    enableOrDisable: 'Enable / Disable Tooltip',
    autoAdjust: 'Auto Adjust Placement',
    text: 'Tooltip Text (Support HTML)',
    placement: 'Placement',
    trigger: 'Trigger'
  },
  typeahead: {
    staticQueryExample: 'Static Query Example',
    ignoreCase: 'Ignore Case',
    matchStart: 'Match Start',
    forceSelect: 'Force Select',
    reset: 'Reset',
    setTo: 'Set To',
    customExample: 'Async & Custom Template Example'
  }
}

const locale = Object.assign({}, docLocale, uivLocale)

export default locale
