import * as utils from './dom.utils';
import { createWrapper, nextTick } from '../__test__/utils';
import { Navbar } from '../components';

describe('dom.utils', () => {
  describe('#isElement', () => {
    it('should be able to check Element', () => {
      expect(!!utils.isElement(document.createElement('div'))).toBeTruthy();
      expect(!!utils.isElement(null)).toBeFalsy();
      expect(!!utils.isElement(undefined)).toBeFalsy();
    });
  });

  describe('#removeFromDom', () => {
    it('should be able to handle `removeFromDom` with null', () => {
      utils.removeFromDom(null);
    });
  });

  describe('#addClass', () => {
    it('should be able to handle `addClass` with null', () => {
      utils.addClass(null, 'active');
    });

    it('should be able to add class', () => {
      const div = document.createElement('div');
      utils.addClass(div, 'c1');
      expect(div.className).toEqual('c1');
      utils.addClass(div, 'c2');
      expect(div.className).toEqual('c1 c2');
      utils.addClass(div, 'c2');
      expect(div.className).toEqual('c1 c2');
    });
  });

  describe('#removeClass', () => {
    it('should be able to handle `removeClass` with null', () => {
      utils.removeClass(null, 'active');
    });

    it('should be able to remove class', () => {
      const div = document.createElement('div');
      utils.removeClass(div, 'c1');
      utils.addClass(div, 'c1');
      utils.addClass(div, 'c2');
      utils.removeClass(div, 'c1');
      expect(div.className).toEqual('c2');
      utils.removeClass(div, 'c2');
      expect(div.className).toEqual('');
    });
  });

  describe('#hasClass', () => {
    it('should be able to handle `hasClass` with null', () => {
      utils.hasClass(null, 'active');
    });

    it('should be able to check class', () => {
      const div = document.createElement('div');
      utils.addClass(div, 'c1');
      utils.addClass(div, 'c2');
      expect(utils.hasClass(div, 'c1')).toBeTruthy();
      expect(utils.hasClass(div, 'c2')).toBeTruthy();
      utils.removeClass(div, 'c2');
      expect(utils.hasClass(div, 'c1')).toBeTruthy();
      expect(utils.hasClass(div, 'c2')).toBeFalsy();
      utils.removeClass(div, 'c1');
      expect(utils.hasClass(div, 'c1')).toBeFalsy();
      expect(utils.hasClass(div, 'c2')).toBeFalsy();
    });
  });

  describe('#toggleBodyOverflow', () => {
    it('should be able to use `toggleBodyOverflow` with `enable = true`', () => {
      utils.toggleBodyOverflow(true);
      expect(document.body.style.paddingRight).toEqual('');
    });

    it('should be able to use `toggleBodyOverflow` with `enable = false`', () => {
      document.body.style.height = '9999px';
      utils.toggleBodyOverflow(false);
      expect(document.body.className).toContain('modal-open');
      utils.toggleBodyOverflow(true);
      expect(document.body.className).not.toContain('modal-open');
    });

    it('should be able to toggle fixed top nav padding right as well', async () => {
      const wrapper = createWrapper('<navbar fixed-top/>');
      const nav = wrapper.findComponent(Navbar);
      expect(nav.classes()).toContain('navbar-fixed-top');
      document.body.style.overflowY = 'scroll';
      utils.toggleBodyOverflow(false);
      expect(nav.attributes('style')).toContain('padding-right');
      utils.toggleBodyOverflow(true);
      await nextTick();
      expect(nav.attributes('style')).not.toContain('padding-right');
    });

    it('should be able to toggle fixed bottom nav padding right as well', async () => {
      const wrapper = createWrapper('<navbar fixed-bottom/>');
      const nav = wrapper.findComponent(Navbar);
      expect(nav.classes()).toContain('navbar-fixed-bottom');
      document.body.style.overflowY = 'scroll';
      utils.toggleBodyOverflow(false);
      expect(nav.attributes('style')).toContain('padding-right');
      utils.toggleBodyOverflow(true);
      await nextTick();
      expect(nav.attributes('style')).not.toContain('padding-right');
    });
  });

  describe('#getScrollbarWidth', () => {
    beforeEach(() => {
      let i = 100;
      jest
        .spyOn(Element.prototype, 'scrollHeight', 'get')
        .mockImplementation(function () {
          i -= 10;
          return i;
        });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should be able to use `getScrollbarWidth` with `recalculate = true`', () => {
      const width = utils.getScrollbarWidth(true);
      expect(width).toEqual(10);
    });

    it('should be able to use `getScrollbarWidth` with `recalculate = false`', () => {
      const width = utils.getScrollbarWidth(false);
      expect(width).toEqual(10);
    });
  });

  describe('#getClosest', () => {
    it('should be able to handle null input', () => {
      expect(utils.getClosest(null)).toBeNull();
    });
  });

  describe('#getElementBySelectorOrRef', () => {
    it('should be able to handle string input', () => {
      expect(utils.getElementBySelectorOrRef('body')).toEqual(
        document.querySelector('body')
      );
    });

    it('should be able to handle element input', () => {
      expect(
        utils.getElementBySelectorOrRef(document.querySelector('body'))
      ).toEqual(document.querySelector('body'));
    });

    it('should be able to handle component input', () => {
      expect(
        utils.getElementBySelectorOrRef({ $el: document.querySelector('body') })
      ).toEqual(document.querySelector('body'));
    });

    it('should be able to handle other input', () => {
      expect(utils.getElementBySelectorOrRef(123)).toBeNull();
    });
  });

  describe('#setDropdownPosition', () => {
    const dropdown = document.createElement('div');
    const trigger = document.createElement('div');
    const options = { menuRight: true };
    const triggerRect = { bottom: 94, height: 34, top: 60, width: 34, y: 60 };

    beforeEach(() => {
      jest.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue({
        width: 168,
        height: 135,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      });
    });

    it('should set non-negative left value when trigger next to the left edge of the screen and menu-right set', () => {
      jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
        ...triggerRect,
        left: 0,
        right: 34,
        x: 0,
      });
      utils.setDropdownPosition(dropdown, trigger, options);
      expect(dropdown.style.left[0]).not.toBe('-');
    });

    it('should set non-negative left value when trigger next to the right edge of the screen and menu-right set', () => {
      jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
        ...triggerRect,
        left: 1447,
        right: 1481,
        x: 1447,
      });
      utils.setDropdownPosition(dropdown, trigger, options);
      expect(dropdown.style.left[0]).not.toBe('-');
    });
  });

  describe('#setTooltipPosition viewport', () => {
    const mockRect = (el, rect) => {
      jest.spyOn(el, 'getBoundingClientRect').mockReturnValue(rect);
    };
    const viewportRect = {
      top: 0,
      left: 0,
      width: 30,
      height: 30,
      right: 30,
      bottom: 30,
    };
    const triggerRect = {
      top: 10,
      left: 10,
      width: 10,
      height: 5,
      right: 20,
      bottom: 15,
    };
    const tooltipRect = {
      top: 0,
      left: 0,
      width: 20,
      height: 20,
      right: 20,
      bottom: 20,
    };

    const setupDom = (usePopoverClass) => {
      document.body.innerHTML = '';
      const viewportEl = document.createElement('div');
      viewportEl.id = 'container';
      document.body.appendChild(viewportEl);
      const tooltip = document.createElement('div');
      if (usePopoverClass) {
        tooltip.className = 'popover';
      }
      const trigger = document.createElement('div');
      mockRect(viewportEl, viewportRect);
      mockRect(trigger, triggerRect);
      mockRect(tooltip, tooltipRect);
      return { viewportEl, tooltip, trigger };
    };

    it('should clamp tooltip within viewport given a string selector', () => {
      const { tooltip, trigger } = setupDom(true);
      utils.setTooltipPosition(
        tooltip,
        trigger,
        'bottom',
        false,
        'body',
        null,
        '#container'
      );
      // top=15 -> clamp to viewportBottom(30)-tooltipHeight(20)=10, then popoverFix -=11 -> -1
      expect(tooltip.style.top).toEqual('-1px');
      // left=5, within [0,30-20=10], no clamp, no left fix for bottom
      expect(tooltip.style.left).toEqual('5px');
    });

    it('should clamp tooltip within viewport given a function returning the element', () => {
      const { viewportEl, tooltip, trigger } = setupDom(true);
      const fn = jest.fn(() => viewportEl);
      utils.setTooltipPosition(
        tooltip,
        trigger,
        'bottom',
        false,
        'body',
        null,
        fn
      );
      expect(fn).toHaveBeenCalledWith(trigger);
      expect(tooltip.style.top).toEqual('-1px');
      expect(tooltip.style.left).toEqual('5px');
    });

    it('should apply popoverFix to top for default (top) placement', () => {
      const { tooltip, trigger } = setupDom(true);
      // top = 0 + 10 - 20 = -10; clamp to viewportTop(0) -> 0; popoverFix +=11 -> 11
      utils.setTooltipPosition(
        tooltip,
        trigger,
        'top',
        false,
        'body',
        null,
        '#container'
      );
      expect(tooltip.style.top).toEqual('11px');
    });

    it('should apply popoverFix to left for left placement', () => {
      const { tooltip, trigger } = setupDom(true);
      // left = 0 + 10 - 20 = -10; clamp to viewportLeft(0) -> 0; popoverFix +=11 -> 11
      utils.setTooltipPosition(
        tooltip,
        trigger,
        'left',
        false,
        'body',
        null,
        '#container'
      );
      expect(tooltip.style.left).toEqual('11px');
    });

    it('should apply popoverFix to left for right placement', () => {
      const { tooltip, trigger } = setupDom(true);
      // left = 0 + 10 + 10 + 1 = 21; 21+20=41 > viewportRight(30) -> clamp to 30-20=10; popoverFix -=11 -> -1
      utils.setTooltipPosition(
        tooltip,
        trigger,
        'right',
        false,
        'body',
        null,
        '#container'
      );
      expect(tooltip.style.left).toEqual('-1px');
    });

    it('should apply zero popoverFix when tooltip is not a popover', () => {
      const { tooltip, trigger } = setupDom(false);
      // bottom: top=15 -> clamp to 10, popoverFix=0 -> 10
      utils.setTooltipPosition(
        tooltip,
        trigger,
        'bottom',
        false,
        'body',
        null,
        '#container'
      );
      expect(tooltip.style.top).toEqual('10px');
    });
  });

  describe('#focus', () => {
    it('should return early for null input without throwing', () => {
      expect(() => utils.focus(null)).not.toThrow();
    });

    it('should return early for non-element input without throwing', () => {
      expect(() => utils.focus({})).not.toThrow();
    });

    it('should set tabindex when missing and focus the element', () => {
      const div = document.createElement('div');
      const focusSpy = jest.spyOn(div, 'focus');
      utils.focus(div);
      expect(div.getAttribute('tabindex')).toEqual('-1');
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should not overwrite existing tabindex', () => {
      const div = document.createElement('div');
      div.setAttribute('tabindex', '0');
      utils.focus(div);
      expect(div.getAttribute('tabindex')).toEqual('0');
    });
  });
});
