import { isExist } from '../utils/object.utils'
import defaultLang from './lang/en-US'

let lang = defaultLang

let i18nHandler = function () {
  if ('$t' in this) {
    return this.$t.apply(this, arguments)
  }
  return null
}

export const t = function (path, options) {
  options = options || {}
  let value
  try {
    value = i18nHandler.apply(this, arguments)
    /* istanbul ignore next */
    if (isExist(value) && !options.$$locale) {
      return value
    }
  } catch (e) {
    // ignore
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
  /* istanbul ignore next */
  return ''
}

export const use = function (l) {
  lang = l || lang
}

export const i18n = function (fn) {
  i18nHandler = fn || i18nHandler
}

export default { use, t, i18n }
