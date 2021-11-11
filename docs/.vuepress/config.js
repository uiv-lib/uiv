module.exports = {
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
  plugins: {
    '@vuepress/active-header-links': null,
    '@vuepress/google-analytics': {
      ga: 'UA-102731925-2',
    },
    sitemap: {
      hostname: 'https://uiv.wxsm.space',
      dateFormatter: (time) => {
        // chinese date won't work here
        try {
          return new Date(time).toISOString()
        } catch (err) {
          return new Date().toISOString()
        }
      },
    },
    redirect: {
      redirectors: [
        {
          base: '/usage/',
          alternative: ['getting-started'],
        },
        {
          base: '/components/',
          alternative: ['btn'],
        },
        {
          base: '/zh/usage/',
          alternative: ['getting-started'],
        },
        {
          base: '/zh/components/',
          alternative: ['btn'],
        },
      ],
    },
  },
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'uiv',
      description: '基于 Vue 2 的 Bootstrap 3 组件库',
    },
  },
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
      { text: 'Usage', link: '/usage/' },
      { text: 'Components', link: '/components/' },
      { text: 'Funding', link: '/funding/' },
      { text: '0.x', link: 'https://uiv-v0.wxsm.space' },
      { text: 'Changelog', link: 'https://github.com/uiv-lib/uiv/releases' },
    ],
    sidebar: [
      {
        title: 'Usage',
        collapsable: false,
        children: ['/usage/getting-started', '/usage/i18n'],
      },
      {
        title: 'Components',
        collapsable: false,
        children: [
          {
            title: 'Basic',
            collapsable: false,
            children: [
              '/components/btn',
              '/components/btn-group',
              '/components/collapse',
            ],
          },
          {
            title: 'Popup',
            collapsable: false,
            children: [
              '/components/dropdown',
              '/components/modal',
              '/components/tooltip',
              '/components/popover',
            ],
          },
          {
            title: 'Form',
            collapsable: false,
            children: [
              '/components/multi-select',
              '/components/typeahead',
              '/components/date-picker',
              '/components/time-picker',
            ],
          },
          {
            title: 'Notice',
            collapsable: false,
            children: [
              '/components/alert',
              '/components/notification',
              '/components/message-box',
            ],
          },
          {
            title: 'Navigation',
            collapsable: false,
            children: [
              '/components/navbar',
              '/components/tabs',
              '/components/breadcrumbs',
            ],
          },
          {
            title: 'Indicator',
            collapsable: false,
            children: ['/components/pagination', '/components/progress-bar'],
          },
          {
            title: 'Others',
            collapsable: false,
            children: [
              '/components/carousel',
              '/components/affix',
              '/components/scroll-spy',
            ],
          },
        ],
      },
      {
        title: 'Funding',
        path: '/funding/',
      },
    ],
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
      },
      '/zh/': {
        lastUpdated: '最后更新于',
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          { text: '主页', link: '/zh/' },
          { text: '使用教程', link: '/zh/usage/' },
          { text: '组件', link: '/zh/components/' },
          { text: '赞助', link: '/zh/funding/' },
          { text: '0.x', link: 'https://uiv-v0.wxsm.space' },
          { text: '更新日志', link: 'https://github.com/uiv-lib/uiv/releases' },
        ],
        sidebar: [
          {
            title: '使用教程',
            collapsable: false,
            children: ['/zh/usage/getting-started', '/zh/usage/i18n'],
          },
          {
            title: '组件',
            collapsable: false,
            children: [
              {
                title: '基础',
                collapsable: false,
                children: [
                  '/zh/components/btn',
                  '/zh/components/btn-group',
                  '/zh/components/collapse',
                ],
              },
              {
                title: '弹出内容',
                collapsable: false,
                children: [
                  '/zh/components/dropdown',
                  '/zh/components/modal',
                  '/zh/components/tooltip',
                  '/zh/components/popover',
                ],
              },
              {
                title: '表单',
                collapsable: false,
                children: [
                  '/zh/components/multi-select',
                  '/zh/components/typeahead',
                  '/zh/components/date-picker',
                  '/zh/components/time-picker',
                ],
              },
              {
                title: '通知',
                collapsable: false,
                children: [
                  '/zh/components/alert',
                  '/zh/components/notification',
                  '/zh/components/message-box',
                ],
              },
              {
                title: '导航',
                collapsable: false,
                children: [
                  '/zh/components/navbar',
                  '/zh/components/tabs',
                  '/zh/components/breadcrumbs',
                ],
              },
              {
                title: '标志',
                collapsable: false,
                children: [
                  '/zh/components/pagination',
                  '/zh/components/progress-bar',
                ],
              },
              {
                title: '其它',
                collapsable: false,
                children: [
                  '/zh/components/carousel',
                  '/zh/components/affix',
                  '/zh/components/scroll-spy',
                ],
              },
            ],
          },
          {
            title: '赞助',
            path: '/zh/funding/',
          },
        ],
      },
    },
  },
}
