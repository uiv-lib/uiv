export default {
  description: 'Bootstrap 3 components implemented by Vue 2.',
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'ekuL5J7xK1IdFtP13v3KxpuGKnYS1oCT9PvZdjYm8Eg',
      },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Bootstrap,Vue,JavaScript,HTML,CSS,Components,Directives,UI,Affix,MessageBox,Notification,ScrollSpy,Alert,Button,ButtonGroup,Breadcrumbs,Carousel,Collapse,DatePicker,Dropdown,Modal,Pagination,Popover,ProgressBar,Tabs,TimePicker,Tooltip,Typeahead,AutoComplete,MultiSelect,Navbar',
      },
    ],
  ],
  title: 'uiv',
  themeConfig: {
    logo: '/assets/image/logo.png',
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    repo: 'uiv-lib/uiv',
    repoLabel: 'GitHub',
    docsRepo: 'uiv-lib/uiv',
    docsDir: 'docs',
    docsBranch: 'dev',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Usage',
        link: '/usage/getting-started',
        activeMatch: '^/usage/',
      },
      {
        text: 'Components',
        link: '/components/btn',
        activeMatch: '^/components/',
      },
      { text: '1.x', link: 'https://uiv-v1.wxsm.space' },
      { text: '0.x', link: 'https://uiv-v0.wxsm.space' },
      { text: 'Funding', link: '/funding/' },
      { text: 'Changelog', link: 'https://github.com/uiv-lib/uiv/releases' },
    ],
    sidebar: {
      '/usage': [
        { text: 'Getting Started', link: '/usage/getting-started' },
        {
          text: 'i18n',
          link: '/usage/i18n',
        },
      ],
      '/components': [
        {
          text: 'Basic',
          collapsable: false,
          children: [
            { text: 'Button', link: '/components/btn' },
            { text: 'Button Group', link: '/components/btn-group' },
            { text: 'Collapse', link: '/components/collapse' },
          ],
        },
        {
          text: 'Popup',
          collapsable: false,
          children: [
            { text: 'Dropdown', link: '/components/dropdown' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Tooltip', link: '/components/tooltip' },
            { text: 'Popover', link: '/components/popover' },
          ],
        },
        {
          text: 'Form',
          collapsable: false,
          children: [
            { text: 'Multi Select', link: '/components/multi-select' },
            { text: 'Typeahead', link: '/components/typeahead' },
            { text: 'Date Picker', link: '/components/date-picker' },
            { text: 'Time Picker', link: '/components/time-picker' },
          ],
        },
        {
          text: 'Notice',
          collapsable: false,
          children: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Notification', link: '/components/notification' },
            { text: 'Message Box', link: '/components/message-box' },
          ],
        },
        {
          text: 'Navigation',
          collapsable: false,
          children: [
            { text: 'Navbar', link: '/components/navbar' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Breadcrumbs', link: '/components/breadcrumbs' },
          ],
        },
        {
          text: 'Indicator',
          collapsable: false,
          children: [
            { text: 'Pagination', link: '/components/pagination' },
            { text: 'Progress Bar', link: '/components/progress-bar' },
          ],
        },
        {
          text: 'Others',
          collapsable: false,
          children: [
            { text: 'Carousel', link: '/components/carousel' },
            { text: 'Affix', link: '/components/affix' },
            { text: 'Scroll Spy', link: '/components/scroll-spy' },
          ],
        },
      ],
    },
  },
}
