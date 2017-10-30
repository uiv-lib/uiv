import utils from '@src/utils/domUtils.js'
import $ from 'jquery'

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

  it('should be able to use `toggleBodyOverflow` with `enable = true`', () => {
    utils.toggleBodyOverflow(true)
    expect(document.body.style.paddingRight).to.equal('')
  })

  it('should be able to use `toggleBodyOverflow` with `enable = false`', () => {
    let $body = $('html, body')
    $body.css('height', '9999px')
    utils.toggleBodyOverflow(false)
    expect(document.body.style.paddingRight).to.contain(`px`)
    utils.toggleBodyOverflow(true)
    $body.css('height', '')
  })

  it('should be able to use `getScrollbarWidth` with `recalculate = false`', () => {
    let width = utils.getScrollbarWidth(false)
    expect(width).to.above(0)
  })

  it('should be able to use `getScrollbarWidth` with `recalculate = true`', () => {
    let width = utils.getScrollbarWidth(true)
    expect(width).to.above(0)
  })
})
