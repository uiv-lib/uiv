// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
export function assign(target, varArgs) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  const to = Object(target)
  for (let index = 1; index < arguments.length; index++) {
    const nextSource = arguments[index]
    if (nextSource !== null && nextSource !== undefined) {
      for (const nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey]
        }
      }
    }
  }
  return to
}

export function isExist(obj) {
  return typeof obj !== 'undefined' && obj !== null
}

export function isFunction(obj) {
  return typeof obj === 'function'
}

export function isNumber(obj) {
  return typeof obj === 'number'
}

export function isString(obj) {
  return typeof obj === 'string'
}

export function isBoolean(obj) {
  return typeof obj === 'boolean'
}

export function isPromiseSupported() {
  return typeof window !== 'undefined' && isExist(window.Promise)
}

export function hasOwnProperty(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k)
}
