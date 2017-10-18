// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/vender.less'
import './assets/css/common.less'

import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './routes'
import PageWrapper from './components/architecture/PageWrapper.vue'
import MarkdownWrapper from './components/architecture/MarkdownWrapper.vue'
import * as uiv from './../src/components/index'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(uiv)
Vue.component('MarkdownWrapper', MarkdownWrapper)

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    router,
    template: '<PageWrapper/>',
    components: {PageWrapper}
  }).$mount('#app')
})
