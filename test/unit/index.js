import 'es6-promise/auto'
import Vue from 'vue'
import * as uiv from '@src/install'

Vue.config.productionTip = false
// simulate router-link
Vue.component('router-link', {
  template: '<a href="#router-link"><slot></slot></a>'
})
Vue.use(uiv)

// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
