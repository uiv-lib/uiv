// DO NOT ADD ANYTHING ELSE EXCEPT ROUTE ITEM INTO THIS FILE
// routes order = menu order
const routes = [
  {
    path: '/',
    meta: {type: 'home', label: 'Home'},
    component: () => import('./../components/Home.vue')
  },
  {
    path: '/getting-started',
    meta: {type: 'usage', label: 'Getting Started'},
    component: () => import('./../pages/usage/GettingStarted.md')
  },
  {
    path: '/i18n',
    meta: {type: 'usage', label: 'I18n'},
    component: () => import('./../pages/usage/I18n.md')
  },
  {
    path: '/affix',
    meta: {type: 'component', label: 'Affix'},
    component: () => import('./../pages/components/Affix.md')
  },
  {
    path: '/alert',
    meta: {type: 'component', label: 'Alert'},
    component: () => import('./../pages/components/Alert.md')
  },
  {
    path: '/breadcrumbs',
    meta: {type: 'component', label: 'Breadcrumbs'},
    component: () => import('./../pages/components/Breadcrumbs.md')
  },
  {
    path: '/button',
    meta: {type: 'component', label: 'Button'},
    component: () => import('./../pages/components/Btn.md')
  },
  {
    path: '/button-group',
    meta: {type: 'component', label: 'ButtonGroup'},
    component: () => import('./../pages/components/BtnGroup.md')
  },
  {
    path: '/carousel',
    meta: {type: 'component', label: 'Carousel'},
    component: () => import('./../pages/components/Carousel.md')
  },
  {
    path: '/collapse',
    meta: {type: 'component', label: 'Collapse'},
    component: () => import('./../pages/components/Collapse.md')
  },
  {
    path: '/date-picker',
    meta: {type: 'component', label: 'DatePicker'},
    component: () => import('./../pages/components/DatePicker.md')
  },
  {
    path: '/dropdown',
    meta: {type: 'component', label: 'Dropdown'},
    component: () => import('./../pages/components/Dropdown.md')
  },
  {
    path: '/message-box',
    meta: {type: 'component', label: 'MessageBox'},
    component: () => import('./../pages/components/MessageBox.md')
  },
  {
    path: '/modal',
    meta: {type: 'component', label: 'Modal'},
    component: () => import('./../pages/components/Modal.md')
  },
  {
    path: '/notification',
    meta: {type: 'component', label: 'Notification'},
    component: () => import('./../pages/components/Notification.md')
  },
  {
    path: '/pagination',
    meta: {type: 'component', label: 'Pagination'},
    component: () => import('./../pages/components/Pagination.md')
  },
  {
    path: '/popover',
    meta: {type: 'component', label: 'Popover'},
    component: () => import('./../pages/components/Popover.md')
  },
  {
    path: '/progress-bar',
    meta: {type: 'component', label: 'ProgressBar'},
    component: () => import('./../pages/components/ProgressBar.md')
  },
  {
    path: '/scroll-spy',
    meta: {type: 'component', label: 'ScrollSpy'},
    component: () => import('./../pages/components/ScrollSpy.md')
  },
  {
    path: '/tabs',
    meta: {type: 'component', label: 'Tabs'},
    component: () => import('./../pages/components/Tabs.md')
  },
  {
    path: '/time-picker',
    meta: {type: 'component', label: 'TimePicker'},
    component: () => import('./../pages/components/TimePicker.md')
  },
  {
    path: '/tooltip',
    meta: {type: 'component', label: 'Tooltip'},
    component: () => import('./../pages/components/Tooltip.md')
  },
  {
    path: '/typeahead',
    meta: {type: 'component', label: 'Typeahead'},
    component: () => import('./../pages/components/Typeahead.md')
  }
]

export default routes
