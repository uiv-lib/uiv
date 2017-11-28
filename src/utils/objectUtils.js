export function isExist (obj) {
  return typeof obj !== 'undefined' && obj !== null
}

export function isFunction (obj) {
  return typeof obj === 'function'
}

export function isNumber (obj) {
  return typeof obj === 'number'
}

export function isString (obj) {
  return typeof obj === 'string'
}

export function isBoolean (obj) {
  return typeof obj === 'boolean'
}

export function isPromiseSupported () {
  return typeof window !== 'undefined' && isExist(window.Promise)
}
