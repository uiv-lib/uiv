// https://github.com/ElemeFE/element/blob/dev/src/locale/index.js
import {isFunction, isExist} from '../utils/objectUtils'
import defaultLang from './lang/en-US'

let lang = defaultLang

let i18nHandler = function () {
  const vuei18n = Object.getPrototypeOf(this).$t
  if (isFunction(vuei18n)) {
    try {
      return vuei18n.apply(this, arguments)
    } catch (err) {
      //  vuei18n.apply doesn't work with 7.3.3 of vue-i18n
      return this.$t(...arguments)
    }
  }
}

export const t = function (path, options) {
  options = options || {}

  let value = i18nHandler.apply(this, arguments)
  if (isExist(value) && !options.$$locale) {
    return value
  }
  const array = path.split('.')
  let current = options.$$locale || lang

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i]
    value = current[property]
    if (i === j - 1) return value
    if (!value) return ''
    current = value
  }
  return ''
}

export const use = function (l) {
  lang = l || lang
}

export const i18n = function (fn) {
  i18nHandler = fn || i18nHandler
}

export default {use, t, i18n}
