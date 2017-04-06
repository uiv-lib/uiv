'use strict'

const EVENTS = {
  MOUSE_ENTER: 'mouseenter',
  MOUSE_LEAVE: 'mouseleave',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLICK: 'click',
  INPUT: 'input',
  KEY_DOWN: 'keydown'
}

const TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover',
  FOCUS: 'focus',
  HOVER_FOCUS: 'hover-focus',
  OUTSIDE_CLICK: 'outside-click'
}

const PLACEMENTS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
}

export default {
  events: EVENTS,
  triggers: TRIGGERS,
  placements: PLACEMENTS,
  on (element, event, handler) {
    element.addEventListener(event, handler)
  },
  off (element, event, handler) {
    element.removeEventListener(event, handler)
  },
  removeFromDom (element) {
    try {
      element.parentNode.removeChild(element)
    } catch (e) {
      // Silent
    }
  },
  ensureElementMatchesFunction () {
    if (Element && !Element.prototype.matches) {
      let proto = Element.prototype
      proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector
    }
  },
  addClass (element, className) {
    if (element.className) {
      let classes = element.className.split(' ')
      if (classes.indexOf(className) < 0) {
        classes.push(className)
        element.className = classes.join(' ')
      }
    } else {
      element.className = className
    }
  },
  removeClass (element, className) {
    if (element.className) {
      let classes = element.className.split(' ')
      let newClasses = []
      for (let i = 0, l = classes.length; i < l; i++) {
        if (classes[i] !== className) {
          newClasses.push(classes[i])
        }
      }
      element.className = newClasses.join(' ')
    }
  },
  hasClass (element, className) {
    let classes = element.className.split(' ')
    for (let i = 0, l = classes.length; i < l; i++) {
      if (classes[i] === className) {
        return true
      }
    }
    return false
  },
  setDropdownPosition (dropdown, trigger) {
    let doc = document.documentElement
    let containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
    let containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    let rect = trigger.getBoundingClientRect()
    // let dropdownRect = dropdown.getBoundingClientRect()
    dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px'
    dropdown.style.left = containerScrollLeft + rect.left + 'px'
  },
  isAvailableAtPosition (trigger, popup, placement) {
    let triggerRect = trigger.getBoundingClientRect()
    let popupRect = popup.getBoundingClientRect()
    let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    let available
    switch (placement) {
      case PLACEMENTS.TOP:
        available = triggerRect.top >= popupRect.height
        break
      case PLACEMENTS.RIGHT:
        available = triggerRect.right + popupRect.width <= viewportWidth
        break
      case PLACEMENTS.BOTTOM:
        available = triggerRect.bottom + popupRect.height <= viewportHeight
        break
      case PLACEMENTS.LEFT:
        available = triggerRect.left - popupRect.width >= 0
        break
    }
    return available
  },
  setTooltipPosition (tooltip, trigger, placement, auto, appendToSelector) {
    let container
    let containerScrollTop
    let containerScrollLeft
    if (typeof appendToSelector === 'undefined' || appendToSelector === 'body') {
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
      let placements = [PLACEMENTS.TOP, PLACEMENTS.RIGHT, PLACEMENTS.BOTTOM, PLACEMENTS.LEFT]
      if (!this.isAvailableAtPosition(trigger, tooltip, placement)) {
        for (let i = 0, l = placements.length; i < l; i++) {
          for (let j = 0; j < l; j++) {
            this.removeClass(tooltip, placements[j])
          }
          this.addClass(tooltip, placements[i])
          if (this.isAvailableAtPosition(trigger, tooltip, placements[i])) {
            placement = placements[i]
            break
          }
        }
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
}
