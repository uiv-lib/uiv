import * as utils from './dom.utils'
import { createWrapper, nextTick } from '../__test__/utils'

describe('dom.utils', () => {
  describe('#isElement', () => {
    it('should be able to check Element', () => {
      expect(!!utils.isElement(document.createElement('div'))).toBeTruthy()
      expect(!!utils.isElement(null)).toBeFalsy()
      expect(!!utils.isElement(undefined)).toBeFalsy()
    })
  })

  describe('#removeFromDom', () => {
    it('should be able to handle `removeFromDom` with null', () => {
      utils.removeFromDom(null)
    })
  })

  describe('#addClass', () => {
    it('should be able to handle `addClass` with null', () => {
      utils.addClass(null, 'active')
    })

    it('should be able to add class', () => {
      const div = document.createElement('div')
      utils.addClass(div, 'c1')
      expect(div.className).toEqual('c1')
      utils.addClass(div, 'c2')
      expect(div.className).toEqual('c1 c2')
      utils.addClass(div, 'c2')
      expect(div.className).toEqual('c1 c2')
    })
  })

  describe('#removeClass', () => {
    it('should be able to handle `removeClass` with null', () => {
      utils.removeClass(null, 'active')
    })

    it('should be able to remove class', () => {
      const div = document.createElement('div')
      utils.removeClass(div, 'c1')
      utils.addClass(div, 'c1')
      utils.addClass(div, 'c2')
      utils.removeClass(div, 'c1')
      expect(div.className).toEqual('c2')
      utils.removeClass(div, 'c2')
      expect(div.className).toEqual('')
    })
  })

  describe('#hasClass', () => {
    it('should be able to handle `hasClass` with null', () => {
      utils.hasClass(null, 'active')
    })

    it('should be able to check class', () => {
      const div = document.createElement('div')
      utils.addClass(div, 'c1')
      utils.addClass(div, 'c2')
      expect(utils.hasClass(div, 'c1')).toBeTruthy()
      expect(utils.hasClass(div, 'c2')).toBeTruthy()
      utils.removeClass(div, 'c2')
      expect(utils.hasClass(div, 'c1')).toBeTruthy()
      expect(utils.hasClass(div, 'c2')).toBeFalsy()
      utils.removeClass(div, 'c1')
      expect(utils.hasClass(div, 'c1')).toBeFalsy()
      expect(utils.hasClass(div, 'c2')).toBeFalsy()
    })
  })

  describe('#toggleBodyOverflow', () => {
    it('should be able to use `toggleBodyOverflow` with `enable = true`', () => {
      utils.toggleBodyOverflow(true)
      expect(document.body.style.paddingRight).toEqual('')
    })

    it('should be able to use `toggleBodyOverflow` with `enable = false`', () => {
      document.body.style.height = '9999px'
      utils.toggleBodyOverflow(false)
      expect(document.body.className).toContain('modal-open')
      utils.toggleBodyOverflow(true)
      expect(document.body.className).not.toContain('modal-open')
    })

    it('should be able to toggle fixed top nav padding right as well', async () => {
      const wrapper = createWrapper('<navbar fixed-top/>')
      const nav = wrapper.findComponent({ name: 'navbar' })
      expect(nav.classes()).toContain('navbar-fixed-top')
      document.body.style.overflowY = 'scroll'
      utils.toggleBodyOverflow(false)
      expect(nav.attributes('style')).toContain('padding-right')
      utils.toggleBodyOverflow(true)
      await nextTick()
      expect(nav.attributes('style')).toContain('padding-right: 0px')
    })

    it('should be able to toggle fixed bottom nav padding right as well', async () => {
      const wrapper = createWrapper('<navbar fixed-bottom/>')
      const nav = wrapper.findComponent({ name: 'navbar' })
      expect(nav.classes()).toContain('navbar-fixed-bottom')
      document.body.style.overflowY = 'scroll'
      utils.toggleBodyOverflow(false)
      expect(nav.attributes('style')).toContain('padding-right')
      utils.toggleBodyOverflow(true)
      await nextTick()
      expect(nav.attributes('style')).toContain('padding-right: 0px')
    })
  })

  describe('#getScrollbarWidth', () => {
    beforeEach(() => {
      let i = 100
      jest
        .spyOn(Element.prototype, 'scrollHeight', 'get')
        .mockImplementation(function () {
          i -= 10
          return i
        })
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should be able to use `getScrollbarWidth` with `recalculate = true`', () => {
      const width = utils.getScrollbarWidth(true)
      expect(width).toEqual(10)
    })

    it('should be able to use `getScrollbarWidth` with `recalculate = false`', () => {
      const width = utils.getScrollbarWidth(false)
      expect(width).toEqual(10)
    })
  })

  describe('#getClosest', () => {
    it('should be able to handle null input', () => {
      expect(utils.getClosest(null)).toBeNull()
    })
  })

  describe('#getElementBySelectorOrRef', () => {
    it('should be able to handle string input', () => {
      expect(utils.getElementBySelectorOrRef('body')).toEqual(
        document.querySelector('body')
      )
    })

    it('should be able to handle element input', () => {
      expect(
        utils.getElementBySelectorOrRef(document.querySelector('body'))
      ).toEqual(document.querySelector('body'))
    })

    it('should be able to handle component input', () => {
      expect(
        utils.getElementBySelectorOrRef({ $el: document.querySelector('body') })
      ).toEqual(document.querySelector('body'))
    })

    it('should be able to handle other input', () => {
      expect(utils.getElementBySelectorOrRef(123)).toBeNull()
    })
  })

  describe('#setDropdownPosition', () => {
    const dropdown = document.createElement('div')
    const trigger = document.createElement('div')
    const options = { menuRight: true }
    const triggerRect = { bottom: 94, height: 34, top: 60, width: 34, y: 60 }

    beforeEach(() => {
      jest.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue({
        width: 168,
        height: 135,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      })
    })

    it('should set non-negative left value when trigger next to the left edge of the screen and menu-right set', () => {
      jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
        ...triggerRect,
        left: 0,
        right: 34,
        x: 0,
      })
      utils.setDropdownPosition(dropdown, trigger, options)
      expect(dropdown.style.left[0]).not.toBe('-')
    })

    it('should set non-negative left value when trigger next to the right edge of the screen and menu-right set', () => {
      jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
        ...triggerRect,
        left: 1447,
        right: 1481,
        x: 1447,
      })
      utils.setDropdownPosition(dropdown, trigger, options)
      expect(dropdown.style.left[0]).not.toBe('-')
    })
  })
})
