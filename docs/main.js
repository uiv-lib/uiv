// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'highlight.js/styles/github-gist.css'
import './assets/css/common.less'

import Vue from 'vue'
import i18n from './locale'
import router from './routes'
import PageWrapper from './components/architecture/PageWrapper.vue'
import MarkdownWrapper from './components/architecture/MarkdownWrapper.vue'
import * as uiv from './../src/components/index'

Vue.config.productionTip = false

Vue.use(uiv)
Vue.component('MarkdownWrapper', MarkdownWrapper)

/* eslint-disable no-new */
let app = new Vue({
  router,
  i18n,
  template: '<PageWrapper/>',
  components: {PageWrapper}
})

document.addEventListener('DOMContentLoaded', () => {
  app.$mount('#app')
})
