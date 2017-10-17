import Vue from 'vue'
import * as uiv from '@src/components/index.js'
import MarkdownWrapper from '@docs/components/architecture/MarkdownWrapper.vue'

Vue.config.productionTip = false

Vue.use(uiv)
Vue.component('MarkdownWrapper', MarkdownWrapper)

// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
