import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 250,
  minimum: 0.15
})

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
