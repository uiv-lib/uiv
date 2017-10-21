import * as components from './components'
import locale from './locale'

const install = (Vue, options = {}) => {
  // Setup language, en-US for default
  locale.use(options.locale)
  locale.i18n(options.i18n)
  // Register components
  for (let key in components) {
    Vue.component(key, components[key])
  }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install }
