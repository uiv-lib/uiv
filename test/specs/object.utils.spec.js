import * as utils from '../../src/utils/object.utils'

describe('object.utils', () => {
  describe('#assign', () => {
    it('should be able to merge objects', () => {
      expect(utils.assign({}, { a: 1 }, { a: 2, b: 3 })).to.deep.equal({
        a: 2,
        b: 3,
      })
    })

    it('should be able to handle null target', () => {
      expect(utils.assign.bind(this, null, {})).to.throw(
        'Cannot convert undefined or null to object'
      )
    })

    it('should be able to handle null or undefined source', () => {
      expect(
        utils.assign({}, { a: 1 }, null, undefined, { a: 2, b: 3 })
      ).to.deep.equal({ a: 2, b: 3 })
    })

    it('should be able to avoid prototype properties', () => {
      // eslint-disable-next-line no-new-func
      const a = new Function()
      a.prototype.b = 1
      a.c = 2
      expect(utils.assign({}, a)).to.deep.equal({ c: 2 })
    })
  })

  describe('#isExist ', () => {
    it('should be able return false if null', () => {
      expect(utils.isExist(null)).to.be.false
    })

    it('should be able return false if undefined', () => {
      expect(utils.isExist(undefined)).to.be.false
    })

    it('should be able return true if others', () => {
      expect(utils.isExist(0)).to.be.true
      expect(utils.isExist(false)).to.be.true
      expect(utils.isExist([])).to.be.true
      expect(utils.isExist({})).to.be.true
      expect(utils.isExist('')).to.be.true
    })
  })

  describe('#isFunction ', () => {
    it('should be able return false if not function', () => {
      expect(utils.isFunction(null)).to.be.false
    })

    it('should be able return true if function', () => {
      expect(utils.isFunction(() => 0)).to.be.true
    })
  })

  describe('#isNumber  ', () => {
    it('should be able return false if not number', () => {
      expect(utils.isNumber(null)).to.be.false
    })

    it('should be able return true if number', () => {
      expect(utils.isNumber(0)).to.be.true
    })
  })

  describe('#isString', () => {
    it('should be able return false if not string', () => {
      expect(utils.isString(null)).to.be.false
    })

    it('should be able return true if string', () => {
      expect(utils.isString('')).to.be.true
    })
  })

  describe('#isBoolean', () => {
    it('should be able return false if not boolean', () => {
      expect(utils.isBoolean(null)).to.be.false
    })

    it('should be able return true if boolean', () => {
      expect(utils.isBoolean(false)).to.be.true
    })
  })

  describe('#isPromiseSupported ', () => {
    it('should be able return true in chrome', () => {
      expect(utils.isPromiseSupported()).to.be.true
    })

    it('should be able return false if window.Promise is not valid', () => {
      const saved = window.Promise
      window.Promise = undefined
      expect(utils.isPromiseSupported()).to.be.false
      window.Promise = saved
    })
  })
})
