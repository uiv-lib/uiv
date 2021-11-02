import { install } from './install'

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue, window.__uiv_options || {})
}

export * from './index'
