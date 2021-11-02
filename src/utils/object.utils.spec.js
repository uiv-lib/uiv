import * as utils from './object.utils'

describe('object.utils', () => {
  describe('#assign', () => {
    it('should be able to merge objects', () => {
      expect(utils.assign({}, { a: 1 }, { a: 2, b: 3 })).toEqual({
        a: 2,
        b: 3,
      })
    })

    it('should be able to handle null target', () => {
      expect(utils.assign.bind(this, null, {})).toThrow(
        'Cannot convert undefined or null to object'
      )
    })

    it('should be able to handle null or undefined source', () => {
      expect(
        utils.assign({}, { a: 1 }, null, undefined, { a: 2, b: 3 })
      ).toEqual({ a: 2, b: 3 })
    })

    it('should be able to avoid prototype properties', () => {
      // eslint-disable-next-line no-new-func
      const a = new Function()
      a.prototype.b = 1
      a.c = 2
      expect(utils.assign({}, a)).toEqual({ c: 2 })
    })
  })

  describe('#isExist ', () => {
    it('should be able return false if null', () => {
      expect(utils.isExist(null)).toBeFalsy()
    })

    it('should be able return false if undefined', () => {
      expect(utils.isExist(undefined)).toBeFalsy()
    })

    it('should be able return true if others', () => {
      expect(utils.isExist(0)).toBeTruthy()
      expect(utils.isExist(false)).toBeTruthy()
      expect(utils.isExist([])).toBeTruthy()
      expect(utils.isExist({})).toBeTruthy()
      expect(utils.isExist('')).toBeTruthy()
    })
  })

  describe('#isFunction ', () => {
    it('should be able return false if not function', () => {
      expect(utils.isFunction(null)).toBeFalsy()
    })

    it('should be able return true if function', () => {
      expect(utils.isFunction(() => 0)).toBeTruthy()
    })
  })

  describe('#isNumber  ', () => {
    it('should be able return false if not number', () => {
      expect(utils.isNumber(null)).toBeFalsy()
    })

    it('should be able return true if number', () => {
      expect(utils.isNumber(0)).toBeTruthy()
    })
  })

  describe('#isString', () => {
    it('should be able return false if not string', () => {
      expect(utils.isString(null)).toBeFalsy()
    })

    it('should be able return true if string', () => {
      expect(utils.isString('')).toBeTruthy()
    })
  })

  describe('#isBoolean', () => {
    it('should be able return false if not boolean', () => {
      expect(utils.isBoolean(null)).toBeFalsy()
    })

    it('should be able return true if boolean', () => {
      expect(utils.isBoolean(false)).toBeTruthy()
    })
  })

  describe('#isPromiseSupported ', () => {
    it('should be able return true in chrome', () => {
      expect(utils.isPromiseSupported()).toBeTruthy()
    })

    it('should be able return false if window.Promise is not valid', () => {
      const saved = window.Promise
      window.Promise = undefined
      expect(utils.isPromiseSupported()).toBeFalsy()
      window.Promise = saved
    })
  })
})
