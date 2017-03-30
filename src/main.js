// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'highlight.js/styles/github-gist.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/common.less'

import 'es6-promise/auto'
import Vue from 'vue'
import VueRouter from 'vue-router'
import PageWrapper from './docs/architecture/PageWrapper.vue'
import store from './store/store'
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.component('PageWrapper', PageWrapper)

let routes = [
  {path: '/', component: require('./docs/pages/Home.vue')},
  {path: '/getting-started', component: require('./docs/pages/GettingStarted.vue')},
  {path: '/alert', component: require('./docs/pages/AlertDoc.vue')},
  {path: '/carousel', component: require('./docs/pages/CarouselDoc.vue')},
  {path: '/collapse', component: require('./docs/pages/CollapseDoc.vue')},
  {path: '/date-picker', component: require('./docs/pages/DatePickerDoc.vue')},
  {path: '/dropdown', component: require('./docs/pages/DropdownDoc.vue')},
  {path: '/modal', component: require('./docs/pages/ModalDoc.vue')},
  {path: '/pagination', component: require('./docs/pages/PaginationDoc.vue')},
  {path: '/popover', component: require('./docs/pages/PopoverDoc.vue')},
  {path: '/tabs', component: require('./docs/pages/TabsDoc.vue')},
  {path: '/time-picker', component: require('./docs/pages/TimePickerDoc.vue')},
  {path: '/tooltip', component: require('./docs/pages/TooltipDoc.vue')},
  {path: '/typeahead', component: require('./docs/pages/TypeaheadDoc.vue')}
]

let router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<PageWrapper/>',
  components: {PageWrapper}
})
