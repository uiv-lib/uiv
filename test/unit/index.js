import Vue from 'vue'
import * as uiv from '@src/components/index.js'

Vue.config.productionTip = false

Vue.use(uiv)

// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
