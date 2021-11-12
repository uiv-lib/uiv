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
    // ['script', {
    //   'data-ad-client': 'ca-pub-4714899946256166',
    //   async: true,
    //   src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    // }]
  ],
  title: 'uiv',
  // plugins: {
  //   '@vuepress/active-header-links': null,
  //   '@vuepress/google-analytics': {
  //     ga: 'UA-102731925-2',
  //   },
  //   sitemap: {
  //     hostname: 'https://uiv.wxsm.space',
  //     dateFormatter: (time) => {
  //       // chinese date won't work here
  //       try {
  //         return new Date(time).toISOString()
  //       } catch (err) {
  //         return new Date().toISOString()
  //       }
  //     },
  //   },
  //   redirect: {
  //     redirectors: [
  //       {
  //         base: '/usage/',
  //         alternative: ['getting-started'],
  //       },
  //       {
  //         base: '/components/',
  //         alternative: ['btn'],
  //       },
  //       {
  //         base: '/zh/usage/',
  //         alternative: ['getting-started'],
  //       },
  //       {
  //         base: '/zh/components/',
  //         alternative: ['btn'],
  //       },
  //     ],
  //   },
  // },
  // locales: {
  //   '/': {
  //     lang: 'en-US',
  //   },
  //   '/zh/': {
  //     lang: 'zh-CN',
  //     title: 'uiv',
  //     description: '基于 Vue 2 的 Bootstrap 3 组件库',
  //   },
  // },
  // markdown: {
  //   toc: { includeLevel: [1, 2] },
  // },
  themeConfig: {
    logo: '/assets/image/logo.png',
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    repo: 'uiv-lib/uiv',
    repoLabel: 'GitHub',
    docsRepo: 'uiv-lib/uiv',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Usage', link: '/usage/getting-started' },
      { text: 'Components', link: '/components/btn' },
      { text: 'Funding', link: '/funding/' },
      { text: '0.x', link: 'https://uiv-v0.wxsm.space' },
      { text: 'Changelog', link: 'https://github.com/uiv-lib/uiv/releases' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Usage',
          collapsable: false,
          children: [
            { text: 'Getting Started', link: '/usage/getting-started' },
            {
              text: 'i18n',
              link: '/usage/i18n',
            },
          ],
        },
        {
          text: 'Components',
          collapsable: false,
          children: [
            {
              text: 'Basic',
              collapsable: false,
              children: [
                { text: 'btn', link: '/components/btn' },
                { text: 'btn-group', link: '/components/btn-group' },
                { text: 'collapse', link: '/components/collapse' },
              ],
            },
            {
              text: 'Popup',
              collapsable: false,
              children: [
                { text: 'dropdown', link: '/components/dropdown' },
                { text: 'modal', link: '/components/modal' },
                { text: 'tooltip', link: '/components/tooltip' },
                { text: 'popover', link: '/components/popover' },
              ],
            },
            {
              text: 'Form',
              collapsable: false,
              children: [
                { text: 'multi-select', link: '/components/multi-select' },
                { text: 'typeahead', link: '/components/typeahead' },
                { text: 'date-picker', link: '/components/date-picker' },
                { text: 'time-picker', link: '/components/time-picker' },
              ],
            },
            {
              text: 'Notice',
              collapsable: false,
              children: [
                { text: 'alert', link: '/components/alert' },
                { text: 'notification', link: '/components/notification' },
                { text: 'message-box', link: '/components/message-box' },
              ],
            },
            {
              text: 'Navigation',
              collapsable: false,
              children: [
                { text: 'navbar', link: '/components/navbar' },
                { text: 'tabs', link: '/components/tabs' },
                { text: 'breadcrumbs', link: '/components/breadcrumbs' },
              ],
            },
            {
              text: 'Indicator',
              collapsable: false,
              children: [
                { text: 'pagination', link: '/components/pagination' },
                { text: 'progress-bar', link: '/components/progress-bar' },
              ],
            },
            {
              text: 'Others',
              collapsable: false,
              children: [
                { text: 'carousel', link: '/components/carousel' },
                { text: 'affix', link: '/components/affix' },
                { text: 'scroll-spy', link: '/components/scroll-spy' },
              ],
            },
          ],
        },
        {
          text: 'Funding',
          link: '/funding/',
        },
      ],
    },
  },
}
