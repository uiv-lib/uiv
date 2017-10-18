import VueRouter from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 250,
  minimum: 0.15
})

const routes = [
  {path: '/', component: () => import('./../components/Home.vue')},
  {path: '/i18n', component: () => import('./../pages/usage/I18n.md')},
  {path: '/getting-started', component: () => import('./../pages/usage/GettingStarted.md')},
  {path: '/affix', component: () => import('./../pages/components/Affix.md')},
  {path: '/alert', component: () => import('./../pages/components/Alert.md')},
  {path: '/carousel', component: () => import('./../pages/components/Carousel.md')},
  {path: '/collapse', component: () => import('./../pages/components/Collapse.md')},
  {path: '/date-picker', component: () => import('./../pages/components/DatePicker.md')},
  {path: '/dropdown', component: () => import('./../pages/components/Dropdown.md')},
  {path: '/modal', component: () => import('./../pages/components/Modal.md')},
  {path: '/pagination', component: () => import('./../pages/components/Pagination.md')},
  {path: '/popover', component: () => import('./../pages/components/Popover.md')},
  {path: '/progress-bar', component: () => import('./../pages/components/ProgressBar.md')},
  {path: '/tabs', component: () => import('./../pages/components/Tabs.md')},
  {path: '/time-picker', component: () => import('./../pages/components/TimePicker.md')},
  {path: '/tooltip', component: () => import('./../pages/components/Tooltip.md')},
  {path: '/typeahead', component: () => import('./../pages/components/Typeahead.md')}
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

router.beforeEach((to, from, next) => {
  // Start progressbar
  NProgress.start()
  next()
})

router.afterEach(route => {
  // Finish progress
  NProgress.done()
})

export default router
