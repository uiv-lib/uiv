import { isExist, isString, isFunction } from './object.utils';

export const EVENTS = {
  MOUSE_ENTER: 'mouseenter',
  MOUSE_LEAVE: 'mouseleave',
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLICK: 'click',
  INPUT: 'input',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup',
  KEY_PRESS: 'keypress',
  RESIZE: 'resize',
  SCROLL: 'scroll',
  TOUCH_START: 'touchstart',
  TOUCH_END: 'touchend',
};

export const TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover',
  FOCUS: 'focus',
  HOVER_FOCUS: 'hover-focus',
  OUTSIDE_CLICK: 'outside-click',
  MANUAL: 'manual',
};

export const PLACEMENTS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
};

export function getComputedStyle(el) {
  return window.getComputedStyle(el);
}

export function getViewportSize() {
  const width = window.innerWidth || 0;
  const height = window.innerHeight || 0;
  return { width, height };
}

let scrollbarWidth = null;
let savedScreenSize = null;

export function getScrollbarWidth(recalculate = false) {
  const screenSize = getViewportSize();
  // return directly when already calculated & not force recalculate & screen size not changed
  if (
    scrollbarWidth !== null &&
    !recalculate &&
    screenSize.height === savedScreenSize.height &&
    screenSize.width === savedScreenSize.width
  ) {
    return scrollbarWidth;
  }
  /* istanbul ignore next */
  if (document.readyState === 'loading') {
    return null;
  }
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  div1.style.width =
    div2.style.width =
    div1.style.height =
    div2.style.height =
      '100px';
  div1.style.overflow = 'scroll';
  div2.style.overflow = 'hidden';
  document.body.appendChild(div1);
  document.body.appendChild(div2);
  scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight);
  document.body.removeChild(div1);
  document.body.removeChild(div2);
  // save new screen size
  savedScreenSize = screenSize;
  return scrollbarWidth;
}

export function on(element, event, handler) {
  element.addEventListener(event, handler);
}

export function off(element, event, handler) {
  element.removeEventListener(event, handler);
}

export function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE;
}

export function removeFromDom(el) {
  isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el);
}

export function addClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  el.classList.add(className);
}

export function removeClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  el.classList.remove(className);
}

export function hasClass(el, className) {
  if (!isElement(el)) {
    return false;
  }
  return el.classList.contains(className);
}

export function setDropdownPosition(dropdown, trigger, options = {}) {
  const doc = document.documentElement;
  const containerScrollLeft =
    (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  const containerScrollTop =
    (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  const rect = trigger.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();
  dropdown.style.right = 'auto';
  dropdown.style.bottom = 'auto';
  if (options.menuRight) {
    const left =
      containerScrollLeft + rect.left + rect.width - dropdownRect.width;
    dropdown.style.left = left < 0 ? 0 : left + 'px';
  } else {
    dropdown.style.left = containerScrollLeft + rect.left + 'px';
  }
  if (options.dropup) {
    dropdown.style.top =
      containerScrollTop + rect.top - dropdownRect.height - 4 + 'px';
  } else {
    dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px';
  }
}

export function isAvailableAtPosition(trigger, popup, placement) {
  const triggerRect = trigger.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  const viewPortSize = getViewportSize();
  let top = true;
  let right = true;
  let bottom = true;
  let left = true;
  switch (placement) {
    case PLACEMENTS.TOP:
      top = triggerRect.top >= popupRect.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right =
        triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <=
        viewPortSize.width;
      break;
    case PLACEMENTS.BOTTOM:
      bottom = triggerRect.bottom + popupRect.height <= viewPortSize.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right =
        triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <=
        viewPortSize.width;
      break;
    case PLACEMENTS.RIGHT:
      right = triggerRect.right + popupRect.width <= viewPortSize.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom =
        triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <=
        viewPortSize.height;
      break;
    case PLACEMENTS.LEFT:
      left = triggerRect.left >= popupRect.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom =
        triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <=
        viewPortSize.height;
      break;
  }
  return top && right && bottom && left;
}

export function setTooltipPosition(
  tooltip,
  trigger,
  placement,
  auto,
  appendTo,
  positionBy,
  viewport
) {
  if (!isElement(tooltip) || !isElement(trigger)) {
    return;
  }
  const isPopover =
    tooltip && tooltip.className && tooltip.className.indexOf('popover') >= 0;
  let containerScrollTop;
  let containerScrollLeft;
  if (!isExist(appendTo) || appendTo === 'body' || positionBy === 'body') {
    const doc = document.documentElement;
    containerScrollLeft =
      (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    containerScrollTop =
      (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  } else {
    const container = getElementBySelectorOrRef(positionBy || appendTo);
    containerScrollLeft = container.scrollLeft;
    containerScrollTop = container.scrollTop;
  }
  // auto adjust placement
  if (auto) {
    // Try: right -> bottom -> left -> top
    // Cause the default placement is top
    const placements = [
      PLACEMENTS.RIGHT,
      PLACEMENTS.BOTTOM,
      PLACEMENTS.LEFT,
      PLACEMENTS.TOP,
    ];
    // The class switch helper function
    const changePlacementClass = (placement) => {
      // console.log(placement)
      placements.forEach((placement) => {
        removeClass(tooltip, placement);
      });
      addClass(tooltip, placement);
    };
    // No need to adjust if the default placement fits
    if (!isAvailableAtPosition(trigger, tooltip, placement)) {
      for (let i = 0, l = placements.length; i < l; i++) {
        // Re-assign placement class
        changePlacementClass(placements[i]);
        // Break if new placement fits
        if (isAvailableAtPosition(trigger, tooltip, placements[i])) {
          placement = placements[i];
          break;
        }
      }
      changePlacementClass(placement);
    }
  }
  // fix left and top for tooltip
  const rect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  let top;
  let left;
  if (placement === PLACEMENTS.BOTTOM) {
    top = containerScrollTop + rect.top + rect.height;
    left =
      containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2;
  } else if (placement === PLACEMENTS.LEFT) {
    top =
      containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2;
    left = containerScrollLeft + rect.left - tooltipRect.width;
  } else if (placement === PLACEMENTS.RIGHT) {
    top =
      containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2;
    // https://github.com/uiv-lib/uiv/issues/272
    // add 1px to fix above issue
    left = containerScrollLeft + rect.left + rect.width + 1;
  } else {
    top = containerScrollTop + rect.top - tooltipRect.height;
    left =
      containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2;
  }
  let viewportEl;
  // viewport option
  if (isString(viewport)) {
    viewportEl = document.querySelector(viewport);
  } else if (isFunction(viewport)) {
    viewportEl = viewport(trigger);
  }
  if (isElement(viewportEl)) {
    const popoverFix = isPopover ? 11 : 0;
    const viewportReact = viewportEl.getBoundingClientRect();
    const viewportTop = containerScrollTop + viewportReact.top;
    const viewportLeft = containerScrollLeft + viewportReact.left;
    const viewportBottom = viewportTop + viewportReact.height;
    const viewportRight = viewportLeft + viewportReact.width;
    // fix top
    if (top < viewportTop) {
      top = viewportTop;
    } else if (top + tooltipRect.height > viewportBottom) {
      top = viewportBottom - tooltipRect.height;
    }
    // fix left
    if (left < viewportLeft) {
      left = viewportLeft;
    } else if (left + tooltipRect.width > viewportRight) {
      left = viewportRight - tooltipRect.width;
    }
    // fix for popover pointer
    if (placement === PLACEMENTS.BOTTOM) {
      top -= popoverFix;
    } else if (placement === PLACEMENTS.LEFT) {
      left += popoverFix;
    } else if (placement === PLACEMENTS.RIGHT) {
      left -= popoverFix;
    } else {
      top += popoverFix;
    }
  }
  // set position finally
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
}

export function hasScrollbar(el) {
  const SCROLL = 'scroll';
  const hasVScroll = el.scrollHeight > el.clientHeight;
  const style = getComputedStyle(el);
  return hasVScroll || style.overflow === SCROLL || style.overflowY === SCROLL;
}

export function toggleBodyOverflow(enable) {
  const MODAL_OPEN = 'modal-open';
  const FIXED_CONTENT = '.navbar-fixed-top, .navbar-fixed-bottom';
  const body = document.body;
  if (enable) {
    removeClass(body, MODAL_OPEN);
    body.style.paddingRight = null;
    [...document.querySelectorAll(FIXED_CONTENT)].forEach((node) => {
      node.style.paddingRight = null;
    });
  } else {
    const documentHasScrollbar =
      hasScrollbar(document.documentElement) || hasScrollbar(document.body);
    if (documentHasScrollbar) {
      const scrollbarWidth = getScrollbarWidth();
      body.style.paddingRight = `${scrollbarWidth}px`;
      [...document.querySelectorAll(FIXED_CONTENT)].forEach((node) => {
        node.style.paddingRight = `${scrollbarWidth}px`;
      });
    }
    addClass(body, MODAL_OPEN);
  }
}

export function getClosest(el, selector) {
  if (!isElement(el)) {
    return null;
  }
  return el.closest(selector);
}

export function getParents(el, selector, until = null) {
  const parents = [];
  let parent = el.parentElement;
  while (parent) {
    if (parent.matches(selector)) {
      parents.push(parent);
    } else if (until && (until === parent || parent.matches(until))) {
      break;
    }
    parent = parent.parentElement;
  }
  return parents;
}

export function focus(el) {
  if (!isElement(el)) {
    return;
  }
  if (!el.getAttribute('tabindex')) {
    el.setAttribute('tabindex', '-1');
  }
  el.focus();
}

const MODAL_BACKDROP = 'modal-backdrop';

export function getOpenModals() {
  return document.querySelectorAll(`.${MODAL_BACKDROP}`);
}

export function getOpenModalNum() {
  return getOpenModals().length;
}

export function getElementBySelectorOrRef(q) {
  if (isString(q)) {
    // is selector
    return document.querySelector(q);
  } else if (isElement(q)) {
    // is element
    return q;
  } else if (isElement(q.$el)) {
    // is component
    return q.$el;
  } else {
    return null;
  }
}
