import {isExist} from './objectUtils'

export const EVENTS = {
  MOUSE_ENTER: 'mouseenter',
  MOUSE_LEAVE: 'mouseleave',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLICK: 'click',
  INPUT: 'input',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup',
  KEY_PRESS: 'keypress',
  RESIZE: 'resize',
  SCROLL: 'scroll'
}

export const TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover',
  FOCUS: 'focus',
  HOVER_FOCUS: 'hover-focus',
  OUTSIDE_CLICK: 'outside-click',
  MANUAL: 'manual'
}

export const PLACEMENTS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
}

export function getViewportSize () {
  let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return {width, height}
}

let scrollbarWidth = null
let savedScreenSize = null

export function getScrollbarWidth (recalculate = false) {
  let screenSize = getViewportSize()
  // return directly when already calculated & not force recalculate & screen size not changed
  if (scrollbarWidth !== null && !recalculate &&
    screenSize.height === savedScreenSize.height && screenSize.width === savedScreenSize.width) {
    return scrollbarWidth
  }
  if (document.readyState === 'loading') {
    return null
  }
  const div1 = document.createElement('div')
  const div2 = document.createElement('div')
  div1.style.width = div2.style.width = div1.style.height = div2.style.height = '100px'
  div1.style.overflow = 'scroll'
  div2.style.overflow = 'hidden'
  document.body.appendChild(div1)
  document.body.appendChild(div2)
  scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight)
  document.body.removeChild(div1)
  document.body.removeChild(div2)
  // save new screen size
  savedScreenSize = screenSize
  return scrollbarWidth
}

export function on (element, event, handler) {
  element.addEventListener(event, handler)
}

export function off (element, event, handler) {
  element.removeEventListener(event, handler)
}

export function isElement (el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

export function removeFromDom (el) {
  isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el)
}

export function ensureElementMatchesFunction () {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        let matches = (this.document || this.ownerDocument).querySelectorAll(s)
        let i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {
        }
        return i > -1
      }
  }
}

export function addClass (el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    let classes = el.className.split(' ')
    if (classes.indexOf(className) < 0) {
      classes.push(className)
      el.className = classes.join(' ')
    }
  } else {
    el.className = className
  }
}

export function removeClass (el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    let classes = el.className.split(' ')
    let newClasses = []
    for (let i = 0, l = classes.length; i < l; i++) {
      if (classes[i] !== className) {
        newClasses.push(classes[i])
      }
    }
    el.className = newClasses.join(' ')
  }
}

export function hasClass (el, className) {
  if (!isElement(el)) {
    return false
  }
  let classes = el.className.split(' ')
  for (let i = 0, l = classes.length; i < l; i++) {
    if (classes[i] === className) {
      return true
    }
  }
  return false
}

export function setDropdownPosition (dropdown, trigger, options = {}) {
  let doc = document.documentElement
  let containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
  let containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
  let rect = trigger.getBoundingClientRect()
  let dropdownRect = dropdown.getBoundingClientRect()
  dropdown.style.right = 'auto'
  dropdown.style.bottom = 'auto'
  if (options.menuRight) {
    dropdown.style.left = containerScrollLeft + rect.left + rect.width - dropdownRect.width + 'px'
  } else {
    dropdown.style.left = containerScrollLeft + rect.left + 'px'
  }
  if (options.dropup) {
    dropdown.style.top = containerScrollTop + rect.top - dropdownRect.height - 4 + 'px'
  } else {
    dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px'
  }
}

export function isAvailableAtPosition (trigger, popup, placement) {
  let triggerRect = trigger.getBoundingClientRect()
  let popupRect = popup.getBoundingClientRect()
  let viewPortSize = getViewportSize()
  let top = true
  let right = true
  let bottom = true
  let left = true
  switch (placement) {
    case PLACEMENTS.TOP:
      top = triggerRect.top >= popupRect.height
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width
      break
    case PLACEMENTS.BOTTOM:
      bottom = triggerRect.bottom + popupRect.height <= viewPortSize.height
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width
      break
    case PLACEMENTS.RIGHT:
      right = triggerRect.right + popupRect.width <= viewPortSize.width
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2
      bottom = triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <= viewPortSize.height
      break
    case PLACEMENTS.LEFT:
      left = triggerRect.left >= popupRect.width
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2
      bottom = triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <= viewPortSize.height
      break
  }
  return top && right && bottom && left
}

export function setTooltipPosition (tooltip, trigger, placement, auto, appendToSelector) {
  let container
  let containerScrollTop
  let containerScrollLeft
  if (!isExist(appendToSelector) || appendToSelector === 'body') {
    container = document.body
    let doc = document.documentElement
    containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
    containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
  } else {
    container = document.querySelector(appendToSelector)
    containerScrollLeft = container.scrollLeft
    containerScrollTop = container.scrollTop
  }
  // auto adjust placement
  if (auto) {
    // Try: right -> bottom -> left -> top
    // Cause the default placement is top
    let placements = [PLACEMENTS.RIGHT, PLACEMENTS.BOTTOM, PLACEMENTS.LEFT, PLACEMENTS.TOP]
    // The class switch helper function
    const changePlacementClass = (placement) => {
      // console.log(placement)
      placements.forEach(placement => {
        removeClass(tooltip, placement)
      })
      addClass(tooltip, placement)
    }
    // No need to adjust if the default placement fits
    if (!isAvailableAtPosition(trigger, tooltip, placement)) {
      for (let i = 0, l = placements.length; i < l; i++) {
        // Re-assign placement class
        changePlacementClass(placements[i])
        // Break if new placement fits
        if (isAvailableAtPosition(trigger, tooltip, placements[i])) {
          placement = placements[i]
          break
        }
      }
      changePlacementClass(placement)
    }
  }
  // fix left and top for tooltip
  let rect = trigger.getBoundingClientRect()
  let tooltipRect = tooltip.getBoundingClientRect()
  if (placement === PLACEMENTS.BOTTOM) {
    tooltip.style.top = containerScrollTop + rect.top + rect.height + 'px'
    tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
  } else if (placement === PLACEMENTS.LEFT) {
    tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
    tooltip.style.left = containerScrollLeft + rect.left - tooltipRect.width + 'px'
  } else if (placement === PLACEMENTS.RIGHT) {
    tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
    tooltip.style.left = containerScrollLeft + rect.left + rect.width + 'px'
  } else {
    tooltip.style.top = containerScrollTop + rect.top - tooltipRect.height + 'px'
    tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
  }
}

export function hasScrollbar (el) {
  return el.scrollHeight > el.clientHeight
}

export function toggleBodyOverflow (enable) {
  if (enable) {
    document.body.style.paddingRight = null
  } else {
    if (hasScrollbar(document.documentElement)) {
      document.body.style.paddingRight = `${getScrollbarWidth()}px`
    }
  }
}

export function getClosest (el, selector) {
  ensureElementMatchesFunction()
  let parent
  while (el) {
    parent = el.parentElement
    if (parent && parent.matches(selector)) {
      return parent
    }
    el = parent
  }
  return null
}

export function getParents (el, selector, until = null) {
  ensureElementMatchesFunction()
  let parents = []
  let parent = el.parentElement
  while (parent) {
    if (parent.matches(selector)) {
      parents.push(parent)
    } else if (until && (until === parent || parent.matches(until))) {
      break
    }
    parent = parent.parentElement
  }
  return parents
}
