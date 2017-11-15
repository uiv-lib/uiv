import * as utils from '@src/utils/arrayUtils'

describe('arrayUtils', () => {
  describe('#spliceIfExist', () => {
    it('should be able to handle non array object', () => {
      const test = null
      utils.spliceIfExist(test, undefined)
      expect(test).to.be.null
    })

    it('should be able to handle non in array object', () => {
      const arr = [0, 1, 2]
      utils.spliceIfExist(arr, 3)
      expect(arr.length).to.equal(3)
      expect(arr[0]).to.equal(0)
      expect(arr[1]).to.equal(1)
      expect(arr[2]).to.equal(2)
    })

    it('should be able to splice if exist', () => {
      const arr = [0, 1, 2]
      utils.spliceIfExist(arr, 1)
      expect(arr.length).to.equal(2)
      expect(arr[0]).to.equal(0)
      expect(arr[1]).to.equal(2)
    })
  })
})
