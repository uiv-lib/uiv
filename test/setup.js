import Vue from 'vue'
import * as uiv from '../src/install'

Vue.config.productionTip = false
// simulate router-link
Vue.component('router-link', {
  template: '<a href="#router-link"><slot></slot></a>'
})
Vue.use(uiv)
