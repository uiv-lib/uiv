import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vitepress';
import { resolve } from 'path';

export default defineConfig({
  lang: 'en-US',
  title: 'uiv',
  description: 'Bootstrap 3 components implemented by Vue.',

  lastUpdated: true,

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

  themeConfig: {
    search: {
      provider: 'local',
    },

    nav: navbar(),
    sidebar: {
      '/usage/': usageSidebar(),
      '/components/': componentSidebar(),
    },

    logo: '/assets/image/logo.png',
    editLink: {
      pattern: 'https://github.com/uiv-lib/uiv/edit/dev/docs/:path',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/uiv-lib/uiv' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2017-present Kairui Guo',
    },
  },
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        uiv: resolve(__dirname, '../../src/index.js'),
      },
    },
  },
});

function navbar() {
  return [
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
    { text: 'Funding', link: '/funding/' },
    {
      text: 'Versions',
      items: [
        { text: '1.x', link: 'https://uiv-v1.wxsm.space' },
        { text: '0.x', link: 'https://uiv-v0.wxsm.space' },
      ],
    },
    { text: 'Changelog', link: 'https://github.com/uiv-lib/uiv/releases' },
  ];
}

function usageSidebar() {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Getting Started', link: '/usage/getting-started' },
        {
          text: 'i18n',
          link: '/usage/i18n',
        },
      ],
    },
  ];
}

function componentSidebar() {
  return [
    {
      text: 'Basic',
      items: [
        { text: 'Button', link: '/components/btn' },
        { text: 'Button Group', link: '/components/btn-group' },
        { text: 'Collapse', link: '/components/collapse' },
      ],
    },
    {
      text: 'Popup',
      items: [
        { text: 'Dropdown', link: '/components/dropdown' },
        { text: 'Modal', link: '/components/modal' },
        { text: 'Tooltip', link: '/components/tooltip' },
        { text: 'Popover', link: '/components/popover' },
      ],
    },
    {
      text: 'Form',
      items: [
        { text: 'Multi Select', link: '/components/multi-select' },
        { text: 'Typeahead', link: '/components/typeahead' },
        { text: 'Date Picker', link: '/components/date-picker' },
        { text: 'Time Picker', link: '/components/time-picker' },
      ],
    },
    {
      text: 'Notice',
      items: [
        { text: 'Alert', link: '/components/alert' },
        { text: 'Notification', link: '/components/notification' },
        { text: 'Message Box', link: '/components/message-box' },
      ],
    },
    {
      text: 'Navigation',
      items: [
        { text: 'Navbar', link: '/components/navbar' },
        { text: 'Tabs', link: '/components/tabs' },
        { text: 'Breadcrumbs', link: '/components/breadcrumbs' },
      ],
    },
    {
      text: 'Indicator',
      items: [
        { text: 'Pagination', link: '/components/pagination' },
        { text: 'Progress Bar', link: '/components/progress-bar' },
      ],
    },
    {
      text: 'Others',
      items: [
        { text: 'Carousel', link: '/components/carousel' },
        { text: 'Affix', link: '/components/affix' },
        { text: 'Scroll Spy', link: '/components/scroll-spy' },
      ],
    },
  ];
}
