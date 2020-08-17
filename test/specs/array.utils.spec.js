import * as utils from '../../src/utils/array.utils'
import _ from 'lodash'
import $ from 'jquery'

describe('array.utils', () => {
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

  describe('#range', () => {
    it('should be able to get range array', () => {
      const b = utils.range(5)
      expect(_.isEqual(b, [0, 1, 2, 3, 4])).to.be.true
    })

    it('should be able to get range array with start', () => {
      const b = utils.range(5, 3, 1)
      expect(_.isEqual(b, [3, 4])).to.be.true
    })

    it('should be able to get range array with step', () => {
      const b = utils.range(5, 0, 2)
      expect(_.isEqual(b, [0, 2, 4])).to.be.true
    })
  })

  describe('#nodeListToArray', () => {
    it('should be able to convert node list to array', () => {
      $('<div class="cls">').appendTo('body')
      $('<div class="cls">').appendTo('body')
      $('<div class="cls">').appendTo('body')
      const a = document.querySelectorAll('.cls')
      expect(a.length).to.equal(3)
      expect(Array.isArray(a)).to.be.false
      const b = utils.nodeListToArray(a)
      expect(b.length).to.equal(3)
      expect(Array.isArray(b)).to.be.true
      expect(a[0]).to.equal(b[0])
      expect(a[1]).to.equal(b[1])
      expect(a[2]).to.equal(b[2])
      $('<div class="cls">').remove()
    })

    it('should be able ok if no param present', () => {
      const b = utils.nodeListToArray()
      expect(Array.isArray(b)).to.be.true
      expect(b.length).to.equal(0)
    })
  })

  describe('#onlyUnique', () => {
    it('should be able to uniq array', () => {
      const b = [0, 1, 2, 3, 3, 4, 4, 5].filter(utils.onlyUnique)
      expect(_.isEqual(b, [0, 1, 2, 3, 4, 5])).to.be.true
    })
  })
})
