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
        selector: `[id='${to.hash.slice(1)}']`
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

router.beforeEach((to, from, next) => {
  // not start progressbar on same path && not the same hash
  // which means hash jumping inside a route
  if (!(from.path === to.path && from.hash !== to.hash)) {
    NProgress.start()
  }
  next()
})

router.afterEach(route => {
  // Finish progress
  NProgress.done()
})

export default router
