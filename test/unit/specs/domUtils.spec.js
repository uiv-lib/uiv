import utils from '@src/utils/domUtils.js'

describe('domUtils', () => {
  it('should be able to handle `removeFromDom` with null', () => {
    utils.removeFromDom(null)
  })

  it('should be able to handle `addClass` with null', () => {
    utils.addClass(null, 'active')
  })

  it('should be able to handle `removeClass` with null', () => {
    utils.removeClass(null, 'active')
  })

  it('should be able to handle `hasClass` with null', () => {
    utils.hasClass(null, 'active')
  })
})
