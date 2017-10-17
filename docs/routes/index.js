import VueRouter from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 250,
  minimum: 0.15
})

const routes = [
  {path: '/', component: require('./../components/pages/Home.vue')},
  {path: '/install', component: require('./../components/pages/Install.vue')},
  {path: '/i18n', component: require('./../components/pages/I18n.vue')},
  {path: '/getting-started', component: require('./../components/pages/GettingStarted.vue')},
  {path: '/alert', component: () => import('./../pages/components/Alert.md')},
  {path: '/carousel', component: require('./../components/pages/CarouselDoc.vue')},
  {path: '/collapse', component: require('./../components/pages/CollapseDoc.vue')},
  {path: '/date-picker', component: require('./../components/pages/DatePickerDoc.vue')},
  {path: '/dropdown', component: require('./../components/pages/DropdownDoc.vue')},
  {path: '/modal', component: require('./../components/pages/ModalDoc.vue')},
  {path: '/pagination', component: require('./../components/pages/PaginationDoc.vue')},
  {path: '/popover', component: require('./../components/pages/PopoverDoc.vue')},
  {path: '/progress-bar', component: require('./../components/pages/ProgressBarDoc.vue')},
  {path: '/tabs', component: require('./../components/pages/TabsDoc.vue')},
  {path: '/time-picker', component: require('./../components/pages/TimePickerDoc.vue')},
  {path: '/tooltip', component: require('./../components/pages/TooltipDoc.vue')},
  {path: '/typeahead', component: require('./../components/pages/TypeaheadDoc.vue')}
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
