import * as components from './components'
// import * as directives from './directives'
// import * as services from './services'
import locale from './locale'

const install = (Vue, options = {}) => {
  // Setup language, en-US for default
  locale.use(options.locale)
  locale.i18n(options.i18n)
  // Register components
  Object.keys(components).forEach((key) => {
    const _key = options.prefix ? options.prefix + key : key
    Vue.component(_key, components[key])
  })
  // Register directives
  // Object.keys(directives).forEach((key) => {
  //   const _key = options.prefix ? options.prefix + '-' + key : key
  //   Vue.directive(_key, directives[key])
  // })
  // // Register services
  // Object.keys(services).forEach((key) => {
  //   const service = services[key]
  //   Object.keys(service).forEach((serviceKey) => {
  //     const _key = options.prefix
  //       ? options.prefix + '_' + serviceKey
  //       : serviceKey
  //     Vue.prototype['$' + _key] = service[serviceKey]
  //   })
  // })
}

export { install }
