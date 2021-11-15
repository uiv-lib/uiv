import * as utils from './array.utils'

describe('array.utils', () => {
  describe('#spliceIfExist', () => {
    it('should be able to handle non array object', () => {
      const test = null
      utils.spliceIfExist(test, undefined)
      expect(test).toBeNull()
    })

    it('should be able to handle non in array object', () => {
      const arr = [0, 1, 2]
      utils.spliceIfExist(arr, 3)
      expect(arr.length).toEqual(3)
      expect(arr[0]).toEqual(0)
      expect(arr[1]).toEqual(1)
      expect(arr[2]).toEqual(2)
    })

    it('should be able to splice if exist', () => {
      const arr = [0, 1, 2]
      utils.spliceIfExist(arr, 1)
      expect(arr.length).toEqual(2)
      expect(arr[0]).toEqual(0)
      expect(arr[1]).toEqual(2)
    })
  })

  describe('#range', () => {
    it('should be able to get range array', () => {
      const b = utils.range(5)
      expect(b).toEqual([0, 1, 2, 3, 4])
    })

    it('should be able to get range array with start', () => {
      const b = utils.range(5, 3, 1)
      expect(b).toEqual([3, 4])
    })

    it('should be able to get range array with step', () => {
      const b = utils.range(5, 0, 2)
      expect(b).toEqual([0, 2, 4])
    })
  })

  describe('#nodeListToArray', () => {
    it('should be able to convert node list to array', () => {
      document.body.innerHTML = `<div class="cls"><div class="cls"><div class="cls">`
      const a = document.querySelectorAll('.cls')
      expect(a.length).toEqual(3)
      expect(Array.isArray(a)).toBeFalsy()
      const b = utils.nodeListToArray(a)
      expect(b.length).toEqual(3)
      expect(Array.isArray(b)).toBeTruthy()
      expect(a[0]).toEqual(b[0])
      expect(a[1]).toEqual(b[1])
      expect(a[2]).toEqual(b[2])
    })

    it('should be able ok if no param present', () => {
      const b = utils.nodeListToArray()
      expect(Array.isArray(b)).toBeTruthy()
      expect(b.length).toEqual(0)
    })
  })

  describe('#onlyUnique', () => {
    it('should be able to uniq array', () => {
      const b = [0, 1, 2, 3, 3, 4, 4, 5].filter(utils.onlyUnique)
      expect(b).toEqual([0, 1, 2, 3, 4, 5])
    })
  })
})
