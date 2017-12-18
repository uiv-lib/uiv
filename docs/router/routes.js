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
    meta: {type: 'usage', label: 'Getting Started', url: 'usage/GettingStarted.md'},
    component: () => import('./../pages/usage/GettingStarted.md')
  },
  {
    path: '/i18n',
    meta: {type: 'usage', label: 'I18n', url: 'usage/I18n.md'},
    component: () => import('./../pages/usage/I18n.md')
  },
  {
    path: '/affix',
    meta: {type: 'component', label: 'Affix', url: 'components/Affix.md'},
    component: () => import('./../pages/components/Affix.md')
  },
  {
    path: '/alert',
    meta: {type: 'component', label: 'Alert', url: 'components/Alert.md'},
    component: () => import('./../pages/components/Alert.md')
  },
  {
    path: '/breadcrumbs',
    meta: {type: 'component', label: 'Breadcrumbs', url: 'components/Breadcrumbs.md'},
    component: () => import('./../pages/components/Breadcrumbs.md')
  },
  {
    path: '/button',
    meta: {type: 'component', label: 'Button', url: 'components/Btn.md'},
    component: () => import('./../pages/components/Btn.md')
  },
  {
    path: '/button-group',
    meta: {type: 'component', label: 'ButtonGroup', url: 'components/BtnGroup.md'},
    component: () => import('./../pages/components/BtnGroup.md')
  },
  {
    path: '/carousel',
    meta: {type: 'component', label: 'Carousel', url: 'components/Carousel.md'},
    component: () => import('./../pages/components/Carousel.md')
  },
  {
    path: '/collapse',
    meta: {type: 'component', label: 'Collapse', url: 'components/Collapse.md'},
    component: () => import('./../pages/components/Collapse.md')
  },
  {
    path: '/date-picker',
    meta: {type: 'component', label: 'DatePicker', url: 'components/DatePicker.md'},
    component: () => import('./../pages/components/DatePicker.md')
  },
  {
    path: '/dropdown',
    meta: {type: 'component', label: 'Dropdown', url: 'components/Dropdown.md'},
    component: () => import('./../pages/components/Dropdown.md')
  },
  {
    path: '/message-box',
    meta: {type: 'component', label: 'MessageBox', url: 'components/MessageBox.md'},
    component: () => import('./../pages/components/MessageBox.md')
  },
  {
    path: '/modal',
    meta: {type: 'component', label: 'Modal', url: 'components/Modal.md'},
    component: () => import('./../pages/components/Modal.md')
  },
  {
    path: '/notification',
    meta: {type: 'component', label: 'Notification', url: 'components/Notification.md'},
    component: () => import('./../pages/components/Notification.md')
  },
  {
    path: '/pagination',
    meta: {type: 'component', label: 'Pagination', url: 'components/Pagination.md'},
    component: () => import('./../pages/components/Pagination.md')
  },
  {
    path: '/popover',
    meta: {type: 'component', label: 'Popover', url: 'components/Popover.md'},
    component: () => import('./../pages/components/Popover.md')
  },
  {
    path: '/progress-bar',
    meta: {type: 'component', label: 'ProgressBar', url: 'components/ProgressBar.md'},
    component: () => import('./../pages/components/ProgressBar.md')
  },
  {
    path: '/scroll-spy',
    meta: {type: 'component', label: 'ScrollSpy', url: 'components/ScrollSpy.md'},
    component: () => import('./../pages/components/ScrollSpy.md')
  },
  {
    path: '/tabs',
    meta: {type: 'component', label: 'Tabs', url: 'components/Tabs.md'},
    component: () => import('./../pages/components/Tabs.md')
  },
  {
    path: '/time-picker',
    meta: {type: 'component', label: 'TimePicker', url: 'components/TimePicker.md'},
    component: () => import('./../pages/components/TimePicker.md')
  },
  {
    path: '/tooltip',
    meta: {type: 'component', label: 'Tooltip', url: 'components/Tooltip.md'},
    component: () => import('./../pages/components/Tooltip.md')
  },
  {
    path: '/typeahead',
    meta: {type: 'component', label: 'Typeahead', url: 'components/Typeahead.md'},
    component: () => import('./../pages/components/Typeahead.md')
  }
]

export default routes
