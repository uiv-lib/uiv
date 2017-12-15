import * as utils from '@src/utils/domUtils'
import $ from 'jquery'

describe('domUtils', () => {
  describe('#removeFromDom', () => {
    it('should be able to handle `removeFromDom` with null', () => {
      utils.removeFromDom(null)
    })
  })

  describe('#addClass', () => {
    it('should be able to handle `addClass` with null', () => {
      utils.addClass(null, 'active')
    })
  })

  describe('#removeClass', () => {
    it('should be able to handle `removeClass` with null', () => {
      utils.removeClass(null, 'active')
    })
  })

  describe('#hasClass', () => {
    it('should be able to handle `hasClass` with null', () => {
      utils.hasClass(null, 'active')
    })
  })

  describe('#toggleBodyOverflow', () => {
    it('should be able to use `toggleBodyOverflow` with `enable = true`', () => {
      utils.toggleBodyOverflow(true)
      expect(document.body.style.paddingRight).to.equal('')
    })

    it('should be able to use `toggleBodyOverflow` with `enable = false`', () => {
      const $body = $('html, body')
      $body.css('height', '9999px')
      utils.toggleBodyOverflow(false)
      expect(document.body.style.paddingRight).to.contain(`px`)
      utils.toggleBodyOverflow(true)
      $body.css('height', '')
    })
  })

  describe('#getScrollbarWidth', () => {
    it('should be able to use `getScrollbarWidth` with `recalculate = false`', () => {
      const width = utils.getScrollbarWidth(false)
      expect(width).to.above(0)
    })

    it('should be able to use `getScrollbarWidth` with `recalculate = true`', () => {
      const width = utils.getScrollbarWidth(true)
      expect(width).to.above(0)
    })
  })

  describe('#getClosest', () => {
    it('should be able to handle null input', () => {
      expect(utils.getClosest(null)).to.be.null
    })
  })
})
